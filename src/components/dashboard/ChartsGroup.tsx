import { useContext, useMemo, useRef, useEffect, useState } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { parseISO, format } from 'date-fns';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler );

const ChartsGroup = () => {
  const { state } = useContext(FinanceContext);
  const chartRef = useRef(null);
  const [gradientInfo, setGradientInfo] = useState<{income: any, expense: any}>({income: null, expense: null});

  const themeVars = {
    textColor: state.theme === 'dark' ? '#94A3B8' : '#6B7280',
    gridColor: state.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradIncome = ctx.createLinearGradient(0, 0, 0, 300);
      gradIncome.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
      gradIncome.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      const gradExpense = ctx.createLinearGradient(0, 0, 0, 300);
      gradExpense.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
      gradExpense.addColorStop(1, 'rgba(239, 68, 68, 0.0)');

      setGradientInfo({ income: gradIncome, expense: gradExpense });
    }
  }, [state.theme]);

  const lineChartData = useMemo(() => {
    const monthlyMap: Record<string, { income: number, expense: number }> = {};
    state.transactions.forEach(t => {
      const monthKey = format(parseISO(t.date), 'MMM yy');
      if (!monthlyMap[monthKey]) monthlyMap[monthKey] = { income: 0, expense: 0 };
      if (t.type === 'income') monthlyMap[monthKey].income += t.amount;
      else monthlyMap[monthKey].expense += t.amount;
    });

    const labels = Object.keys(monthlyMap).sort((a,b) => new Date('1 ' + a).getTime() - new Date('1 ' + b).getTime());
    
    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: labels.map(l => monthlyMap[l].income),
          borderColor: '#10B981',
          borderWidth: 3,
          backgroundColor: gradientInfo.income || 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#FFF',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Expenses',
          data: labels.map(l => monthlyMap[l].expense),
          borderColor: '#EF4444',
          borderWidth: 3,
          backgroundColor: gradientInfo.expense || 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#EF4444',
          pointBorderColor: '#FFF',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ],
    };
  }, [state.transactions, gradientInfo]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { position: 'top' as const, align: 'end' as const, labels: { color: themeVars.textColor, usePointStyle: true, boxWidth: 8, font: { family: 'Inter', weight: 600 } } },
      tooltip: {
        backgroundColor: state.theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: state.theme === 'dark' ? '#F8FAFC' : '#0F172A',
        bodyColor: state.theme === 'dark' ? '#CBD5E1' : '#475569',
        borderColor: state.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1, padding: 12, cornerRadius: 8, titleFont: { family: 'Inter', size: 14 }, bodyFont: { family: 'Inter', size: 13 }
      }
    },
    scales: {
      x: { ticks: { color: themeVars.textColor, font: { family: 'Inter' } }, grid: { display: false } },
      y: { ticks: { color: themeVars.textColor, font: { family: 'Inter' } }, grid: { color: themeVars.gridColor, drawBorder: false } }
    }
  };

  const doughnutData = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => { categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount; });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'],
        borderColor: state.theme === 'dark' ? '#1E293B' : '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 4
      }],
    };
  }, [state.transactions, state.theme]);

  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: themeVars.textColor, usePointStyle: true, boxWidth: 8, padding: 20, font: { family: 'Inter' } } },
      tooltip: {
        backgroundColor: state.theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: state.theme === 'dark' ? '#F8FAFC' : '#0F172A',
        bodyColor: state.theme === 'dark' ? '#CBD5E1' : '#475569',
        padding: 12, cornerRadius: 8, bodyFont: { family: 'Inter', size: 14, weight: 'bold' as 'bold' }
      }
    }
  };

  return (
    <>
      <div className="card" style={{ flex: 1, marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="card-title">Cash Flow & Trend</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Visual trajectory of income vs expenditures</p>
          </div>
        </div>
        <div style={{ height: '320px', width: '100%', marginTop: '1.5rem' }}>
          <Line options={lineOptions} data={lineChartData} ref={chartRef} />
        </div>
      </div>
      
      <div className="card" style={{ flex: 1 }}>
        <h3 className="card-title">Expense Breakdown</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Categorical distribution of spending</p>
        <div style={{ height: '280px', width: '100%', marginTop: '1rem' }}>
          <Doughnut options={doughnutOptions} data={doughnutData} />
        </div>
      </div>
    </>
  );
};

export default ChartsGroup;
