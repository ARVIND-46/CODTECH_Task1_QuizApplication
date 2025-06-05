import React, { useState, useEffect, useRef } from 'react';
import '../style/styles.css'; 

const Timer = ({ initialTime = 59, onTimeEnd }) => {
  const [time, setTime] = useState(initialTime);
  const timerRef = useRef(null);
  const endtimerRef = useRef(null);

  useEffect(() => {
    // Load sounds once
    timerRef.current = new Audio('/Sounds/clock-ticking.mp3');
    timerRef.current.volume = 0.5;
    timerRef.current.loop = true; 
    timerRef.current.preload = 'auto';

    endtimerRef.current = new Audio('/Sounds/time-up.mp3');
    endtimerRef.current.volume = 1;
    endtimerRef.current.preload = 'auto';

    timerRef.current.play(); 

    return () => {
      timerRef.current.pause(); 
      timerRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      timerRef.current.pause(); // Stop ticking
      endtimerRef.current.play(); // Play time-up sound
      if (onTimeEnd) onTimeEnd();
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeEnd]);

  const progress = (time / initialTime) * 100;

  return (
    <div className="timer">
      <h2>Time Left: {time}s</h2>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
