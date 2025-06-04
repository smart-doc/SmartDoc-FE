import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import { RiHospitalLine } from "react-icons/ri";



const LandingPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  const panelVariants = {
    hidden: { y: '100%' },
    visible: { y: '5%' }, // Slide to bottom half
    exit: { y: '100%' },
  };

  const toLogin = () => {
    navigate("/login")
  }

  const toPatientsSignUp = () => {
    navigate("/create")
  }

  const toHospitalSignUp = () => {
    navigate("/HospitalAccount")
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ fontFamily: 'PP Neue Montreal' }}>
      {/* Landing Page Background */}
      <div className={`h-full w-full absolute inset-0 flex flex-col justify-between items-center px-4 bg-white transition-all duration-300 ${showOnboarding ? 'blur-sm' : ''}`}>
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="flex gap-2 items-center justify-center mb-2">
            <img src={Logo} alt="Logo" className="h-10" />
            <p className="font-extrabold text-4xl">SmartDoc</p>
          </div>
          <p className="text-center text-sm text-gray-600">Turning conversations into consultations</p>
        </div>

        <div className="w-full pb-8">
          <button
            className="w-full bg-black rounded-md text-white py-2 text-center"
            onClick={() => setShowOnboarding(true)}
          >
            Get Started
          </button>
          <p className="text-center text-sm mt-4 text-gray-700">
            Have an account? <span onClick={toLogin} className="font-semibold underline cursor-pointer">Login instead</span>
          </p>
        </div>
      </div>

      {/* Onboarding Half-Screen Slide-In */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            key="onboarding"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ duration: 1 }}
            className="absolute bottom-0 w-full h-1/2 bg-white rounded-t-5xl shadow-lg px-6 py-8 z-10"
          >
            <h1 className='text-xl font-semibold'>Create an account</h1>
            <div className='flex flex-col gap-2 mt-3'>
              <div onClick={toPatientsSignUp} className='cursor-pointer text-black flex items-center gap-3'>
                <GoPerson className='block' />
                <div className='flex flex-col '>
                  <p className='font-semibold text-xl'>Patient</p>
                  <p>I want to get care from doctors fast</p>
                </div>
              </div>
              <hr />
              <div onClick={toHospitalSignUp} className='cursor-pointer text-black flex items-center gap-3'>
                <RiHospitalLine className='block' />
                <div className='flex flex-col '>
                  <p className='font-semibold text-xl'>Hospital</p>
                  <p>I want to manage and maximize our staff strength</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
