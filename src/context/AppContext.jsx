import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'personanova_state_v2';

const defaultState = {
  onboarded: false,
  isAuthenticated: false,
  results: null, // { archetype, scores, growthAreas, topTraits }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultState;
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeOnboarding = () => setState((s) => ({ ...s, onboarded: true }));
  const saveResults = (results) => setState((s) => ({ ...s, results }));
  const login = () => setState((s) => ({ ...s, isAuthenticated: true, onboarded: true }));
  const logout = () => setState((s) => ({ ...s, isAuthenticated: false }));

  const value = {
    ...state,
    completeOnboarding,
    saveResults,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
