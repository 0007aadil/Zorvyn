import React, { useState, useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Transaction } from '../../types';
import { X } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

interface TransactionModalProps {
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ onClose }) => {
  const { dispatch } = useContext(FinanceContext);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;

    const newTransaction: Transaction = {
      id: generateId(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date(date).toISOString(), // simple date parsing
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', position: 'relative' }}>
        
        <button 
          onClick={onClose} 
          className="btn-icon" 
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="input-group">
            <label className="input-label">Type</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="type" 
                  value="expense" 
                  checked={type === 'expense'} 
                  onChange={() => setType('expense')} 
                />
                Expense
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="type" 
                  value="income" 
                  checked={type === 'income'} 
                  onChange={() => setType('income')}
                />
                Income
              </label>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <input 
              type="text" 
              className="input-control" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="e.g. Groceries"
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Amount</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01"
              className="input-control" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="0.00"
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Category</label>
            <input 
              type="text" 
              className="input-control" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              placeholder="e.g. Food, Salary, Utilities"
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Date</label>
            <input 
              type="date" 
              className="input-control" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Transaction
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default TransactionModal;
