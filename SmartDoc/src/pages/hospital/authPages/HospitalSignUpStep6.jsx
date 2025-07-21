import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const HospitalSignUpStep6 = () => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ['text/csv', 'application/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type) &&
      file.size <= 10 * 1024 * 1024
    ) {
      setDocument(file);
      setError('');
      setUploadSuccess(false); // Reset success state on new file selection
    } else {
      const errorMsg = file.size > 10 * 1024 * 1024 ? 'File size must be 10MB or less' : 'Please upload a .csv or .xlsx file';
      setError(errorMsg);
      toast.error(errorMsg);
      setDocument(null);
      setUploadSuccess(false);
    }
  };

  const handleRemoveFile = () => {
    setDocument(null);
    setError('');
    setUploadSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);
    setUploadSuccess(false);

    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');

    if (!hospitalData.specialties || !Array.isArray(hospitalData.specialties) || hospitalData.specialties.length === 0) {
      const errorMsg = 'Specialties must be a non-empty array';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(hospitalData).forEach((key) => {
      if (key === 'specialties') {
        formData.append(key, JSON.stringify(hospitalData[key]));
      } else if (key === 'accreditation') {
        formData.append('accreditation', hospitalData[key]);
      } else if (Array.isArray(hospitalData[key])) {
        hospitalData[key].forEach((item) => formData.append(`${key}[]`, typeof item === 'object' ? JSON.stringify(item) : item));
      } else {
        formData.append(key, hospitalData[key]);
      }
    });

    if (document) {
      formData.append('document', document);
    }

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`FormData: ${key} = ${value}`);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://smartdoc-4fo9.onrender.com/api/v1/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 15000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setUploadSuccess(true);
      toast.success('Profile updated successfully! Doctors will receive account details via email.');
      localStorage.removeItem('hospitalData');
      setTimeout(() => navigate('/hospitalSuccessPage'), 1000); // Delay navigation for better UX
    } catch (error) {
      console.error('API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMsg = error.response?.data?.error || 'Failed to update profile';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = async () => {
    setError('');
    setIsUploading(true);

    const hospitalData = JSON.parse(localStorage.getItem('hospitalData') || '{}');

    if (!hospitalData.specialties || !Array.isArray(hospitalData.specialties) || hospitalData.specialties.length === 0) {
      const errorMsg = 'Specialties must be a non-empty array';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(hospitalData).forEach((key) => {
      if (key === 'specialties') {
        formData.append(key, JSON.stringify(hospitalData[key]));
      } else if (key === 'accreditation') {
        formData.append('accreditation', hospitalData[key]);
      } else if (Array.isArray(hospitalData[key])) {
        hospitalData[key].forEach((item) => formData.append(`${key}[]`, typeof item === 'object' ? JSON.stringify(item) : item));
      } else {
        formData.append(key, hospitalData[key]);
      }
    });

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`FormData: ${key} = ${value}`);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://smartdoc-4fo9.onrender.com/api/v1/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 15000,
        }
      );

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      toast.success('Profile updated successfully!');
      localStorage.removeItem('hospitalData');
      setTimeout(() => navigate('/hospitalSuccessPage'), 1000);
    } catch (error) {
      console.error('API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMsg = error.response?.data?.error || 'Failed to update profile';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col justify-between bg-white px-4 py-10 ml-5 mr-5 mt-10"
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
            them to receive case summaries from us.
          </p>
        </div>

        <div>
          <p className="my-2 text-sm font-medium text-gray-700">
            Upload a document with your doctor’s details to begin
          </p>
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Guidelines for uploading doctor's Excel sheet
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>
                The Excel sheet must contain exactly 4 columns, all in lowercase:{' '}
                <code className="font-mono text-gray-800">firstName</code>,{' '}
                <code className="font-mono text-gray-800">lastName</code>,{' '}
                <code className="font-mono text-gray-800">email</code>,{' '}
                <code className="font-mono text-gray-800">specialization</code>.
              </li>
              <li>
                Each doctor’s details must include a valid email address. Invalid
                or missing emails will prevent doctors from verifying their
                accounts.
              </li>
              <li>
                All four columns must be complete for each doctor. Incomplete rows
                will be skipped during processing.
              </li>
            </ul>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <label htmlFor="file-upload" className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <div className="text-gray-500 mb-2">
                {isUploading ? 'Uploading...' : 'Click to upload a .csv or .xlsx file'}
              </div>
              <div className="text-xs text-gray-400 mb-4">
                Max size: 10MB
              </div>
              <button
                type="button"
                className={`text-sm border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
              </button>
            </label>
            {document && !isUploading && !uploadSuccess && (
              <div className="mt-2 text-sm text-gray-600 flex items-center justify-center space-x-2">
                <p>Selected file: {document.name}</p>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            )}
            {isUploading && (
              <div className="mt-2 text-sm text-gray-600 flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading file...
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-2 text-sm text-green-600 flex items-center justify-center">
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                File uploaded successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full max-w-md bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isUploading}
      >
        {isUploading ? 'Submitting...' : 'Continue'}
      </button>
    </form>
  );
};

export default HospitalSignUpStep6;