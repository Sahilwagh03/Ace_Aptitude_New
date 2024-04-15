import React from 'react';
import './Footer.css';
import NavLogo from '../../assets/NavLogo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <section>
                <footer>
                    <div className="row primary">
                        <div className="column Footer_about footer_logo">
                            <div className='Navbar_logo_flex'>
                                <img src={NavLogo} alt="" className='logo' style={{border:'px solid', borderRadius:'60px'}} />
                                <span className="logo-text">Ace</span>
                                <span className="logo-subtext" style={{color:'white'}}>Aptitude</span>
                            </div>
                        </div>
                        <div className="column links">
                            <h3 className="Footer_title">GET IN TOUCH</h3>
                            <ul className="Footer_ul">
                                <li>
                                    aceaptitude79@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row copyright">
                        <p>Copyright &copy; {currentYear} Ace Aptitude </p>
                    </div>
                </footer>
            </section>
        </>
    );
}

export default Footer;
