import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Moon, Sun, Shield, Eye, Bell } from 'lucide-react';

const Header = () => {
  const { state, dispatch } = useContext(FinanceContext);

  const handleRoleToggle = () => {
    dispatch({ type: 'SET_ROLE', payload: state.role === 'admin' ? 'viewer' : 'admin' });
  };

  const handleThemeToggle = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <header className="header">
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Dashboard Overview</h2>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Welcome back! Here's your financial summary.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-icon" aria-label="Notifications" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px',
            backgroundColor: 'var(--danger-color)', borderRadius: '50%',
            boxShadow: '0 0 0 2px var(--bg-card)'
          }}></span>
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

        <button 
          onClick={handleRoleToggle} 
          className={`btn ${state.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
        >
          {state.role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
          {state.role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
        </button>

        <button onClick={handleThemeToggle} className="btn-icon" aria-label="Toggle Theme">
          {state.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
