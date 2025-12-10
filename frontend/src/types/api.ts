/**
 * API Types for TruthLens Frontend
 */

export interface DomainTrust {
    domain: string | null;
    score: 'trusted' | 'mixed' | 'low' | 'unknown';
    category?: string;
}

export interface FactCheck {
    found: boolean;
    rating: string | null;
    summary: string | null;
    source: string | null;
    url: string | null;
}

export interface EvidenceItem {
    title: string;
    description: string;
    domain: string | null;
    url: string | null;
    source: string | null;
    stance: 'SUPPORTS' | 'REFUTES' | 'DISCUSS' | 'UNRELATED';
}

export interface StanceSummary {
    supports: number;
    refutes: number;
    discuss: number;
    unrelated: number;
}

export interface AnalyzeResponse {
    claim: string | null;
    verdict: string;
    confidence: 'high' | 'medium' | 'low';
    domain_trust: DomainTrust;
    factcheck: FactCheck;
    evidence: EvidenceItem[];
    stance_summary: StanceSummary;
    explanation: string;
}

export interface AnalyzeRequest {
    text?: string;
    url?: string;
    language: string;
}

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
