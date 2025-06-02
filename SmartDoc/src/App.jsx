import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorPortal from './pages/doctor/DoctorPortal';
import NoPage from './pages/NoPage'
import Navbar from './components/Navbar';
import ChatStart from './pages/patient/ChatStart';
import SummarySent from './pages/patient/SummarySent';
import Recording from './pages/patient/Recording';
import Transcribing from './pages/patient/Transcribing';
import ConfirmTranscription from "./pages/patient/ConfirmTransciption";
import CreateAccount from './pages/patient/CreateAccount';
import VerifyEmail from './pages/patient/VerifyEmail';
import PersonalInfo from './pages/patient/PersonalInfo';
import OnboardingForm from './pages/patient/ContactFrom';
import EmergencyForm from './pages/patient/EmergencyForm';
import HealthProfile from './pages/patient/HealthProfile';
import SuccessfulPage from './pages/patient/SuccessfulPage';
import FollowUpChat from './pages/patient/FollowUpChat';
import NewChat from './pages/patient/NewChat';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateAccount />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/personal-info' element={<PersonalInfo />} />
        <Route path='/onboarding' element={<OnboardingForm />} />
        <Route path="/emergency" element={<EmergencyForm />} />
        <Route path='/healthProfiile' element={<HealthProfile />} />
        <Route path='/success' element={<SuccessfulPage />} />
        <Route path="/patients" element={<PatientDashboard />} />
        <Route path='/follow' element={<FollowUpChat />} />
        <Route path='/patientsChat' element={<NewChat />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path='/summarySent' element={<SummarySent />} />
        <Route path="/record" element={<Recording />} />
        <Route path="/transcribing" element={<Transcribing />} />
        <Route path="/confirm" element={<ConfirmTranscription />} />
        <Route path='*' element={<NoPage />} />
      
      </Routes>

      <Navbar />
    </BrowserRouter>   
  )
}

export default App
