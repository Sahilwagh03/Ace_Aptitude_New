import React from 'react'
import './Main_Test_Page.css'

const Main_Test_Page = () => {

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
      category: 'Verbal Reasoning',
      time: '40 minutes',
      questions: 30,
    },
  ];

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
              <button className="start-test-button">Start Test</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main_Test_Page