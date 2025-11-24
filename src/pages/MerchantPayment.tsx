import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Wallet, CreditCard, Banknote, Gift } from 'lucide-react';

interface LocationState {
  merchant: {
    name: string;
    category: string;
    cashback: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
}

const MerchantPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletBalance, setWalletBalance } = useAppContext();

  const { merchant } = (location.state as LocationState) || {
    merchant: { name: 'Coffee Bean Cafe', category: 'Coffee & Beverages', cashback: 5, color: 'bg-amber-50' }
  };

  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'wallet' | 'card'>('wallet');
  const [isProcessing, setIsProcessing] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const cashbackAmount = (numericAmount * merchant.cashback) / 100;
  const hasSufficientBalance = numericAmount <= walletBalance && numericAmount > 0;

  const handlePayment = () => {
    if (!hasSufficientBalance) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newBalance = walletBalance - numericAmount + cashbackAmount;
      setWalletBalance(newBalance);

      navigate('/cashback-confirmation', {
        state: {
          merchant: merchant.name,
          amount: numericAmount,
          cashback: cashbackAmount
        }
      });
    }, 1500);
  };

  const quickAmounts = [10, 20, 50, 100];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className={`${merchant.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
              {merchant.icon && <merchant.icon className="w-7 h-7 text-gray-700" />}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">{merchant.name}</h2>
              <p className="text-xs text-gray-500">{merchant.category}</p>
            </div>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <Gift className="w-3 h-3 text-green-600" />
              <span className="text-xs font-semibold text-green-600">{merchant.cashback}%</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-semibold text-gray-700">
                RM
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-14 pr-4 py-3 text-2xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                >
                  RM{quickAmount}
                </button>
              ))}
            </div>

            {numericAmount > 0 && (
              <div className="mt-4 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">You'll earn cashback</span>
                <span className="text-lg font-bold text-green-600">+RM {cashbackAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>

          <button
            onClick={() => setSelectedPayment('wallet')}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all mb-2 ${
              selectedPayment === 'wallet'
                ? 'border-[#EE4D2D] bg-orange-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ minHeight: '44px' }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedPayment === 'wallet' ? 'bg-[#EE4D2D]' : 'bg-gray-100'
              }`}>
                <Wallet className={`w-5 h-5 ${selectedPayment === 'wallet' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">ShopeePay Wallet</p>
                <p className="text-xs text-gray-500">Balance: RM {walletBalance.toFixed(2)}</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedPayment === 'wallet'
                ? 'border-[#EE4D2D] bg-[#EE4D2D]'
                : 'border-gray-300'
            }`}>
              {selectedPayment === 'wallet' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedPayment('card')}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
              selectedPayment === 'card'
                ? 'border-[#EE4D2D] bg-orange-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ minHeight: '44px' }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedPayment === 'card' ? 'bg-[#EE4D2D]' : 'bg-gray-100'
              }`}>
                <CreditCard className={`w-5 h-5 ${selectedPayment === 'card' ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Credit/Debit Card</p>
                <p className="text-xs text-gray-500">Add new card</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedPayment === 'card'
                ? 'border-[#EE4D2D] bg-[#EE4D2D]'
                : 'border-gray-300'
            }`}>
              {selectedPayment === 'card' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        </div>

        {selectedPayment === 'wallet' && numericAmount > walletBalance && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700">Insufficient wallet balance. Please top up or use another payment method.</p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={!hasSufficientBalance || isProcessing}
          className={`w-full py-4 rounded-lg font-semibold transition-all ${
            hasSufficientBalance && !isProcessing
              ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ minHeight: '44px' }}
        >
          {isProcessing ? 'Processing...' : `Pay RM ${numericAmount.toFixed(2)}`}
        </button>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Banknote className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700">
              Cashback will be credited to your wallet immediately after payment completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPayment;
