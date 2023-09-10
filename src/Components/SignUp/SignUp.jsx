import React, { useEffect } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'

const SignUp = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <section className="custom-container signUp-container forms">
      <div className="custom-form login">
        <div className="custom-form-content">
          <header className="login">Sign Up</header>
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
            <div className="field input-field login">
              <input
                type="password"
                placeholder="Confirm Password"
                className="password login"
              />
            </div>
            <div className="field button-field login">
              <button  className="login">Sign Up</button>
            </div>
          </form>
          <div className="form-link login">
            <span>
              Don't have an account?{' '}
              <Link to="/Login" className="link signup-link login">
                Login
              </Link>
            </span>
          </div>
        </div>
        <div className="line login"></div>
        <div className="media-options login">
          <Link className="field facebook login">
            <i className="bx bxl-facebook facebook-icon login"></i>
            <span>Login with Facebook</span>
          </Link>
        </div>
        <div className="media-options login">
          <Link  className="field google login">
          <i className='bx bxl-google'></i>
            <span>Login with Google</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp