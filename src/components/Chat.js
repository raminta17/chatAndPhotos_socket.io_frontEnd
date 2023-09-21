import React, {useEffect, useRef} from 'react';
import {socket} from "../App";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUsername} from "../features/user";

const Chat = () => {

    const dispatch = useDispatch();
    const chatRef = useRef();
    const colorRef = useRef();
    const usernameRef = useRef();
    const [messages, setMessages] = useState([]);
    const username = useSelector(state => state.user.username);
    useEffect(() => {
        socket.on('message', data => {
            setMessages(messages=>[...messages,data])
        })
    }, []);
    function sendMsg() {
        if (chatRef.current.value) socket.emit('userMessage', {message: chatRef.current.value, color: colorRef.current.value})
        chatRef.current.value = '';
    }
    function sendUsername() {
        socket.emit('setUsername', usernameRef.current.value)
        dispatch(updateUsername(usernameRef.current.value))
    }
    return (
        <>
            {username ?
                <div className="chat">
                    <div>{messages.map((message, index) =>
                        <div className="message" style={{backgroundColor: message.color}} key={index}>
                            <b>{message.username}: </b>
                            {message.message}</div>
                    )}
                    </div>
                    <div className="inputs">
                        <input type="color" ref={colorRef}/>
                        <input type="text" ref={chatRef} placeholder="Your message..."/>
                        <button onClick={sendMsg}>chat</button>
                    </div>

                </div>
            :
            <div>
                <input type="text" ref={usernameRef} placeholder="Type your username here"/>
                <button onClick={sendUsername}>START CHATTING</button>
            </div>}
        </>

    );
};

export default Chat;