import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import { gkQuizData, CricketQuizData, ScienceQuizData, HistoryQuizData, MathQuizData,
  ComputerQuizData, GeographyQuizData, IndianHistoryQuizData, SportQuizData, TechQuizData, MarvelQuizData} from './QuestionBank';
import '../style/styles.css';

const QuestionScreen = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  useEffect(() => {
    correctSoundRef.current = new Audio('/Sounds/correct-answer.mp3');
    correctSoundRef.current.volume = 1;
    correctSoundRef.current.preload = 'auto';

    wrongSoundRef.current = new Audio('/Sounds/wrong-answer.mp3');
    wrongSoundRef.current.volume = 1;
    wrongSoundRef.current.preload = 'auto';
  }, []);

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
      case 'maths':
        return MathQuizData;
      case 'computer':
        return ComputerQuizData;
      case 'geography':
        return GeographyQuizData;
      case 'india':
        return IndianHistoryQuizData;
      case 'sport':
        return SportQuizData;
      case 'tech':
        return TechQuizData;
      case 'marvel':
        return MarvelQuizData;
      default:
        return [];
    }
  };

  const [questions] = useState(getQuizData());
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleTimeEnd = () => {
    navigate('/result', {
      state: {
        score,
        total: questions.length
      }
    });
  };

  const handleAnswer = (selected) => {
    if (selectedOption) return; // prevent multiple clicks

    const isCorrect = selected === questions[currentQ].correct;
    setSelectedOption(selected);

    if (isCorrect) {
      correctSoundRef.current?.play();
      setScore((prev) => prev + 1);
    } else {
      wrongSoundRef.current?.play();
    }

    const nextQ = currentQ + 1;
    setTimeout(() => {
      if (nextQ < questions.length) {
        setCurrentQ(nextQ);
        setSelectedOption(null);
      } else {
        navigate('/result', {
          state: {
            score: isCorrect ? score + 1 : score,
            total: questions.length,
            category
          }
        });
      }
    }, 1000);
  };

  if (!questions.length || !questions[currentQ]) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="quiz-container">
      <Timer onTimeEnd={handleTimeEnd} />
      <h2>{category?.toUpperCase()} Quiz</h2>
      <h3>Question {currentQ + 1} / {questions.length}</h3>

      <div className="question-box">
        <p className="question">{questions[currentQ].question}</p>
        <ul className="options-list">
          {questions[currentQ].options.map((option, index) => {
            let className = 'option-btn';

            if (selectedOption) {
              if (option === questions[currentQ].correct) {
                className += ' correct';
              } else if (option === selectedOption) {
                className += ' wrong';
              }
            }

            return (
              <li key={index}>
                <button
                  className={className}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedOption}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionScreen;
