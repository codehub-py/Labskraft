import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const CandidateDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.id) {
        try {
          // Replace with your actual API endpoint
          const response = await fetch(`/api/candidates/${user.id}`);
          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Candidate Profile</h2>
            <p>Login ID: {profileData?.id || user?.id}</p>
            <p>Name: {profileData?.name || user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

