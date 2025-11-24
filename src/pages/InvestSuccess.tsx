import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, TrendingUp, MessageCircle } from 'lucide-react';

const InvestSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFund, investmentAmount, walletBalance } = useAppContext();

  const referenceNumber = `BF-2025-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const currentDate = new Date().toLocaleString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Investment is Now Active</h1>
            <p className="text-gray-600">
              You've successfully invested RM {investmentAmount.toFixed(2)} in the {selectedFund?.name}!
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Investment ID</span>
              <span className="font-mono font-medium text-gray-900">{referenceNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium text-gray-900">{currentDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#EE4D2D]" />
            Investment Details
          </h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Fund Name</span>
              <span className="font-semibold text-gray-900">{selectedFund?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your Investment</span>
              <span className="font-bold text-[#EE4D2D]">RM {investmentAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Value</span>
              <span className="font-semibold text-gray-900">RM {investmentAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Returns</span>
              <span className="font-medium text-green-600">{selectedFund?.expectedReturns}</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-700">
              Average {selectedFund?.expectedReturns} (not guaranteed). Returns vary based on market performance.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 mb-6 border-l-4 border-[#EE4D2D]">
          <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
          <p className="text-sm text-gray-700 mb-3">
            Your fund will be professionally managed. Check performance anytime in the Holdings tab.
          </p>
          <p className="text-sm text-gray-600">
            Your wallet balance is now: <span className="font-bold text-gray-900">RM {walletBalance.toFixed(2)}</span>{' '}
            (deducted RM {investmentAmount.toFixed(2)})
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
            style={{ minHeight: '44px' }}
          >
            View Holdings
          </button>

          <button
            onClick={() => navigate('/invest-products')}
            className="w-full border border-[#EE4D2D] text-[#EE4D2D] py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            style={{ minHeight: '44px' }}
          >
            Make Another Investment
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-gray-600 py-2 text-sm hover:text-gray-900"
          >
            Go Back to Home
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Post-Investment Support</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-[#EE4D2D] transition-colors py-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Questions about your investment? Chat Support</span>
            </button>

            <details className="text-sm">
              <summary className="font-medium text-gray-900 cursor-pointer">What happens next?</summary>
              <div className="mt-3 space-y-2 text-gray-600 pl-4">
                <p>• Your investment starts earning returns immediately</p>
                <p>• You'll receive email confirmation within 1 minute</p>
                <p>• Check performance anytime in your Holdings</p>
                <p>• Withdraw anytime with no penalties</p>
              </div>
            </details>
          </div>
        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold text-green-700">You can withdraw your funds anytime.</span> No penalties.
          </p>
          <button className="text-sm text-green-700 font-medium hover:underline">Learn how to withdraw</button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Need help? We're here anytime.</p>
          <p className="text-xs text-gray-600">Chat • Email • Call +60-3-1234-5678</p>
        </div>
      </div>
    </div>
  );
};

export default InvestSuccess;
