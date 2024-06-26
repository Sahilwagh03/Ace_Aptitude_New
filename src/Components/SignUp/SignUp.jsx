import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; // Import toast
import Toast from '../Toast/Toast';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, SetComfirmpassword] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== Confirmpassword) {
      toast.error("Password does not match");
      return; // Prevent further execution
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Name , email, password }), // Send only email and password
      });


      const data = await response.json();
      if (response.ok) {
        const userInfo = {
          email: data.user.email,
          _id: data.user._id,
          Name:data.user.Name,
          ProfilePic:data.user.profileImage
        };

        // Store the user object as a JSON string in local storage
        localStorage.setItem('user', JSON.stringify(userInfo));
        // Registration was successful, you can redirect or show a success message
        toast.success('Registration successful');
        setTimeout(() => {
          navigate(`/otp-verification/${email}`);
        }, 500)
      } else {
        // Registration failed, handle the error
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or server errors
      toast.error('An error occurred while processing your request');
    }
  };


  const handleGoogleSignUP = () => {
    window.location.href = "${process.env.REACT_APP_API_BASE_URL}/api/auth/google";
    // const isgoogle={
    //   google:true
    // }
    // localStorage.setItem('isgoogleLogin',JSON.stringify(isgoogle))
  }

  return (
    <section className="custom-container signUp-container forms">
      <div className="custom-form login">
        <div className="custom-form-content">
          <header className="login">Sign Up</header>
          <form action="#">
            <div className="field input-field login">
              <input type="text"
                placeholder="Name"
                className="input login"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div className="field input-field login">
              <input type="email"
                placeholder="Email"
                className="input login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="field input-field login">
              <input
                type="password"
                placeholder="Password"
                className="password login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field input-field login">
              <input
                type="password"
                placeholder="Confirm Password"
                className="password login"
                value={Confirmpassword}
                onChange={(e) => SetComfirmpassword(e.target.value)}
                required
              />
            </div>
            <div className="field button-field login">
              <button className="login" onClick={(e) => handleSignUp(e)}>Sign Up</button>
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
        {/* <div className="line login"></div>
        <div className="media-options login" onClick={handleGoogleSignUP}>
          <Link className="field google login">
            <i className='bx bxl-google'></i>
            <span>Login with Google</span>
          </Link>
        </div> */}
      </div>
      <Toast />
    </section>
  )
}

export default SignUp