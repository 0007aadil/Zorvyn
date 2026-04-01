import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { FinanceState, FinanceAction, FinanceContextType, Transaction } from '../types';
import { initialTransactions } from '../data/mockData';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs as 'light' | 'dark';
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'dark';
};

const initialState: FinanceState = {
  transactions: initialTransactions,
  role: 'viewer', 
  theme: getInitialTheme(),
  activeTab: 'overview',
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

export const FinanceContext = createContext<FinanceContextType>({
  state: initialState,
  dispatch: () => null,
});

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(state.theme);
    localStorage.setItem('color-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Transaction[];
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          // Can implement local storage hydrate here.
        }
      } catch (e) {
        console.error('Failed to parse stored transactions.');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};
