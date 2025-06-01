import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [timer, setTimer] = useState(25);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits or empty
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const isOtpComplete = otp.every((digit) => digit !== '');
  const isButtonEnabled = isOtpComplete && timer === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isButtonEnabled) {
      navigate('/personal-info');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent an OTP to your email. Enter the pin to confirm your email
        </p>
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, i) => (
            <input key={i} value={digit} onChange={(e) => handleChange(e.target.value, i)} maxLength={1}className="w-10 h-10 text-center border rounded" required />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6 text-center">Resend in <span className="font-bold">0:{timer.toString().padStart(2, '0')}</span>
        </p>
      </div>
      <button type="submit" disabled={!isButtonEnabled} className={`w-full py-2 rounded mt-8 ${isButtonEnabled? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Verify my email</button>
    </form>
  );
};

export default VerifyEmail;
