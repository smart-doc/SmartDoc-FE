import React, { useState } from 'react';
import axios from 'axios';

const HealthProfile = ({ formData, onNext }) => {
  // Local state to manage the form fields
  const [form, setForm] = useState({
    bloodGroup: '',
    height: '',
    weight: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Merge all previous steps' data with the current step's data
    const finalData = {
      ...formData.account,
      ...formData.emailVerification,
      ...formData.personalInfo,
      ...formData.contactInfo,
      ...formData.emergency,
      ...form,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register/patient', finalData);
      // Assuming backend returns user data including firstName
      onNext(response.data?.data || {});
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood group</label>
            <select
              required
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
            <input
              required
              type="text"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Enter your height in cm"
              className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight in kg</label>
            <input
              required
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Enter your weight in kg"
              className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-black text-white p-2 rounded-sm text-sm hover:bg-gray-800 transition mb-4">
        Continue
      </button>
    </form>
  );
};

export default HealthProfile;
