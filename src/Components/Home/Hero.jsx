import React from 'react'
import './Hero.css'
import { motion } from "framer-motion";

import Hero_character_1 from '../../assets/Hero_character_1_new.png'
import Hero_character_2 from '../../assets/Hero_character_2.png'
import Object_graph from '../../assets/Object_graph.png'
import Object_Pc from '../../assets/Object_pc.png'
import Object_cal  from '../../assets/Object_cal.png'
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const navigate = useNavigate()
    return (
        <section className='hero_section'>
            <div className="hero_main">
                <div className='bg_hero_img'>
                    <motion.img src="https://cdn.thecodehelp.in/mctmmnscw4snaoc9kmnn_b35808d374.svg" alt="" 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{ duration: 4, delay: 0.6 }}/>
                </div>
                <motion.div className="hero_content"
                initial={{x:-100 , opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="hero_title">
                        <span className='Ace'>Ace </span>
                        <span>Aptitude With Us</span>
                    </div>
                    <p><span>The Platform to Master <br className='hero_br' /> Aptitude Skills</span></p>
                    <div className='get_started_div'>
                        <button className='get_started_btn' onClick={()=> navigate('/aptitude')}>Get Started</button>
                    </div>
                </motion.div>
                <div className="hero_img">
                    <div className='Object_Pc_div animation_object'>
                        <motion.img className='Object_Pc' src={Object_Pc} alt="" 
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}/>
                    </div>
                    <div className='Object_cal_div animation_object'>
                        <motion.img className='Object_cal' src={Object_cal} alt="" 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}/>
                    </div>
                    <div className='Object_graph_div animation_object'>
                        <motion.img className='Object_graph' src={Object_graph} alt="" 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}/>
                    </div>
                    <div>
                        <motion.img 
                        src={Hero_character_1} 
                        className='character_1' 
                        alt=""
                        initial={{x:-100 , opacity:0}} 
                        animate={{opacity:1 , x:0}}
                        transition={{ duration: 0.8, delay: 0.4 }}/>
                    </div>
                    <div>
                        <motion.img 
                        src={Hero_character_2} 
                        className='character_2' 
                        alt="" 
                        initial={{x:100 , opacity:0}} 
                        animate={{opacity:1 , x:0}}
                        transition={{ duration: 0.8, delay: 0.4 }}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero