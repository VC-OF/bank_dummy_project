from fastapi import APIRouter

from ..controllers import bank_account_controller

# This router serves as the entry point for all bank account related API endpoints.
# It will include other specialized controllers for bank accounts.
# When included in the main application, it's expected to be prefixed,
# for example, under '/api/v1'.
router = APIRouter(
    prefix="/accounts",  # Defines the base path for all routes within this router (e.g., /api/v1/accounts)
    tags=["Bank Accounts API"] # Grouping tag for documentation
)

# Include the bank_account_controller's router.
# The paths defined in bank_account_controller (e.g., "/users/{user_id}/bank-accounts")
# will be appended to this router's prefix ("/accounts").
# This results in full paths like "/api/v1/accounts/users/{user_id}/bank-accounts".
router.include_router(bank_account_controller.router)

# Future bank-related controllers (e.g., for transactions, linking, etc.)
# could be included here using router.include_router(...) as well.