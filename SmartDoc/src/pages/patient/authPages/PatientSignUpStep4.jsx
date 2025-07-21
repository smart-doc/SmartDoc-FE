import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PatientSignUpStep4 = () => {
  const [form, setForm] = useState({
    phoneNumber: '',
    state: '',
    city: '',
    address: '',
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
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (form.phoneNumber.length !== 11) newErrors.phoneNumber = 'Phone number must be 11 digits';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    localStorage.setItem(
      'formData',
      JSON.stringify({
        ...storedData,
        contactInfo: form,
      })
    );

    navigate('/patientSignUpStep5');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-6 py-12">
      <div>
        <div className="text-right text-sm font-medium mb-2">Step 2 of 4</div>
        <h2 className="text-xl font-semibold text-center text-black mb-1">How do we contact you?</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Your contact info helps us connect you with relevant services and for follow-up
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            {errors.phoneNumber && <div className="text-red-500 text-sm mb-1">{errors.phoneNumber}</div>}
            <input
              required
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              className={`w-full border shadow-sm rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State where you live</label>
            {errors.state && <div className="text-red-500 text-sm mb-1">{errors.state}</div>}
            <select
              required
              name="state"
              value={form.state}
              onChange={handleChange}
              className={`w-full border text-gray-500 shadow-sm rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="" disabled>Select your state</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            {errors.city && <div className="text-red-500 text-sm mb-1">{errors.city}</div>}
            <input
              required
              name="city"
              value={form.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter your city"
              className={`w-full border shadow-sm rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your exact address</label>
            {errors.address && <div className="text-red-500 text-sm mb-1">{errors.address}</div>}
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              className={`w-full border shadow-sm rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-black text-white p-2 rounded-md text-sm hover:bg-gray-800 transition mb-4">
        Continue
      </button>
    </form>
  );
};

export default PatientSignUpStep4;
