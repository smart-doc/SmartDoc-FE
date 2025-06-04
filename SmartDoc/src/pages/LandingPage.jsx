import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  const panelVariants = {
    hidden: { y: '100%' },
    visible: { y: '5%' }, // Slide to bottom half
    exit: { y: '100%' },
  };

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
            Have an account? <span className="font-semibold underline cursor-pointer">Login instead</span>
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
            className="absolute bottom-0 w-full h-1/2 bg-white rounded-t-2xl shadow-lg px-6 py-8 z-10"
          >
            <h1>Create an account</h1>
            <p onClick={toPatientsSignUp} className='cursor-pointer text-blue-300'>Sign up as a User</p>
            <p onClick={toHospitalSignUp} className='cursor-pointer text-blue-300'>Sign up as a doctor</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
