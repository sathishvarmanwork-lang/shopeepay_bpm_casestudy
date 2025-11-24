import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep2: React.FC<Props> = ({ onNext, onBack }) => {
  const { riskProfile, setRiskProfile } = useAppContext();
  const [timeline, setTimeline] = useState(riskProfile.investmentTimeline || '');
  const [comfort, setComfort] = useState(riskProfile.riskComfort || '');

  const handleNext = () => {
    setRiskProfile({ investmentTimeline: timeline, riskComfort: comfort });
    onNext();
  };

  const timelineOptions = [
    { value: 'less-than-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: 'more-than-5', label: 'More than 5 years' },
  ];

  const comfortOptions = [
    { value: 'very-conservative', label: 'Very conservative - I prefer stable returns' },
    { value: 'conservative', label: 'Conservative - Small ups and downs okay' },
    { value: 'moderate', label: 'Moderate - I accept reasonable market swings' },
    { value: 'aggressive', label: 'Aggressive - I want maximum growth potential' },
  ];

  const isValid = timeline && comfort;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 text-center">Step 2 of 5</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Understand Your Risk Profile</h1>
        <p className="text-gray-600 mb-6">Help us recommend the right investments for you</p>

        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">What's your investment timeline?</h2>
          <div className="space-y-3">
            {timelineOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  timeline === option.value
                    ? 'border-[#EE4D2D] bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={timeline === option.value}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-5 h-5 text-[#EE4D2D] focus:ring-[#EE4D2D]"
                />
                <span className="ml-3 text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            How comfortable are you with market fluctuations?
          </h2>
          <div className="space-y-3">
            {comfortOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  comfort === option.value
                    ? 'border-[#EE4D2D] bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="comfort"
                  value={option.value}
                  checked={comfort === option.value}
                  onChange={(e) => setComfort(e.target.value)}
                  className="w-5 h-5 text-[#EE4D2D] focus:ring-[#EE4D2D]"
                />
                <span className="ml-3 text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
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
            disabled={!isValid}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              isValid
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

export default OnboardingStep2;
