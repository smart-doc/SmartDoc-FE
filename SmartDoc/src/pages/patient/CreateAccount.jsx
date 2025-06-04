import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const CreateAccount = ({ onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://smartdoc-p1ca.onrender.com/api/v1/auth/register/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: 'temp',
          lastName: 'temp',
          phoneNumber: '00000000000',
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
          weight_KG: '70'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          if (data.error.includes('email')) {
            setErrors(prev => ({ ...prev, email: data.error }));
          } else if (data.error.includes('Password')) {
            setErrors(prev => ({ ...prev, password: data.error }));
          } else {
            setErrors(prev => ({ ...prev, general: data.error }));
          }
        }
        return;
      }

      const registrationData = {
        ...form,
        token: data.token,
        userId: data.user._id
      };

      localStorage.setItem("userData", JSON.stringify(registrationData));
      localStorage.setItem("token", data.token);
      
      console.log('Token stored successfully:', data.token ? 'Yes' : 'No');

      onNext(registrationData);
    } catch (error) {
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
          className={`w-full border p-2 mb-4 rounded ${errors.email ? 'border-red-500' : ''}`}
          required
        />

        <label className="block text-sm font-medium text-gray-700">Password</label>
        {errors.password && <div className="text-red-500 text-sm mb-1">{errors.password}</div>}
        <div className="relative">
          <input
            value={form.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`mt-1 block w-full border rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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

export default CreateAccount;
