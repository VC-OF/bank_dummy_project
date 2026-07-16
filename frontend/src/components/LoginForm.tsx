import React, { useState } from 'react';

interface LoginFormProps {
  /**
   * Callback function to handle login submission.
   * It receives the identifier (username or email) and password.
   * Should typically handle API calls and state updates in the parent/context.
   */
  onSubmit: (identifier: string, password: string) => Promise<void>;
  /**
   * Boolean indicating if the form is currently submitting (e.g., waiting for API response).
   * Used to disable the submit button and show loading states.
   */
  isLoading?: boolean;
  /**
   * Optional error message to display if login fails.
   */
  errorMessage?: string | null;
  /**
   * Optional text for the submit button. Defaults to "Log In".
   */
  submitButtonText?: string;
  /**
   * Optional callback to navigate to a signup page/form.
   */
  onNavigateToSignup?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  errorMessage = null,
  submitButtonText = 'Log In',
  onNavigateToSignup,
}) => {
  const [identifier, setIdentifier] = useState<string>(''); // Can be username or email
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    await onSubmit(identifier, password);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label htmlFor="identifier" className="sr-only">
            Username or Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username" // Or "email" depending on user input
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {errorMessage && (
          <div className="text-sm text-red-600 text-center" role="alert">
            {errorMessage}
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

      {onNavigateToSignup && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignup}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;