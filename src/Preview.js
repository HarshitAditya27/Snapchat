import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import "./Preview.css"
import CloseIcon from '@material-ui/icons/Close'
import TextFieldIcon from '@material-ui/icons/TextFields'
import CreateIcon from '@material-ui/icons/Create'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
//import firebase from "firebase"; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!cameraImage) {
            navigate('/')
        }
    }, [cameraImage, navigate])


    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url');
        uploadTask.on('state_changed', null, (error) => {
            console.log(error);
        }, () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: 'Harshit',
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                navigate('/chats');
            });
        });
    };

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview_close" />
            <div className="preview_toolbarRight">
                <TextFieldIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview_SendIcon" />
            </div>
        </div>
    );
}
export default Preview
