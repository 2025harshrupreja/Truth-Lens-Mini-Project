import { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, Loader2, Shield, Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react';
import type { Page } from '../App';

interface RegisterPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (email: string) => void;
}

// Custom hook for media queries (since Tailwind responsive classes don't work)
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

export function RegisterPage({ onNavigate, onLogin }: RegisterPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Use JS-based media query detection
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { register, login } = await import('../lib/api');
            await register({ email, password });
            await login({ email, password });
            onLogin(email);
            onNavigate('dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        height: '48px',
        paddingLeft: '48px',
        paddingRight: '16px',
        borderRadius: '12px',
        color: 'white',
        outline: 'none',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.2s',
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left Panel - Branding (Desktop Only) */}
            {isDesktop && (
                <div style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '48px',
                    background: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #000 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Ambient Glow */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        opacity: 0.4,
                        background: 'radial-gradient(circle, rgba(0,255,195,0.12) 0%, transparent 60%)',
                    }} />

                    {/* Logo */}
                    <button
                        onClick={() => onNavigate('landing')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 10,
                        }}
                    >
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #00FFC3 0%, #00CC99 100%)',
                            boxShadow: '0 0 20px rgba(0,255,195,0.3)',
                        }}>
                            <Shield style={{ width: '24px', height: '24px', color: 'black' }} />
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>TruthLens</span>
                    </button>

                    {/* Hero */}
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '400px' }}>
                        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
                            Join the fight against{' '}
                            <span style={{
                                background: 'linear-gradient(90deg, #00FFC3, #00CC99)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>misinformation</span>
                        </h1>
                        <p style={{ color: '#a1a1aa', fontSize: '18px', marginBottom: '32px' }}>
                            Create your free account and start verifying content with AI-powered analysis.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d4d4d8' }}>
                                <Zap style={{ width: '20px', height: '20px', color: '#00FFC3' }} />
                                <span>Instant fact-checking results</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d4d4d8' }}>
                                <ShieldCheck style={{ width: '20px', height: '20px', color: '#00FFC3' }} />
                                <span>Trusted source verification</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p style={{ color: '#52525b', fontSize: '14px', position: 'relative', zIndex: 10 }}>
                        © 2025 TruthLens. Reliable AI Verification.
                    </p>
                </div>
            )}

            {/* Right Panel - Form */}
            <div style={{
                width: isDesktop ? '50%' : '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isDesktop ? '48px' : '24px',
                background: '#0a0a0a',
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    {/* Mobile Logo */}
                    {!isDesktop && (
                        <button
                            onClick={() => onNavigate('landing')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                margin: '0 auto 32px auto',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #00FFC3 0%, #00CC99 100%)',
                            }}>
                                <Shield style={{ width: '20px', height: '20px', color: 'black' }} />
                            </div>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>TruthLens</span>
                        </button>
                    )}

                    {/* Header */}
                    <div style={{ textAlign: isDesktop ? 'left' : 'center', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Create an account</h2>
                        <p style={{ color: '#a1a1aa', fontSize: '14px' }}>Get started with TruthLens today</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            marginBottom: '24px',
                            padding: '12px',
                            borderRadius: '8px',
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171',
                            fontSize: '14px',
                            textAlign: 'center',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#d4d4d8', marginBottom: '8px' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#71717a' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#d4d4d8', marginBottom: '8px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#71717a' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Min 6 characters"
                                    style={{ ...inputStyle, paddingRight: '48px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}
                                >
                                    {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#d4d4d8', marginBottom: '8px' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#71717a' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Confirm password"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                height: '48px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.5 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                background: 'linear-gradient(135deg, #00FFC3 0%, #00CC99 100%)',
                                color: 'black',
                                fontWeight: 600,
                                fontSize: '16px',
                                boxShadow: '0 4px 15px rgba(0,255,195,0.3)',
                                transition: 'all 0.3s',
                                marginTop: '8px',
                            }}
                        >
                            {loading ? <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} /> : <>Create Account <UserPlus style={{ width: '20px', height: '20px' }} /></>}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{ fontSize: '12px', color: '#71717a' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    {/* Sign In Link */}
                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#a1a1aa' }}>
                        Already have an account?{' '}
                        <button
                            onClick={() => onNavigate('login')}
                            style={{ color: '#00FFC3', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
