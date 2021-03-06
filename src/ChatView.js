import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import "./ChatView.css";
import { selectSelectedImage } from './features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView(props) {

    const selectedImage = useSelector(selectSelectedImage)
    const navigate = useNavigate();

    const exit = useCallback(() => {
        navigate('/chats', { replace: true });
    }, [navigate]);

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage, exit])


    return (
        <div className="chatView">
            <img src={selectedImage} onClick={exit} alt="" />
            <div className="chatView_timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >

                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit();
                        }
                        return remainingTime;
                    }}

                </CountdownCircleTimer>
            </div>
        </div>
    );
}

export default ChatView
