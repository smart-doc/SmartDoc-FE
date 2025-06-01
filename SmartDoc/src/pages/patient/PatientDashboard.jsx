import React, {useState} from 'react'
import { RxAvatar } from "react-icons/rx";
import { HiSparkles } from "react-icons/hi";
import heroImage from "../../assets/humanhealth.png"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink } from 'react-router-dom';


const PatientDashboard = () => {
  const [activities, setActivities] = useState([
    {aName: "Fever and epigastric pain", aTime: "30 minutes", aState: "In review"},
    {aName: "Fever and epigastric pain", aTime: "30 minutes", aState: "In review"},
    {aName: "Fever and epigastric pain", aTime: "12-0202025 . 12:18 am", aState: "Pending response"},
    {aName: "Fever and epigastric pain", aTime: "12-0202025 . 12:18 am", aState: "Pending response"},
  ]);


  const [showAll, setShowAll] = useState(false);
  
  const visibleActivities = showAll ? activities : activities.slice(0, 3);

  return (
    <div className='px-6 py-8 flex flex-col gap-4 overflow-hidden h-screen mb-6' style={{ fontFamily: 'PP Neue Montreal' }}>
      <header className='flex gap-3 items-center'>
        <RxAvatar className='text-5xl block' />

        <div>
          <h1 className='text-xl font-bold'>Hi Kelechi</h1>
          <p>How are you doing today?</p>
        </div>
      </header>

      <section className='flex bg-[#fbfbfb] p-3 rounded-md mt-5 justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold'>Smart health check</h1>
          <p>Tell us how you feel in your own words or voice</p>

            <NavLink to="/patientsChat" className='flex gap-2 items-center bg-black w-fit text-white p-3 rounded-md cursor-pointer mt-3'>
              <p>Start now</p>
              <HiSparkles className='block' />
            </NavLink>
        </div>

        <img src={heroImage} alt="Hero" />
      </section>

      <section>
        <h1 className='text-2xl font-bold'>Latest activity</h1>

        <div className='bg-[#fbfbfb] p-3 flex flex-col gap-3 text-sm rounded-sm overflow-y-scroll h-[90%]'>
          {visibleActivities.map((activity, index) => (
            <div key={index} className='w-full bg-[#fbfbfb] p-2'>
              <div className='flex justify-between'>
                <div>
                  <h2 className='font-bold'>{activity.aName}</h2>
                  <p>{activity.aTime}</p>
                </div>

                <p className={`p-1 border-2 ${activity.aState === "In review" ? "border-green-500" : "border-orange-500"} rounded-md text-sm h-fit`}>{activity.aState}</p>
              </div>

              <p>View full summary</p>

              <hr />
            </div>
          ))}          

          {activities.length > 3 && 
          <div className='flex gap-3 items-center cursor-pointer mx-auto w-fit' onClick={() => setShowAll(!showAll)}>
            <p>{showAll?  'View less' : 'View more'}</p> 
            {showAll? <IoIosArrowUp className='block' /> : <IoIosArrowDown className='block' />}
          </div>
          }
        </div>
      </section>
    </div>
  )
}

export default PatientDashboard
