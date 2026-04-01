import { useContext } from 'react';
import { FinanceContext } from './context/FinanceContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SummaryCards from './components/dashboard/SummaryCards';
import ChartsGroup from './components/dashboard/ChartsGroup';
import TransactionsTable from './components/transactions/TransactionsTable';
import InsightsPanel from './components/dashboard/InsightsPanel';
import SettingsPanel from './components/dashboard/SettingsPanel';

function App() {
  const { state } = useContext(FinanceContext);

  const renderContent = () => {
    switch (state.activeTab) {
      case 'overview':
        return (
          <section className="dashboard-grid">
            <div className="summary-cards-section">
              <SummaryCards />
            </div>
            <div className="charts-section">
              <ChartsGroup />
            </div>
            <div className="insights-section">
              <InsightsPanel />
            </div>
            <div className="transactions-section">
              <TransactionsTable />
            </div>
          </section>
        );
      case 'transactions':
        return (
          <section className="dashboard-grid" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="transactions-section">
              <TransactionsTable />
            </div>
          </section>
        );
      case 'analytics':
        return (
          <section className="dashboard-grid">
            <div className="charts-section" style={{ gridColumn: 'span 8' }}>
              <ChartsGroup />
            </div>
            <div className="insights-section" style={{ gridColumn: 'span 4' }}>
              <InsightsPanel />
            </div>
          </section>
        );
      case 'settings':
        return (
          <section className="dashboard-grid" style={{ display: 'flex', flexDirection: 'column' }}>
             <SettingsPanel />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="background-mesh"></div>
      
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Header />
          
          <main className="dashboard-scroll">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
