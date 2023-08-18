import React from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Home/Footer'
import { BrowserRouter , Route ,Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Aptitude_test_page from './Components/Aptitude_test/Aptitude_test_page'
import QuestionPage from './Components/QuestionsPage/QuestionPage'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/aptitude' element={<Aptitude_test_page/>}/>
      <Route path='/leadboard' element={<h1>Leadboard page</h1>}/>
      <Route path='/about' element={<h1>About page</h1>}/>
      <Route path='/aptitude/:category/:level' element={<QuestionPage/>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App