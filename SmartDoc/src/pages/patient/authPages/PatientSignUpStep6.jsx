import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const PatientSignUpStep6 = () => {
  const { dispatch } = useAuth();
  const [form, setForm] = useState({
    bloodGroup: '',
    height_CM: '',
    weight_KG: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!form.bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    if (form.height_CM && (parseFloat(form.height_CM) <= 0 || parseFloat(form.height_CM) > 300)) {
      newErrors.height_CM = 'Height must be between 0 and 300 cm';
    }
    if (form.weight_KG && (parseFloat(form.weight_KG) <= 0 || parseFloat(form.weight_KG) > 1000)) {
      newErrors.weight_KG = 'Weight must be between 0 and 1000 kg';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('formData')) || {};

    const updateData = {
      firstName: storedData.personalInfo.firstName,
      lastName: storedData.personalInfo.lastName,
      phoneNumber: storedData.contactInfo.phoneNumber,
      dateOfBirth: storedData.personalInfo.dob,
      gender: storedData.personalInfo.gender,
      address: storedData.contactInfo.address,
      city: storedData.contactInfo.city,
      state: storedData.contactInfo.state,
      emergencyContactName: storedData.emergency.emergencyContactName,
      emergencyContactPhoneNumber: storedData.emergency.emergencyContactPhoneNumber,
      emergencyContactRelationship: storedData.emergency.emergencyContactRelationship,
      bloodGroup: form.bloodGroup,
      ...(form.height_CM && { height_CM: parseFloat(form.height_CM) }),
      ...(form.weight_KG && { weight_KG: parseFloat(form.weight_KG) })
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://smartdoc-4fo9.onrender.com/api/v1/user/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to update profile');
      }

      dispatch({
        type: 'SIGN_IN',
        payload: {
          user: updateData,
          token,
        },
      });

      localStorage.removeItem('formData');
      localStorage.setItem('user', JSON.stringify({ firstName: updateData.firstName }));

      navigate('/patientSuccessPage');
    } catch (error) {
      console.error('Profile update error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setErrors({ general: error.message || 'Failed to save health profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-6 py-12">
      <div>
        <div className="text-right text-sm font-medium mb-2">Step 4 of 4</div>
        <h2 className="text-xl font-semibold text-center text-black mb-1">Your health at a glance</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          A quick overview of your health profile helps doctors make better decisions
        </p>

        {errors.general && (
          <div className="text-red-500 text-sm mb-4 text-center">{errors.general}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood group</label>
            {errors.bloodGroup && <div className="text-red-500 text-sm mb-1">{errors.bloodGroup}</div>}
            <select
              required
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className={`w-full shadow-sm border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="" disabled>Select your blood group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height in cm</label>
            {errors.height_CM && <div className="text-red-500 text-sm mb-1">{errors.height_CM}</div>}
            <input
              type="number"
              name="height_CM"
              value={form.height_CM}
              onChange={handleChange}
              placeholder="Enter your height in CM"
              min="0"
              max="300"
              className={`w-full shadow-sm border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.height_CM ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight in kg</label>
            {errors.weight_KG && <div className="text-red-500 text-sm mb-1">{errors.weight_KG}</div>}
            <input
              type="number"
              name="weight_KG"
              value={form.weight_KG}
              onChange={handleChange}
              placeholder="Enter your weight in KG"
              min="0"
              max="1000"
              className={`w-full border shadow-sm rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.weight_KG ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full p-3 rounded-sm text-sm font-medium transition-colors ${
          loading 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
        }`}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}

export default PatientSignUpStep6;
