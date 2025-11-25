import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Shield, Info, MessageCircle } from 'lucide-react';
import ExitConfirmationModal from '../components/ExitConfirmationModal';

const InvestConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFinal = searchParams.get('step') === 'final';

  const { selectedFund, investmentAmount, walletBalance, confirmedCheckboxes, setConfirmedCheckboxes } =
    useAppContext();
  const [checkboxes, setCheckboxes] = useState<boolean[]>(confirmedCheckboxes);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  if (!selectedFund) {
    navigate('/invest-products');
    return null;
  }

  const handleCheckbox = (index: number) => {
    const updated = [...checkboxes];
    updated[index] = !updated[index];
    setCheckboxes(updated);
    setConfirmedCheckboxes(updated);
  };

  const allChecked = checkboxes.every((checked) => checked);

  const handleProceed = () => {
    navigate('/invest-confirmation?step=final');
  };

  const handleConfirm = () => {
    navigate('/invest-processing');
  };

  const handleBackClick = (destination: string) => {
    setPendingNavigation(destination);
    setShowExitModal(true);
  };

  const handleContinueInvestment = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
  };

  const handleLearnMore = () => {
    setShowExitModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeaveAnyway = () => {
    setShowExitModal(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  if (!isFinal) {
    return (
      <>
        <ExitConfirmationModal
          isOpen={showExitModal}
          onClose={() => setShowExitModal(false)}
          onRestart={handleContinueInvestment}
          onLearnMore={handleLearnMore}
          onLeaveAnyway={handleLeaveAnyway}
        />
        <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center max-w-md mx-auto">
            <button onClick={() => handleBackClick('/invest-products')} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Ready to Invest</h1>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-6 pb-24">
          <div className="bg-white rounded-xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Details</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Fund Name</span>
                <span className="font-semibold text-gray-900">{selectedFund.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fund Category</span>
                <span className="font-medium text-gray-900">{selectedFund.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Amount</span>
                <span className="font-bold text-[#EE4D2D] text-lg">RM {investmentAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Starting Date</span>
                <span className="font-medium text-gray-900">Today, {new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })} Malaysia Time</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Fund Description:</span> {selectedFund.description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Investment Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Minimum Investment</p>
                <p className="text-sm font-medium text-gray-900">
                  RM{selectedFund.minimumInvestment} (You're investing RM{investmentAmount})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Returns</p>
                <p className="text-sm font-medium text-gray-900">
                  Historically {selectedFund.expectedReturns}, varies by market
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFund.riskLevel} (Some volatility expected)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Withdrawal Timeline</p>
                <p className="text-sm font-medium text-gray-900">
                  Anytime, usually processed within {selectedFund.withdrawalTimeline}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 mb-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Trust-Building</p>
                <p className="text-xs text-gray-700 mb-2">Regulated by Securities Commission Malaysia</p>
                <p className="text-xs text-gray-700 mb-2">Managed by Licensed Fund Partner</p>
                <p className="text-xs text-gray-600">Time to Complete: Less than 2 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#EE4D2D] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                Rest assured, your investment won't start until you confirm. You can review everything once more on
                the next screen.
              </p>
            </div>
          </div>

          <details className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Questions? Quick answers below
            </summary>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Can I withdraw anytime?</p>
                <p className="text-gray-600">Yes, withdrawals typically process in {selectedFund.withdrawalTimeline}.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Is my investment safe?</p>
                <p className="text-gray-600">
                  Your investment is regulated by Securities Commission Malaysia and managed by licensed fund managers.
                </p>
              </div>
            </div>
          </details>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-md mx-auto space-y-2">
            <button
              onClick={handleProceed}
              className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
              style={{ minHeight: '44px' }}
            >
              Proceed to Confirmation
            </button>
            <button
              onClick={() => handleBackClick('/invest-products')}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-900"
            >
              Learn More / Change Amount
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <ExitConfirmationModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onRestart={handleContinueInvestment}
        onLearnMore={handleLearnMore}
        onLeaveAnyway={handleLeaveAnyway}
      />
      <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center max-w-md mx-auto">
          <button onClick={() => handleBackClick('/invest-confirmation')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Confirm Your Investment</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Fund Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fund Name</span>
              <span className="font-semibold text-gray-900">{selectedFund.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-[#EE4D2D]">RM {investmentAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deduction Source</span>
              <span className="font-medium text-gray-900">ShopeePay Wallet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Wallet Balance</span>
              <span className="font-semibold text-green-600">RM {walletBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Transaction Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction Type</span>
              <span className="font-medium text-gray-900">First-Time Investment</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Time</span>
              <span className="font-medium text-gray-900">Instant approval</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction Fee</span>
              <span className="font-medium text-green-600">None (Waived)</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              <strong>Risk Acknowledgment:</strong> I understand this is a market-linked investment and returns vary.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Withdrawal Flexibility:</strong> I can withdraw my funds anytime. Withdrawals typically process
              in 2-3 business days.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Terms Acceptance:</strong> I have read and agree to the Fund Terms and ShopeePay Investment
              Terms.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Required Confirmations</h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxes[0]}
                onChange={() => handleCheckbox(0)}
                className="w-5 h-5 text-[#EE4D2D] rounded focus:ring-[#EE4D2D] mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                I confirm my investment amount is RM {investmentAmount.toFixed(2)}.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxes[1]}
                onChange={() => handleCheckbox(1)}
                className="w-5 h-5 text-[#EE4D2D] rounded focus:ring-[#EE4D2D] mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                I understand my money will be deducted from my ShopeePay Wallet today.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxes[2]}
                onChange={() => handleCheckbox(2)}
                className="w-5 h-5 text-[#EE4D2D] rounded focus:ring-[#EE4D2D] mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                I have read the risk disclosure and fund information.
              </span>
            </label>
          </div>
        </div>

        {investmentAmount > walletBalance && (
          <div className="bg-red-50 rounded-xl p-4 mb-6 border-l-4 border-red-500">
            <p className="text-sm text-red-700 font-medium">
              Insufficient Balance. Please update your investment amount or add funds to your wallet.
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto space-y-2">
          <button
            onClick={handleConfirm}
            disabled={!allChecked || investmentAmount > walletBalance}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              allChecked && investmentAmount <= walletBalance
                ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ minHeight: '44px' }}
          >
            Confirm & Invest
          </button>
          <div className="flex justify-center gap-4 text-sm">
            <button onClick={() => handleBackClick('/invest-confirmation')} className="text-gray-600 hover:text-gray-900">
              Back / Change Amount
            </button>
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default InvestConfirmation;
