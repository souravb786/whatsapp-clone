import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MessageSharp, SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, {useState, useEffect } from 'react';
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from './firebase';
import userEvent from '@testing-library/user-event';
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [ { user }, dispatch] = useStateValue();
    
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                (
                    setRoomName(snapshot.data().name)
                ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>doc.data())));
        }
    }, [roomId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);
        
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });
        setInput("");
    }
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headRight">
                <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message)=>
                (<p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                    <span className="chat_name">
                    {message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
               ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)}
                    type="text" placeholder="type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
