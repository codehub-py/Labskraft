import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const TeamleaderDashboard: React.FC = () => {
  const { user } = useAuth();
  const candidates = [
    { id: '1', name: 'John Doe', progress: 75 },
    { id: '2', name: 'Jane Smith', progress: 60 },
    { id: '3', name: 'Bob Johnson', progress: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Team Leader Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Team Leader Profile</h2>
            <p>Login ID: {user?.id}</p>
            <p>Name: {user?.name}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Candidates Under Team</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b">
                    <td className="p-2">{candidate.name}</td>
                    <td className="p-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${candidate.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{candidate.progress}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamleaderDashboard;

