import React, {useEffect, useRef, useState} from 'react';
import {socket} from "../App";
import SinglePhotoBox from "./SinglePhotoBox";
import {useDispatch, useSelector} from "react-redux";
import {updatePhoto} from "../features/user";

const Photos = () => {

    const dispatch = useDispatch();
    const photo = useSelector(state=>state.user.photo);
    const photoRef = useRef();
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const arr = []
        for (let i = 0; i < 25; i++) {
            arr.push('')
        }
        setGrid(arr);
    }, [])
    socket.on('showPhoto', data => {
        setGrid((prevGrid) => {
            const updateGrid = [...prevGrid];
            updateGrid[data.selectedBox] = data.photo;
            return updateGrid;
        })
    })

    function sendPhoto() {
       dispatch(updatePhoto(photoRef.current.value))
        socket.emit('setPhoto', photoRef.current.value);
    }

    return (
        <div>
            {photo ?
                <div className="photosCont">
                    {grid.length > 0 && grid.map((x, index) => <SinglePhotoBox key={index} index={index} x={x}/>)}
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