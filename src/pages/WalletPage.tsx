import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, TrendingUp, X } from 'lucide-react';

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, hasInvested, showWalletPrompt, onboardingComplete, setShowWalletPrompt, dismissPrompt } = useAppContext();

  const shouldShowPrompt = walletBalance >= 20 && !hasInvested && showWalletPrompt;

  const handleInvestClick = () => {
    if (!onboardingComplete) {
      navigate('/invest-onboarding?step=1');
    } else {
      navigate('/invest-landing');
    }
  };

  const handleDismiss = () => {
    setShowWalletPrompt(false);
    dismissPrompt('walletBanner');
  };

  const transactions = [
    { id: 1, type: 'Received', amount: 50, date: '2025-11-23', merchant: 'Payment from John' },
    { id: 2, type: 'Paid', amount: -25, date: '2025-11-22', merchant: 'Coffee Shop' },
    { id: 3, type: 'Top up', amount: 100, date: '2025-11-21', merchant: 'Bank Transfer' },
    { id: 4, type: 'Paid', amount: -15, date: '2025-11-20', merchant: 'Parking' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Wallet</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        <div className="bg-[#EE4D2D] px-6 py-8">
          <p className="text-white text-sm opacity-90 mb-2">Wallet Balance</p>
          <p className="text-white text-4xl font-bold">RM {walletBalance.toFixed(2)}</p>
        </div>

        {shouldShowPrompt && (
          <div className="mx-4 mt-4 bg-white rounded-lg shadow-md border-l-4 border-[#EE4D2D] p-4 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3">
              <div className="bg-orange-50 p-2 rounded-full flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Grow your ShopeePay balance safely.
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Start investing from RM1 and withdraw anytime.
                </p>
                <p className="text-xs font-bold text-[#EE4D2D] mb-3">
                  Get RM1 when you explore investing today.
                </p>
                <button
                  onClick={handleInvestClick}
                  className="w-full bg-[#EE4D2D] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D43D1D] transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.merchant}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {transaction.amount > 0 ? '+' : ''}RM {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
                <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {transaction.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
