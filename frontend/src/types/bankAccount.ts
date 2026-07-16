interface BankAccount {
  id: string;
  user_id: string;
  account_name: string;
  bank_name: string;
  account_type: 'checking' | 'savings' | 'credit_card' | string; // Allow string for future expansion
  account_number_last_four: string;
  current_balance: number;
  currency: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}

export type { BankAccount };