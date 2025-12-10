"""
TruthLens LLM Verdict Service

Uses Gemini to assess claims when traditional fact-checking yields insufficient evidence.
This is a fallback for obvious claims that can be verified with common knowledge.
"""

import google.generativeai as genai
from app.core.config import settings


async def llm_assess_claim(claim: str) -> dict:
    """
    Use LLM to assess a claim's veracity.
    
    This is used as a FALLBACK when:
    - No fact-checks are found
    - News evidence is insufficient
    
    Args:
        claim: The claim to assess
        
    Returns:
        Dict with verdict, confidence, and reasoning
    """
    if not claim or not claim.strip():
        return {
            'verdict': None,
            'confidence': None,
            'reasoning': None,
            'used': False
        }
    
    if not settings.gemini_api_key:
        return {
            'verdict': None,
            'confidence': None,
            'reasoning': 'LLM not configured',
            'used': False
        }
    
    try:
        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""You are a fact-checker AI. Assess the following claim based on widely known, verifiable facts.

CLAIM: "{claim}"

Instructions:
1. If this claim can be verified with common knowledge (dates, ages, well-known facts), provide a verdict.
2. If it requires specialized research, say "UNCERTAIN".
3. Be conservative - only say TRUE or FALSE if you're confident.

Respond in this EXACT format:
VERDICT: [TRUE/FALSE/UNCERTAIN]
CONFIDENCE: [HIGH/MEDIUM/LOW]
REASONING: [1-2 sentence explanation with specific facts]

Example for "Barack Obama is 100 years old":
VERDICT: FALSE
CONFIDENCE: HIGH
REASONING: Barack Obama was born on August 4, 1961, making him approximately 63 years old in 2024, not 100.

Now assess the claim:"""

        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Parse response
        verdict = None
        confidence = None
        reasoning = None
        
        for line in response_text.split('\n'):
            line = line.strip()
            if line.startswith('VERDICT:'):
                verdict_text = line.replace('VERDICT:', '').strip().upper()
                if 'TRUE' in verdict_text and 'FALSE' not in verdict_text:
                    verdict = 'Likely True'
                elif 'FALSE' in verdict_text:
                    verdict = 'Likely False'
                elif 'UNCERTAIN' in verdict_text:
                    verdict = None  # Don't override, let default logic handle
            elif line.startswith('CONFIDENCE:'):
                conf_text = line.replace('CONFIDENCE:', '').strip().upper()
                if 'HIGH' in conf_text:
                    confidence = 'high'
                elif 'MEDIUM' in conf_text:
                    confidence = 'medium'
                else:
                    confidence = 'low'
            elif line.startswith('REASONING:'):
                reasoning = line.replace('REASONING:', '').strip()
        
        return {
            'verdict': verdict,
            'confidence': confidence,
            'reasoning': reasoning,
            'used': verdict is not None
        }
        
    except Exception as e:
        print(f"LLM claim assessment error: {e}")
        return {
            'verdict': None,
            'confidence': None,
            'reasoning': str(e),
            'used': False
        }
