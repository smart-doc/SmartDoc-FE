import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
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
  const location = useLocation();
  const { signIn, getUserByEmail, resendOtp } = useAuth();

  // Handle query parameters for prefilled email and verified status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get('email') || '';
    const verified = params.get('verified') === 'true';

    if (emailFromQuery) {
      setFormData((prev) => ({ ...prev, email: emailFromQuery }));
    }
    if (verified) {
      toast.success('Email verified successfully! Please enter your password to sign in.');
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleEmailVerification = async (email) => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      const user = await getUserByEmail(email);
      localStorage.setItem('email', email);

      if (user && user.type) {
        const userType = user.type.toLowerCase();
        localStorage.setItem('email', email);
        // Trigger OTP resend
        await resendOtp(email);

        switch (userType) {
          case 'doctor':
            navigate('/doctorVerifyOtp', {
              state: { email, userType: 'Doctor' },
              replace: true,
            });
            break;
          case 'hospital':
            navigate('/hospitalSignUpStep2', {
              state: { email, userType: 'Hospital' },
              replace: true,
            });
            break;
          case 'patient':
            navigate('/patientSignUpStep2', {
              state: { email, userType: 'Patient' },
              replace: true,
            });
            break;
          default:
            toast.error('Unknown user type');
            break;
        }
      } else {
        toast.error('User not found');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch user information');
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Check email verification status first
      
      const user = await getUserByEmail(formData.email);
      if (!user.emailVerified) {
        setErrors({
          email: {
            message: 'You have not verified your email. Kindly click here to verify your email.',
            needsVerification: true,
          },
        });
        return;
      }

      // Proceed with sign-in
      const profileUser = await signIn(formData.email, formData.password);

      toast.success('Login successful!');

      const userType = profileUser.type;
      const userRole = profileUser.role?.name;

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
        if (errorMsg.includes('verify your email')) {
          setErrors({
            email: {
              message: errorMsg,
              needsVerification: true,
            },
          });
        } else {
          setErrors({ email: errorMsg });
        }
      } else if (errorMsg.includes('password')) {
        setErrors({ password: errorMsg });
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
              <div className="text-red-500 text-xs mt-1">
                {typeof errors.email === 'object' && errors.email.needsVerification ? (
                  <span>
                    {errors.email.message.split('Kindly click here')[0]}
                    <button
                      type="button"
                      onClick={() => handleEmailVerification(formData.email)}
                      className="text-blue-600 hover:underline cursor-pointer ml-1"
                    >
                      click here to verify your email
                    </button>
                  </span>
                ) : (
                  <span>{typeof errors.email === 'string' ? errors.email : errors.email.message}</span>
                )}
              </div>
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