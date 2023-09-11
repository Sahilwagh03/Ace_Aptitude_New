import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './LoginPage.css';

const LoginPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <section className="custom-container forms">
      <div className="custom-form login">
        <div className="custom-form-content">
          <header className="login">Login</header>
          <form action="#">
            <div className="field input-field login">
              <input type="email" placeholder="Email" className="input login" />
            </div>
            <div className="field input-field login">
              <input
                type="password"
                placeholder="Password"
                className="password login"
              />
            </div>
            <div className="form-link login">
              <Link className="forgot-pass login">
                Forgot password?
              </Link>
            </div>
            <div className="field button-field login">
              <button className="login">Login</button>
            </div>
          </form>
          <div className="form-link login">
            <span>
              Don't have an account?{' '}
              <Link to="/Signup" className="link signup-link login">
                Signup
              </Link>
            </span>
          </div>
        </div>
        <div className="line login"></div>
        <div className="media-options login">
          <Link className="field google login">
            <i className='bx bxl-google'></i>
            <span>Login with Google</span>
          </Link>
        </div>
        <div className="media-options login">
          <Link className="field facebook login">
            <i className="bx bxl-github facebook-icon login"></i>
            <span>Login with GitHub</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
