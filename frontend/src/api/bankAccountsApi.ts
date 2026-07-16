import { BankAccount } from '../types/bankAccount';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Fetches all bank accounts for a specific user from the backend API.
 * @param userId The ID of the user whose bank accounts are to be retrieved.
 * @returns A promise that resolves to an array of BankAccount objects.
 * @throws An error if the network request fails or the response status is not OK.
 */
export async function fetchBankAccounts(userId: string): Promise<BankAccount[]> {
  const response = await fetch(`${API_BASE_URL}/accounts/users/${userId}/bank-accounts`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch bank accounts');
  }

  const data: BankAccount[] = await response.json();
  return data;
}

// Future functions could include:
// - createBankAccount(userId: string, newAccountData: Partial<BankAccount>): Promise<BankAccount>
// - updateBankAccount(userId: string, accountId: string, updateData: Partial<BankAccount>): Promise<BankAccount>
// - deleteBankAccount(userId: string, accountId: string): Promise<void>