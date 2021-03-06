import React from "react";
import WebCam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from 'react-router-dom'
import "./WebcamCapture.css"

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
};

function WebcamCapture() {
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch(setCameraImage(imageSrc));
            navigate("/preview")
        },
        [webcamRef, dispatch, navigate]
    );
    return <div className='webcamCapture'>
        <WebCam
            audio={false}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
        />
        <RadioButtonUncheckedIcon
            className='webcamCapture__icon'
            onClick={capture}
            fontSize='large'
        />

    </div>
}

export default WebcamCapture;