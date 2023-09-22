import React, {useState} from 'react';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";

const SinglePhotoBox = ({cell, index, setError}) => {

    const userId = useSelector(state => state.user.idPhotoUser);

    function selectBox() {
        setError(false);
        if (!cell.photo) {
            socket.emit('selectedBox', index);
        }
    }

    function deletePhoto() {
        if (cell.id === userId) {
            console.log('cell info', cell);
            socket.emit('deletePhoto', index)
        } else {
            console.log('cell info', cell);
            socket.emit('requestToDelete', {id: cell.id, cell: index})
        }
    }

    function givePermission() {
        console.log('i allow')
        socket.emit('permissionGiven', index);
    }

    function denyPermission() {
        socket.emit('permissionDenied', index);
    }

    return (
        <div onClick={selectBox} className={cell.photo ? 'occupied' : "photoBox"}>
            {cell.photo && <div onClick={deletePhoto} className="close">X</div>}
            {cell.photo && <img src={cell.photo} alt=""/>}
            {cell.deleteRequest === index && <div className="request">
                Other user wants to delete your photo. Give permission?
                <button onClick={givePermission}>YES</button>
                <button onClick={denyPermission}>NO</button>
            </div>}
        </div>
    );
};

export default SinglePhotoBox;