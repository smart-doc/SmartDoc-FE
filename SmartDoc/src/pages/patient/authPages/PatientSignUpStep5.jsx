import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PatientSignUpStep5 = () => {
  const [form, setForm] = useState({
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    emergencyContactRelationship: '',
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
    if (!form.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!form.emergencyContactPhoneNumber.trim()) {
      newErrors.emergencyContactPhoneNumber = 'Emergency phone number is required';
    } else if (form.emergencyContactPhoneNumber.length !== 11) {
      newErrors.emergencyContactPhoneNumber = 'Phone number must be 11 digits';
    }
    if (!form.emergencyContactRelationship) newErrors.emergencyContactRelationship = 'Relationship is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    localStorage.setItem(
      'formData',
      JSON.stringify({
        ...storedData,
        emergency: form,
      })
    );

    navigate('/patientSignUpStep6');
  };


  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-6 py-12">
      <div>
        <div className="text-right text-sm font-medium mb-2">Step 3 of 4</div>
        <h2 className="text-xl font-semibold text-center text-black mb-1">In case of an emergency</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Let us know who to reach out to when you need urgent help</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency contact name</label>
            {errors.emergencyContactName && <div className="text-red-500 text-sm mb-1">{errors.emergencyContactName}</div>}
            <input
              required
              name="emergencyContactName"
              value={form.emergencyContactName}
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className={`w-full border shadow-sm rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency phone number</label>
            {errors.emergencyContactPhoneNumber && <div className="text-red-500 text-sm mb-1">{errors.emergencyContactPhoneNumber}</div>}
            <input
              required
              name="emergencyContactPhoneNumber"
              value={form.emergencyContactPhoneNumber}
              onChange={handleChange}
              type="text"
              placeholder="Enter emergency phone number"
              className={`w-full border shadow-sm rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.emergencyContactPhoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to you</label>
            {errors.emergencyContactRelationship && <div className="text-red-500 text-sm mb-1">{errors.emergencyContactRelationship}</div>}
            <select
              required
              name="emergencyContactRelationship"
              value={form.emergencyContactRelationship}
              onChange={handleChange}
              className={`w-full border shadow-sm rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.emergencyContactRelationship ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option disabled value="">Select relationship</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Sibling</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded-sm text-sm hover:bg-gray-800 transition mb-4"
      >
        Continue
      </button>
    </form>
  );
};

export default PatientSignUpStep5;
