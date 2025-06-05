import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/styles.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = (score / total) * 100;

  const getMessage = () => {
    if (percentage === 100) {
      return " Congratulations! You got a perfect score!";
    } else if (percentage >= 60) {
      return " Great job! You did really well!";
    } else if (percentage >= 40) {
      return " Good effort! Keep practicing!";
    } else {
      return " Don't worry, you can try again!";
    }
  };

  return (
    <div className="result-container">
      <h2>🎯 Quiz Completed!</h2>
      <p className="score-text">Your Score: <strong>{score} / {total}</strong></p>
      <p className="feedback">{getMessage()}</p>
      <p className="thanks">Thanks for participating!</p>
      <button className="home-btn" onClick={() => navigate('/')}> Go to Home</button>
    </div>
  );
};

export default Result;
