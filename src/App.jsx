import React from 'react';
import QuestionScreen from './components/QuestionScreen';
import Timer from './components/Timer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Result from './components/Result';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/:category" element={<QuestionScreen />} />
        <Route path="result" element={<Result />} />  
      </Routes>
    </Router>
  );
};

export default App;
