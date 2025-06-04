import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import successImage from '../../assets/successImage.png';

const SuccessfulPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          'https://smartdoc-p1ca.onrender.com/profile/get/SignedinUserProfile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Failed to fetch user profile';
        toast.error(errorMsg);
        // Redirect to login if token is invalid
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const toDashboard = () => {
    if (!user) return;

    const userType = user.type;
    const userRole = user.role?.name;

    if (userType === 'Patient' || userRole === 'Patient') {
      navigate('/patients');
    } else if (userType === 'Doctor' || userRole === 'Doctor') {
      navigate('/doctor');
    } else if (userType === 'Hospital' || userRole === 'Hospital' || userRole === 'Admin') {
      navigate('/admin');
    } else {
      toast.error('Unknown user type or role');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-10 text-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <img src={successImage} alt="Chatbot high five" className="w-48 h-48 mb-8" />

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {loading ? "You're all set!" : `You're all set, ${user?.firstName || user?.hospitalName || 'User'}!`}
        </h1>

        <p className="text-sm text-gray-600">
          Welcome to SmartDoc, your AI-powered health companion. You can now chat freely when you need it most.
        </p>
      </div>

      <button
        onClick={toDashboard}
        disabled={loading || !user}
        className={`w-full bg-black text-white py-3 rounded-sm font-semibold shadow-md transition ${
          loading || !user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
        }`}
      >
        Let's go
      </button>
    </div>
  );
};

export default SuccessfulPage;