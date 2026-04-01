import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { LayoutDashboard, Receipt, BarChart3, Settings } from 'lucide-react';
import { Tab } from '../../types';

const Sidebar = () => {
  const { state, dispatch } = useContext(FinanceContext);

  const navItems: { id: Tab, icon: any, label: string }[] = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
          <span className="text-gradient">ZOR</span>VYN
        </h1>
        <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Finance Studio</p>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => {
          const isActive = state.activeTab === item.id;
          return (
            <button
               key={item.id}
               onClick={() => dispatch({ type: 'SET_TAB', payload: item.id })}
               style={{
                 display: 'flex', alignItems: 'center', gap: '1rem',
                 padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                 color: isActive ? 'white' : 'var(--text-secondary)',
                 backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                 fontWeight: isActive ? 600 : 500,
                 textDecoration: 'none',
                 border: 'none',
                 cursor: 'pointer',
                 transition: 'all var(--transition-fast)'
               }}
               onMouseEnter={(e) => {
                 if(!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-input)';
               }}
               onMouseLeave={(e) => {
                 if(!isActive) e.currentTarget.style.backgroundColor = 'transparent';
               }}
            >
              <item.icon size={20} style={{ opacity: isActive ? 1 : 0.7 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{
        marginTop: 'auto',
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem', borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-input)', border: '1px solid var(--border-color)'
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #A78BFA, #6366F1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 'bold'
        }}>
          {state.role === 'admin' ? 'Z' : 'A'}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{state.role === 'admin' ? 'Zorvyn' : 'Aadil'}</p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{state.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
