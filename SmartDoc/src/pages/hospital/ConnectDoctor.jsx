// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ConnectDoctor = () => {
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/successPage")
//   }
//   return (
//     <form onSubmit={handleSubmit} className="min-h-screen flex flex-col items-center justify-between bg-white px-4 py-10">
//       <div className="max-w-md w-full space-y-12">
//         <div>
//           <div className='flex justify-between'>
//             <p className="text-sm text-gray-700 font-bold">Step 4 of 4</p>
//             <p className="text-sm text-blue-700 font-medium">Skip</p>
//           </div>
//           <h2 className="text-2xl font-semibold text-gray-900 mt-2">Connect your doctors</h2>
//           <p className="text-sm text-gray-500 mt-1">You can invite doctors now or skip for later. Adding doctors allows them to receive case summaries from us</p>
//         </div>

//         <div>
//           <p className='my-2 text-sm'>Upload a document with your doctor’s details to begin </p>
//           <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
//             <div className="text-gray-500 mb-2">Click to upload a .csv or .xlsx file</div>
//             <div className="text-xs text-gray-400 mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</div>
//             <button className="text-sm border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white">
//               Get an invite link
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200 cursor-pointer"
//         >
//           Continue
//         </button>
//     </form>
//   )
// }

// export default ConnectDoctor

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ConnectDoctor = () => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)) {
      setDocument(file);
      setError('');
    } else {
      setError('Please upload a .csv or .xlsx file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');
    const formData = new FormData();

    // Append all hospital data fields
    Object.keys(hospitalData).forEach((key) => {
      if (Array.isArray(hospitalData[key])) {
        formData.append(key, JSON.stringify(hospitalData[key])); // Stringify arrays
      } else {
        formData.append(key, hospitalData[key]);
      }
    });

    // Append document if present
    if (document) {
      formData.append('document', document);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Profile updated successfully!');
      localStorage.removeItem('hospitalData'); // Clean up
      navigate('/success');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update profile';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleSkip = () => {
    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');
    const formData = new FormData();

    Object.keys(hospitalData).forEach((key) => {
      if (Array.isArray(hospitalData[key])) {
        formData.append(key, JSON.stringify(hospitalData[key]));
      } else {
        formData.append(key, hospitalData[key]);
      }
    });

    axios
      .put(
        'https://smartdoc-p1ca.onrender.com/api/v1/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(() => {
        toast.success('Profile updated successfully!');
        localStorage.removeItem('hospitalData');
        navigate('/success');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || 'Failed to update profile';
        setError(errorMsg);
        toast.error(errorMsg);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-between bg-white px-4 py-10"
    >
      <div className="max-w-md w-full space-y-12">
        <div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-700 font-bold">Step 4 of 4</p>
            <p
              className="text-sm text-blue-700 font-medium cursor-pointer"
              onClick={handleSkip}
            >
              Skip
            </p>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            Connect your doctors
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            You can invite doctors now or skip for later. Adding doctors allows
            them to receive case summaries from us
          </p>
        </div>

        <div>
          <p className="my-2 text-sm">
            Upload a document with your doctor’s details to begin
          </p>
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-500 mb-2">
                Click to upload a .csv or .xlsx file
              </div>
              <div className="text-xs text-gray-400 mb-4">
                Max size: 5MB
              </div>
              <button
                type="button"
                className="text-sm border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white"
              >
                Get an invite link
              </button>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200 cursor-pointer"
      >
        Continue
      </button>
    </form>
  );
};

export default ConnectDoctor;
