from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from backend.models.bank_account import BankAccount
from backend.services.bank_data_service import BankDataService

# Initialize the APIRouter for bank account operations.
# The prefix assumes this router will be included under a user-specific path
# like /users/{user_id}/bank-accounts.
router = APIRouter(
    prefix="",  # The full prefix is defined when including this router in the main app,
                # often like `/users/{user_id}/bank-accounts`
    tags=["Bank Accounts"]
)

def get_bank_data_service() -> BankDataService:
    """
    Dependency injector for BankDataService.

    This function is responsible for providing an instance of BankDataService
    to route handlers. In a more complex application, this might involve
    initializing a database session or injecting other dependencies into the service.
    """
    return BankDataService()

@router.get(
    "/users/{user_id}/bank-accounts",
    response_model=list[BankAccount],
    summary="Get all bank accounts for a specific user",
    description="Retrieves a list of all bank accounts associated with the given user ID. "
                "This endpoint provides a consolidated view of a user's financial accounts."
)
async def get_user_bank_accounts(
    user_id: UUID,
    bank_data_service: BankDataService = Depends(get_bank_data_service)
) -> list[BankAccount]:
    """
    Handles the HTTP GET request to retrieve all bank accounts for a specified user.

    Args:
        user_id: The unique identifier (UUID) of the user whose bank accounts are
                 to be retrieved. This would typically come from an authentication
                 token in a production system to ensure security and data ownership.
        bank_data_service: An instance of BankDataService, injected via FastAPI's
                           dependency injection system, used to fetch account data.

    Returns:
        A list of `BankAccount` objects belonging to the user.

    Raises:
        HTTPException:
            - 404 Not Found: If no bank accounts are found for the specified user ID.
                             (Note: With the current mock service, accounts will always
                             be returned for any valid UUID, but this handles a real-world
                             scenario where a user might genuinely have no linked accounts).
    """
    accounts = await bank_data_service.get_bank_accounts_for_user(user_id)

    if not accounts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No bank accounts found for user with ID: {user_id}"
        )

    return accounts