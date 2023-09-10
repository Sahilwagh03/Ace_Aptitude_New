import React, { useEffect } from 'react'
import './Home.css'
import Hero from './Hero'
import Stats from './Stats'
import Benefits from './Benefits'
import PrepareFor from './PrepareFor'
import JoinCommunity from './JoinCommunity'
const Home = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
    <Hero/>
    <Stats/>
    <Benefits/>
    <PrepareFor/>
    <JoinCommunity/>
    </>
  )
}

export default Home