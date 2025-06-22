import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalSignUpStep1 from './pages/hospital/authPages/HospitalSignUpStep1';
import HospitalSignUpStep2 from './pages/hospital/authPages/HospitalSignUpStep2';
import HospitalSignUpStep3 from './pages/hospital/authPages/HospitalSignUpStep3';
import HospitalSignUpStep4 from './pages/hospital/authPages/HospitalSignUpStep4';
import HospitalSignUpStep5 from './pages/hospital/authPages/HospitalSignUpStep5';
import HospitalSignUpStep6 from './pages/hospital/authPages/HospitalSignUpStep6';
import HospitalSuccessPage from './pages/hospital/authPages/HospitalSuccessPage';

import PatientSignUpStep1 from './pages/patient/authPages/PatientSignUpStep1';
import PatientSignUpStep2 from './pages/patient/authPages/PatientSignUpStep2';
import PatientSignUpStep3 from './pages/patient/authPages/PatientSignUpStep3';
import PatientSignUpStep4 from './pages/patient/authPages/PatientSignUpStep4';
import PatientSignUpStep5 from './pages/patient/authPages/PatientSignUpStep5';
import PatientSignUpStep6 from './pages/patient/authPages/PatientSignUpStep6';  
import PatientSuccessPage from './pages/patient/authPages/PatientSuccessPage';

import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorPortal from './pages/doctor/DoctorPortal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoPage from './pages/NoPage'
import Navbar from './components/Navbar';
import SummarySent from './pages/patient/SummarySent';
import Recording from './pages/patient/Recording';
import Transcribing from './pages/patient/Transcribing';
import ConfirmTranscription from "./pages/patient/ConfirmTransciption";
import FollowUpChat from './pages/patient/FollowUpChat';
import NewChat from './pages/patient/NewChat';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from "./context/AuthContext";
import SetUpAxiosInterceptors from "./utils/AxiosConfig";
import { useEffect } from "react";
import Login from './pages/Login';
import Chat from './components/Chat';
import ProtectRoute from './components/ProtectRoute';


export default function App() {

  useEffect(() => {
    SetUpAxiosInterceptors();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/patientSignUpStep1' element={<PatientSignUpStep1/>} />
          <Route path='/patientSignUpStep2' element={<PatientSignUpStep2/>}/>
          <Route path='/patientSignUpStep3' element={<PatientSignUpStep3/>} />
          <Route path='/patientSignUpStep4' element={<PatientSignUpStep4/>} />
          <Route path='/patientSignUpStep5' element={<PatientSignUpStep5/>} />
          <Route path='/patientSignUpStep6' element={<PatientSignUpStep6/>} />
          <Route path='/patientSuccessPage' element={<PatientSuccessPage/>} />

          <Route path='/hospitalSignUpStep1' element={<HospitalSignUpStep1/>}/>
          <Route path='/hospitalSignUpStep2' element={<HospitalSignUpStep2/>}/>
          <Route path='/hospitalSignUpStep3' element={<HospitalSignUpStep3/>}/>
          <Route path="/hospitalSignUpStep4" element={<HospitalSignUpStep4/>}/>
          <Route path='/hospitalSignUpStep5' element={<HospitalSignUpStep5/>}/>
          <Route path='/hospitalSignUpStep6' element={<HospitalSignUpStep6/>}/>
          <Route path='/hospitalSuccessPage' element={<HospitalSuccessPage/>}/>

          <Route path='/follow' element={<FollowUpChat />} />
          <Route path='/patientsNewChat' element={<NewChat />} />
          <Route path="/doctor" element={<DoctorPortal />} />
          <Route path="/confirm" element={<ConfirmTranscription />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectRoute />}/>
            <Route path="/patients" element={<PatientDashboard />} />
            <Route path="/patientsChat" element={<Chat />} />
          <Route path='*' element={<NoPage />} />

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  )
}
