import React, { useEffect, useState } from 'react';
import './OtpScreen.css';
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Toast from '../Toast/Toast';
import { useResendOtp } from '../../Hooks/userAuthHooks/resendOtp';

const OtpScreen = () => {
  const [pins, setPins] = useState(['', '', '', '']); // Array to store each digit of the OTP
  const { email } = useParams(); 
  const { loading, error, responseData, resendOTP } = useResendOtp();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60); // Timer for resend button
  const [disableResend, setDisableResend] = useState(false); // Disable resend button during timer
  
  useEffect(() => {
    if (timer > 0 && disableResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setDisableResend(false);
      setTimer(60);
    }
  }, [timer, disableResend]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, otp: pins.join(''), purpose: 'passwordReset' }),
      });

      const data = await response.json();

      if (response.ok) {
        // OTP verification successful, you can redirect or show a success message
        navigate('/'); // Update to your desired page path
      } else {
        // OTP verification failed, handle the error
        toast.error(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or server errors
      toast.error('An error occurred while processing your request');
    }
  };

  const handleChange = (event, index) => {
    const newPins = [...pins];
    newPins[index] = event.target.value;
    setPins(newPins);
    // Optional: Focus on the next input field if a number is entered
    if (event.target.value.length === 1 && index < 4 - 1) {
      const nextInput = document.getElementById(`custom-otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    // Optional: Handle backspace to focus on the previous field
    if (event.target.value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`custom-otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (event) => {
    // Prevent default paste behavior to allow custom handling
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    if (pastedText.length <= 4) {
      const newPins = pastedText.split('').map((char, index) => (index < 4 ? char : ''));
      setPins(newPins);
      // Focus on the last pasted input or the next one if pasting is incomplete
      const lastPastedIndex = Math.min(4 - 1, newPins.lastIndexOf(''));
      const nextInput = document.getElementById(`custom-otp-input-${lastPastedIndex + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="custom-otp-container">
      <h2>Enter 4-Digit OTP</h2>
      <div className="custom-otp-input-container">
        {pins.map((digit, index) => (
          <input
            key={index}
            className="custom-otp-input"
            id={`custom-otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(event) => handleChange(event, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <button className="custom-verify-button" onClick={(event) => handleVerifyOTP(event)}>Verify OTP</button>
      <div className="custom-resend-container">
  <button className='custom-resend-button' onClick={async() => { 
    await resendOTP(email);
    setDisableResend(true); // Disable resend button
  }} disabled={disableResend}>{disableResend ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}</button>
</div>
    </div>
  );
};

export default OtpScreen;
