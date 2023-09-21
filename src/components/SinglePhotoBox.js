import React, {useState} from 'react';
import {socket} from "../App";

const SinglePhotoBox = ({x, index}) => {

    function selectBox() {
        console.log(x.length)
        if (!x.length) socket.emit('selectedBox', index)
    }
    return (

            <div onClick={selectBox} className="photoBox">
                {x.length>0 &&  <img src={x} alt=""/>}
               </div>

    );
};

export default SinglePhotoBox;