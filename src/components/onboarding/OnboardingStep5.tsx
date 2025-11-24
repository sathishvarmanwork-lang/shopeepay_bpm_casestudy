import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingStep5: React.FC<Props> = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const { personalInfo, setPersonalInfo, setOnboardingComplete, setEkycComplete, updateUser } = useAppContext();

  const [formData, setFormData] = useState(personalInfo);
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setPersonalInfo(formData);
    setShowSuccess(true);

    setTimeout(() => {
      setOnboardingComplete(true);
      setEkycComplete(true);
      updateUser({
        onboardingComplete: true,
        ekycComplete: true,
      });
      navigate('/invest-products');
    }, 2000);
  };

  const isValid =
    formData.fullName &&
    formData.idNumber &&
    formData.dateOfBirth &&
    formData.address &&
    formData.email &&
    formData.phone &&
    confirmed;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
          <p className="text-gray-600 mb-4">Your investment account is ready to use</p>
          <p className="text-[#EE4D2D] font-semibold mb-6">Enjoy RM1 trial credit on your first investment</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EE4D2D]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 text-center">Step 5 of 5</p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= 5 ? 'bg-[#EE4D2D]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Details</h1>
        <p className="text-gray-600 mb-6">
          Please review and confirm your information
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) => handleChange('idNumber', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation (Optional)</label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (Optional)</label>
            <select
              value={formData.annualIncome}
              onChange={(e) => handleChange('annualIncome', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent"
            >
              <option value="">Select income range</option>
              <option value="Below RM50K">Below RM50K</option>
              <option value="RM50K-100K">RM50K-100K</option>
              <option value="RM100K-250K">RM100K-250K</option>
              <option value="RM250K-500K">RM250K-500K</option>
              <option value="Above RM500K">Above RM500K</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 text-[#EE4D2D] rounded focus:ring-[#EE4D2D] mt-0.5 flex-shrink-0"
            />
            <div className="text-sm">
              <p className="text-gray-900 font-medium mb-1">I confirm the information above is correct</p>
              <p className="text-gray-600 text-xs">You can update this anytime in your profile</p>
            </div>
          </label>
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
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              isValid
                ? 'bg-[#EE4D2D] text-white hover:bg-[#D43D1D]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ minHeight: '44px' }}
          >
            Submit & Complete Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep5;
