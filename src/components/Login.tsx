import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signIn, fetchUserAttributes, AuthError, getCurrentUser, signOut } from '@aws-amplify/auth';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'teamleader' | 'candidate';
  email: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const checkAuthState = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
      
      if (currentUser && userAttributes && userAttributes.sub && userAttributes.email) {
        const userRole = userAttributes['custom:role'];
        if (userRole !== userType) {
          throw new Error('Unauthorized: Invalid user type');
        }

        const user: User = {
          id: userAttributes.sub,
          name: currentUser.username,
          role: userType as 'admin' | 'teamleader' | 'candidate',
          email: userAttributes.email
        };
        
        login(user);
        navigate(`/${userType}-dashboard`);
      }
    } catch (err) {
      try {
        await signOut();
      } catch (signOutError) {
        console.log('Error signing out:', signOutError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userType, login, navigate]);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

      // Sign in with Cognito
      const cognitoUser = await signIn({ username, password });
      
      if (!cognitoUser) {
        throw new Error('Invalid username or password');
      }

      // Get the user's attributes
      const userAttributes = await fetchUserAttributes();
      
      if (!userAttributes.sub || !userAttributes.email) {
        throw new Error('Required user attributes are missing');
      }

      // Verify user type matches the role in Cognito
      const userRole = userAttributes['custom:role'];
      if (userRole && userRole !== userType) {
        throw new Error('Unauthorized access: Invalid user type');
      }

      const user: User = {
        id: userAttributes.sub,
        name: username,
        role: userType as 'admin' | 'teamleader' | 'candidate',
        email: userAttributes.email
      };
      
      login(user);
      navigate(`/${userType}-dashboard`);
    } catch (err: any) {
      if (err instanceof AuthError) {
        switch (err.name) {
          case 'UserNotFoundException':
          case 'NotAuthorizedException':
            setError('Invalid username or password');
            break;
          case 'UserNotConfirmedException':
            setError('Please verify your email first');
            break;
          default:
            setError(err.message || 'An error occurred during sign in');
        }
      } else {
        setError(err.message || 'Failed to sign in');
      }
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login as {userType}</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

