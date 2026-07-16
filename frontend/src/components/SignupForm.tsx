import React, { useState } from 'react';

interface SignupFormProps {
  /**
   * Callback function to handle signup submission.
   * It receives the username, email, and password.
   * Should typically handle API calls and state updates in the parent/context.
   */
  onSubmit: (username: string, email: string, password: string) => Promise<void>;
  /**
   * Boolean indicating if the form is currently submitting (e.g., waiting for API response).
   * Used to disable the submit button and show loading states.
   */
  isLoading?: boolean;
  /**
   * Optional error message to display if signup fails.
   */
  errorMessage?: string | null;
  /**
   * Optional text for the submit button. Defaults to "Sign Up".
   */
  submitButtonText?: string;
  /**
   * Optional callback to navigate to a login page/form.
   */
  onNavigateToLogin?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  isLoading = false,
  errorMessage = null,
  submitButtonText = 'Sign Up',
  onNavigateToLogin,
}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMismatchError, setPasswordMismatchError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordMismatchError(null); // Clear previous error

    if (isLoading) return; // Prevent multiple submissions

    if (password !== confirmPassword) {
      setPasswordMismatchError('Passwords do not match.');
      return;
    }

    await onSubmit(username, email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {(errorMessage || passwordMismatchError) && (
          <div className="text-sm text-red-600 text-center" role="alert">
            {passwordMismatchError || errorMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {submitButtonText}
          </button>
        </div>
      </form>

      {onNavigateToLogin && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              Log in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;