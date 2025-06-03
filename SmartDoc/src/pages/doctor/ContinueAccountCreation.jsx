import React from 'react';

const HospitalDetailsForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <p className="text-sm text-gray-700 font-medium">Step 1 of 4</p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            Tell us more about your hospital
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This information is used to create your hospital’s profile, make sure it’s as accurate as possible.
          </p>
        </div>

        <form className="space-y-4 border border-blue-400 p-4 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact phone number</label>
            <input
              type="tel"
              placeholder="Enter your contact phone"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hospital address</label>
            <input
              type="text"
              placeholder="Enter your hospital address"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
            >
              <option value="">Select your state</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="kaduna">Kaduna</option>
              {/* Add more states as needed */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter the city where your hospital is located"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </form>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HospitalDetailsForm;
