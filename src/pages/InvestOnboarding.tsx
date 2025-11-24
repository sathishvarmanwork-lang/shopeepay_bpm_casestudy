import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import OnboardingStep1 from '../components/onboarding/OnboardingStep1';
import OnboardingStep2 from '../components/onboarding/OnboardingStep2';
import OnboardingStep3 from '../components/onboarding/OnboardingStep3';
import OnboardingStep4 from '../components/onboarding/OnboardingStep4';
import OnboardingStep5 from '../components/onboarding/OnboardingStep5';

const InvestOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { onboardingStep, setOnboardingStep } = useAppContext();

  const step = parseInt(searchParams.get('step') || '1');

  useEffect(() => {
    setOnboardingStep(step);
  }, [step, setOnboardingStep]);

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep <= 5) {
      navigate(`/invest-onboarding?step=${nextStep}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      navigate(`/invest-onboarding?step=${step - 1}`);
    } else {
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingStep1 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <OnboardingStep2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <OnboardingStep3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <OnboardingStep4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <OnboardingStep5 onNext={handleNext} onBack={handleBack} />;
      default:
        return <OnboardingStep1 onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
};

export default InvestOnboarding;
