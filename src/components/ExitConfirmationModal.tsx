import React from 'react';
import { AlertCircle, Shield, ArrowRight } from 'lucide-react';

interface ExitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onLearnMore: () => void;
  onLeaveAnyway: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  onLearnMore,
  onLeaveAnyway,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                You're leaving without investing
              </h3>
              <p className="text-sm text-gray-700">
                Don't worry — your funds are completely safe in your wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  No money has been deducted
                </p>
                <p className="text-xs text-gray-700">
                  You can return to invest anytime without re-entering your information. Your selections are saved.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-[#EE4D2D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Investment</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onLearnMore}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More About Investing
            </button>

            <button
              onClick={onLeaveAnyway}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-900 transition-colors"
            >
              Leave Without Investing
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Questions? Our support team is available 24/7 to help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
