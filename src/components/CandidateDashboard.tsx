import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Candidate Profile</h2>
            <p>Login ID: {user?.id}</p>
            <p>Name: {user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

