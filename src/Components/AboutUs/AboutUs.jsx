import React, { useEffect } from 'react'
import './AboutUs.css'
import About_hero from '../../assets/AboutUs_hero.png'
import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Member_1 from '../../assets/Member_1.jpg'
import Member_2 from '../../assets/Member_2.jpg'
import Member_3 from '../../assets/Member_3.jpg'
import Member_4 from '../../assets/Member_4.jpg'
import Rocket from '../../assets/Rocket.png'

// Import Swiper styles
import 'swiper/css';

const AboutUs = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <section className='About_section'>
            <div className="About_Main_container">
                <div className="About_container">
                    <div className="AboutUs_hero">
                        <div className="AboutUS_hero_Container">
                            <div className="AboutUs_hero_content">
                                <p className='AboutUs_title'>A platform for the next generation of learners!</p>
                                <p className='AboutUS_para'>Place for imparting education to next-generation students.</p>
                                <div className="AboutUS_rating">
                                    <span>4.5</span>
                                    <div className='star_group'>
                                        <svg stroke="currentColor" fill="rgb(255 158 42)" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="text-yellow500 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path></svg>
                                        <svg stroke="currentColor" fill="rgb(255 158 42)" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="text-yellow500 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path></svg>
                                        <svg stroke="currentColor" fill="rgb(255 158 42)" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="text-yellow500 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path></svg>
                                        <svg stroke="currentColor" fill="rgb(255 158 42)" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="text-yellow500 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path></svg>
                                        <svg stroke="currentColor" fill="rgb(255 158 42)" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="text-yellow500 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path></svg>
                                    </div>
                                </div>
                                <div className="AboutUs_btn">
                                    <button><Link style={{ textDecoration: 'none' }} to="/aptitude">Start Parcticing</Link></button>
                                </div>
                            </div>
                            <div className="AboutUs_hero_img">
                                <img src={About_hero} alt="AboutUs_Hero" />
                            </div>
                        </div>
                    </div>
                    <div className="AboutUs_content_Container">
                        <div className="AboutUs_img">
                            <img src={Rocket} alt="" />
                        </div>
                        <div className='gredient_ball_1'></div>
                        <div className="AboutUs_content">
                            <h1>About Us</h1>
                            <p>Welcome to Ace Aptitude, your trusted destination for mastering the art of acing aptitude tests. At Ace Aptitude, we are passionate about helping you unlock your full potential and achieve your academic and career aspirations.

                                We're dedicated to providing you with the tools and resources you need to succeed in your aptitude tests and reach new heights in your educational and professional journey. Join us at Ace Aptitude, where your success is our top priority.</p>
                        </div>
                    </div>
                    <div className="AboutUs_Team_container">
                        <div className='gredient_ball'></div>
                        <div className="AboutUs_team_content">
                            <h1>Our Team</h1>
                            <p>Introducing the talented individuals who power the innovations at Ace Aptitude. Get to know our devoted development team, the driving force behind our platform's excellence.</p>
                        </div>

                        <div className="AboutUs_slider">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                speed="3000"
                                loop={true}
                                modules={[Autoplay]}>
                                <SwiperSlide>
                                    <div className='AboutUs_team_center'>
                                        <div className="AboutUs_team_card">
                                            <div className="AboutUs_team_img">
                                                <img src={Member_1} alt="" />
                                            </div>
                                            <div className="AboutUs_team_header">
                                                <div className='AboutUs_team_title'>
                                                    <h1>Sahil Wagh</h1>
                                                    <p>FullStack Developer</p>
                                                </div>
                                                <p>Introducing Sahil, our versatile developer proficient in both frontend and backend development. Sahil's keen design sense and mastery of server-side technologies ensure a visually appealing and high-performing platform. Bridging the gap between user interface and functionality, Sahil makes Ace Aptitude a seamless, efficient, and user-friendly experience for you.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='AboutUs_team_center'>
                                        <div className="AboutUs_team_card">
                                            <div className="AboutUs_team_img">
                                                <img src={Member_2} alt="" />
                                            </div>
                                            <div className="AboutUs_team_header">
                                                <div className='AboutUs_team_title'>
                                                    <h1>Rishabh Tiwari</h1>
                                                    <p>Python Developer</p>
                                                </div>
                                                <p>Meet Rishabh , our meticulous web scraper. He's the data wizard behind the scenes, ensuring that Ace Aptitude is always stocked with the most current and relevant content. Rishabh's dedication to collecting and maintaining accurate data enriches your learning experience and keeps you up-to-date with the latest insights.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='AboutUs_team_center'>
                                        <div className="AboutUs_team_card">
                                            <div className="AboutUs_team_img">
                                                <img src={Member_3} alt="" />
                                            </div>
                                            <div className="AboutUs_team_header">
                                                <div className='AboutUs_team_title'>
                                                    <h1>Smit Vadhel</h1>
                                                    <p>FullStack Developer</p>
                                                </div>
                                                <p>Smit excels in crafting visually stunning designs that seamlessly merge aesthetics and functionality, meeting user requirements impeccably. With strong project management skills, Smit adeptly oversees projects from start to finish, collaborating effortlessly with cross-functional teams, and ensuring effective stakeholder communication for project triumph.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='AboutUs_team_center'>
                                        <div className="AboutUs_team_card">
                                            <div className="AboutUs_team_img">
                                                <img src={Member_4} alt="" />
                                            </div>
                                            <div className="AboutUs_team_header">
                                                <div className='AboutUs_team_title'>
                                                    <h1>Vighnesh Bidaye</h1>
                                                    <p>UI Developer</p>
                                                </div>
                                                <p>Meet Vighnesh, our skilled UI designer, the creative genius behind captivating visuals that elevate user experiences. With an artistic eye and a flair for aesthetics, Vighnesh crafts designs harmonizing form and function. His meticulous attention to detail ensures every element is user-friendly and visually pleasing. Vighnesh's vital contributions create stunning, intuitive interfaces leaving lasting user impressions.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div className="AboutUs_get_in_touch">

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs