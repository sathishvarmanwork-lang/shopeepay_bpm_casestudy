import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/WalletPage';
import SearchResults from './pages/SearchResults';
import CashbackConfirmation from './pages/CashbackConfirmation';
import InvestLanding from './pages/InvestLanding';
import InvestOnboarding from './pages/InvestOnboarding';
import InvestProducts from './pages/InvestProducts';
import InvestConfirmation from './pages/InvestConfirmation';
import InvestProcessing from './pages/InvestProcessing';
import InvestSuccess from './pages/InvestSuccess';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet-page" element={<WalletPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/cashback-confirmation" element={<CashbackConfirmation />} />
          <Route path="/invest-landing" element={<InvestLanding />} />
          <Route path="/invest-onboarding" element={<InvestOnboarding />} />
          <Route path="/invest-products" element={<InvestProducts />} />
          <Route path="/invest-confirmation" element={<InvestConfirmation />} />
          <Route path="/invest-processing" element={<InvestProcessing />} />
          <Route path="/invest-success" element={<InvestSuccess />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
