import React from 'react';
import {NavLink} from "react-router-dom";
import Photos from "../components/Photos";

const PhotoPage = () => {
    return (
        <div>
            <NavLink className="navLink" to="/">
                <button>BACK TO START</button>
            </NavLink>

            <Photos/>
        </div>
    );
};

export default PhotoPage;