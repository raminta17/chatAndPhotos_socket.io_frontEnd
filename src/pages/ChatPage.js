import React from 'react';
import Chat from "../components/Chat";
import {NavLink} from "react-router-dom";

const ChatPage = () => {
    return (
        <div>
            <NavLink className="navLink"  to="/">
                <button>BACK TO START</button>
            </NavLink>

            <Chat/>
        </div>
    );
};

export default ChatPage;