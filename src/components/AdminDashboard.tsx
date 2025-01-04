import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState(['Team A', 'Team B', 'Team C']);
  const [newTeam, setNewTeam] = useState('');

  const addTeam = () => {
    if (newTeam) {
      setTeams([...teams, newTeam]);
      setNewTeam('');
    }
  };

  const removeTeam = (teamToRemove: string) => {
    setTeams(teams.filter(team => team !== teamToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Admin Profile</h2>
            <p>Login ID: {user?.id}</p>
            <p>Name: {user?.name}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Team Management</h2>
            <ul className="mb-4">
              {teams.map((team, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{team}</span>
                  <button
                    onClick={() => removeTeam(team)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex">
              <input
                type="text"
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                placeholder="New team name"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addTeam}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

