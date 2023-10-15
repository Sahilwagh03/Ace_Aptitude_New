import React, { useEffect, useState } from 'react'
import './NavBar.css'
import menu from '../../assets/menu.svg'
import close from '../../assets/close.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NavLogo from '../../assets/NavLogo.png'
import { motion } from 'framer-motion'
import Avatar_4 from '../../assets/Avatar (4).png'
import CoinThender from '../../assets/coinThender.svg'

const NavBar = () => {
    const [toggle, setToggle] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPopProfile, setisPopProfile] = useState(false)
    const [userProfile, setuserProfile] = useState('')
    const [userCoins , setUserCoins] = useState('')

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
            const userProfile = localStorage.getItem('user')
            const data = JSON.parse(userProfile)
            setuserProfile(data.ProfilePic)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [location])

    useEffect(()=>{
        const userProfile = localStorage.getItem('user')
        const data = JSON.parse(userProfile)
        const getuserCoin = async()=>{
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/coins/${data._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setUserCoins(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        getuserCoin()
    })

    const handleLogout = () => {
        // Clear localStorage and update isLoggedIn
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        // Close the profile popup
        setisPopProfile(false);
        navigate('/')
    }

    const handleProfile = () => {
        const userDataString = localStorage.getItem('user')
        const userData = JSON.parse(userDataString);
        // Access the _id property
        const userId = userData._id;
        navigate(`/Profile/${userId}`)
        setisPopProfile(!isPopProfile)
    }

    const handleNavigateHome = ()=>{
        navigate('/')
    }

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
                        <img src={NavLogo} alt="" className='logo' onClick={handleNavigateHome} />
                        <span className="logo-text" onClick={handleNavigateHome}>Ace</span>
                        <span className="logo-subtext"  onClick={handleNavigateHome}>Aptitude</span>
                    </div>
                    <div className='nav_menu'>
                        <ul className='nav_lists'>
                            <Link to='/'><li className='nav_text'>Home</li></Link>
                            <Link to='/aptitude'><li className='nav_text'>Practice Tests</li></Link>
                            <Link to='/test'><li className='nav_text'>Test</li></Link>
                            <Link to='/LeaderBoard'><li className='nav_text'>LeaderBoard</li></Link>
                            <Link to='/about'><li className='nav_text'>About us</li></Link>
                        </ul>
                    </div>
                    {
                        isLoggedIn ?
                            <div className='nav_user_info_flex'>
                                <div className='user_coin_count'>
                                    <img src={CoinThender} alt="coins" width={23} />
                                    <p>{userCoins || '0'}</p>
                                </div>
                                <div className='profile-image' onClick={() => setisPopProfile(!isPopProfile)}>
                                    <img src={userProfile || Avatar_4} alt='Profile' />
                                </div>
                            </div>
                            :
                            <div className='btn_div'>
                                <button className='nav_btn_signup' onClick={() => navigate('/SignUp')}>Sign up</button>
                                <button className='nav_btn_login' onClick={() => navigate('/Login')}>Login</button>
                            </div>
                    }
                    {
                        isPopProfile ?
                            <div className='profile_pop_container'>
                                <ul>
                                    <li className='Profile_pop_btn'>
                                        <div className='Profile_pop_flex' onClick={handleProfile}>
                                            <i className='bx bx-user'></i>
                                            <div>Profile</div>
                                        </div>
                                    </li>
                                    <li className='Profile_pop_logout_btn' onClick={handleLogout}>
                                        <div className='Profile_pop_flex'>
                                            <i className='bx bx-log-out-circle'></i>
                                            <div>Logout</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            :
                            ""
                    }

                    <div className='mobile_size'>
                        <img onClick={() => setToggle(!toggle)} src={toggle ? close : menu} alt="" width={40} />

                        <div className={` ${toggle ? 'flex' : 'hidden'} nav_mobile_menu`} >
                            <ul className='nav_lists_mobile'>
                                <Link to='/'><li className='nav_text' onClick={() => setToggle(!toggle)}>Home</li></Link>
                                <Link to='/aptitude'><li className='nav_text' onClick={() => setToggle(!toggle)}>Practice Tests</li></Link>
                                <Link to='/test'><li className='nav_text' onClick={() => setToggle(!toggle)}>Test</li></Link>
                                <Link to='/LeaderBoard'><li className='nav_text' onClick={() => setToggle(!toggle)}>LeaderBoard</li></Link>
                                <Link to='/about'><li className='nav_text' onClick={() => setToggle(!toggle)}>About us</li></Link>
                            </ul>
                            <div className='btn_div_mobile'>
                                {
                                    isLoggedIn ?
                                        <>
                                            <div className='profile-image_mobile' onClick={() => { handleProfile(); setToggle(!toggle) }}>
                                                <img src={Avatar_4} alt='Profile' />
                                            </div>
                                            <button className='nav_btn_login' onClick={() => { handleLogout(); setToggle(!toggle) }}>Logout</button>
                                        </>
                                        :
                                        <>
                                            <button className='nav_btn_signup' onClick={() => { navigate('/SignUp'); setToggle(!toggle) }}>Sign up</button>
                                            <button className='nav_btn_login' onClick={() => { navigate('/Login'); setToggle(!toggle) }}>Login</button>
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