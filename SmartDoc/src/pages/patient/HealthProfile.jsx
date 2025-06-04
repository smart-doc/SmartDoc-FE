import React, { useState } from 'react';
import axios from 'axios';

const HealthProfile = ({ formData, onNext }) => {
  const [form, setForm] = useState({
    bloodGroup: '',
    height_CM: '',
    weight_KG: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!form.bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const updateData = {
      firstName: formData.personalInfo.firstName,
      lastName: formData.personalInfo.lastName,
      phoneNumber: formData.contactInfo.phoneNumber,
      dateOfBirth: formData.personalInfo.dob,
      gender: formData.personalInfo.gender,
      address: formData.contactInfo.address,
      city: formData.contactInfo.city,
      state: formData.contactInfo.state,
      emergencyContactName: formData.emergency.emergencyContactName,
      emergencyContactPhoneNumber: formData.emergency.emergencyContactPhoneNumber,
      emergencyContactRelationship: formData.emergency.emergencyContactRelationship,
      bloodGroup: form.bloodGroup,
      ...(form.height_CM && { height_CM: parseFloat(form.height_CM) }),
      ...(form.weight_KG && { weight_KG: parseFloat(form.weight_KG) })
    };

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token){
        console.log(token)
      } else(
        console.log("Token not available")
      )
      
      const response = await fetch('https://smartdoc-p1ca.onrender.com/api/v1/user/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to update profile');
      }

      if (onNext) {
        onNext({ completed: true, user: data.user });
      } else {
        window.location.href = '/dashboard'; 
      }
      
    } catch (error) {
      console.error('Profile update error:', error);
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
              className={`w-full border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.height_CM ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full border rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.weight_KG ? 'border-red-500' : 'border-gray-300'}`}
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

export default HealthProfile;
