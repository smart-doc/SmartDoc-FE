import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorPortal from './pages/doctor/DoctorPortal';
import NoPage from './pages/NoPage'
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path='*' element={<NoPage />} />
      </Routes>

      <Navbar />
    </BrowserRouter>   
  )
}

export default App
