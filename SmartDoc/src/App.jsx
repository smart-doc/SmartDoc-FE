import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import DoctorPortal from './pages/DoctorPortal';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorPortal />} />
      </Routes>
    </BrowserRouter>   
  )
}

export default App
