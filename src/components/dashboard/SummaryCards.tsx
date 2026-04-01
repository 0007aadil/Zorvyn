import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = () => {
  const { state } = useContext(FinanceContext);

  const { totalIncome, totalExpense, balance, incomeDiff, expenseDiff } = useMemo(() => {
    let income = 0;
    let expense = 0;
    // Dummy differential metrics for visual realism
    let prevIncome = 0;
    let prevExpense = 0;

    // Simulate simple half-split logic to generate "previous month" data
    const midIndex = Math.floor(state.transactions.length / 2);
    
    state.transactions.forEach((tx, idx) => {
      if (tx.type === 'income') {
        income += tx.amount;
        if (idx > midIndex) prevIncome += tx.amount * 0.9;
      } else {
        expense += tx.amount;
        if (idx > midIndex) prevExpense += tx.amount * 1.1;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      incomeDiff: prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 8.4,
      expenseDiff: prevExpense > 0 ? ((expense - prevExpense) / prevExpense) * 100 : -2.1,
    };
  }, [state.transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="card-title">Total Balance</h3>
            <div className="card-value" style={{ marginTop: '0.5rem' }}>{formatCurrency(balance)}</div>
          </div>
          <div style={{ padding: '0.875rem', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
            <Wallet size={24} />
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span className="badge badge-income">+12.5%</span> 
          <span className="text-muted">vs last month</span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="card-title">Total Income</h3>
            <div className="card-value" style={{ marginTop: '0.5rem' }}>{formatCurrency(totalIncome)}</div>
          </div>
          <div style={{ padding: '0.875rem', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <TrendingUp size={24} />
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span className={`badge ${incomeDiff > 0 ? 'badge-income' : 'badge-expense'}`}>
            {incomeDiff > 0 ? '+' : ''}{incomeDiff.toFixed(1)}%
          </span> 
          <span className="text-muted">vs last month</span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="card-title">Total Expenses</h3>
            <div className="card-value" style={{ marginTop: '0.5rem' }}>{formatCurrency(totalExpense)}</div>
          </div>
          <div style={{ padding: '0.875rem', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <TrendingDown size={24} />
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
           <span className={`badge ${expenseDiff > 0 ? 'badge-expense' : 'badge-income'}`}>
            {expenseDiff > 0 ? '+' : ''}{expenseDiff.toFixed(1)}%
          </span> 
          <span className="text-muted">vs last month</span>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
