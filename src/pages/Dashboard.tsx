import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  User, CreditCard, ArrowRightLeft, DollarSign,
  Gift, Coins, Shield, Car, Wallet, FileText,
  History, UserCircle, Bell, Search
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, hasInvested, showQuickCard, onboardingComplete } = useAppContext();

  const handleInvestClick = () => {
    if (!onboardingComplete) {
      navigate('/invest-onboarding?step=1');
    } else {
      navigate('/invest-landing');
    }
  };

  const products = [
    { icon: CreditCard, label: 'Top up', color: 'bg-blue-50' },
    { icon: DollarSign, label: 'Pay', color: 'bg-green-50' },
    { icon: ArrowRightLeft, label: 'Transfer', color: 'bg-purple-50' },
    { icon: Wallet, label: 'Request for cash', color: 'bg-yellow-50' },
    { icon: Gift, label: 'E-voucher', color: 'bg-pink-50' },
    { icon: Gift, label: 'Free voucher', color: 'bg-red-50' },
    { icon: Coins, label: 'Free coins daily', color: 'bg-orange-50' },
    { icon: ArrowRightLeft, label: 'Overseas transfer', color: 'bg-indigo-50' },
    { icon: Shield, label: 'Insurance', color: 'bg-teal-50' },
    { icon: Car, label: 'Car insurance', color: 'bg-cyan-50' },
    { icon: CreditCard, label: 'SPayLater', color: 'bg-violet-50' },
    { icon: Gift, label: 'Welcome bonus', color: 'bg-lime-50' },
    { icon: FileText, label: 'Finance', color: 'bg-emerald-50' },
    { icon: Search, label: 'Scan & Pay', color: 'bg-sky-50' },
    { icon: History, label: 'History', color: 'bg-slate-50' },
    { icon: UserCircle, label: 'Profile/Me', color: 'bg-stone-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#EE4D2D] text-white px-4 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold">ShopeePay</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 cursor-pointer" />
            <User className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto pb-20">
        <div className="bg-[#EE4D2D] px-4 pb-6">
          <div className="text-white">
            <p className="text-sm opacity-90 mb-1">Wallet Balance</p>
            <p className="text-3xl font-bold">RM {walletBalance.toFixed(2)}</p>
          </div>
        </div>

        <div className="px-4 -mt-4">
          <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
                onClick={() => navigate('/search-results')}
                readOnly
              />
            </div>
          </div>

          {showQuickCard && !hasInvested && (
            <div className="bg-white rounded-xl shadow-md p-5 mb-6 border-l-4 border-[#EE4D2D] hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Grow your ShopeePay balance safely.
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Start investing from RM1.
              </p>
              <p className="text-xs text-gray-500 mb-3">
                No lock-in. Withdraw anytime.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#EE4D2D] text-white text-xs px-3 py-1 rounded-full font-medium">
                  Earn RM1 when you explore investing
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Supervised by Securities Commission Malaysia
              </p>
              <button
                onClick={handleInvestClick}
                className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
                style={{ minHeight: '44px' }}
              >
                Try Investing
              </button>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 mb-6">
            {products.map((product, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`${product.color} w-16 h-16 rounded-lg flex items-center justify-center mb-2 shadow-sm`}>
                  <product.icon className="w-7 h-7 text-gray-700" />
                </div>
                <p className="text-xs text-gray-700 text-center leading-tight">{product.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4 text-[#EE4D2D]">
            <Wallet className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500">
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs">History</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500">
            <Gift className="w-6 h-6 mb-1" />
            <span className="text-xs">Rewards</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-500">
            <UserCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
