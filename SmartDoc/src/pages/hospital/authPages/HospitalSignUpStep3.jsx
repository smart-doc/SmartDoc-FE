import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalSignUpStep3 = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
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
    if (formData.phoneNumber.length !== 11) {
      setErrors({ ...errors, phoneNumber: 'Phone number must be 11 digits' });
      return;
    }
    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');
    localStorage.setItem(
      'hospitalData',
      JSON.stringify({ ...hospitalData, ...formData })
    );
    navigate('/hospitalSignUpStep4');
  };

  return (
    <div className="min-h-screen flex justify-center bg-white px-4 ml-5 mr-5 mt-10">
      <div className="max-w-md w-full space-y-6">
        <div>
          <p className="text-sm text-gray-700 font-medium">Step 1 of 4</p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            Tell us more about your hospital
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This information is used to create your hospital’s profile, make sure
            it’s as accurate as possible.
          </p>
        </div>

        <form className="space-y-4 p-4 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact phone number
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
            )}
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your contact phone"
              className="mt-1 block w-full shadow-sm border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hospital address
            </label>
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your hospital address"
              className="mt-1 block w-full shadow-sm border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              required
            >
              <option value="">Select your state</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
              <option value="FCT">Federal Capital Territory (Abuja)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter the city where your hospital is located"
              className="mt-1 block w-full shadow-sm border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HospitalSignUpStep3;
