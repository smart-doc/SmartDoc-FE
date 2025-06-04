// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PatientDashboard from './pages/patient/PatientDashboard';
// import DoctorPortal from './pages/doctor/DoctorPortal';
// import HospitalAccount from "./pages/doctor/CreateAccount";
// import VerifyHospitalEmail from "./pages/doctor/VerifyEmail"
// import HospitAccountContd from "./pages/doctor/ContinueAccountCreation";
// import VerifyHospital from './pages/doctor/VerifyHospital';
// import UnderstandingCaps from "./pages/doctor/StageFive";
// import ConnectDoctor from './pages/doctor/ConnectDoctor';
// import SuccessPage from "./pages/doctor/SuccessPage"
// import NoPage from './pages/NoPage'
// import Navbar from './components/Navbar';
// import SummarySent from './pages/patient/SummarySent';
// import Recording from './pages/patient/Recording';
// import Transcribing from './pages/patient/Transcribing';
// import ConfirmTranscription from "./pages/patient/ConfirmTransciption";
// import CreateAccount from './pages/patient/CreateAccount';
// import VerifyPatientEmail from './pages/patient/VerifyEmail';
// import PersonalInfo from './pages/patient/PersonalInfo';
// import OnboardingForm from './pages/patient/ContactFrom';
// import EmergencyForm from './pages/patient/EmergencyForm';
// import HealthProfile from './pages/patient/HealthProfile';
// import SuccessfulPage from './pages/patient/SuccessfulPage';
// import FollowUpChat from './pages/patient/FollowUpChat';
// import NewChat from './pages/patient/NewChat';
// import LandingPage from './pages/LandingPage';
// import Account from './pages/patient/Account';
// import { AuthProvider } from "./context/AuthContext";
// // import { useAuth } from "./context/AuthContext";
// // import { ProtectedRoute } from "./pages/admin/ProtectedRoute/ProtectedRoute";
// import SetUpAxiosInterceptors from "./utils/AxiosConfig";
// import { useEffect } from "react";



// export default function App() {

//   useEffect(() => {

//     SetUpAxiosInterceptors();

//   }, []);

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path='/' element={<LandingPage />} />
//             <Route path='/create' element={<Account />} />
//             <Route path="/patients" element={<PatientDashboard />} />
//             <Route path='/follow' element={<FollowUpChat />} />
//             <Route path='/patientsChat' element={<NewChat />} />
//             <Route path="/verifyHospt" element={<VerifyHospital />} />
//             <Route path='/capabilities' element={<UnderstandingCaps />} />
//             <Route path='/HospitalAccount' element={<HospitalAccount />} />
//             <Route path='/connectDoc' element={<ConnectDoctor />} />
//             <Route path="/successPage" element={<SuccessPage />} />
//             <Route path="/doctor" element={
//               // <ProtectedRoute>
//                 <DoctorPortal />
//               // </ProtectedRoute>
//               } />
//             <Route path="/confirm" element={<ConfirmTranscription />} />
//             <Route path='*' element={<NoPage />} />
//           </Routes>
//         </Router>
//       </AuthProvider>

//       {/* <Navbar /> */}
//     </BrowserRouter>
//   )
// }

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorPortal from './pages/doctor/DoctorPortal';
import HospitalAccount from "./pages/doctor/CreateAccount";
import VerifyHospitalEmail from "./pages/doctor/VerifyEmail"
import HospitAccountContd from "./pages/doctor/ContinueAccountCreation";
import VerifyHospital from './pages/doctor/VerifyHospital';
import UnderstandingCaps from "./pages/doctor/StageFive";
import ConnectDoctor from './pages/doctor/ConnectDoctor';
import SuccessPage from "./pages/doctor/SuccessPage"
import NoPage from './pages/NoPage'
import Navbar from './components/Navbar';
import SummarySent from './pages/patient/SummarySent';
import Recording from './pages/patient/Recording';
import Transcribing from './pages/patient/Transcribing';
import ConfirmTranscription from "./pages/patient/ConfirmTransciption";
import CreateAccount from './pages/patient/CreateAccount';
import VerifyPatientEmail from './pages/patient/VerifyEmail';
import PersonalInfo from './pages/patient/PersonalInfo';
import OnboardingForm from './pages/patient/ContactFrom';
import EmergencyForm from './pages/patient/EmergencyForm';
import HealthProfile from './pages/patient/HealthProfile';
import SuccessfulPage from './pages/patient/SuccessfulPage';
import FollowUpChat from './pages/patient/FollowUpChat';
import NewChat from './pages/patient/NewChat';
import LandingPage from './pages/LandingPage';
import Account from './pages/patient/Account';
import { AuthProvider } from "./context/AuthContext";
import SetUpAxiosInterceptors from "./utils/AxiosConfig";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    SetUpAxiosInterceptors();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/create' element={<Account />} />
          <Route path="/patients" element={<PatientDashboard />} />
          <Route path='/follow' element={<FollowUpChat />} />
          <Route path='/patientsChat' element={<NewChat />} />
          <Route path="/verifyHospt" element={<VerifyHospital />} />
          <Route path='/capabilities' element={<UnderstandingCaps />} />
          <Route path='/HospitalAccount' element={<HospitalAccount />} />
          <Route path='/connectDoc' element={<ConnectDoctor />} />
          <Route path="/successPage" element={<SuccessPage />} />
          <Route path="/doctor" element={<DoctorPortal />} />
          <Route path="/confirm" element={<ConfirmTranscription />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

// const NavbarRender = () => {
//   const { state } = useAuth();
//   const user = state.user

//   if (!state.isAuthenticated) return <BasicNavbar />;
//   switch (user.type) {
//     case 'admin': return <AdminNavbar />;
//     case 'buyer': return <BuyerNavbar />;
//     case 'farmer': return <FarmerNavbar />;
//     default: return <BasicNavbar />;
//   }
// };
