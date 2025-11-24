import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Search, TrendingUp, Coffee, ShoppingBag, Utensils, Store, Percent } from 'lucide-react';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingComplete, setShowSearchCard } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvestCard, setShowInvestCard] = useState(false);

  const investmentKeywords = [
    'invest', 'investment', 'gold', 'returns', 'save', 'money',
    'extra money', 'income', 'fund', 'profit', 'grow', 'finance'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const matchesKeyword = investmentKeywords.some(keyword => query.includes(keyword));
    setShowInvestCard(matchesKeyword);
    setShowSearchCard(matchesKeyword);
  };

  const handleInvestClick = () => {
    if (!onboardingComplete) {
      navigate('/invest-onboarding?step=1');
    } else {
      navigate('/invest-landing');
    }
  };

  const recentSearches = ['Top up', 'Insurance', 'Transfer money', 'Vouchers'];

  const cashbackMerchants = [
    { name: 'Coffee Bean Cafe', category: 'Coffee & Beverages', icon: Coffee, cashback: 5, color: 'bg-amber-50' },
    { name: 'MegaMart Supermarket', category: 'Groceries & Shopping', icon: ShoppingBag, cashback: 3, color: 'bg-blue-50' },
    { name: 'Noodle House Restaurant', category: 'Dining & Food', icon: Utensils, cashback: 8, color: 'bg-orange-50' },
    { name: 'Fashion Avenue Store', category: 'Retail & Fashion', icon: Store, cashback: 4, color: 'bg-pink-50' },
  ];

  const services = [
    { name: 'Top up Wallet', category: 'Wallet Services' },
    { name: 'Pay Bills', category: 'Payments' },
    { name: 'Transfer Money', category: 'Wallet Services' },
    { name: 'Buy Insurance', category: 'Insurance' },
    { name: 'E-vouchers', category: 'Rewards' },
  ];

  const handleMerchantClick = (merchant: typeof cashbackMerchants[0]) => {
    const { icon, ...merchantData } = merchant;
    navigate('/merchant-payment', { state: { merchant: merchantData } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-4">
        {showInvestCard && (
          <div className="bg-white rounded-lg shadow-md border-t-3 border-[#EE4D2D] p-5 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Recommended for you</p>
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-orange-50 p-2 rounded-full flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-[#EE4D2D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Start investing with RM1.
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Safe and regulated. Withdraw anytime.
                </p>
                <div className="inline-block bg-[#EE4D2D] text-white text-xs px-2 py-1 rounded">
                  Licensed by Bank Negara Malaysia
                </div>
              </div>
            </div>
            <button
              onClick={handleInvestClick}
              className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
              style={{ minHeight: '44px' }}
            >
              Invest Now
            </button>
          </div>
        )}

        {!searchQuery && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-[#EE4D2D] hover:text-[#EE4D2D] transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Cashback Merchants</h2>
          <div className="space-y-3">
            {cashbackMerchants.map((merchant, index) => (
              <button
                key={index}
                onClick={() => handleMerchantClick(merchant)}
                className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#EE4D2D] text-left"
                style={{ minHeight: '44px' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`${merchant.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <merchant.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{merchant.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{merchant.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                    <Percent className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">{merchant.cashback}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            {searchQuery ? 'Search Results' : 'All Services'}
          </h2>
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-500 mt-1">{service.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
