import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorPortal from './pages/doctor/DoctorPortal';
import NoPage from './pages/NoPage'
import Navbar from './components/Navbar';
import Recording from './pages/patient/Recording';
import Transcribing from './pages/patient/Transcribing';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        {/* <Route path='/patientsChat' element={<ChatStart />} /> */}
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path="/record" element={<Recording />} />
        <Route path="/transcribing" element={<Transcribing />} />
        <Route path='*' element={<NoPage />} />
      
      </Routes>

      <Navbar />
    </BrowserRouter>   
  )
}

export default App
