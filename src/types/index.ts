export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  walletBalance: number;
  hasInvested: boolean;
  onboardingComplete: boolean;
  ekycComplete: boolean;
}

export interface RiskProfile {
  investmentTimeline: string;
  riskComfort: string;
}

export interface OnboardingProgress {
  id?: string;
  userId: string;
  currentStep: number;
  riskProfile: RiskProfile;
  investmentPreferences: string[];
  personalInfo: PersonalInfo;
  bankVerificationStatus: 'pending' | 'success' | 'failed';
  completedAt?: string;
}

export interface PersonalInfo {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phone: string;
  occupation?: string;
  annualIncome?: string;
}

export interface Investment {
  id: string;
  userId: string;
  fundName: string;
  fundCategory: string;
  amount: number;
  currentValue: number;
  status: string;
  referenceNumber: string;
  investedAt: string;
}

export interface Fund {
  id: string;
  name: string;
  category: string;
  description: string;
  minimumInvestment: number;
  expectedReturns: string;
  riskLevel: string;
  withdrawalTimeline: string;
}

export interface SupportMessage {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'verification' | 'general';
}

export interface AppState {
  user: User | null;
  userLoggedIn: boolean;
  walletBalance: number;
  hasInvested: boolean;
  onboardingComplete: boolean;
  ekycComplete: boolean;
  showQuickCard: boolean;
  showWalletPrompt: boolean;
  showSearchCard: boolean;
  showCashbackPrompt: boolean;
  onboardingStep: number;
  riskProfile: RiskProfile;
  investmentPreferences: string[];
  bankVerificationStatus: 'pending' | 'success' | 'failed' | 'manual-review';
  personalInfo: PersonalInfo;
  selectedFund: Fund | null;
  investmentAmount: number;
  confirmedCheckboxes: boolean[];
  investmentProcessing: boolean;
  investmentSuccess: boolean;
  selectedTab: string;
  dismissedPrompts: string[];
  lastPromptDismissTime: Record<string, number>;
  supportMessages: SupportMessage[];
  unreadMessages: number;
}
