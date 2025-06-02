import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from "../../assets/successImage.png"


const SuccessfulPage = ({ firstName = 'Kelechi' }) => {
  const navigate = useNavigate();

  const toDashBoard = () => {
    navigate("/patients")
  }
  
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-10 text-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <img src={successImage} alt="Chatbot high five" className="w-48 h-48 mb-8" />

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          You're all set, {firstName}! 
        </h1>

        <p className="text-sm text-gray-600">
          Welcome to SmartDoc, your AI-powered health companion. You can now chat freely when you need it most.
        </p>
      </div>

      <button onClick={toDashBoard} className="w-full bg-black text-white py-3 rounded-sm font-semibold shadow-md hover:bg-gray-800 transition">Let's go</button>
    </div>
  );
};

export default SuccessfulPage;
