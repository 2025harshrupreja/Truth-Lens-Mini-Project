"""
TruthLens Core Module

Exports configuration and security utilities.
"""

from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token,
    get_current_user,
)

__all__ = [
    "settings",
    "hash_password",
    "verify_password",
    "create_access_token",
    "verify_token",
    "get_current_user",
]
