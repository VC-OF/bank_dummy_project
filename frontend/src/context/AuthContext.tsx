import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserData,
  setUserData,
  removeUserData,
} from '../utils/localStorage';
import { login as loginApi, signup as signupApi, logout as logoutApi, User, AuthResponse } from '../api/auth';

// Define the shape of the authentication context state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Define the shape of the authentication context actions
interface AuthContextType extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  // Potentially add more actions like verify email, refresh token, etc.
}

// Initial state for the authentication context
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true, // Start as loading to check local storage
  error: null,
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Effect to load auth state from local storage on component mount
  useEffect(() => {
    const token = getAuthToken();
    const userData = getUserData();

    if (token && userData) {
      setAuthState({
        isAuthenticated: true,
        user: userData,
        isLoading: false,
        error: null,
      });
    } else {
      // Ensure local storage is cleared if one part is missing
      removeAuthToken();
      removeUserData();
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      }));
    }
  }, []); // Run only once on mount

  const handleAuthSuccess = (response: AuthResponse) => {
    setAuthToken(response.token);
    setUserData(response.user);
    setAuthState({
      isAuthenticated: true,
      user: response.user,
      isLoading: false,
      error: null,
    });
  };

  const login = useCallback(async (identifier: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await loginApi(identifier, password);
      handleAuthSuccess(response);
    } catch (err: any) {
      console.error('Login failed:', err);
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: err.message || 'Failed to log in.',
      }));
      // Clear any potentially stale tokens/data on failed login
      removeAuthToken();
      removeUserData();
      throw err; // Re-throw to allow component to handle
    }
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await signupApi(username, email, password);
      handleAuthSuccess(response);
    } catch (err: any) {
      console.error('Signup failed:', err);
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: err.message || 'Failed to sign up.',
      }));
      removeAuthToken();
      removeUserData();
      throw err; // Re-throw to allow component to handle
    }
  }, []);

  const logout = useCallback(() => {
    logoutApi(); // Clears local storage
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
    console.log('User logged out from context.');
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};