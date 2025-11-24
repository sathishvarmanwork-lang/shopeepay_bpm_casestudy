import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Target, PieChart, Zap, Building2, CheckCircle } from 'lucide-react';

const InvestLanding: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingComplete } = useAppContext();

  const handleInvestClick = () => {
    if (!onboardingComplete) {
      navigate('/invest-onboarding?step=1');
    } else {
      navigate('/invest-products');
    }
  };

  const benefits = [
    {
      icon: Target,
      title: 'Low entry point',
      description: 'Invest from RM10',
    },
    {
      icon: PieChart,
      title: 'Diversified funds',
      description: 'Diversified funds',
    },
    {
      icon: Zap,
      title: 'Flexibility',
      description: 'Invest within your comfort zone',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">ShopeePay Invest</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invest from RM10</h2>
          <p className="text-gray-700 mb-6">Low entry point for investments</p>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-[#EE4D2D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 mb-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Regulated investment platform</h3>
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Supervised by Securities Commission Malaysia</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Shariah investment options
              <span className="text-gray-400 text-sm">›</span>
            </h3>
            <p className="text-sm text-gray-600">Islamic principles-based investment funds</p>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Money market funds options
              <span className="text-gray-400 text-sm">›</span>
            </h3>
            <p className="text-sm text-gray-600">Low-risk, short-term investment funds</p>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Investment resources
              <span className="text-gray-400 text-sm">›</span>
            </h3>
            <p className="text-sm text-gray-600">Learn about investing and grow your wealth</p>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Safeguard your money
              <span className="text-gray-400 text-sm">›</span>
            </h3>
            <p className="text-sm text-gray-600">Your investments are protected and secure</p>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Grow your wealth
              <span className="text-gray-400 text-sm">›</span>
            </h3>
            <p className="text-sm text-gray-600">Build long-term wealth with smart investing</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleInvestClick}
            className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
            style={{ minHeight: '44px' }}
          >
            Invest now from RM10
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestLanding;
