import React, {useEffect, useRef, useState} from 'react';
import {socket} from "../App";
import SinglePhotoBox from "./SinglePhotoBox";
import {useDispatch, useSelector} from "react-redux";
import {updateIdPhotoUser, updatePhoto} from "../features/user";

const Photos = () => {

    const dispatch = useDispatch();
    const photo = useSelector(state=>state.user.photo);
    const photoRef = useRef();
    const updatePhotoRef = useRef();
    const [grid, setGrid] = useState([]);
    const [error, setError] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    useEffect(() => {
        const arr = []
        for (let i = 0; i < 25; i++) {
            arr.push({id: null, photo: null, deleteRequest: null})
        }
        setGrid(arr);
        socket.on('showPhoto', data => {
            setGrid((prevGrid) => {
                const updateGrid = [...prevGrid];
                updateGrid[data.selectedBox].id = data.id;
                updateGrid[data.selectedBox].photo = data.photo;
                updateGrid[data.selectedBox].deleteRequest = null;
                return updateGrid;
            })
        })
        socket.on('permissionToDelete', data => {
            console.log(data)
            setIsRequested(true);
            setGrid((prevGrid) => {
                const updateGrid = [...prevGrid];
                updateGrid[data].deleteRequest = data;
                return updateGrid;
            })
        })
    }, [])



    function sendPhoto() {
       dispatch(updatePhoto(photoRef.current.value))
        socket.emit('setPhoto', photoRef.current.value);
        socket.on('saveUserId', data => {
            dispatch(updateIdPhotoUser(data))
        })
    }
    function setNewPhoto() {
        dispatch(updatePhoto(updatePhotoRef.current.value));
        socket.emit('updatePhoto', updatePhotoRef.current.value);
        updatePhotoRef.current.value = '';
        setError(true);
    }
    return (
        <div>
            {photo ?
                <div>
                    <div className="inputs">
                        <input type="text" ref={updatePhotoRef} placeholder="new photo url"/>
                        <button onClick={setNewPhoto}>UPDATE</button>
                        {error && <div className="error">Photo updated successfully</div>}
                    </div>
                    <div className="photosCont">

                        {grid.length > 0 && grid.map((cell, index) =>
                            <SinglePhotoBox
                                key={index}
                                setError={setError}
                                index={index}
                                isRequested={isRequested}
                                cell={cell}/>)}
                    </div>
                </div>

                :
                <div>
                    <input type="text" ref={photoRef} placeholder="Your photo url"/>
                    <button onClick={sendPhoto}>SET PHOTO</button>
                </div>
            }
        </div>
    );
};

export default Photos;