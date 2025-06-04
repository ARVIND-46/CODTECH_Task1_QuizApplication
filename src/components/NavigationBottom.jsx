import React from 'react';
import '../style/styles.css'; 

const NavigationBottom = ({ current, total, onPrev, onNext }) => {
  return (
    <div className="navigation-container">
      <button onClick={onPrev} disabled={current === 0}>
        Previous
      </button>
      <span>Question {current + 1} of {total}</span>
      <button onClick={onNext} disabled={current === total - 1}>
        Next
      </button>
    </div>
  );
};

export default NavigationBottom;
