import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, TrendingUp, Shield } from 'lucide-react';
import { Fund } from '../types';

const InvestProducts: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedFund, setInvestmentAmount } = useAppContext();
  const [amount, setAmount] = useState('50');

  const funds: Fund[] = [
    {
      id: '1',
      name: 'Balanced Growth Fund',
      category: 'Income Builder',
      description: 'A moderate-risk portfolio balanced between stocks and bonds.',
      minimumInvestment: 10,
      expectedReturns: '6-8% annually',
      riskLevel: 'Moderate',
      withdrawalTimeline: '2-3 business days',
    },
    {
      id: '2',
      name: 'Money Market Fund',
      category: 'Conservative Growth',
      description: 'Low-risk fund focused on capital preservation and steady income.',
      minimumInvestment: 10,
      expectedReturns: '3-4% annually',
      riskLevel: 'Low',
      withdrawalTimeline: '1-2 business days',
    },
    {
      id: '3',
      name: 'Shariah Equity Fund',
      category: 'Shariah-Compliant',
      description: 'Islamic principles-based equity fund for capital growth.',
      minimumInvestment: 10,
      expectedReturns: '7-10% annually',
      riskLevel: 'Moderate-High',
      withdrawalTimeline: '2-3 business days',
    },
  ];

  const handleSelectFund = (fund: Fund) => {
    setSelectedFund(fund);
    setInvestmentAmount(parseFloat(amount));
    navigate('/invest-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Choose Investment Fund</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">RM</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              className="flex-1 text-2xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-[#EE4D2D] outline-none py-2"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Minimum investment: RM10</p>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Funds</h2>

        <div className="space-y-4">
          {funds.map((fund) => (
            <div
              key={fund.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:border-[#EE4D2D] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{fund.name}</h3>
                  <span className="inline-block text-xs bg-orange-100 text-[#EE4D2D] px-2 py-1 rounded">
                    {fund.category}
                  </span>
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>

              <p className="text-sm text-gray-600 mb-4">{fund.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Expected Returns</p>
                  <p className="text-sm font-semibold text-gray-900">{fund.expectedReturns}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Risk Level</p>
                  <p className="text-sm font-semibold text-gray-900">{fund.riskLevel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                <Shield className="w-4 h-4" />
                <span>Regulated by Securities Commission Malaysia</span>
              </div>

              <button
                onClick={() => handleSelectFund(fund)}
                disabled={parseFloat(amount) < fund.minimumInvestment}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  parseFloat(amount) >= fund.minimumInvestment
                    ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{ minHeight: '44px' }}
              >
                Select This Fund
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestProducts;
