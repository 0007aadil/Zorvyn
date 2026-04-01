import { Transaction } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialTransactions: Transaction[] = [
  { id: generateId(), date: '2026-01-01T10:00:00Z', amount: 120000, category: 'Salary', type: 'income', description: 'January Salary' },
  { id: generateId(), date: '2026-01-02T12:30:00Z', amount: 35000, category: 'Housing', type: 'expense', description: 'Rent Payment' },
  { id: generateId(), date: '2026-01-05T09:15:00Z', amount: 3500, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: generateId(), date: '2026-01-08T18:45:00Z', amount: 8500, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: generateId(), date: '2026-01-12T20:00:00Z', amount: 1500, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: generateId(), date: '2026-01-15T14:20:00Z', amount: 25000, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: generateId(), date: '2026-01-20T19:10:00Z', amount: 2500, category: 'Food', type: 'expense', description: 'Dinner Out' },
  { id: generateId(), date: '2026-01-25T11:00:00Z', amount: 8000, category: 'Transportation', type: 'expense', description: 'Car Repairs' },
  { id: generateId(), date: '2026-02-01T10:00:00Z', amount: 120000, category: 'Salary', type: 'income', description: 'February Salary' },
  { id: generateId(), date: '2026-02-02T12:00:00Z', amount: 35000, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: generateId(), date: '2026-02-10T08:30:00Z', amount: 9500, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: generateId(), date: '2026-02-15T16:00:00Z', amount: 6500, category: 'Shopping', type: 'expense', description: 'Clothing' },
  { id: generateId(), date: '2026-02-24T18:00:00Z', amount: 15000, category: 'Entertainment', type: 'expense', description: 'Festival Gifts' },
  { id: generateId(), date: '2026-03-01T10:00:00Z', amount: 135000, category: 'Salary', type: 'income', description: 'March Salary (Raise)' },
  { id: generateId(), date: '2026-03-03T12:30:00Z', amount: 35000, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: generateId(), date: '2026-03-05T15:00:00Z', amount: 11000, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: generateId(), date: '2026-03-12T09:00:00Z', amount: 1200, category: 'Utilities', type: 'expense', description: 'Internet' },
  { id: generateId(), date: '2026-03-20T19:30:00Z', amount: 4500, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: generateId(), date: '2026-03-28T14:00:00Z', amount: 3200, category: 'Transportation', type: 'expense', description: 'Petrol' }
];
