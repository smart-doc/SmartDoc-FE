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
import CreateAccount from './pages/CreateAccount';
import VerifyEmail from './pages/VerifyEmail';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateAccount />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path="/patients" element={<PatientDashboard />} />
        <Route path='/patientsChat' element={<ChatStart />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path='/summarySent' element={<SummarySent />} />
        <Route path="/record" element={<Recording />} />
        <Route path="/transcribing" element={<Transcribing />} />
        <Route path='*' element={<NoPage />} />
      
      </Routes>

      <Navbar />
    </BrowserRouter>   
  )
}

export default App
