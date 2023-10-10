import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuestionPage.css';

const QuestionPage = () => {
    const { numberOfQuestions, category, level, time, testName } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function
    const [QuestionArray, setQuestionArray] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // State to store selected answers
    const [timeLeft, setTimeLeft] = useState(parseTimeToSeconds(time) || 10 * 60); // Parse and convert time to seconds
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [route, setroute] = useState('')

    // Utility function to convert a time string like '45 minutes' to seconds
    function parseTimeToSeconds(timeString) {
        const match = timeString ? timeString.match(/(\d+) minutes/) : null;
        if (match && match[1]) {
            const minutes = parseInt(match[1], 10);
            return minutes * 60; // Convert to seconds
        }
        return 30 * 60; // Default to 10 minutes (600 seconds) if the format is not as expected or time is not provided
    }

    useEffect(() => {
        const getAllcategory = async () => {
            try {

                let apiUrl = ''
                if (category && level && (!numberOfQuestions && !time)) {
                    apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/filterQuestions/${category}/${level}`
                    setroute('/aptitude')
                }
                else if (numberOfQuestions && time && category && testName && !level) {
                    apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/getRandomQuestions/${numberOfQuestions}/${category}`
                    setroute('/test')
                }
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setQuestionArray(jsonData);
                console.log(jsonData)
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
    }, [numberOfQuestions, category, level, time, testName]);

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
                        <button className="submit-button"
                            onClick={() => {
                                const timeTakenInSeconds = parseTimeToSeconds(time) - timeLeft;
                                const timeTakenInMinutes = timeTakenInSeconds / 60;
                                const timeTakenAsNumber = parseFloat(timeTakenInMinutes);
                                navigate('/score', { state: { selectedAnswers, correctAnswers, QuestionArray, route, timeTaken: timeTakenAsNumber, testName } })
                            }}>
                            Submit
                        </button>
                    </div>
            }
        </>
    );
};

export default QuestionPage;
