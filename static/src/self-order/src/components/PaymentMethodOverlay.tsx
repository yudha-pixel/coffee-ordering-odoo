import { X, CheckCircle } from 'lucide-react';
// Note: You will need to add a QRIS logo to your `src/assets` folder for the icon to display.
// You can find one with a quick search online.
import qrisLogo from '../assets/qris-logo.svg'; 

interface PaymentMethodOverlayProps {
  currentMethod: string;
  onClose: () => void;
  onSelect: (method: string) => void;
}

// Define available payment options
const paymentOptions = [
  { id: 'QRIS', name: 'QRIS', logo: qrisLogo, description: 'Pay with any supporting app' },
  { id: 'Card', name: 'Credit/Debit Card', logo: null, description: 'Coming Soon' },
  { id: 'Cash', name: 'Cash at Counter', logo: null, description: 'Pay directly to the cashier' },
];

// A helper component to render payment icons
const PaymentIcon = ({ method, logo }: { method: string; logo: string | null }) => {
    if (method === 'QRIS' && logo) {
        return <img src={logo} alt="QRIS" className="w-8 h-8 object-contain" />;
    }
    // Placeholder for other methods
    return <div className="w-8 h-8 bg-gray-200 rounded-md" />;
};

export default function PaymentMethodOverlay({ currentMethod, onClose, onSelect }: PaymentMethodOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-10 duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Select Payment Method</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              disabled={option.id !== 'QRIS'} // Example: Disabling unavailable options
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                currentMethod === option.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <PaymentIcon method={option.id} logo={option.logo} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{option.name}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              {currentMethod === option.id && (
                <CheckCircle className="w-6 h-6 text-amber-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}