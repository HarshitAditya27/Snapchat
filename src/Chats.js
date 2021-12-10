import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import './Chats.css'
import { auth, db } from './firebase'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import Chat from './Chat'
import { useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetCameraImage } from './features/cameraSlice'
function Chats() {

    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
                )
            });
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        navigate('/')
    }

    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar src={user.profilePic} onClick={() => { auth.signOut() }}
                    className="chats_avatar" />
                <div className="chats_search">
                    <SearchIcon className="chats_searchIcon" />
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats_chatIcon" />
            </div>
            <div className="chats_posts">
                {posts.map(
                    ({
                        id,
                        data: { profilePic, username, imageUrl, timestamp, read },

                    }) => (
                        <Chat
                            key={id}
                            id={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            profilePic={profilePic}
                            read={read}
                        />
                    )
                )}
            </div>
            <RadioButtonUnchecked
                className="chats_takePicIcon"
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    );
}

export default Chats
