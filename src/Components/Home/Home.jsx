import React, { useEffect } from 'react'
import './Home.css'
import Hero from './Hero'
import Stats from './Stats'
import Benefits from './Benefits'
import PrepareFor from './PrepareFor'
import JoinCommunity from './JoinCommunity'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    if(localStorage.length!=0){
      const isgoogle = localStorage.getItem('isgoogleLogin')
      const data = JSON.parse(isgoogle)
      const handleLoginGoogle = async () => {
        try {
          const response = await fetch('https://ace-aptitude.onrender.com/api/login/success', {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies or tokens)
          });

          if (response.ok) {
            const UserData = await response.json();
            localStorage.setItem('user', JSON.stringify(UserData));
            navigate('/')
          } else {
            console.log('Done')
          }
        } catch (error) {
         console.log(error)
        }
      }
      handleLoginGoogle()
    }
  }, [])
  return (
    <>
      <Hero />
      <Stats />
      <Benefits />
      <PrepareFor />
      <JoinCommunity />
    </>
  )
}

export default Home