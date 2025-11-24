import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, User, Fund, RiskProfile, PersonalInfo } from '../types';

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  setWalletBalance: (balance: number) => void;
  setHasInvested: (invested: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setShowQuickCard: (show: boolean) => void;
  setShowWalletPrompt: (show: boolean) => void;
  setShowSearchCard: (show: boolean) => void;
  setShowCashbackPrompt: (show: boolean) => void;
  setOnboardingStep: (step: number) => void;
  setRiskProfile: (profile: RiskProfile) => void;
  setInvestmentPreferences: (preferences: string[]) => void;
  setBankVerificationStatus: (status: 'pending' | 'success' | 'failed') => void;
  setPersonalInfo: (info: PersonalInfo) => void;
  setSelectedFund: (fund: Fund | null) => void;
  setInvestmentAmount: (amount: number) => void;
  setConfirmedCheckboxes: (checkboxes: boolean[]) => void;
  setInvestmentProcessing: (processing: boolean) => void;
  setInvestmentSuccess: (success: boolean) => void;
  dismissPrompt: (promptType: string) => void;
  updateUser: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user-001',
    email: 'user@example.com',
    name: 'Demo User',
    phone: '+60123456789',
    walletBalance: 150,
    hasInvested: false,
    onboardingComplete: false,
    ekycComplete: false,
  });

  const [walletBalance, setWalletBalance] = useState(150);
  const [hasInvested, setHasInvested] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [ekycComplete, setEkycComplete] = useState(false);
  const [showQuickCard, setShowQuickCard] = useState(true);
  const [showWalletPrompt, setShowWalletPrompt] = useState(true);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showCashbackPrompt, setShowCashbackPrompt] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>({
    investmentTimeline: '',
    riskComfort: '',
  });
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>([]);
  const [bankVerificationStatus, setBankVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phone: '',
    occupation: '',
    annualIncome: '',
  });
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState(50);
  const [confirmedCheckboxes, setConfirmedCheckboxes] = useState<boolean[]>([false, false, false]);
  const [investmentProcessing, setInvestmentProcessing] = useState(false);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [dismissedPrompts, setDismissedPrompts] = useState<string[]>([]);
  const [lastPromptDismissTime, setLastPromptDismissTime] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem('dismissedPrompts');
    if (stored) {
      setDismissedPrompts(JSON.parse(stored));
    }
    const storedTimes = localStorage.getItem('lastPromptDismissTime');
    if (storedTimes) {
      setLastPromptDismissTime(JSON.parse(storedTimes));
    }
  }, []);

  const dismissPrompt = (promptType: string) => {
    const updated = [...dismissedPrompts, promptType];
    setDismissedPrompts(updated);
    localStorage.setItem('dismissedPrompts', JSON.stringify(updated));

    const updatedTimes = { ...lastPromptDismissTime, [promptType]: Date.now() };
    setLastPromptDismissTime(updatedTimes);
    localStorage.setItem('lastPromptDismissTime', JSON.stringify(updatedTimes));
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      if (updates.walletBalance !== undefined) setWalletBalance(updates.walletBalance);
      if (updates.hasInvested !== undefined) setHasInvested(updates.hasInvested);
      if (updates.onboardingComplete !== undefined) setOnboardingComplete(updates.onboardingComplete);
      if (updates.ekycComplete !== undefined) setEkycComplete(updates.ekycComplete);
    }
  };

  const value: AppContextType = {
    user,
    userLoggedIn: !!user,
    walletBalance,
    hasInvested,
    onboardingComplete,
    ekycComplete,
    showQuickCard,
    showWalletPrompt,
    showSearchCard,
    showCashbackPrompt,
    onboardingStep,
    riskProfile,
    investmentPreferences,
    bankVerificationStatus,
    personalInfo,
    selectedFund,
    investmentAmount,
    confirmedCheckboxes,
    investmentProcessing,
    investmentSuccess,
    selectedTab,
    dismissedPrompts,
    lastPromptDismissTime,
    setUser,
    setWalletBalance,
    setHasInvested,
    setOnboardingComplete,
    setShowQuickCard,
    setShowWalletPrompt,
    setShowSearchCard,
    setShowCashbackPrompt,
    setOnboardingStep,
    setRiskProfile,
    setInvestmentPreferences,
    setBankVerificationStatus,
    setPersonalInfo,
    setSelectedFund,
    setInvestmentAmount,
    setConfirmedCheckboxes,
    setInvestmentProcessing,
    setInvestmentSuccess,
    dismissPrompt,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
