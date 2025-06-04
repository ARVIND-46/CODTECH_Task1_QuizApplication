import React, { useState } from 'react';
import { quizData } from './QuestionBank';
import NavigationBottom from './NavigationBottom';
import '../style/styles.css'

const QuestionScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // index of current question
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === quizData[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true); // show result after last question
    }
  };

  return (
    <div className="question-screen">
      <h1>Quiz App</h1>

      {showScore ? (
        <div>
          <h2>Your Score: {score} / {quizData.length}</h2>
        </div>
      ) : (
        <div className="question-item">
          <h2>{quizData[currentQuestion].question}</h2>
          <ul>
            {quizData[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <NavigationBottom 
            current={currentQuestion}
            total={quizData.length}
            onPrev={() => setCurrentQuestion(currentQuestion - 1)}
            onNext={() => setCurrentQuestion(currentQuestion + 1)}
        />
    </div>
    
  );
};


export default QuestionScreen;
