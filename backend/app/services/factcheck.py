"""
TruthLens Fact Check Service

Queries Google Fact Check Tools API for existing fact-checks.
"""

from typing import Optional, Dict, List
import httpx

from app.core.config import settings


# Google Fact Check API endpoint
FACTCHECK_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"


# Rating normalization mapping
RATING_NORMALIZATION = {
    # True variants
    'true': 'True',
    'mostly true': 'True',
    'correct': 'True',
    'accurate': 'True',
    
    # False variants
    'false': 'False',
    'mostly false': 'False',
    'pants on fire': 'False',
    'incorrect': 'False',
    'wrong': 'False',
    
    # Misleading variants
    'misleading': 'Misleading',
    'half true': 'Misleading',
    'mixture': 'Misleading',
    'partly false': 'Misleading',
    'partly true': 'Misleading',
    'out of context': 'Misleading',
    
    # Unverifiable variants
    'unproven': 'Unverifiable',
    'unverified': 'Unverifiable',
    'no evidence': 'Unverifiable',
    'needs context': 'Unverifiable',
}


def normalize_rating(rating: str) -> str:
    """
    Normalize a fact-check rating to a standard format.
    
    Args:
        rating: Original rating text
        
    Returns:
        Normalized rating: True, False, Misleading, or Unverifiable
    """
    if not rating:
        return 'Unverifiable'
    
    rating_lower = rating.lower().strip()
    
    for key, value in RATING_NORMALIZATION.items():
        if key in rating_lower:
            return value
    
    return 'Unverifiable'


async def search_factchecks(claim: str) -> Dict:
    """
    Search for existing fact-checks for a claim.
    
    Args:
        claim: The claim to search for
        
    Returns:
        Dict with found (bool), rating, summary, source, and url
    """
    if not claim:
        return {
            'found': False,
            'rating': None,
            'summary': None,
            'source': None,
            'url': None
        }
    
    if not settings.google_factcheck_api_key:
        return {
            'found': False,
            'rating': None,
            'summary': 'Fact-check API key not configured',
            'source': None,
            'url': None
        }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                FACTCHECK_API_URL,
                params={
                    'key': settings.google_factcheck_api_key,
                    'query': claim,
                    'languageCode': 'en'
                },
                timeout=10.0
            )
            
            if response.status_code != 200:
                return {
                    'found': False,
                    'rating': None,
                    'summary': f'API error: {response.status_code}',
                    'source': None,
                    'url': None
                }
            
            data = response.json()
            claims = data.get('claims', [])
            
            if not claims:
                return {
                    'found': False,
                    'rating': None,
                    'summary': None,
                    'source': None,
                    'url': None
                }
            
            # Get the first (most relevant) claim review
            first_claim = claims[0]
            claim_reviews = first_claim.get('claimReview', [])
            
            if not claim_reviews:
                return {
                    'found': False,
                    'rating': None,
                    'summary': None,
                    'source': None,
                    'url': None
                }
            
            review = claim_reviews[0]
            original_rating = review.get('textualRating', '')
            
            return {
                'found': True,
                'rating': normalize_rating(original_rating),
                'original_rating': original_rating,
                'summary': first_claim.get('text', ''),
                'source': review.get('publisher', {}).get('name', 'Unknown'),
                'url': review.get('url', '')
            }
            
    except Exception as e:
        print(f"Fact-check API error: {e}")
        return {
            'found': False,
            'rating': None,
            'summary': f'Error: {str(e)}',
            'source': None,
            'url': None
        }
