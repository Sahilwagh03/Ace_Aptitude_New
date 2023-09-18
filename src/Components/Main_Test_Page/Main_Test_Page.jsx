import React from 'react'
import './Main_Test_Page.css'
import { useNavigate } from 'react-router-dom';

const Main_Test_Page = () => {
  const navigate = useNavigate()
  const testCards = [
    {
      category: 'General Aptitude',
      time: '30 minutes',
      questions: 20,
    },
    {
      category: 'Programming',
      time: '45 minutes',
      questions: 25,
    },
    {
      category: 'Verbal',
      time: '40 minutes',
      questions: 30,
    },
    {
      category: 'Logical Reasoning',
      time: '40 minutes',
      questions: 30,
    },
  ];

  const handleTest = (category,time,numberOfQuestions)=>{
    navigate(`/test/${numberOfQuestions}/${category}/${time}`)
  }
  return (
    <>
      <div className="main-test-page">
        <h1 className="main-test-heading">Available Tests</h1>
        <div className="test-cards">
          {testCards.map((test, index) => (
            <div className="test-card" key={index}>
              <h2 className="test-category">{test.category}</h2>
              <div className="test-details">
                <span className="test-time">Time: {test.time}</span>
                <span className="test-questions">Questions: {test.questions}</span>
              </div>
              <button className="start-test-button" onClick={()=>handleTest(test.category,test.time,test.questions)}>Start Test</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main_Test_Page