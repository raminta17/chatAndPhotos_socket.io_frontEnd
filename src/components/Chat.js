import React, {useEffect, useRef} from 'react';
import {socket} from "../App";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUsername} from "../features/user";

const Chat = () => {

    const dispatch = useDispatch();
    const messageRef= useRef();
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
    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    function sendMsg() {
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes()
        if (chatRef.current.value) socket.emit('userMessage', {
                message: chatRef.current.value,
            color: colorRef.current.value,
            date: datetime
        })
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
                    <div className="chatBox" >{messages.map((message, index) =>
                        <div className="messageBox" style={{backgroundColor: message.color, alignSelf: username === message.username ? 'end' : 'start'}} key={index}>
                           <div>
                               <b>{username === message.username ? 'You' : message.username}: </b>
                               <div className="message"> {message.message}</div>
                           </div>
                            <div className="date">{message.date}</div>
                        </div>
                    )}
                        <div ref={messageRef}></div>
                    </div>
                    <div className="inputs">
                        <input type="color" ref={colorRef}/>
                        <input type="text" ref={chatRef} placeholder="Your message..."/>
                        <button onClick={sendMsg}>SEND</button>
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