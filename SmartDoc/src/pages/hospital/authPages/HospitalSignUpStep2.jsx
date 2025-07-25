import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HospitalSignUpStep2 = () => {
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [otp, setOtp] = useState(new Array(5).fill(''));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setEmail(storedUser.email || '');
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: '' }));
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
    if (enteredOtp.length !== 5) {
      setErrors({ otp: 'Please enter all 5 digits' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://smartdoc-4fo9.onrender.com/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ otp: data.error || data.message || 'Invalid OTP' });
        toast.error(data.error || data.message || 'Invalid OTP');
        return;
      }

      toast.success('Email verified successfully!');
      navigate('/hospitalSignUpStep3');
    } catch (error) {
      setErrors({ otp: 'Network error. Please try again.' });
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-xl font-semibold mb-1 text-center">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent an OTP to {email || 'your email'}. Enter the pin to confirm your email. If you do not see the email, check your spam folder
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
              className={`w-10 h-10 text-center border shadow-sm rounded text-lg ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Resend in <span className="font-bold">{formatTime(timer)}</span>
        </p>
      </div>
      <button
        type="submit"
        disabled={!isOtpComplete || loading}
        className={`w-full py-2 rounded mt-8 ${
          isOtpComplete && !loading ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify my email'}
      </button>
    </form>
  );
};

export default HospitalSignUpStep2;
