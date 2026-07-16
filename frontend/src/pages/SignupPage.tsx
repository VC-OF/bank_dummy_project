import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';

const SignupPage: React.FC = () => {
  const { signup, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Effect to redirect authenticated users
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to a dashboard or home page if already logged in
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignupSubmit = async (username: string, email: string, password: string) => {
    try {
      await signup(username, email, password);
      // Signup successful, AuthContext useEffect will handle navigation
      // Optionally, show a success message specific to signup here, e.g., "Registration successful! Please log in."
      // If AuthContext handles immediate login after signup, it will redirect.
      // If not, you might navigate to login page: navigate('/login');
    } catch (err) {
      // Error handled by AuthContext and passed via `error` state.
      // Component can optionally log or show a local toast here.
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

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
      <SignupForm
        onSubmit={handleSignupSubmit}
        isLoading={isLoading}
        errorMessage={error}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </div>
  );
};

export default SignupPage;