import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientSignUpStep1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '',
    // phoneNumber: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://smartdoc-4fo9.onrender.com/api/v1/auth/register/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: 'temp', 
          lastName: 'temp',
          // phoneNumber: '01000100000',
          dateOfBirth: '2000-01-01',
          gender: 'Other',
          address: 'temp',
          city: 'temp',
          state: 'Lagos',
          emergencyContactName: 'temp',
          emergencyContactPhoneNumber: '00000000000',
          emergencyContactRelationship: 'Other',
          bloodGroup: 'O+',
          height_CM: '170',
          weight_KG: '70',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMessage = data.error || data.message || 'Registration failed';
        if (typeof errorMessage === 'string') {
          if (errorMessage.toLowerCase().includes('email')) {
            setErrors({ email: errorMessage });
          } else if (errorMessage.toLowerCase().includes('password')) {
            setErrors({ password: errorMessage });
          } else {
            setErrors({ general: errorMessage });
          }
        } else if (typeof errorMessage === 'object') {
          setErrors(errorMessage);
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data.token || !data.user?._id) {
        setErrors({ general: 'Invalid response from server. Missing token or user ID.' });
        setLoading(false);
        return;
      }

      const registrationData = {
        account: {
          email: form.email,
          // phoneNumber: form.phoneNumber,
          password: form.password,
          token: data.token,
          userId: data.user._id,
        },
      };

      try {
        localStorage.setItem('formData', JSON.stringify(registrationData));
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('localStorage error:', error);
        setErrors({ general: 'Failed to save data locally. Please try again.' });
        setLoading(false);
        return;
      }

      navigate('/patientSignUpStep2');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-4 py-12">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-center">Create an account</h2>
        <p className="text-sm text-gray-500 mb-8 text-center">Enter your information to get started</p>
        
        {errors.general && <div className="text-red-500 text-sm mb-4 text-center">{errors.general}</div>}

        <label className="text-md font-medium" htmlFor="email">Email</label>
        {errors.email && <div className="text-red-500 text-sm mb-1">{errors.email}</div>}
        <input
          value={form.email}
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          className={`mt-1 mb-3 w-full border rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          required
        />

        {/* <label className="text-md font-medium" htmlFor="phoneNumber">PhoneNumber</label>
        {errors.phoneNumber && <div className="text-red-500 text-sm mb-1">{errors.phoneNumber}</div>}
        <input
          value={form.phoneNumber}
          onChange={handleChange}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your phone number"
          className={`mt-1 mb-3 w-full border rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          required
        /> */}

        <label className="text-md font-medium">Password</label>
        {errors.password && <div className="text-red-500 text-sm mb-1">{errors.password}</div>}
        <div className="relative">
          <input
            value={form.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`mt-1 w-full border rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full py-2 rounded mt-8 ${loading ? 'bg-gray-400' : 'bg-black'} text-white`}
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
};

export default PatientSignUpStep1;