import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-8">
      <div className="">
        <div className="text-right text-sm mb-2 font-bold">Step 1 of 4</div>
        <h2 className="text-xl font-semibold mb-1 text-center">Tell us a bit about you</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Your name, DOB, and gender help our doctors personalize your care</p>

        <label className='font-semibold' htmlFor="firstName">First name</label>
        <input name='firstName' id='firstName' type="text" placeholder="Enter your first name" className="w-full border p-2 mb-4 rounded" />

        <label className='font-semibold' htmlFor="lastName">Last name</label>
        <input name='lastName' id='lastName' type="text" placeholder="Enter your last name" className="w-full border p-2 mb-4 rounded" />

        <label className='font-semibold' htmlFor="dob">Date of brith</label>
        <input name='dob' id='dob' type="date" className="w-full border p-2 mb-4 rounded" />

        <label className='font-semibold' htmlFor="gender">Gender</label>
        <select name='gender' id='gender' className="w-full border p-2 mb-6 rounded">
        <option>Select your gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
        </select>
      </div>

      <button className="w-full bg-black text-white py-2 rounded my-8">Continue</button>
    </form>
  );
};

export default PersonalInfo;
