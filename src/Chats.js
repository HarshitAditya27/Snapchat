import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@material-ui/icons/Search'
import { ChatBubbleIcon } from '@material-ui/icons/ChatBubble'
import './Chats.css'
import { db } from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import Chat from './Chat'
function Chats() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
                )
            );
    }, [])

    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar className="chats_avatar" />
                <div className="chats_search">
                    <SearchIcon />
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats_chatIcon" />
            </div>
            <div className="chats_posts">
                {posts.map(
                    ({
                        id,
                        data: { ProfilePic, username, imageUrl, timestamp, read },

                    }) => (
                        <Chat
                            key={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            ProfilePic={ProfilePic}
                            read={read}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default Chats
