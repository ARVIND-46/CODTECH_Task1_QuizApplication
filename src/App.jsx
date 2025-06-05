import React from 'react';
import QuestionScreen from './components/QuestionScreen';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Result from './components/Result';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/:category" element={<QuestionScreen />} />
        <Route path="result" element={<Result />} />  
      </Routes>
    </Router>
    <Footer />
    </>
    
  );
};

export default App;
