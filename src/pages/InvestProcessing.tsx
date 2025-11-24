import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Loader2, CheckCircle } from 'lucide-react';

const InvestProcessing: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFund, investmentAmount, updateUser, setHasInvested } = useAppContext();
  const [stage, setStage] = React.useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 1500);
    const timer2 = setTimeout(() => setStage(3), 3000);
    const timer3 = setTimeout(() => {
      updateUser({
        hasInvested: true,
        walletBalance: 150 - investmentAmount,
      });
      setHasInvested(true);
      navigate('/invest-success');
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate, investmentAmount, updateUser, setHasInvested]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
        <div className="mb-6">
          <Loader2 className="w-16 h-16 text-[#EE4D2D] animate-spin mx-auto" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing your investment...</h2>
        <p className="text-gray-600 mb-8">Please wait while we process your transaction</p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 justify-center">
            {stage >= 1 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
            <span className={`text-sm ${stage >= 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Validating information...
            </span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            {stage >= 2 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : stage === 1 ? (
              <Loader2 className="w-5 h-5 text-[#EE4D2D] animate-spin" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
            <span className={`text-sm ${stage >= 2 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Checking wallet balance...
            </span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            {stage >= 3 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : stage === 2 ? (
              <Loader2 className="w-5 h-5 text-[#EE4D2D] animate-spin" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
            <span className={`text-sm ${stage >= 3 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Activating your investment...
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500">Usually completes in under 10 seconds</p>

        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Fund:</span> {selectedFund?.name}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Amount:</span> RM {investmentAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestProcessing;
