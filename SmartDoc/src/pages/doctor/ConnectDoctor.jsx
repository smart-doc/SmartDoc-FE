import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectDoctor = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/successPage")
  }
  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col items-center justify-between bg-white px-4 py-10">
      <div className="max-w-md w-full space-y-12">
        <div>
          <div className='flex justify-between'>
            <p className="text-sm text-gray-700 font-bold">Step 4 of 4</p>
            <p className="text-sm text-blue-700 font-medium">Skip</p>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">Connect your doctors</h2>
          <p className="text-sm text-gray-500 mt-1">You can invite doctors now or skip for later. Adding doctors allows them to receive case summaries from us</p>
        </div>

        <div>
          <p className='my-2 text-sm'>Upload a document with your doctor’s details to begin </p>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <div className="text-gray-500 mb-2">Click to upload a .csv or .xlsx file</div>
            <div className="text-xs text-gray-400 mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</div>
            <button className="text-sm border-2 border-black px-4 py-2 rounded-md hover:bg-black hover:text-white">
              Get an invite link
            </button>
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
  )
}

export default ConnectDoctor
