import React from 'react';
import BankAccountList from '../components/BankAccountList';

const AccountsDashboardPage: React.FC = () => {
  // In a real application, the user ID would come from an authentication context
  // or a user session. For this demonstration, we'll use a hardcoded UUID.
  // This UUID should match a user for whom mock bank accounts are generated in the backend.
  const mockUserId = 'b2c3d4e5-f6a7-8901-2345-67890abcdef0';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center">
          Accounts Dashboard
        </h1>
        <p className="mt-4 text-xl text-gray-600 text-center">
          A quick overview of all your linked bank accounts.
        </p>
      </header>
      
      <main>
        {/*
          The BankAccountList component fetches and displays bank accounts for the given userId.
          In a production app, `userId` would be dynamically passed, e.g., from `useAuth().user.id`.
        */}
        <BankAccountList userId={mockUserId} />
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Accounts Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AccountsDashboardPage;