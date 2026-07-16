from datetime import datetime
from uuid import UUID, uuid4

from backend.models.bank_account import BankAccount


class BankDataService:
    """
    Service responsible for fetching and managing bank account data.
    In a real application, this would integrate with an external bank API
    or a data access layer connected to a database.
    """

    def __init__(self):
        """
        Initializes the BankDataService.
        """
        # Placeholder for potential dependencies like an external API client
        # or a database repository instance.
        pass

    async def get_bank_accounts_for_user(self, user_id: UUID) -> list[BankAccount]:
        """
        Fetches all bank accounts associated with a given user ID.

        Args:
            user_id: The UUID of the user.

        Returns:
            A list of BankAccount objects belonging to the user.
        """
        # In a production system, this would query a database
        # or an external banking API.
        # For now, we'll return mock data.

        mock_accounts = [
            BankAccount(
                id=uuid4(),
                user_id=user_id,
                account_name="Primary Checking",
                bank_name="Global Bank",
                account_type="checking",
                account_number_last_four="1234",
                current_balance=2500.75,
                currency="USD",
                created_at=datetime(2023, 1, 15, 10, 0, 0),
                updated_at=datetime(2024, 7, 20, 14, 30, 0)
            ),
            BankAccount(
                id=uuid4(),
                user_id=user_id,
                account_name="Savings Nest Egg",
                bank_name="Global Bank",
                account_type="savings",
                account_number_last_four="5678",
                current_balance=10500.20,
                currency="USD",
                created_at=datetime(2022, 5, 1, 9, 0, 0),
                updated_at=datetime(2024, 7, 19, 9, 0, 0)
            ),
            BankAccount(
                id=uuid4(),
                user_id=user_id,
                account_name="Travel Card",
                bank_name="Explorer Credit",
                account_type="credit_card",
                account_number_last_four="9012",
                current_balance=500.00, # Credit card balance typically represents amount owed
                currency="EUR",
                created_at=datetime(2023, 10, 1, 12, 0, 0),
                updated_at=datetime(2024, 7, 20, 10, 0, 0)
            ),
             BankAccount(
                id=uuid4(),
                user_id=user_id,
                account_name="Joint Account",
                bank_name="Local Credit Union",
                account_type="checking",
                account_number_last_four="3456",
                current_balance=875.50,
                currency="USD",
                created_at=datetime(2023, 3, 1, 8, 0, 0),
                updated_at=datetime(2024, 7, 20, 11, 0, 0)
            )
        ]

        # Filter to ensure only accounts matching the given user_id are returned
        # (though in this mock, all generated accounts already match).
        return [account for account in mock_accounts if account.user_id == user_id]

    # Future methods could include:
    # - add_bank_account(...)
    # - update_bank_account_balance(...)
    # - remove_bank_account(...)
    # - get_transactions_for_account(...)
    # - link_external_bank_account(...)
    # etc.