/**
 * A utility module for safely interacting with localStorage.
 * Provides functions to store, retrieve, and remove data, with built-in JSON parsing/stringifying
 * and basic error handling, including checks for localStorage availability.
 */

// Define keys for common items like auth token or user data for consistency
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
} as const; // `as const` makes these string literals, not just `string`

/**
 * Safely sets an item in localStorage.
 * Automatically stringifies non-string values to JSON.
 *
 * @param key The key under which to store the value.
 * @param value The value to store. Can be any serializable type.
 */
export function setLocalStorageItem<T>(key: keyof typeof LOCAL_STORAGE_KEYS, value: T): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('localStorage is not available. Cannot set item:', key);
    return;
  }
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
}

/**
 * Safely retrieves an item from localStorage.
 * Automatically parses the stored JSON string back into its original type.
 *
 * @param key The key of the item to retrieve.
 * @returns The parsed value, or null if the item doesn't exist or an error occurs.
 */
export function getLocalStorageItem<T>(key: keyof typeof LOCAL_STORAGE_KEYS): T | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('localStorage is not available. Cannot get item:', key);
    return null;
  }
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting or parsing localStorage item "${key}":`, error);
    // Optionally remove corrupted data
    removeLocalStorageItem(key);
    return null;
  }
}

/**
 * Safely removes an item from localStorage.
 *
 * @param key The key of the item to remove.
 */
export function removeLocalStorageItem(key: keyof typeof LOCAL_STORAGE_KEYS): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('localStorage is not available. Cannot remove item:', key);
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item "${key}":`, error);
  }
}

/**
 * Clears all items from localStorage. Use with caution.
 */
export function clearAllLocalStorageItems(): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('localStorage is not available. Cannot clear all items.');
    return;
  }
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing all localStorage items:', error);
  }
}

// Specific functions for common use cases
export function setAuthToken(token: string): void {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
}

export function getAuthToken(): string | null {
  return getLocalStorageItem<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
}

export function removeAuthToken(): void {
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
}

interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  // Add other user fields as needed
}

export function setUserData(userData: UserData): void {
  setLocalStorageItem(LOCAL_STORAGE_KEYS.USER_DATA, userData);
}

export function getUserData(): UserData | null {
  return getLocalStorageItem<UserData>(LOCAL_STORAGE_KEYS.USER_DATA);
}

export function removeUserData(): void {
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.USER_DATA);
}