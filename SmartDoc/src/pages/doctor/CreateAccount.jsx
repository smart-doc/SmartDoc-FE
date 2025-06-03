import React, { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const HospitalOnboarding = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Let’s get your hospital online
          </h2>
          <p className="text-sm text-gray-500">
            Enter your hospital’s details to start your onboarding
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hospital name
            </label>
            <input
              type="text"
              placeholder="Enter your hospital’s name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye className={`${showPassword ? 'hidden' : 'block'}`} />
                <FaEyeSlash className={`${showPassword ? 'block' : 'hidden'}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md shadow hover:bg-gray-800 transition duration-200 text-sm font-medium">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalOnboarding;
