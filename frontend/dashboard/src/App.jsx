// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Clinics from './pages/Clinics';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Bookings from './pages/Bookings';
import Appointments from './pages/Appointments'; // Import new page components
import Medicine from './pages/Medicine';
import ChronicDiseases from './pages/ChronicDiseases';
import PatientMedicine from './pages/PatientMedicine';

const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Hospital Management System</h1>} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/appointments" element={<Appointments />} /> {/* New route */}
        <Route path="/medicine" element={<Medicine />} /> {/* New route */}
        <Route path="/chronic-diseases" element={<ChronicDiseases />} /> {/* New route */}
        <Route path="/patient-medicine" element={<PatientMedicine />} /> {/* New route */}
      </Routes>
    </DashboardLayout>
  );
};

export default App;
