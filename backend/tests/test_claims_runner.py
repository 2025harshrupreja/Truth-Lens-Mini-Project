"""
Test script for TruthLens MVP Analysis Pipeline
Tests all claims from test_claims.json and reports results
"""

import asyncio
import httpx
import json
from pathlib import Path

# Configuration
BASE_URL = "http://localhost:8000"
# Navigate from backend/tests to project root data folder
TEST_DATA_PATH = Path(__file__).parent.parent.parent / "data" / "test_claims.json"


# Test user credentials (create this user first or use existing)
TEST_EMAIL = "test@truthlens.com"
TEST_PASSWORD = "test123456"


async def get_auth_token(client: httpx.AsyncClient) -> str:
    """Get auth token by registering/logging in."""
    # Try to register first
    try:
        reg_resp = await client.post(
            f"{BASE_URL}/auth/register",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        if reg_resp.status_code == 201:
            print(f"✅ Registered new user: {TEST_EMAIL}")
    except:
        pass
    
    # Login to get token
    login_resp = await client.post(
        f"{BASE_URL}/auth/login",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
    )
    
    if login_resp.status_code != 200:
        raise Exception(f"Login failed: {login_resp.text}")
    
    token = login_resp.json().get("access_token")
    if not token:
        raise Exception(f"No token in response: {login_resp.json()}")
    
    print(f"✅ Got auth token for {TEST_EMAIL}")
    return token


async def test_claim(client: httpx.AsyncClient, token: str, claim: dict) -> dict:
    """Test a single claim against the analyze endpoint."""
    headers = {"Authorization": f"Bearer {token}"}
    
    payload = {"text": claim["text"]}
    if "url" in claim:
        payload["url"] = claim["url"]
    
    try:
        resp = await client.post(
            f"{BASE_URL}/api/v1/analyze",
            json=payload,
            headers=headers,
            timeout=60.0  # Analysis can take time
        )
        
        if resp.status_code == 200:
            result = resp.json()
            return {
                "id": claim["id"],
                "text": claim["text"][:60] + "...",
                "expected": claim["expected_verdict"],
                "actual": result.get("verdict"),
                "confidence": result.get("confidence"),
                "factcheck_found": result.get("factcheck", {}).get("found"),
                "explanation_preview": result.get("explanation", "")[:100] + "...",
                "match": claim["expected_verdict"].lower() in result.get("verdict", "").lower() or 
                         result.get("verdict", "").lower() in claim["expected_verdict"].lower(),
                "status": "success"
            }
        else:
            return {
                "id": claim["id"],
                "text": claim["text"][:60] + "...",
                "expected": claim["expected_verdict"],
                "actual": None,
                "status": "error",
                "error": resp.text
            }
    except Exception as e:
        return {
            "id": claim["id"],
            "text": claim["text"][:60] + "...",
            "expected": claim["expected_verdict"],
            "actual": None,
            "status": "exception",
            "error": str(e)
        }


async def main():
    print("=" * 70)
    print("🔍 TruthLens MVP Analysis Pipeline Test")
    print("=" * 70)
    
    # Load test claims
    with open(TEST_DATA_PATH) as f:
        test_data = json.load(f)
    
    claims = test_data["test_claims"]
    print(f"\n📋 Found {len(claims)} test claims\n")
    
    async with httpx.AsyncClient() as client:
        # Get auth token
        try:
            token = await get_auth_token(client)
        except Exception as e:
            print(f"❌ Auth failed: {e}")
            return
        
        # Test each claim
        results = []
        for i, claim in enumerate(claims, 1):
            print(f"\n[{i}/{len(claims)}] Testing: {claim['text'][:50]}...")
            result = await test_claim(client, token, claim)
            results.append(result)
            
            if result["status"] == "success":
                match_icon = "✅" if result["match"] else "❌"
                print(f"    Expected: {result['expected']}")
                print(f"    Actual:   {result['actual']} ({result['confidence']} confidence)")
                print(f"    Fact-check found: {result['factcheck_found']}")
                print(f"    Match: {match_icon}")
            else:
                print(f"    ❌ Error: {result.get('error', 'Unknown')[:100]}")
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 RESULTS SUMMARY")
    print("=" * 70)
    
    successes = [r for r in results if r["status"] == "success"]
    matches = [r for r in successes if r.get("match")]
    
    print(f"\n✅ Successful API calls: {len(successes)}/{len(claims)}")
    print(f"🎯 Correct verdicts: {len(matches)}/{len(successes)}")
    
    if len(successes) < len(claims):
        print("\n❌ Failed claims:")
        for r in results:
            if r["status"] != "success":
                print(f"   - ID {r['id']}: {r['error'][:80]}")
    
    if successes and len(matches) < len(successes):
        print("\n🔄 Verdict mismatches:")
        for r in successes:
            if not r.get("match"):
                print(f"   - ID {r['id']}: Expected '{r['expected']}' got '{r['actual']}'")
    
    # Save detailed results
    output_path = TEST_DATA_PATH.parent / "test_results.json"
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\n📄 Detailed results saved to: {output_path}")


if __name__ == "__main__":
    asyncio.run(main())
