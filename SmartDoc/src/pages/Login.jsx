import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Call sign-in API
      const signInResponse = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/auth/signin',
        formData
      );
      const { token, user } = signInResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Step 2: Fetch signed-in user profile
      const profileResponse = await axios.get(
        'https://smartdoc-p1ca.onrender.com/profile/get/SignedinUserProfile',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const profileData = profileResponse.data;

      // Step 3: Redirect based on user type or role
      const userType = profileData.type || user.type;
      const userRole = profileData.role?.name || user.role?.name;

      if (userType === 'Patient' || userRole === 'Patient') {
        navigate('/patients');
      } else if (userType === 'Doctor' || userRole === 'Doctor') {
        navigate('/doctor');
      } else if (
        userType === 'Hospital' ||
        userRole === 'Hospital' ||
        userRole === 'Admin'
      ) {
        navigate('/admin');
      } else {
        toast.error('Unknown user type or role');
      }

      toast.success('Login successful!');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      if (errorMsg.includes('email')) {
        setErrors({ ...errors, email: errorMsg });
      } else if (errorMsg.includes('password')) {
        setErrors({ ...errors, password: errorMsg });
      } else if (errorMsg.includes('verify your email')) {
        setErrors({ ...errors, email: errorMsg });
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500">
            Enter your email and password to access your dashboard
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                required
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
            className="w-full bg-black text-white py-2 rounded-md shadow hover:bg-gray-800 transition duration-200 text-sm font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center">
          Don’t have an account?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;