'use client';

import { useState, useEffect } from 'react';

export function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        const value = item !== null ? (JSON.parse(item) as T) : initialValue;
        setState(value);
      } catch {
        setState(initialValue);
      }
    }
  }, [key]);

  useEffect(() => {
    if (state !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch {}
    }
  }, [key, state]);

  const safeState = state === undefined ? (true as unknown as T) : state;

  return [safeState, setState];
}