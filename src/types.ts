export type Role = 'viewer' | 'admin';
export type TransactionType = 'income' | 'expense';
export type Tab = 'overview' | 'transactions' | 'analytics' | 'settings';

export interface Transaction {
  id: string;
  date: string; // ISO format
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  theme: 'light' | 'dark';
  activeTab: Tab;
}

export type FinanceAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_TAB'; payload: Tab };

export interface FinanceContextType {
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
}
