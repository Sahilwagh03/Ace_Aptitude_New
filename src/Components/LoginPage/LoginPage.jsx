import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the Link component
import './LoginPage.css';
import { toast } from 'react-toastify'; // Import toast
import Toast from '../Toast/Toast';

const LoginPage = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ace-aptitude.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login was successful
        const data = await response.json();

        // Create a user object with email and _id
        const userInfo = {
          email: data.user.email,
          _id: data.user._id,
        };

        // Store the user object as a JSON string in local storage
        localStorage.setItem('user', JSON.stringify(userInfo));
        // Show a success toast
        toast.success('Login successful');

        setTimeout(()=>{
          navigate('/')
        },3200)

        // You can now redirect the user to a protected route or perform other actions
      } else {
        // Login failed, handle the error message
        const data = await response.json();

        // Show an error toast with the custom error message from the backend
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);

      // Show a generic error toast for network or server errors
      toast.error('Network or server error');

      // Handle network or server errors
    }
  };
  return (
    <section className="custom-container forms">
      <div className="custom-form login">
        <div className="custom-form-content">
          <header className="login">Login</header>
          <form action="#">
            <div className="field input-field login">
              <input type="email" placeholder="Email" className="input login" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field input-field login">
              <input
                type="password"
                placeholder="Password"
                className="password login"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-link login">
              <Link className="forgot-pass login">
                Forgot password?
              </Link>
            </div>
            <div className="field button-field login">
              <button className="login" onClick={(e) => handleLogin(e)}>Login</button>
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
      <Toast />
    </section>
  );
};

export default LoginPage;
