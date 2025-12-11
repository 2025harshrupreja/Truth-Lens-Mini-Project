/**
 * TruthLens API Types
 */

// Auth types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface UserResponse {
    id: number;
    email: string;
}

// Analysis types
export interface AnalyzeRequest {
    text?: string;
    url?: string;
    language?: string;
}

export interface DomainTrust {
    domain: string | null;
    score: string | number;
}

export interface FactCheck {
    found: boolean;
    rating?: string | null;
    summary?: string | null;
    url?: string;
}

export interface EvidenceItem {
    title: string | null;
    description?: string | null;
    url: string | null;
    source: string | null;
    domain?: string | null;
    stance: string;  // API returns 'UNRELATED', 'supporting', etc.
    snippet?: string;
}

export interface AnalyzeResponse {
    verdict: string;
    confidence: string;
    domain_trust: DomainTrust;
    factcheck: FactCheck;
    evidence: EvidenceItem[];
    explanation: string;
    claims?: string[];
}
