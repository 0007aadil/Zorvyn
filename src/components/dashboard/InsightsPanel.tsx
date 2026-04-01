import { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { parseISO, format } from 'date-fns';
import { AlertCircle, Target, TrendingUp } from 'lucide-react';

const InsightsPanel = () => {
  const { state } = useContext(FinanceContext);

  const insights = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    
    const categoryTotals: Record<string, number> = {};
    let totalExpense = 0;
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      totalExpense += t.amount;
    });

    let highestCat = 'N/A';
    let highestAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCat = cat;
      }
    });

    const monthlySpending: Record<string, number> = {};
    expenses.forEach(t => {
      const monthKey = format(parseISO(t.date), 'MMM yyyy');
      monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + t.amount;
    });

    const sortedMonths = Object.keys(monthlySpending).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let momText = "Not enough data for M-o-M comparison.";
    if (sortedMonths.length >= 2) {
      const current = monthlySpending[sortedMonths[0]];
      const prev = monthlySpending[sortedMonths[1]];
      const diff = current - prev;
      const pct = (diff / prev) * 100;
      momText = `${Math.abs(pct).toFixed(1)}% ${diff > 0 ? 'higher' : 'lower'} than ${sortedMonths[1]}`;
    }

    const categoryPercentage = totalExpense > 0 ? (highestAmount / totalExpense) * 100 : 0;

    return {
      highestCategory: { name: highestCat, amount: highestAmount, percentage: categoryPercentage },
      momText
    };
  }, [state.transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-full)', color: 'var(--danger-color)' }}>
             <AlertCircle size={20} />
          </div>
          <h3 className="card-title" style={{ margin: 0 }}>Highest Expenditure</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{insights.highestCategory.name}</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger-color)' }}>
            {formatCurrency(insights.highestCategory.amount)}
          </span>
        </div>
        
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${insights.highestCategory.percentage}%`, background: 'var(--danger-color)' }}></div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>
          {insights.highestCategory.percentage.toFixed(1)}% of total expenses
        </p>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', width: '100%' }}></div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-full)', color: '#3B82F6' }}>
             <TrendingUp size={20} />
          </div>
          <h3 className="card-title" style={{ margin: 0 }}>Monthly Velocity</h3>
        </div>
        <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {insights.momText}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Based on aggregate rolling data averages.
        </p>
      </div>
      
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', width: '100%' }}></div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-full)', color: 'var(--success-color)' }}>
             <Target size={20} />
          </div>
          <h3 className="card-title" style={{ margin: 0 }}>Smart Objective</h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Limiting <strong style={{ color: 'var(--text-primary)' }}>{insights.highestCategory.name}</strong> by just 15% next month could increase your savings yield by approximately {(insights.highestCategory.amount * 0.15).toLocaleString('en-IN', {style: 'currency', currency:'INR'})}.
        </p>
      </div>
    </div>
  );
};

export default InsightsPanel;
