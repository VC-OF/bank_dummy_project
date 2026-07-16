import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// A simple Home component to demonstrate successful login
const HomePage: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // If not authenticated and not currently loading, redirect to login
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-lg text-gray-700">Loading user data...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // This case should be handled by the useEffect redirect, but for explicit safety
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome, {user.username}!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          You are successfully logged in to the application.
        </p>
        <div className="text-left bg-indigo-50 p-6 rounded-lg mb-8 shadow-inner">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Your Profile</h2>
          <p className="text-gray-800 text-base mb-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-800 text-base mb-2">
            <span className="font-medium">User ID:</span> {user.id}
          </p>
          <p className="text-gray-800 text-base mb-2">
            <span className="font-medium">Roles:</span> {user.roles.join(', ')}
          </p>
          <p className={`text-base ${user.isVerified ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Status:</span> {user.isVerified ? 'Verified' : 'Not Verified'}
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
        >
          Logout
        </button>
      </div>
      <div className="mt-8 text-gray-600">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

// Component to handle navigation links based on auth state
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Render nothing or a loading spinner if auth state is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-lg text-gray-700">Initializing authentication...</p>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-indigo-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-indigo-200 transition-colors duration-200">
            My App
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-indigo-200 transition-colors duration-200">Home</Link>
                <button
                  onClick={logout}
                  className="py-1 px-3 bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200 transition-colors duration-200">Login</Link>
                <Link to="/signup" className="py-1 px-3 bg-indigo-500 rounded-md hover:bg-indigo-700 transition-colors duration-200">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Protected route for the home page */}
        <Route path="/" element={<HomePage />} />
        {/* You can add more routes here, e.g., a dashboard for authenticated users */}
        {/* <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} /> */}
      </Routes>
    </>
  );
};

export default App;