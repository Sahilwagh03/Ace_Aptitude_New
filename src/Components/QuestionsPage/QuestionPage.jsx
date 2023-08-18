import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const QuestionPage = () => {
    const { category, level } = useParams()
    const [QuestionArray, setQuestionArray] = useState([])
    useEffect(() => {
        const getAllcategory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/filterQuestions/${category}/${level}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setQuestionArray(jsonData)
                console.log(jsonData)
            } catch (error) {
                console.log(error);
            }
        }
        getAllcategory()
    }, [])
    return (
        <>
            <div className="question_Container">
                {
                    QuestionArray.map(({ questionText, options }, index) =>
                    (
                        <>
                            <div className="question" key={index}>
                                <h2>{questionText}</h2>
                            </div>
                            <div className="options">
                                {
                                    options.map((option , index) =>
                                        <>
                                            <ul key={index}>
                                                <li>{option}</li>
                                            </ul>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default QuestionPage