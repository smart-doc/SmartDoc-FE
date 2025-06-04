// import React, { useState } from 'react';
// import { FaEyeSlash } from "react-icons/fa6";
// import { FaEye } from "react-icons/fa";

// const HospitalOnboarding = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="max-w-md w-full space-y-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Let’s get your hospital online
//           </h2>
//           <p className="text-sm text-gray-500">
//             Enter your hospital’s details to start your onboarding
//           </p>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Hospital name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your hospital’s name"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <FaEye className={`${showPassword ? 'hidden' : 'block'}`} />
//                 <FaEyeSlash className={`${showPassword ? 'block' : 'hidden'}`} />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-md shadow hover:bg-gray-800 transition duration-200 text-sm font-medium">
//             Create account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HospitalOnboarding;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const HospitalOnboarding = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/auth/register/hospital',
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('hospitalData', JSON.stringify(formData));
      toast.success('Verification OTP sent to your email!');
      navigate('/verify-email');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      if (errorMsg.includes('email')) {
        setErrors({ ...errors, email: errorMsg });
      } else if (errorMsg.includes('Password')) {
        setErrors({ ...errors, password: errorMsg });
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
            Let’s get your hospital online
          </h2>
          <p className="text-sm text-gray-500">
            Enter your hospital’s details to start your onboarding
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hospital name
            </label>
            {errors.hospitalName && (
              <p className="text-red-500 text-xs">{errors.hospitalName}</p>
            )}
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter your hospital’s name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalOnboarding;