import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalSignUpStep5 = () => {
  const [hasAccreditations, setHasAccreditations] = useState(false);
  const [formData, setFormData] = useState({
    specialties: '',
    bedCapacity: '',
    yearFounded: '',
    accreditations: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');
    localStorage.setItem(
      'hospitalData',
      JSON.stringify({ ...hospitalData, ...formData })
    );
    navigate('/hospitalSignUpStep6');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center bg-white px-4"
    >
      <div className="max-w-md w-full space-y-6">
        <div>
          <p className="text-sm text-gray-700 font-medium">Step 3 of 4</p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            Let’s understand your capabilities
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tell us about the medical services you provide. This will help us
            route patients more accurately
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialties
            </label>
            {errors.specialties && (
              <p className="text-red-500 text-xs">{errors.specialties}</p>
            )}
            <select
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              required
            >
              <option value="">Select available specialties</option>
              <option>Cardiology</option>
              <option>Gynecology</option>
              <option>Oncology</option>
              <option>Pediatrics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bed capacity
            </label>
            {errors.bedCapacity && (
              <p className="text-red-500 text-xs">{errors.bedCapacity}</p>
            )}
            <select
              name="bedCapacity"
              value={formData.bedCapacity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              required
            >
              <option value="">Select bed capacity</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
              <option>300</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year founded
            </label>
            {errors.yearFounded && (
              <p className="text-red-500 text-xs">{errors.yearFounded}</p>
            )}
            <input
              type="text"
              name="yearFounded"
              value={formData.yearFounded}
              onChange={handleChange}
              placeholder="Enter the year your hospital was founded"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          {hasAccreditations && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Accreditations (Optional)
              </label>
              {errors.accreditations && (
                <p className="text-red-500 text-xs">{errors.accreditations}</p>
              )}
              <select
                name="accreditations"
                value={formData.accreditations}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="">Select your accreditations</option>
                <option>ISO 9001</option>
                <option>JCI</option>
                <option>COHSASA</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Accreditations (Optional)
            </label>
            <button
              type="button"
              onClick={() => setHasAccreditations(!hasAccreditations)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                hasAccreditations ? 'bg-red-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  hasAccreditations ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default HospitalSignUpStep5;