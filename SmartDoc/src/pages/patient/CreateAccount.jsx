import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-email');
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
        <div>
            <h2 className="text-xl font-semibold mb-1 text-center">Create an account</h2>
            <p className="text-sm text-gray-500 mb-8 text-center">Enter your information to get started</p>
            <input type="email" placeholder="Enter your email address" className="w-full border p-2 mb-4 rounded" required />
            <input type="password" placeholder="Enter your password" className="w-full border p-2 mb-4 rounded" required />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded mt-8">Create account</button>
    </form>

  );
};

export default CreateAccount;
