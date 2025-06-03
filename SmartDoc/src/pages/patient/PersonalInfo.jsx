import React, { useState } from 'react';

const PersonalInfo = ({ initialData = {}, onNext }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    onNext(form); // Send data to parent
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
        <input
          value={form.firstName}
          onChange={handleChange}
          required
          name="firstName"
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="font-semibold" htmlFor="lastName">Last name</label>
        <input
          value={form.lastName}
          onChange={handleChange}
          required
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="font-semibold" htmlFor="dob">Date of birth</label>
        <input
          value={form.dob}
          onChange={handleChange}
          required
          name="dob"
          id="dob"
          type="date"
          className="w-full border p-2 mb-4 rounded"
        />

        <label className="font-semibold" htmlFor="gender">Gender</label>
        <select
          value={form.gender}
          onChange={handleChange}
          required
          name="gender"
          id="gender"
          className="w-full border p-2 mb-6 rounded"
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

export default PersonalInfo;
