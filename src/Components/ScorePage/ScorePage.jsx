import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScorePage.css';

const ScorePage = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { selectedAnswers, correctAnswers, QuestionArray, route, timeTaken, testName } = state || {};

    const score = selectedAnswers.reduce((acc, selected, index) => {
        return selected === correctAnswers[index] ? acc + 1 : acc;
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handlePracticeMore = async (e) => {
        e.preventDefault()
        if (route === '/test') {
            const user = localStorage.getItem('user')
            const userInfo = JSON.parse(user)
            const id = userInfo._id
            const questionCategory = QuestionArray[0].category

            // Calculate the user's percentage score
            const percentageScore = (score / QuestionArray.length) * 100;

            // Calculate coinsEarned based on the percentage score
            let coinsEarned = 0;

            if (percentageScore == 0) {
                coinsEarned = 0;
            }
            else if (percentageScore <= 50) {
                coinsEarned = 1;
            } else if (percentageScore <= 70) {
                coinsEarned = 3;
            } else if (percentageScore <= 100) {
                coinsEarned = 5;
            }

            // Ensure coinsEarned is a positive integer
            coinsEarned = Math.max(0, coinsEarned);

            // Calculate the new coin count
            const newCoinCount = coinsEarned;

            const requestData = {
                userId: id,
                tests: [
                    {
                        testName: testName,
                        score: parseInt(score),
                        dateTaken: new Date(),
                        durationMinutes: timeTaken,
                        category: questionCategory,
                    },
                ],
                coins: newCoinCount
            }
            try {
                const response = await fetch(`https://ace-aptitude.onrender.com/api/tests`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })

                const data = await response.json()
                setTimeout(()=>{
                    navigate(route)
                },1000)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            navigate(route)
        }
    }

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
                                            className={`score-option ${selectedAnswers[questionIndex] === correctOption
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
                <button className='submit-button' onClick={(e) => handlePracticeMore(e)}>Practice more</button>
            </div>
        </>
    );
};

export default ScorePage;
