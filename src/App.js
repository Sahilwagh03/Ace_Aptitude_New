import React, { useEffect, useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Home/Footer'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Aptitude_test_page from './Components/Aptitude_test/Aptitude_test_page'
import QuestionPage from './Components/QuestionsPage/QuestionPage'
import ScorePage from './Components/ScorePage/ScorePage'
import LoginPage from './Components/LoginPage/LoginPage'
import SignUp from './Components/SignUp/SignUp'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import AboutUs from './Components/AboutUs/AboutUs'
import ProfilePage from './Components/ProfilePage/ProfilePage'
import { ProtectedComponent } from './Components/ProtectedComponent/ProtectedComponent'
import Main_Test_Page from './Components/Main_Test_Page/Main_Test_Page'

const App = () => {

  const [islogin, setIslogin] = useState(false)

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const userObject = JSON.parse(userInfo); // Parse the JSON string
      setIslogin(userObject.logined); // Access the logined property
    } else if(!userInfo) {
      setIslogin(false);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedComponent />}>
            <Route path='/aptitude' element={<Aptitude_test_page />} />
            <Route path='/test' element={<Main_Test_Page/>}/>
            <Route path='/LeaderBoard' element={<Leaderboard />} />
          </Route>
          <Route path='/about' element={<AboutUs />} />
          <Route path='/Practice_test/:category/:level' element={<QuestionPage />} />
          <Route path='/test/:numberOfQuestions/:category/:time/:testName' element={<QuestionPage />} />
          <Route path='/score' element={<ScorePage />} />
          <Route path='/Login' element={islogin ? <Navigate to='/' /> : <LoginPage />} />
          <Route path='/SignUp' element={islogin ? <Navigate to='/' /> : <SignUp />} />
          <Route path='/Profile/:id' element={<ProfilePage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App