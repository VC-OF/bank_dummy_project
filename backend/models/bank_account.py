from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class BankAccount(BaseModel):
    """
    Represents a bank account within the system.
    """
    id: UUID = Field(..., description="Unique identifier for the bank account.")
    user_id: UUID = Field(..., description="ID of the user who owns this bank account.")
    account_name: str = Field(..., max_length=100, description="User-friendly name for the bank account (e.g., 'My Checking', 'Savings Account').")
    bank_name: str = Field(..., max_length=100, description="Name of the bank (e.g., 'Chase', 'Bank of America').")
    account_type: str = Field(..., max_length=50, description="Type of account (e.g., 'checking', 'savings', 'credit_card').")
    account_number_last_four: str = Field(..., min_length=4, max_length=4, description="Last four digits of the account number for display purposes.")
    current_balance: float = Field(..., ge=0.0, description="The current balance in the bank account.")
    currency: str = Field(..., max_length=3, description="The currency of the account (e.g., 'USD', 'EUR', 'GBP').")
    created_at: datetime = Field(..., description="Timestamp when the bank account record was created.")
    updated_at: datetime = Field(..., description="Timestamp when the bank account record was last updated.")

    class Config:
        """
        Pydantic model configuration.
        """
        orm_mode = True  # Enable compatibility with ORM objects
        json_schema_extra = {
            "example": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "user_id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
                "account_name": "Primary Checking",
                "bank_name": "Example Bank",
                "account_type": "checking",
                "account_number_last_four": "1234",
                "current_balance": 1500.75,
                "currency": "USD",
                "created_at": "2023-01-15T10:30:00Z",
                "updated_at": "2023-01-15T10:30:00Z"
            }
        }