import React, { useEffect, useState } from 'react';
import { BankAccount } from '../types/bankAccount';
import { fetchBankAccounts } from '../api/bankAccountsApi';
import BankAccountCard from './BankAccountCard';

interface BankAccountListProps {
  userId: string;
}

const BankAccountList: React.FC<BankAccountListProps> = ({ userId }) => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBankAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        // In a real application, the userId would come from an authenticated session
        // For demonstration, we use the passed prop.
        const data = await fetchBankAccounts(userId);
        setAccounts(data);
      } catch (err) {
        console.error('Failed to fetch bank accounts:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getBankAccounts();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading bank accounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-50 border border-gray-200 rounded-md text-gray-600">
        <p className="text-lg">No bank accounts found for this user.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Bank Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <BankAccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default BankAccountList;