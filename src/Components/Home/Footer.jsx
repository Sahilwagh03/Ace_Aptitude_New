import React from 'react'
import './Footer.css'
import NavLogo from '../../assets/NavLogo.png'
const Footer = () => {
    return (
        <>
            <section>
                <footer>
                    <div className="row primary">
                        <div className="column Footer_about">
                            <div className='Navbar_logo_flex'>
                                <img src={NavLogo} alt="" className='logo' style={{border:'px solid', borderRadius:'60px'}} />
                                <span className="logo-text">Ace</span>
                                <span className="logo-subtext" style={{color:'white'}}>Aptitude</span>
                            </div>
                        </div>
                        <div className="column links">
                            <h3 className="Footer_title">MENU</h3>
                            <ul className="Footer_ul">
                                <li>
                                    .A.Q
                                </li>
                                <li>
                                    Cookies Policy
                                </li>
                                <li>
                                    Terms Of Service
                                </li>
                                <li>
                                    Support
                                </li>
                            </ul>
                        </div>
                        <div className="column border">
                            <h3 className="Footer_title">SERVICES</h3>
                            <ul className="Footer_ul">
                                <li>
                                    F.A.Q
                                </li>
                                <li>
                                    Cookies Policy
                                </li>
                                <li>
                                    Terms Of Service
                                </li>
                                <li>
                                    Support
                                </li>

                            </ul>
                        </div>
                        <div className="column links">
                            <h3 className="Footer_title">GET IN TOUCH</h3>
                            <ul className="Footer_ul">
                                <li>
                                    Email: abc@example.com
                                </li>
                            </ul>


                        </div>
                    </div>
                    <div className="row copyright">
                        <p>Copyright &copy; 2023 Ace Aptitude </p>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default Footer