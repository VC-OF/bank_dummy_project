from fastapi import FastAPI

from .routers import bank_account_router

# Initialize the main FastAPI application.
# This app serves as the central hub for all API endpoints.
app = FastAPI(
    title="Accounts Dashboard API",
    version="1.0.0",
    description="API for managing user bank accounts and related financial data.",
    docs_url="/api/v1/docs",  # Custom docs URL
    redoc_url="/api/v1/redoc", # Custom redoc URL
    openapi_url="/api/v1/openapi.json" # Custom openapi.json URL
)

# Include the bank account router.
# All routes defined within bank_account_router will be prefixed with "/api/v1".
# For example, a route "/accounts/users/{user_id}/bank-accounts" in the router
# will become "/api/v1/accounts/users/{user_id}/bank-accounts" in the main app.
app.include_router(bank_account_router.router, prefix="/api/v1")

# You can add more global event handlers, middleware, or other routers here.
@app.get("/api/v1/health", tags=["System"])
async def health_check():
    """
    Checks the health of the API.
    Returns a simple status to indicate that the service is running.
    """
    return {"status": "ok", "message": "API is healthy"}

# Example of how you would run this application (e.g., using uvicorn):
# uvicorn backend.main:app --reload --port 8000