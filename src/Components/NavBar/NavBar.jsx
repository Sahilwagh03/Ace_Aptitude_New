import React, { useEffect, useState } from 'react'
import './NavBar.css'
import menu from '../../assets/menu.svg'
import close from '../../assets/close.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NavLogo from '../../assets/NavLogo.png'
import { motion } from 'framer-motion'
import Avatar_1 from '../../assets/Avatar (1).png'

const NavBar = () => {
    const [toggle, setToggle] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const variants = {
        initial: {
            transform: "translateY(-100%)",
            opacity: 0,
        },
        animate: {
            transform: "translateY(0)",
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }, [location])

    return (
        <>
            <motion.div className='Nav_div'
                initial="initial"
                animate="animate"
                variants={variants}
                viewport={{ once: true }}
            >
                <nav className='navbar'>

                    <div className='Navbar_logo_flex'>
                        <img src={NavLogo} alt="" className='logo' />
                        <span className="logo-text">Ace</span>
                        <span className="logo-subtext">Aptitude</span>
                    </div>
                    <div className='nav_menu'>
                        <ul className='nav_lists'>
                            <Link to='/'><li className='nav_text'>Home</li></Link>
                            <Link to='/aptitude'><li className='nav_text'>Aptitude Tests</li></Link>
                            <Link to='/LeaderBoard'><li className='nav_text'>LeaderBoard</li></Link>
                            <Link to='/about'><li className='nav_text'>About us</li></Link>
                        </ul>
                    </div>
                    {
                        isLoggedIn ?
                            <div className='profile-image'>
                                <img src={Avatar_1} alt='Profile' />
                            </div>
                            :
                            <div className='btn_div'>
                                <button className='nav_btn_signup' onClick={() => navigate('/SignUp')}>Sign up</button>
                                <button className='nav_btn_login' onClick={() => navigate('/Login')}>Login</button>
                            </div>
                    }

                    <div className='mobile_size'>
                        <img onClick={() => setToggle(!toggle)} src={toggle ? close : menu} alt="" width={40} />

                        <div className={` ${toggle ? 'flex' : 'hidden'} nav_mobile_menu`} >
                            <ul className='nav_lists_mobile'>
                                <Link to='/'><li className='nav_text' onClick={() => setToggle(!toggle)}>Home</li></Link>
                                <Link to='/aptitude'><li className='nav_text' onClick={() => setToggle(!toggle)}>Aptitude Tests</li></Link>
                                <Link to='/LeaderBoard'><li className='nav_text' onClick={() => setToggle(!toggle)}>LeaderBoard</li></Link>
                                <Link to='/about'><li className='nav_text' onClick={() => setToggle(!toggle)}>About us</li></Link>
                            </ul>
                            <div className='btn_div_mobile'>
                                {
                                    isLoggedIn ?
                                        <div className='profile-image_mobile'>
                                            <img src={Avatar_1} alt='Profile' />
                                        </div>
                                        :
                                        <>
                                            <button className='nav_btn_signup' onClick={() => navigate('/SignUp')}>Sign up</button>
                                            <button className='nav_btn_login' onClick={() => navigate('/Login')}>Login</button>
                                        </>
                                }
                            </div>
                        </div>

                    </div>
                </nav>
            </motion.div>
        </>
    )
}

export default NavBar