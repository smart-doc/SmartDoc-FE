import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const CreateAccount = ({ initial = {}, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    ...initial,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Create an account</h2>
        <p className="text-sm text-gray-500 mb-8 text-center">Enter your information to get started</p>
        
        <label className="text-md font-medium" htmlFor="email">Email</label>
        <input
          value={form.email}
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            value={form.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded mt-8">
        Create account
      </button>
    </form>
  );
};

export default CreateAccount;
