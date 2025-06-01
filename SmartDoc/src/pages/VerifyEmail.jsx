import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [timer, setTimer] = useState(25);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/personal-info');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent an OTP to your email. Enter the pin to confirm your email
        </p>
        <div className="flex justify-between gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              maxLength={1}
              className="w-10 h-10 text-center border rounded"
              required
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Resend in <span className="font-bold">0:{timer.toString().padStart(2, '0')}</span>
        </p>
      </div>
      <button
        type="submit"
        disabled={timer > 0}
        className={`w-full py-2 rounded mt-8 ${
          timer > 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-black text-white'
        }`}
      >
        Verify my email
      </button>
    </form>
  );
};

export default VerifyEmail;
