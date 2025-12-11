import { AnalyzeResponse } from './api';

const HISTORY_KEY = 'truthlens_history';
const CURRENT_RESULT_KEY = 'truthlens_current_result';

interface StoredResult {
    claim: string;
    result: AnalyzeResponse;
}

export function addToHistory(claim: string, result: AnalyzeResponse) {
    const history = getLocalHistory();
    const entry: StoredResult = { claim, result };
    // Check if already exists by claim text
    if (!history.find(h => h.claim === claim)) {
        const newHistory = [entry, ...history];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    }
}

function getLocalHistory(): StoredResult[] {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveCurrentResult(claim: string, result: AnalyzeResponse) {
    localStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify({ claim, result }));
}

export function getCurrentResult(): StoredResult | null {
    const stored = localStorage.getItem(CURRENT_RESULT_KEY);
    return stored ? JSON.parse(stored) : null;
}

export function clearCurrentResult() {
    localStorage.removeItem(CURRENT_RESULT_KEY);
}
