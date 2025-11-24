import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep3: React.FC<Props> = ({ onNext, onBack }) => {
  const { investmentPreferences, setInvestmentPreferences } = useAppContext();
  const [selected, setSelected] = useState<string[]>(investmentPreferences || []);

  const handleNext = () => {
    setInvestmentPreferences(selected);
    onNext();
  };

  const togglePreference = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const preferences = [
    {
      value: 'shariah',
      title: 'Shariah-Compliant Investments',
      description: 'Islamic principles-based funds',
    },
    {
      value: 'growth',
      title: 'Capital Growth',
      description: 'Focus on long-term wealth building',
    },
    {
      value: 'income',
      title: 'Income Generation',
      description: 'Regular income distributions',
    },
    {
      value: 'conservative',
      title: 'Conservative/Defensive',
      description: 'Lower volatility, stable funds',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 text-center">Step 3 of 5</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Investment Style</h1>
        <p className="text-gray-600 mb-6">Select one or more options that match your preferences</p>

        <div className="space-y-4 mb-8">
          {preferences.map((preference) => (
            <div
              key={preference.value}
              onClick={() => togglePreference(preference.value)}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selected.includes(preference.value)
                  ? 'border-[#EE4D2D] bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                    selected.includes(preference.value)
                      ? 'bg-[#EE4D2D] border-[#EE4D2D]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {selected.includes(preference.value) && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{preference.title}</h3>
                  <p className="text-sm text-gray-600">{preference.description}</p>
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
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              selected.length > 0
                ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ minHeight: '44px' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
