/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import "./TimerCount.css";

function TimerCount({ goalInfo, onFinishTask }) {
    if (!goalInfo || !goalInfo.goal || !goalInfo.goal.time) {
        return (
            <div className="tc-container">
                <h2>Loading Timer...</h2>
                <p>If you are not redirected, please go back and select a goal.</p>
            </div>
        );
    }

    // Destructure after the check to avoid errors.
    const { goal, subject, index } = goalInfo;
    const { time, content } = goal;
    const [timeLeft, setTimeLeft] = useState(time * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // When the goal's time changes, reset the timer to the new value.
        setTimeLeft(time * 60);
        setIsActive(false);
    }, [time]); // This effect now correctly depends on the primitive `time` value.

    useEffect(() => {
        // If the timer has run out, do nothing.
        if (!isActive || timeLeft <= 0) {
            return;
        }

        // Set up an interval that decrements the timer every second.
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // The cleanup function clears the interval when the component unmounts
        // or when the `timeLeft` dependency changes (i.e., it hits 0).
        return () => clearInterval(intervalId);
    }, [timeLeft, isActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleStartResume = () => setIsActive(true);
    const handlePause = () => setIsActive(false);
    const handleFinish = () => {
        setIsActive(false);
        onFinishTask(subject, index, timeLeft);
    };

    return (
        <div className="tc-container">
            <h1>{content || 'Timer'}</h1>
            <div className="tc-timer-circle">
                <span className="tc-time-display">{formatTime(timeLeft)}</span>
            </div>
            <div className="tc-controls">
                <button className="tc-btn material-icons" onClick={isActive ? handlePause : handleStartResume}>
                    {isActive ? 'pause' : 'play_arrow'}
                </button>
                <button className="tc-btn tc-btn-finish material-icons" onClick={handleFinish}>stop</button>
            </div>
            <div className="tc-goal-details">
                <p><strong>Time Allotted:</strong> {time} minutes</p>
            </div>
        </div>
    );
}
export default TimerCount;