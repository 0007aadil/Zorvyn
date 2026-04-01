import { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Search, Plus, Trash2, ShoppingBag, Utensils, Home, Zap, HeartPulse, MoreHorizontal, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import TransactionModal from './TransactionModal';

// Helper to map string categories to nice Lucide icons
const getCategoryIcon = (cat: string) => {
  const lower = cat.toLowerCase();
  if (lower.includes('food') || lower.includes('dining')) return <Utensils size={18} />;
  if (lower.includes('house') || lower.includes('rent')) return <Home size={18} />;
  if (lower.includes('util') || lower.includes('electric')) return <Zap size={18} />;
  if (lower.includes('shop')) return <ShoppingBag size={18} />;
  if (lower.includes('health')) return <HeartPulse size={18} />;
  if (lower.includes('salary')) return <ArrowUpRight size={18} />;
  return <MoreHorizontal size={18} />;
};

const TransactionsTable = () => {
  const { state, dispatch } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number, type: 'income' | 'expense') => {
    const isExpense = type === 'expense';
    const numStr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    return isExpense ? `-${numStr}` : `+${numStr}`;
  };

  const filteredTransactions = useMemo(() => {
    return state.transactions.filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = filterType === 'all' ? true : tx.type === filterType;
      return matchSearch && matchFilter;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [state.transactions, searchTerm, filterType]);

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this transaction permanently?")) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="card-title" style={{ margin: 0 }}>Recent Transactions</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>A detailed log of your active ledger.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              className="input-control" 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem', width: '220px', borderRadius: 'var(--radius-full)' }}
            />
          </div>
          
          <select 
            className="input-control" 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as any)}
            style={{ width: '130px', borderRadius: 'var(--radius-full)' }}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {state.role === 'admin' && (
            <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }} onClick={() => setIsModalOpen(true)}>
              <Plus size={16} /> New Entry 
            </button>
          )}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Details</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {state.role === 'admin' && <th style={{ width: '60px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={state.role === 'admin' ? 6 : 5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Search size={32} opacity={0.5} />
                    <p>No transactions found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="avatar-icon" style={{ 
                        background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: tx.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)'
                      }}>
                        {tx.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tx.description}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {tx.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{getCategoryIcon(tx.category)}</span>
                      <span style={{ fontWeight: 500 }}>{tx.category}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type === 'income' ? 'Completed' : 'Processed'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500 }}>{format(parseISO(tx.date), 'MMM dd, yyyy')}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{format(parseISO(tx.date), 'hh:mm a')}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                     <span style={{ 
                        fontWeight: 700, 
                        fontSize: '1.05rem',
                        color: tx.type === 'income' ? 'var(--success-color)' : 'var(--text-primary)' 
                      }}>
                        {formatCurrency(tx.amount, tx.type)}
                      </span>
                  </td>
                  {state.role === 'admin' && (
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-icon" 
                        style={{ color: 'var(--danger-color)', background: 'transparent', border: 'none' }}
                        onClick={() => handleDelete(tx.id)}
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TransactionsTable;
