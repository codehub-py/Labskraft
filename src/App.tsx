import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './components/AdminDashboard';
import TeamleaderDashboard from './components/TeamleaderDashboard';
import CandidateDashboard from './components/CandidateDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<UserSelection />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/teamleader-dashboard" element={<TeamleaderDashboard />} />
            <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

