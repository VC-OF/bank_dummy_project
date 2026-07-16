import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm'; // Assuming you might want to switch to signup from here

// Define a type for the current form view to switch between login and signup
type AuthView = 'login' | 'signup';

const LoginPage: React.FC = () => {
  const { login, signup, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AuthView>('login');

  // Effect to redirect authenticated users
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to a dashboard or home page if already logged in
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (identifier: string, password: string) => {
    try {
      await login(identifier, password);
      // Login successful, AuthContext useEffect will handle navigation
    } catch (err) {
      // Error handled by AuthContext and passed via `error` state.
      // Component can optionally log or show a local toast here.
    }
  };

  const handleSignupSubmit = async (username: string, email: string, password: string) => {
    try {
      await signup(username, email, password);
      // Signup successful, AuthContext useEffect will handle navigation
      // Optionally, show a success message specific to signup here
    } catch (err) {
      // Error handled by AuthContext and passed via `error` state.
      // Component can optionally log or show a local toast here.
    }
  };

  const switchToSignup = () => setCurrentView('signup');
  const switchToLogin = () => setCurrentView('login');

  if (isAuthenticated) {
    // If isAuthenticated is true, the useEffect will already be redirecting.
    // We can return a loading state or null here to avoid rendering forms briefly.
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentView === 'login' ? (
        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          errorMessage={error}
          onNavigateToSignup={switchToSignup}
        />
      ) : (
        <SignupForm
          onSubmit={handleSignupSubmit}
          isLoading={isLoading}
          errorMessage={error}
          onNavigateToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default LoginPage;