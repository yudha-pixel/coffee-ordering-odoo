import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Banknote, QrCode, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from "../assets/LogoWhite.png";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  customizations?: {
    size: string;
    milk: string;
    toppings: string[];
    notes: string;
  };
}

interface Voucher {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  description: string;
  isActive: boolean;
}

interface PaymentProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  appliedVoucher: Voucher | null;
  availableVouchers: Voucher[];
  onBack: () => void;
  onApplyVoucher: (code: string, cartTotal: number) => boolean;
  onRemoveVoucher: () => void;
  onPaymentComplete: (paymentMethod: string, transactionId: string, voucherCode?: string) => void;
}

export default function Payment({
  items,
  subtotal,
  discount,
  total,
  appliedVoucher,
  onBack,
  onPaymentComplete
}: PaymentProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCashQR, setShowCashQR] = useState(false);
  // const [cashCode, setCashCode] = useState('');
  const [cashCode] = useState('');
  const [copied, setCopied] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, Mastercard, etc.'
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'GoPay, OVO, DANA, etc.'
    },
    {
      id: 'cash',
      name: 'Cash on Pickup',
      icon: <Banknote className="w-6 h-6" />,
      description: 'Pay at counter with QR code'
    }
  ];

  const finalTotal = total + 2000; // Include service fee

  // const generateCashCode = () => {
  //   const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   setCashCode(code);
  //   return code;
  // };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    
    if (methodId === 'cash') {
      // const code = generateCashCode();
      setShowCashQR(true);
    } else {
      setShowCashQR(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(cashCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const transactionId = Date.now().toString();
      onPaymentComplete(
        selectedPaymentMethod, 
        transactionId,
        appliedVoucher?.code
      );
      setIsProcessing(false);
    }, selectedPaymentMethod === 'cash' ? 1000 : 3000);
  };

  return (
    <div className="relative size-full bg-white">
      {/* Header */}
      <div className="bg-[#167dda] h-16 overflow-clip relative shrink-0 w-full">
        <div className="flex flex-row items-center relative size-full px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-white">Payment</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.name}
                    {item.customizations && item.customizations.size !== 'Regular' && ` (${item.customizations.size})`}
                  </p>
                  {item.customizations && item.customizations.milk !== 'Regular' && (
                    <p className="text-sm text-gray-500">• {item.customizations.milk}</p>
                  )}
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount {appliedVoucher && `(${appliedVoucher.code})`}</span>
                <span>-Rp {discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>Rp 2,000</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>Rp {finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`w-full p-4 border-2 rounded-2xl transition-all text-left ${
                  selectedPaymentMethod === method.id
                    ? 'border-[#84482b] bg-[#84482b]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl ${
                    selectedPaymentMethod === method.id
                      ? 'bg-[#84482b] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === method.id
                      ? 'border-[#84482b] bg-[#84482b]'
                      : 'border-gray-300'
                  }`}>
                    {selectedPaymentMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cash Payment QR Code */}
        {showCashQR && selectedPaymentMethod === 'cash' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Cash Payment Code</h3>
                <p className="text-amber-700 text-sm mb-4">
                  Show this code to the cashier or scan the QR code at the counter
                </p>
                
                <div className="bg-white border-2 border-amber-300 rounded-xl p-4 mb-4">
                  <div className="text-3xl font-bold text-amber-900 mb-2">{cashCode}</div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors mx-auto"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                
                {/* Mock QR Code */}
                <div className="w-32 h-32 bg-white border-2 border-amber-300 rounded-xl mx-auto flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-amber-600">
                Order will be confirmed once payment is verified by cashier
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="sticky bottom-4">
          <Button
            onClick={handlePayment}
            disabled={!selectedPaymentMethod || isProcessing}
            className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-4 text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>
                  {selectedPaymentMethod === 'cash' 
                    ? 'Generating Order...' 
                    : 'Processing Payment...'
                  }
                </span>
              </div>
            ) : (
              selectedPaymentMethod === 'cash' 
                ? `Generate Order • Rp ${finalTotal.toLocaleString()}`
                : `Pay Now • Rp ${finalTotal.toLocaleString()}`
            )}
          </Button>
        </div>
      </div>

      {/* Powered By Footer */}
      <div className="bg-[#000000] p-4">
        <div className="flex flex-row items-center justify-center gap-[5px]">
          <div className="font-['Poppins:Medium',_sans-serif] font-medium leading-[0] not-italic text-[#ffffff] text-[12px] text-right tracking-[-0.06px]">
            <p className="block leading-[1.35]">Powered By </p>
          </div>
          <div
            className="aspect-[960/320] bg-center bg-cover bg-no-repeat h-4 shrink-0"
            style={{ backgroundImage: `url('${LogoWhite}')` }}
          />
        </div>
      </div>
    </div>
  );
}