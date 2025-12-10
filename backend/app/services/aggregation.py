"""
TruthLens Verdict Aggregation Service

Applies deterministic rules to compute final verdict and confidence.
"""

from typing import Dict, Optional


def aggregate_verdict(
    factcheck_result: Dict,
    stance_summary: Dict,
    domain_trust: Dict
) -> Dict:
    """
    Compute final verdict using deterministic rules.
    
    Rules:
    1. If fact-check found → verdict = fact-check rating
    2. Else if evidence strongly refutes → Likely False
    3. Else if evidence strongly supports → Likely True
    4. Else → Needs More Verification
    
    Args:
        factcheck_result: Result from fact-check service
        stance_summary: Weighted stance summary
        domain_trust: Domain trust score
        
    Returns:
        Dict with verdict and confidence
    """
    # Rule 1: Use fact-check rating if available
    if factcheck_result.get('found') and factcheck_result.get('rating'):
        rating = factcheck_result['rating']
        
        verdict_map = {
            'True': 'Likely True',
            'False': 'Likely False',
            'Misleading': 'Misleading',
            'Unverifiable': 'Needs More Verification'
        }
        
        verdict = verdict_map.get(rating, 'Needs More Verification')
        
        # High confidence if from trusted fact-checker
        return {
            'verdict': verdict,
            'confidence': 'high',
            'basis': 'fact_check'
        }
    
    # Rule 2-3: Use stance analysis
    weighted = stance_summary.get('weighted', {})
    supports_score = weighted.get('supports', 0)
    refutes_score = weighted.get('refutes', 0)
    
    counts = stance_summary.get('counts', {})
    total_relevant = counts.get('SUPPORTS', 0) + counts.get('REFUTES', 0) + counts.get('DISCUSS', 0)
    
    # Calculate confidence based on evidence strength
    if total_relevant == 0:
        return {
            'verdict': 'Needs More Verification',
            'confidence': 'low',
            'basis': 'insufficient_evidence'
        }
    
    # Strong refutation (weighted refute score significantly higher)
    if refutes_score >= 1.5 and refutes_score > supports_score * 2:
        return {
            'verdict': 'Likely False',
            'confidence': 'medium' if refutes_score >= 2.0 else 'low',
            'basis': 'evidence_refutes'
        }
    
    # Strong support (weighted support score significantly higher)
    if supports_score >= 1.5 and supports_score > refutes_score * 2:
        return {
            'verdict': 'Likely True',
            'confidence': 'medium' if supports_score >= 2.0 else 'low',
            'basis': 'evidence_supports'
        }
    
    # Mixed or inconclusive evidence
    if supports_score > 0 or refutes_score > 0:
        return {
            'verdict': 'Needs More Verification',
            'confidence': 'low',
            'basis': 'mixed_evidence'
        }
    
    # Default: insufficient evidence
    return {
        'verdict': 'Needs More Verification',
        'confidence': 'low',
        'basis': 'insufficient_evidence'
    }


def get_confidence_score(confidence: str) -> float:
    """Convert confidence label to numeric score."""
    return {
        'high': 0.9,
        'medium': 0.6,
        'low': 0.3
    }.get(confidence, 0.3)
