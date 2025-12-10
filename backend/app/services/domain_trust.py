"""
TruthLens Domain Trust Service

Provides domain trust scoring based on a CSV database.
"""

import csv
from pathlib import Path
from typing import Dict, Optional
from urllib.parse import urlparse

from app.core.config import settings


# In-memory domain trust database
_domain_trust_db: Dict[str, dict] = {}


def load_domain_trust_db() -> Dict[str, dict]:
    """
    Load domain trust data from CSV file.
    
    Returns:
        Dictionary mapping domains to their trust info
    """
    global _domain_trust_db
    
    if _domain_trust_db:
        return _domain_trust_db
    
    csv_path = Path(settings.domain_trust_csv_path)
    
    if not csv_path.exists():
        # Try relative to backend directory
        csv_path = Path(__file__).parent.parent.parent.parent / "data" / "domain_trust_seed.csv"
    
    if not csv_path.exists():
        return {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            domain = row.get('domain', '').strip().lower()
            if domain:
                # Parse numeric score with fallback
                try:
                    score = int(row.get('score', 50))
                except (ValueError, TypeError):
                    score = 50
                
                _domain_trust_db[domain] = {
                    'trust_level': row.get('trust_level', 'unknown'),
                    'category': row.get('category', 'unknown'),
                    'score': score,
                    'label': row.get('label', 'Unknown'),
                    'notes': row.get('notes', '')
                }
    
    return _domain_trust_db


def extract_domain(url: str) -> Optional[str]:
    """
    Extract the domain from a URL.
    
    Args:
        url: URL string
        
    Returns:
        Domain string or None
    """
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        
        # Remove www. prefix
        if domain.startswith('www.'):
            domain = domain[4:]
        
        return domain if domain else None
    except Exception:
        return None


def get_default_score(trust_level: str) -> int:
    """Get default numeric score for a trust level."""
    return {
        'trusted': 85,
        'mixed': 55,
        'low': 20,
        'unknown': 50
    }.get(trust_level, 50)


def score_domain(url: Optional[str]) -> dict:
    """
    Score the trust level of a domain.
    
    Args:
        url: URL to score
        
    Returns:
        Dict with domain, score (0-100), trust_level, category, label, and reason
    """
    if not url:
        return {
            'domain': None,
            'score': 'unknown',
            'trust_score': 50,
            'category': 'unknown',
            'label': 'No URL provided',
            'reason': 'No URL was provided for domain trust analysis.'
        }
    
    domain = extract_domain(url)
    
    if not domain:
        return {
            'domain': None,
            'score': 'unknown',
            'trust_score': 50,
            'category': 'unknown',
            'label': 'Invalid URL',
            'reason': 'Could not extract domain from the provided URL.'
        }
    
    # Load database if not loaded
    db = load_domain_trust_db()
    
    # Look up domain
    trust_info = db.get(domain)
    
    if trust_info:
        return {
            'domain': domain,
            'score': trust_info['trust_level'],
            'trust_score': trust_info['score'],
            'category': trust_info['category'],
            'label': trust_info['label'],
            'reason': trust_info['notes'] or f"Domain is classified as {trust_info['trust_level']} based on our database."
        }
    
    # Unknown domain - assign moderate default
    return {
        'domain': domain,
        'score': 'unknown',
        'trust_score': 50,
        'category': 'unknown',
        'label': 'Unknown Source',
        'reason': 'This domain is not in our trust database. Exercise caution and verify from other sources.'
    }
