import type { Answer } from './diagnose';

const STORAGE_KEY = 'lqq_session';

export interface SessionData {
  answers: Answer[];
  completedStages: number[];
}

export function loadSession(): SessionData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: [], completedStages: [] };
    return JSON.parse(raw);
  } catch {
    return { answers: [], completedStages: [] };
  }
}

export function saveSession(data: SessionData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
