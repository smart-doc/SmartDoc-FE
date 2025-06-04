import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";


const DoctorPortal = () => {
  const [tab, setTab] = useState("new");

  const tabs = [
    { label: "New cases", value: "new" },
    { label: "Reviewed", value: "reviewed" },
    { label: "Follow-ups", value: "followups" },
  ];

  const cases = [
    {
      name: "Chijioke Kelechi",
      gender: "Male",
      age: 23,
      status: "Pending review",
      time: "2 hours ago",
      notes:
        "23-year-old patient with acute-onset headache, feverish feeling, and vomiting episodes; likely he caught catarrh. One episode of vomiting post-medication update. Reports fatigue and slight dehydration. Took paracetamol once. No comorbidities. Suspected influenza or viral syndrome.",
    },

    {
      name: "Chijioke Kelechi",
      gender: "Male",
      age: 23,
      status: "Pending review",
      time: "2 hours ago",
      notes:
        "23-year-old patient with acute-onset headache, feverish feeling, and vomiting episodes; likely he caught catarrh. One episode of vomiting post-medication update. Reports fatigue and slight dehydration. Took paracetamol once. No comorbidities. Suspected influenza or viral syndrome.",
    },

    {
      name: "Chijioke Kelechi",
      gender: "Male",
      age: 23,
      status: "Pending review",
      time: "2 hours ago",
      notes:
        "23-year-old patient with acute-onset headache, feverish feeling, and vomiting episodes; likely he caught catarrh. One episode of vomiting post-medication update. Reports fatigue and slight dehydration. Took paracetamol once. No comorbidities. Suspected influenza or viral syndrome.",
    },
  ];


  return (
    <div className="min-h-screen bg-white px-4 pb-20 pt-6 h-screen overflow-hidden" style={{fontFamily: 'PP Neue Montreal'}}>
      <div className="flex items-center mb-6 gap-2">
        <RxAvatar className='text-5xl block' />
        
        <div>
          <h2 className="text-lg font-semibold">Hi, Doc</h2>
          <p className="text-sm text-gray-500">Good to see you back</p>
        </div>
      </div>

      <h1 className="text-xl mb-4 font-bold">Case file</h1>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.value}
            onClick={() => setTab(tabItem.value)}
            className={`pb-2 text-sm font-medium ${
              tab === tabItem.value
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 overflow-y-scroll h-[90%]">
        {cases.map((item, index) => (
          <div key={index} className="p-2">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <span className={`text-xs border ${item.status === "Pending review" ? "border-orange-400 text-orange-400" : "border-green-400 text-green-400"} px-2 py-1 rounded-md`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {item.gender} • {item.age} yrs 
            </p>
            <p className="text-xs text-gray-700 mt-1">{item.notes}</p>
            <p className="text-xs text-gray-500 my-1">{item.time}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorPortal
