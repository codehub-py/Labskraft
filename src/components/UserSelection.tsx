import React from 'react';
import { Link } from 'react-router-dom';

const UserSelection: React.FC = () => {
  const roles = [
    {
      type: 'candidate',
      title: 'Candidate',
      description: 'Access learning resources',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      type: 'trainer',
      title: 'Trainer',
      description: 'Team and resource management',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'green'
    },
    {
      type: 'admin',
      title: 'Administrator',
      description: 'System control and management',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'blue'
    }
    
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to Labskraft
          </h1>
          <p className="text-gray-600 text-lg">
            Select your role to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Link
              key={role.type}
              to={`/login/${role.type}`}
              className={`
                relative bg-white rounded-2xl p-6
                border border-gray-100
                transform transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                group overflow-hidden
              `}
            >
              {/* Background Gradient Overlay */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-br from-${role.color}-50/50 to-transparent
                transition-opacity duration-300
              `} />

              {/* Content */}
              <div className="relative">
                <div className={`
                  w-14 h-14 rounded-2xl
                  bg-${role.color}-50 
                  flex items-center justify-center 
                  text-${role.color}-600
                  mb-5 group-hover:scale-110
                  transition duration-300
                `}>
                  {role.icon}
                </div>

                <h2 className={`
                  text-xl font-semibold mb-2
                  text-gray-900 group-hover:text-${role.color}-600
                  transition-colors duration-300
                `}>
                  {role.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {role.description}
                </p>

                <div className={`
                  inline-flex items-center text-sm font-medium
                  text-${role.color}-600
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  transform translate-y-2 group-hover:translate-y-0
                `}>
                  Continue as {role.title}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Labskraft. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;

