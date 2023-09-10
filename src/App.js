import React from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Home/Footer'
import { BrowserRouter , Route ,Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Aptitude_test_page from './Components/Aptitude_test/Aptitude_test_page'
import QuestionPage from './Components/QuestionsPage/QuestionPage'
import ScorePage from './Components/ScorePage/ScorePage'
import LoginPage from './Components/LoginPage/LoginPage'
import SignUp from './Components/SignUp/SignUp'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import AboutUs from './Components/AboutUs/AboutUs'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/aptitude' element={<Aptitude_test_page/>}/>
      <Route path='/LeaderBoard' element={<Leaderboard/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/test/:category/:level' element={<QuestionPage/>}/>
      <Route path='/score' element={<ScorePage/>} />
      <Route path='/Login' element={<LoginPage/>} />
      <Route path='/SignUp' element={<SignUp/>} />
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App