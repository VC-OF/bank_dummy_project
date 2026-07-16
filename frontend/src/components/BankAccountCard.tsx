import React from 'react';
import { BankAccount } from '../types/bankAccount';

interface BankAccountCardProps {
  account: BankAccount;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({ account }) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getAccountTypeDisplay = (type: string) => {
    switch (type.toLowerCase()) {
      case 'checking':
        return 'Checking Account';
      case 'savings':
        return 'Savings Account';
      case 'credit_card':
        return 'Credit Card';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-48 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{account.account_name}</h3>
          <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${
            account.account_type === 'checking' ? 'bg-blue-100 text-blue-800' :
            account.account_type === 'savings' ? 'bg-green-100 text-green-800' :
            account.account_type === 'credit_card' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {getAccountTypeDisplay(account.account_type)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">{account.bank_name}</span> &bull; Ending in {account.account_number_last_four}
        </p>
      </div>

      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(account.current_balance, account.currency)}
        </p>
        <p className="text-xs text-gray-500">
          Last updated: {new Date(account.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BankAccountCard;