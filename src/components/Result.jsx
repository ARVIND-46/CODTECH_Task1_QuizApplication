import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/styles.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const victorSoundRef = useRef(null);
  const defeatSoundRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = (score / total) * 100;

  useEffect(() => {
    victorSoundRef.current = new Audio('/Sounds/victory.mp3');
    victorSoundRef.current.volume = 1   ;

    defeatSoundRef.current = new Audio('/Sounds/time-up.mp3');
    defeatSoundRef.current.volume = 1;

    if (percentage >= 60) {
      victorSoundRef.current.play();
      setShowConfetti(true);
    } else {
      defeatSoundRef.current.play();
    }
  }, [percentage]);

  const getMessage = () => {
    if (percentage === 100) return " Perfect score! Outstanding!";
    if (percentage >= 60) return " Great job! You nailed it!";
    if (percentage >= 40) return " Good effort! Keep practicing!";
    return " Don't worry, you can try again!";
  };

  return (
    <div className="result-container">
      {showConfetti && <Confetti />}
      <h2>🎯 Quiz Completed!</h2>
      <p className="score-text">Your Score: <strong>{score} / {total}</strong></p>
      <p className="feedback">{getMessage()}</p>
      <p className="thanks">Thanks for participating!</p>
      <button className="home-btn" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default Result;
