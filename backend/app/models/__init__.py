"""
TruthLens Models Module

Exports all database models.
"""

from app.models.user import User
from app.models.check import Check

__all__ = ["User", "Check"]
