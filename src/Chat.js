import { Avatar } from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import ReactTimeago from 'react-timeago'
import "./Chat.css"
import { db } from './firebase'
import { selectImage } from './features/appSlice'
function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection("posts").doc(id).set(
                { read: true, },
                { merge: true }
            );
            navigate("/chats/view")
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar src={profilePic} className="chat_avatar" />
            <div className="chat_info">
                <h4>{username}</h4>
                <p> {!read && 'Tap to View - '}  <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
            </div>
            {!read && <StopRoundedIcon className="chat_readIcon" />}
        </div>
    )
}

export default Chat
