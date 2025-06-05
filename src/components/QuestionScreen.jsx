import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  gkQuizData,
  CricketQuizData,
  ScienceQuizData,
  HistoryQuizData
} from './QuestionBank';
import '../style/styles.css';

const QuestionScreen = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Persistent audio refs
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  useEffect(() => {
    correctSoundRef.current = new Audio('/Sounds/correct-answer.mp3');
    correctSoundRef.current.volume = 0.5;
    correctSoundRef.current.preload = 'auto';

    wrongSoundRef.current = new Audio('/Sounds/wrong-answer.mp3');
    wrongSoundRef.current.volume = 1;
    wrongSoundRef.current.preload = 'auto';
  }, []);

  // Select questions based on category
  const getQuizData = () => {
    switch (category?.toLowerCase()) {
      case 'gk':
        return gkQuizData;
      case 'cricket':
        return CricketQuizData;
      case 'science':
        return ScienceQuizData;
      case 'history':
        return HistoryQuizData;
      default:
        return [];
    }
  };

  const [questions] = useState(getQuizData());
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected) => {
    const isCorrect = selected === questions[currentQ].correct;

    // Play sound using ref
    if (isCorrect) {
      correctSoundRef.current?.play();
    } 
    else {
      wrongSoundRef.current?.play();
    }

    // Update score
    if (isCorrect) setScore((prev) => prev + 1);

    // Move to next question
    const nextQ = currentQ + 1;
    setTimeout(() => {
      if (nextQ < questions.length) {
        setCurrentQ(nextQ);
      } else {
        navigate('/result', {
          state: { score: isCorrect ? score + 1 : score, total: questions.length, category }
        });
      }
    }, 800);
  };

  return (
    <div className="quiz-container">
      <h2>{category?.toUpperCase()} Quiz</h2>
      <h3>Question {currentQ + 1} / {questions.length}</h3>

      <div className="question-box">
        <p className="question">{questions[currentQ].question}</p>
        <ul className="options-list">
          {questions[currentQ].options.map((option, index) => (
            <li key={index}>
              <button className="option-btn" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionScreen;
