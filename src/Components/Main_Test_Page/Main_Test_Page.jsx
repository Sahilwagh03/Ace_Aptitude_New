import React from 'react'
import './Main_Test_Page.css'
import { useNavigate } from 'react-router-dom';

const Main_Test_Page = () => {
  const navigate = useNavigate()
  const testCards = [
    {
      testName:'General Aptitude Test 1',
      category: 'General Aptitude',
      time: '30 minutes',
      questions: 20,
    },
    {
      testName:'Programming Test 1',
      category: 'Programming',
      time: '45 minutes',
      questions: 25,
    },
    {
      testName:'Verbal Test 1',
      category: 'Verbal',
      time: '40 minutes',
      questions: 30,
    },
    {
      testName:'Logical Reasoning Test 1',
      category: 'Logical Reasoning',
      time: '40 minutes',
      questions: 30,
    },
  ];

  const handleTest = (category, time, numberOfQuestions,testName) => {
    navigate(`/test/${numberOfQuestions}/${category}/${time}/${testName}`)
  }
  return (
    <>
      <div className="main-test-page">
        <h1 className="main-test-heading">Available Tests</h1>
        <div className="test-cards">
          {testCards.map((test, index) => (
            <div className="test-card" key={index}>
              <h2 className="test-name">{test.testName}</h2>
              <p className="test-category"><span>Category:</span> {test.category}</p>
              <div className="test-details">
                <span className="test-time">Time: {test.time}</span>
                <span className="test-questions">Questions: {test.questions}</span>
              </div>
              <button className="start-test-button" onClick={() => handleTest(test.category, test.time, test.questions, test.testName)}>
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Main_Test_Page