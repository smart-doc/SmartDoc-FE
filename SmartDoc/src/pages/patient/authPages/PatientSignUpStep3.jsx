import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientSignUpStep3 = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.gender) newErrors.gender = 'Gender is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    localStorage.setItem('formData', JSON.stringify({...storedData, personalInfo: form,}));

    navigate('/patientSignUpStep4');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-8">
      <div>
        <div className="text-right text-sm mb-2 font-bold">Step 1 of 4</div>
        <h2 className="text-xl font-semibold mb-1 text-center">Tell us a bit about you</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Your name, DOB, and gender help our doctors personalize your care
        </p>

        <label className="font-semibold" htmlFor="firstName">First name</label>
        {errors.firstName && <div className="text-red-500 text-sm mb-1">{errors.firstName}</div>}
        <input
          value={form.firstName}
          onChange={handleChange}
          required
          name="firstName"
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          className={`w-full border p-2 mb-4 rounded ${errors.firstName ? 'border-red-500' : ''}`}
        />

        <label className="font-semibold" htmlFor="lastName">Last name</label>
        {errors.lastName && <div className="text-red-500 text-sm mb-1">{errors.lastName}</div>}
        <input
          value={form.lastName}
          onChange={handleChange}
          required
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          className={`w-full border p-2 mb-4 rounded ${errors.lastName ? 'border-red-500' : ''}`}
        />

        <label className="font-semibold" htmlFor="dob">Date of birth</label>
        {errors.dob && <div className="text-red-500 text-sm mb-1">{errors.dob}</div>}
        <input
          value={form.dob}
          onChange={handleChange}
          required
          name="dob"
          id="dob"
          type="date"
          className={`w-full border p-2 mb-4 rounded ${errors.dob ? 'border-red-500' : ''}`}
        />

        <label className="font-semibold" htmlFor="gender">Gender</label>
        {errors.gender && <div className="text-red-500 text-sm mb-1">{errors.gender}</div>}
        <select
          value={form.gender}
          onChange={handleChange}
          required
          name="gender"
          id="gender"
          className={`w-full border p-2 mb-6 rounded ${errors.gender ? 'border-red-500' : ''}`}
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded my-8">
        Continue
      </button>
    </form>
  );
};

export default PatientSignUpStep3;
