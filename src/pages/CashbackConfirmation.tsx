import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, TrendingUp, X } from 'lucide-react';

interface LocationState {
  merchant?: string;
  amount?: number;
  cashback?: number;
}

const CashbackConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasInvested, showCashbackPrompt, onboardingComplete, setShowCashbackPrompt, dismissPrompt } = useAppContext();

  const { merchant = 'Coffee Bean Cafe', cashback = 5.0 } = (location.state as LocationState) || {};
  const cashbackAmount = cashback;
  const shouldShowPrompt = !hasInvested && showCashbackPrompt;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = currentDate.toLocaleTimeString('en-MY', { hour: 'numeric', minute: '2-digit', hour12: true });

  const handleInvestClick = () => {
    if (!onboardingComplete) {
      navigate('/invest-onboarding?step=1');
    } else {
      navigate('/invest-landing');
    }
  };

  const handleDismiss = () => {
    setShowCashbackPrompt(false);
    dismissPrompt('cashbackPrompt');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cashback Earned!</h1>
          <p className="text-4xl font-bold text-green-600 mb-4">RM {cashbackAmount.toFixed(2)}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Merchant</span>
            <span className="font-medium text-gray-900">{merchant}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Date</span>
            <span className="font-medium text-gray-900">{formattedDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time</span>
            <span className="font-medium text-gray-900">{formattedTime}</span>
          </div>
        </div>

        {shouldShowPrompt && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 mb-6 border-l-4 border-[#EE4D2D] relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#EE4D2D]" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Grow your cashback safely.
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Start investing from RM1. Withdraw anytime.
                </p>
                <p className="text-xs font-bold text-[#EE4D2D] mb-2">
                  Get RM1 when you explore investing now.
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Regulated by Securities Commission Malaysia
                </p>
                <button
                  onClick={handleInvestClick}
                  className="w-full bg-[#EE4D2D] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D43D1D] transition-colors mb-2"
                  style={{ minHeight: '44px' }}
                >
                  Invest Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
          style={{ minHeight: '44px' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CashbackConfirmation;
