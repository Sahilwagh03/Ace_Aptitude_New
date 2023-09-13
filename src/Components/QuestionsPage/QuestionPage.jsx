import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuestionPage.css';

const QuestionPage = () => {
    const { category, level } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function
    const [QuestionArray, setQuestionArray] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // State to store selected answers
    const [timeLeft, setTimeLeft] = useState(10 * 60); // Initial time in seconds (10 minutes)
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getAllcategory = async () => {
            try {
                const response = await fetch(`https://ace-aptitude.onrender.com/api/filterQuestions/${category}/${level}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setQuestionArray(jsonData);
                const answers = jsonData.map(({ correctOption }) => correctOption);
                setCorrectAnswers(answers)
                setIsLoading(false)
                // Initialize selectedAnswers with empty strings for each question
                setSelectedAnswers(Array(jsonData.length).fill(''));
            } catch (error) {
                console.log(error);
            }
        };
        getAllcategory();
        window.scrollTo(0, 0);
    }, []);

    // Set a 1-second interval timer to update the remaining time
    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                clearInterval(timer);
                navigate('/score'); // Redirect to the score page when the timer reaches 0
            }
        }, 1000); // Update every 1 second
        // Clear the timer when the component unmounts
        return () => clearInterval(timer);
    }, [navigate, timeLeft]);

    const handleSelectAnswer = (questionIndex, optionIndex) => {
        // Create a copy of selectedAnswers and update the selected answer for the specific question
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = QuestionArray[questionIndex].options[optionIndex];
        setSelectedAnswers(newSelectedAnswers);
    };

    // Helper function to format the remaining time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            {
                isLoading ?

                    <div className='loader_container_questions'>
                        <span className="loader"></span>
                    </div>
                    :
                    <div className="question_main">
                        <div className="timer">
                            Time Left: {formatTime(timeLeft)}
                        </div>
                        <div className="question_Container">
                            {QuestionArray.map(({ questionText, options }, questionIndex) => (
                                <div className="question" key={questionIndex}>
                                    <h2>{questionText}</h2>
                                    <div className="options">
                                        {options.map((option, optionIndex) => (
                                            <ul key={optionIndex}>
                                                <li
                                                    onClick={() => handleSelectAnswer(questionIndex, optionIndex)}
                                                    className={
                                                        selectedAnswers[questionIndex] === option ? 'selected' : ''
                                                    }
                                                >
                                                    {option}
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="submit-button" onClick={() => navigate('/score', { state: { selectedAnswers, correctAnswers, QuestionArray } })}>
                            Submit
                        </button>
                    </div>
            }
        </>
    );
};

export default QuestionPage;
