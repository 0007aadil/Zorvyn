import { useContext, useState } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Download, Upload, ShieldAlert } from 'lucide-react';

const SettingsPanel = () => {
  const { state, dispatch } = useContext(FinanceContext);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    // Generate JSON blob and trigger download
    const dataStr = JSON.stringify(state.transactions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'finance_transactions_export.json';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 className="card-title" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Preferences & Settings</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Manage your personal dashboard interactions and global states.
        </p>
      </div>
      
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', width: '100%' }}></div>
      
      <div>
         <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Appearance</h4>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ fontWeight: 500 }}>Dark Mode</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toggle the deep glassmorphism dark theme.</p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            >
              Set to {state.theme === 'dark' ? 'Light' : 'Dark'}
            </button>
         </div>
      </div>

      <div>
         <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Active Role</h4>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={16} color="var(--danger-color)" /> Administrator Access
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Allows deletion and insertion of transaction ledger items.</p>
            </div>
            <button 
              className={`btn ${state.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: state.role === 'admin' ? 'viewer' : 'admin' })}
            >
              {state.role === 'admin' ? 'Revoke Admin' : 'Grant Admin'}
            </button>
         </div>
      </div>

      <div>
         <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Data Management</h4>
         <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={handleExport} style={{ flex: 1 }}>
              <Download size={16} /> Export JSON Data
            </button>
            <button className="btn btn-secondary" style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }} title="Pro functionality">
              <Upload size={16} /> Import Data
            </button>
         </div>
         {exportSuccess && (
           <p style={{ color: 'var(--success-color)', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
             Successfully downloaded transactions JSON!
           </p>
         )}
      </div>

    </div>
  );
};

export default SettingsPanel;
