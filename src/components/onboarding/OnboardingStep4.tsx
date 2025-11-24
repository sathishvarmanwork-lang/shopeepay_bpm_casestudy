import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Building2, CheckCircle, AlertCircle, Loader2, Camera } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep4: React.FC<Props> = ({ onNext, onBack }) => {
  const { bankVerificationStatus, setBankVerificationStatus, setPersonalInfo } = useAppContext();
  const [stage, setStage] = useState<'selection' | 'authenticating' | 'processing' | 'success' | 'failed' | 'photo-upload'>('selection');
  const [selectedBank, setSelectedBank] = useState('');
  const [frontPhoto, setFrontPhoto] = useState(false);
  const [backPhoto, setBackPhoto] = useState(false);

  const banks = [
    'Maybank',
    'CIMB',
    'Public Bank',
    'RHB',
    'Affin Bank',
    'Hong Leong Bank',
    'AmBank',
    'UOB Malaysia',
    'Citibank Malaysia',
  ];

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
  };

  const handleProceedToBank = () => {
    setStage('authenticating');
    setTimeout(() => {
      setStage('processing');
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          setStage('success');
          setBankVerificationStatus('success');
          setPersonalInfo({
            fullName: 'Demo User',
            idNumber: '****1234',
            dateOfBirth: '1990-01-15',
            address: '123 Jalan Example, Kuala Lumpur',
            email: 'user@example.com',
            phone: '+60123456789',
          });
        } else {
          setStage('failed');
          setBankVerificationStatus('failed');
        }
      }, 2000);
    }, 1500);
  };

  const handleUseAlternative = () => {
    setStage('photo-upload');
  };

  const handleContinue = () => {
    onNext();
  };

  const handleVerifyPhotos = () => {
    if (frontPhoto && backPhoto) {
      setStage('success');
      setBankVerificationStatus('success');
      setPersonalInfo({
        fullName: 'Demo User',
        idNumber: '****1234',
        dateOfBirth: '1990-01-15',
        address: '123 Jalan Example, Kuala Lumpur',
        email: 'user@example.com',
        phone: '+60123456789',
      });
    }
  };

  if (stage === 'authenticating') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Redirecting to {selectedBank}</h2>
          <p className="text-gray-600 mb-4">Please authenticate using your bank's login method</p>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-[#EE4D2D] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
          <Loader2 className="w-12 h-12 text-[#EE4D2D] animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying your identity with {selectedBank}</h2>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Connecting to bank
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Retrieving verified data
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-[#EE4D2D] animate-spin" />
              Validating information
            </p>
          </div>
          <p className="text-xs text-gray-500">This usually takes 1-2 minutes</p>
        </div>
      </div>
    );
  }

  if (stage === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful</h2>
          <p className="text-gray-600 mb-6">Your identity has been verified through your bank</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 mb-2"><span className="font-medium">Name:</span> Demo User</p>
            <p className="text-sm text-gray-700 mb-2"><span className="font-medium">ID Number:</span> ****1234</p>
            <p className="text-sm text-gray-700"><span className="font-medium">Address:</span> 123 Jalan Example, Kuala Lumpur</p>
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors mb-3"
            style={{ minHeight: '44px' }}
          >
            Continue to ShopeePay Invest
          </button>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Data not correct? Contact Support
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4 mx-auto">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Verification Connection Failed</h2>
          <p className="text-gray-600 mb-4 text-center">We couldn't retrieve your data from {selectedBank}. This might be due to:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
            <li>Service temporarily unavailable</li>
            <li>Account mismatch</li>
            <li>Connection timeout</li>
          </ul>
          <div className="space-y-3">
            <button
              onClick={handleProceedToBank}
              className="w-full bg-[#EE4D2D] text-white py-3 rounded-lg font-semibold hover:bg-[#D43D1D] transition-colors"
              style={{ minHeight: '44px' }}
            >
              Try Again
            </button>
            <button
              onClick={handleUseAlternative}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              Verify with ID Photos Instead
            </button>
            <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">
              Contact Support
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">Our team will reach out within 30 minutes</p>
        </div>
      </div>
    );
  }

  if (stage === 'photo-upload') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-md mx-auto">
            <p className="text-sm text-gray-600 text-center">Step 4 of 5</p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
          <p className="text-gray-600 mb-6">
            We need clear photos of your ID to verify your identity. Make sure lighting is good and all details are visible.
          </p>

          <div className="space-y-4 mb-6">
            <div
              onClick={() => setFrontPhoto(true)}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                frontPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <Camera className={`w-12 h-12 mx-auto mb-3 ${frontPhoto ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="font-medium text-gray-900 mb-1">Front ID Photo</p>
              <p className="text-sm text-gray-600 mb-2">Take Photo or Upload</p>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${frontPhoto ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-600">
                  {frontPhoto ? 'Photo uploaded' : 'Pending'}
                </span>
              </div>
            </div>

            <div
              onClick={() => setBackPhoto(true)}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                backPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <Camera className={`w-12 h-12 mx-auto mb-3 ${backPhoto ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="font-medium text-gray-900 mb-1">Back ID Photo</p>
              <p className="text-sm text-gray-600 mb-2">Take Photo or Upload</p>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${backPhoto ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-600">
                  {backPhoto ? 'Photo uploaded' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Photo Requirements:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✓ Must be clear and readable</li>
              <li>✓ All four corners visible</li>
              <li>✓ No glare or shadows</li>
              <li>✓ Recent photo (within last 10 years)</li>
            </ul>
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
              onClick={handleVerifyPhotos}
              disabled={!frontPhoto || !backPhoto}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                frontPhoto && backPhoto
                  ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ minHeight: '44px' }}
            >
              Verify Photos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 text-center">Step 4 of 5</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity Quickly</h1>
        <p className="text-gray-600 mb-6">
          We can use your existing bank verification to speed things up
        </p>

        <div className="bg-blue-50 rounded-xl p-5 mb-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 mb-3">
            You've already verified your identity with your bank. We can retrieve that verified information to
            complete your investment verification faster.
          </p>
          <p className="text-xs text-gray-600">
            Your bank login credentials are never shared with ShopeePay. You'll authorize data retrieval securely
            on your bank's application.
          </p>
        </div>

        <h2 className="text-base font-semibold text-gray-900 mb-4">Select Your Bank</h2>
        <div className="space-y-2 mb-6">
          {banks.map((bank) => (
            <label
              key={bank}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBank === bank
                  ? 'border-[#EE4D2D] bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="bank"
                value={bank}
                checked={selectedBank === bank}
                onChange={(e) => handleBankSelect(e.target.value)}
                className="w-5 h-5 text-[#EE4D2D] focus:ring-[#EE4D2D]"
              />
              <div className="ml-3 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-900">{bank}</span>
              </div>
            </label>
          ))}
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          Don't see your bank? Use an alternative verification method.
        </p>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={handleProceedToBank}
            disabled={!selectedBank}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              selectedBank
                ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ minHeight: '44px' }}
          >
            {selectedBank ? `Proceed to ${selectedBank}` : 'Select Your Bank'}
          </button>
          <button
            onClick={handleUseAlternative}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            style={{ minHeight: '44px' }}
          >
            Use Alternative Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
