import React, { useState, useEffect, useRef } from 'react';

const VerifyEmail = ({ initialData = {}, onNext }) => {
  const [timer, setTimer] = useState(25);
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus next input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Go back on backspace if current empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      onNext({ otp: enteredOtp });
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          We sent an OTP to your email. Enter the pin to confirm your email
        </p>
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
              className="w-10 h-10 text-center border rounded text-lg"
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
        disabled={!isOtpComplete}
        className={`w-full py-2 rounded mt-8 ${
          isOtpComplete ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Verify my email
      </button>
    </form>
  );
};

export default VerifyEmail;
