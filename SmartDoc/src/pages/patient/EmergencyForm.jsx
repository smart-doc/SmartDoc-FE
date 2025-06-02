import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/healthProfiile")
    }
    
  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col justify-between bg-white px-6 py-12">
        <div className="">
            <div className="text-right text-sm font-medium mb-2">Step 3 of 4</div>
            <h2 className="text-xl font-semibold text-center text-black mb-1">In case of an emergency</h2>
            <p className="text-sm text-center text-gray-500 mb-6">Let us know who to reach out to when you need urgent help</p>

            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency contact name</label>
                <input type="text" placeholder="Enter full name" className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency phone number</label>
                <input type="text" placeholder="Enter emergency phone number" className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to you</label>
                <select
                className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                <option disabled selected>Select relationship</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Sibling</option>
                <option>Other</option>
                </select>
            </div>
        </div>
    </div>

    <button type="submit" className="w-full bg-black text-white p-2 rounded-sm text-sm hover:bg-gray-800 transition mb-4">Continue</button>
    </form>
  )
}

export default EmergencyForm
