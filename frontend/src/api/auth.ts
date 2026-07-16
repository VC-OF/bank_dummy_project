import { LOCAL_STORAGE_KEYS, setAuthToken, setUserData, removeAuthToken, removeUserData } from '../utils/localStorage';

// Define the base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Type definition for the user data returned by authentication endpoints.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

/**
 * Type definition for the successful authentication response.
 */
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

/**
 * Helper function to handle API responses.
 * Throws an error if the response is not ok.
 * @param response The Fetch API Response object.
 * @returns A Promise that resolves to the parsed JSON data.
 * @throws An Error object containing the server message or a generic error.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    // If the server returns an error, it usually has a 'message' field
    const errorMessage = data.message || 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }
  return data;
}

/**
 * Registers a new user with the provided credentials.
 * @param username The desired username.
 * @param email The user's email address.
 * @param password The user's password.
 * @returns A Promise that resolves to the AuthResponse data.
 * @throws An Error if the registration fails.
 */
export async function signup(username: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data: AuthResponse = await handleResponse(response);
    setAuthToken(data.token);
    setUserData(data.user);
    return data;
  } catch (error) {
    console.error('Signup API error:', error);
    throw error;
  }
}

/**
 * Logs in an existing user with the provided credentials.
 * The identifier can be either a username or an email.
 * @param identifier The user's username or email.
 * @param password The user's password.
 * @returns A Promise that resolves to the AuthResponse data.
 * @throws An Error if the login fails.
 */
export async function login(identifier: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data: AuthResponse = await handleResponse(response);
    setAuthToken(data.token);
    setUserData(data.user);
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
}

/**
 * Logs out the current user by clearing local storage.
 * This is a client-side action as JWTs are stateless.
 */
export function logout(): void {
  removeAuthToken();
  removeUserData();
  // Optionally, if there's a backend endpoint to invalidate tokens (e.g., for refresh tokens or session management),
  // you might make a request here. For simple JWT, client-side removal is sufficient.
  console.log('User logged out.');
}