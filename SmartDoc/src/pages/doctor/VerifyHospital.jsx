import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyHospital = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/capabilities")
  }


  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-6 py-12">
        <div className="">
            <div className="text-sm font-medium mb-2">Step 2 of 4</div>
            <h2 className="text-xl font-semibold text-black mb-1 mt-4">Help us verify your hospital</h2>
            <p className="text-sm text-gray-500 mb-6">Provide your official registration details so we can confirm your hospital’s credibility</p>

            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration number</label>
                <input type="text" placeholder="Enter your registration number" className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website <span>(optional)</span></label>
                <input type="text" placeholder="Enter your hospital website address if you have one" className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
        </div>
    </div>

    <button type="submit" className="w-full bg-black text-white p-2 rounded-sm text-sm hover:bg-gray-800 transition mb-4">Continue</button>
    </form>
  )
}

export default VerifyHospital
