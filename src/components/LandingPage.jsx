import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = (path) => {
    alert('Lets start the game!');
    navigate(path);
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Quiz App</h1>
      <p className="landing-desc">Test your knowledge with our quizzes on various topics!</p>
      <p className="landing-desc">Choose a quiz category to get started:</p>

      <div className="quiz-buttons">
        <button onClick={() => handleStart('/quiz/gk')}>General Knowledge</button>
        <button onClick={() => handleStart('/quiz/cricket')}>Cricket</button>
        <button onClick={() => handleStart('/quiz/Science')}>Science</button>
        <button onClick={() => handleStart('/quiz/History')}>History</button>
      </div>
    </div>
  );
};

export default LandingPage;
