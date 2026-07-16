import { useContext } from 'react';
import { AuthContextType, AuthContext } from '../context/AuthContext'; // Adjust path if AuthContext is moved

/**
 * Custom React hook to simplify consuming the authentication context.
 * It provides a clean interface for accessing authentication state and actions
 * (isAuthenticated, user, isLoading, error, login, signup, logout).
 *
 * @returns {AuthContextType} The authentication context value.
 * @throws {Error} If `useAuth` is used outside of an `AuthProvider`.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};