import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DoctorVerifyOtp = () => {
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation()

  useEffect(() => {
    // Get email from query parameter or local storage
    const emailFromQuery = searchParams.get('email') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const emailFromState = location.state?.email || '';
    const userEmail = emailFromQuery || storedEmail || emailFromState ||'';

    if (!userEmail) {
      toast.error('No email provided. Please try signing in again.');
      navigate('/login');
      return;
    }

    setEmail(userEmail.toLowerCase()); // Normalize email

    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(countdown);
  }, [navigate, searchParams, location]);

  const resendOTP = async () => {
    if (!email) {
      setErrors({ otp: 'No email provided. Please try signing in again.' });
      toast.error('No email provided. Please try signing in again.');
      return;
    }

    try {
      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/auth/resend-otp',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(response.data?.message || 'Verification OTP sent to your email!');
      setTimer(1800); // Reset timer
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to resend OTP';
      setErrors({ otp: errorMsg });
      toast.error(errorMsg);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (errors.otp) {
      setErrors({ ...errors, otp: '' });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setErrors({ otp: 'Please enter all 6 digits' });
      toast.error('Please enter all 6 digits');
      setLoading(false);
      return;
    }

    try {
      // Verify OTP
      const verifyResponse = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/auth/verify-otp',
        { email, otp: enteredOtp },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!verifyResponse.data.success) {
        setErrors({ otp: verifyResponse.data.error || 'Invalid OTP' });
        toast.error(verifyResponse.data.error || 'Invalid OTP');
        setLoading(false);
        return;
      }

      // Clean up stored email
      localStorage.removeItem('email');

      toast.success('Email verified successfully! Please sign in.');
      navigate(`/login`, { replace: true });
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Network error. Please try again.';
      setErrors({ otp: errorMsg });
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendClick = () => {
    resendOTP();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Verify Your Email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent an OTP to {email || 'your email'}. Enter the pin to confirm your email. If you do not see the email, check your spam folder.
        </p>

        {errors.otp && (
          <div className="text-red-500 text-sm mb-4 text-center">{errors.otp}</div>
        )}

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => (inputRefs.current[i] = el)}
              className={`w-10 h-10 text-center border rounded text-lg ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Resend in <span className="font-bold">{formatTime(timer)}</span> |{' '}
          <button
            type="button"
            onClick={handleResendClick}
            className="text-blue-500 hover:underline"
            disabled={loading}
          >
            Resend OTP
          </button>
        </p>
      </div>
      <button
        type="submit"
        disabled={!isOtpComplete || loading}
        className={`w-full py-2 rounded mt-8 ${
          isOtpComplete && !loading ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify My Email'}
      </button>
    </form>
  );
};

export default DoctorVerifyOtp;