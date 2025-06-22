import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from './../context/AuthContext'; // Use AuthContext instead of direct axios
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const user = await signIn(formData.email, formData.password);
      
      toast.success('Login successful!');
      
      const userType = user.type;
      const userRole = user.role?.name;

      if (userType === 'Patient' || userRole === 'Patient') {
        navigate('/patients', { replace: true });
      } else if (userType === 'Doctor' || userRole === 'Doctor') {
        navigate('/doctor', { replace: true });
      } else if (
        userType === 'Hospital' ||
        userRole === 'Hospital' ||
        userRole === 'Admin'
      ) {
        navigate('/admin', { replace: true });
      } else {
        toast.error('Unknown user type or role');
        navigate('/patients', { replace: true });
      }
    } catch (error) {
      const errorMsg = error.message;
      
      // Handle specific error types
      if (errorMsg.includes('email')) {
        setErrors({ email: errorMsg });
      } else if (errorMsg.includes('password')) {
        setErrors({ password: errorMsg });
      } else if (errorMsg.includes('verify your email')) {
        setErrors({ email: errorMsg });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
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
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                <FaEye className={`${showPassword ? 'hidden' : 'block'}`} />
                <FaEyeSlash className={`${showPassword ? 'block' : 'hidden'}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md shadow hover:bg-gray-800 transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center">
          Don't have an account?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;