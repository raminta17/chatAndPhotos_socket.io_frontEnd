import React from 'react';
import {NavLink} from "react-router-dom";

const StartPage = () => {
    return (
        <div>
            <div>
                <NavLink className="navLink" to="/chat">
                    <button>GO TO CHAT</button>
                </NavLink>
                <NavLink className="navLink" to="/photo">
                    <button>GO TO PHOTO GRID</button>
                </NavLink>

            </div>
        </div>
    );
};

export default StartPage;