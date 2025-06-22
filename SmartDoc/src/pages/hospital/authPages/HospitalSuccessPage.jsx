import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from "../../../assets/successImage.png"


const HospitalSuccesPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const hospitalName = user.hospitalName || 'User';

  const toDashBoard = () => {
    navigate("/doctor")
  }
  
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-10 text-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <img src={successImage} alt="Chatbot high five" className="w-48 h-48 mb-8" />

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Welcome aboard, {hospitalName}! 
        </h1>

        <p className="text-sm text-gray-600">
          Your hospital account has been successfully set up. You can now manage everything from one powerful dashboard
        </p>
      </div>

      <button onClick={toDashBoard} className="w-full bg-black text-white py-3 rounded-sm font-semibold shadow-md hover:bg-gray-800 transition">Go to dashboard</button>
    </div>
  );
};

export default HospitalSuccesPage;
