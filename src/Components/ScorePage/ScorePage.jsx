import React , {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './ScorePage.css';

const ScorePage = () => {
    const { state } = useLocation();
    const { selectedAnswers, correctAnswers, QuestionArray } = state || {};

    const score = selectedAnswers.reduce((acc, selected, index) => {
        return selected === correctAnswers[index] ? acc + 1 : acc;
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            <div className="score-main">
                <div className="score-question-container">
                <h1 className="score-heading">Your Score</h1>
                    {QuestionArray.map(({ questionText, options, correctOption }, questionIndex) => (
                        <div className="score-question" key={questionIndex}>
                            <h2 className="score-question-text">{questionText}</h2>
                            <div className="score-options">
                                {options.map((option, optionIndex) => (
                                    <ul key={optionIndex}>
                                        <li
                                            className={`score-option ${
                                                selectedAnswers[questionIndex] === correctOption
                                                    ? selectedAnswers[questionIndex] === option
                                                        ? 'correct'
                                                        : ''
                                                    : selectedAnswers[questionIndex] === option
                                                    ? 'incorrect'
                                                    : ''
                                            }`}
                                        >
                                            {option}
                                            {selectedAnswers[questionIndex] !== correctOption &&
                                                selectedAnswers[questionIndex] === option && (
                                                    <span className="correct-option">
                                                        (Correct: {correctOption})
                                                    </span>
                                                )}
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="score">
                    Your Score: {score} out of {QuestionArray.length}
                </div>
            </div>
        </>
    );
};

export default ScorePage;
