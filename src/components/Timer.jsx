import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(60); // 60 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Run every 1 second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="timer">
      <h2>Time Left: {time}s</h2>
    </div>
  );
};

export default Timer;
