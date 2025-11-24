import React from 'react';
import { Target, PieChart, Shield, Zap } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep1: React.FC<Props> = ({ onNext, onBack }) => {
  const benefits = [
    {
      icon: Target,
      title: 'Low entry barrier',
      description: 'Invest from RM1',
    },
    {
      icon: PieChart,
      title: 'Diversified funds',
      description: 'Spread your money across multiple assets',
    },
    {
      icon: Shield,
      title: 'Fully regulated',
      description: 'Supervised by Securities Commission Malaysia',
    },
    {
      icon: Zap,
      title: 'Instant withdrawal',
      description: 'Access your money anytime',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 text-center">Step 1 of 5</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i === 1 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Why Invest with ShopeePay</h1>
        <p className="text-lg text-gray-700 mb-8">Start growing your money from RM1</p>

        <div className="space-y-4 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-lg flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-[#EE4D2D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            style={{ minHeight: '44px' }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
            style={{ minHeight: '44px' }}
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
