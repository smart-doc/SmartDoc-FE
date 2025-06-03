import React, { useState } from "react";

const ContactForm = ({ initialData = {}, onNext }) => {
  const [form, setForm] = useState({
    phoneNumber: '',
    state: '',
    city: '',
    address: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(form);
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
            <input
              required
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State where you live</label>
            <select
              required
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="" disabled>Select your state</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Others">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              required
              name="city"
              value={form.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter your city"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your exact address</label>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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

export default ContactForm;
