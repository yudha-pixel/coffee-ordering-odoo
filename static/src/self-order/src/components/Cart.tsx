import { useState } from 'react';
import { ArrowLeft, Minus, Plus, X, Trash2, Tag, CreditCard, Wallet, Banknote, QrCode } from 'lucide-react';
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

interface CartProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  appliedVoucher: Voucher | null;
  availableVouchers: Voucher[];
  onUpdateQuantity: (itemId: string, quantity: number, customizations?: any) => void;
  onRemoveItem: (itemId: string, customizations?: any) => void;
  onBack: () => void;
  onApplyVoucher: (code: string, total: number) => boolean;
  onRemoveVoucher: () => void;
  onProceedToPayment: () => void;
  onPaymentComplete: (paymentMethod: string, transactionId: string, voucherCode?: string) => void;
}

export default function Cart({
  items,
  subtotal,
  discount,
  total,
  appliedVoucher,
  availableVouchers,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onApplyVoucher,
  onRemoveVoucher,
  // onProceedToPayment,
  onPaymentComplete
}: CartProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [voucherCode, setVoucherCode] = useState('');
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cashPaymentCode, setCashPaymentCode] = useState<string>('');
  const [showCashQR, setShowCashQR] = useState(false);

  const handleApplyVoucher = () => {
    if (voucherCode.trim()) {
      const success = onApplyVoucher(voucherCode, subtotal);
      if (success) {
        setVoucherCode('');
        setShowVoucherInput(false);
      } else {
        alert('Invalid voucher code or minimum order not met');
      }
    }
  };

  const generateCashPaymentCode = () => {
    return `CASH${Date.now().toString().slice(-6)}`;
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    
    if (method === 'cash') {
      const code = generateCashPaymentCode();
      setCashPaymentCode(code);
      setShowCashQR(true);
    } else {
      setShowCashQR(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      const transactionId = selectedPaymentMethod === 'cash' 
        ? cashPaymentCode
        : `TXN${Date.now()}`;
      
      onPaymentComplete(selectedPaymentMethod, transactionId, appliedVoucher?.code);
      setIsProcessingPayment(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'ewallet', name: 'E-Wallet (GoPay, OVO, DANA)', icon: <Wallet className="w-5 h-5" /> },
    { id: 'cash', name: 'Cash Payment', icon: <Banknote className="w-5 h-5" /> }
  ];

  return (
    <div className="relative size-full bg-white dark:bg-gray-900">
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
            <h1 className="text-xl font-bold text-white">Your Cart</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <div className="text-4xl">🛒</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Add some delicious items to get started!</p>
            <Button
              onClick={onBack}
              className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-6 py-3 rounded-xl"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                            {item.customizations && (
                              <div className="mt-1 space-y-1">
                                {item.customizations.size !== 'Regular' && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Size: {item.customizations.size}</p>
                                )}
                                {item.customizations.milk !== 'Regular' && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Milk: {item.customizations.milk}</p>
                                )}
                                {item.customizations.notes && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Note: {item.customizations.notes}</p>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => onRemoveItem(item.id, item.customizations)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded-full transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.customizations)}
                              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <span className="font-semibold text-gray-900 dark:text-gray-100 min-w-[2ch] text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.customizations)}
                              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                          
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            Rp {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-green-600" />
                    Voucher & Discounts
                  </h3>
                  {!showVoucherInput && !appliedVoucher && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVoucherInput(true)}
                      className="text-[#84482b] border-[#84482b]"
                    >
                      Add Voucher
                    </Button>
                  )}
                </div>

                {appliedVoucher ? (
                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">{appliedVoucher.code}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{appliedVoucher.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onRemoveVoucher}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : showVoucherInput ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                        placeholder="Enter voucher code"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84482b] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                      <Button
                        onClick={handleApplyVoucher}
                        className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-4 py-2 rounded-lg"
                      >
                        Apply
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowVoucherInput(false);
                        setVoucherCode('');
                      }}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available vouchers:</p>
                    <div className="grid gap-2">
                      {availableVouchers.slice(0, 2).map((voucher) => (
                        <button
                          key={voucher.code}
                          onClick={() => {
                            setVoucherCode(voucher.code);
                            handleApplyVoucher();
                          }}
                          className="text-left p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{voucher.code}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{voucher.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                      className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                        selectedPaymentMethod === method.id
                          ? 'border-[#84482b] bg-[#84482b]/5 dark:bg-[#84482b]/10'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedPaymentMethod === method.id 
                            ? 'bg-[#84482b] text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {method.icon}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{method.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cash Payment QR Code */}
              {showCashQR && (
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <QrCode className="w-5 h-5 mr-2" />
                    Cash Payment Code
                  </h3>
                  <div className="text-center">
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-xs text-gray-600 text-center">
                        QR Code<br/>
                        <span className="font-mono text-[10px]">{cashPaymentCode}</span>
                      </div>
                    </div>
                    <p className="font-mono text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                      {cashPaymentCode}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Show this code to cashier or scan QR code to complete payment
                    </p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="text-gray-900 dark:text-gray-100">Rp {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-Rp {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                    <span className="text-gray-900 dark:text-gray-100">Rp 2,000</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-gray-900 dark:text-gray-100">Rp {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePaymentSubmit}
                disabled={!selectedPaymentMethod || isProcessingPayment}
                className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-4 text-lg font-semibold rounded-xl disabled:bg-gray-300"
              >
                {isProcessingPayment ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Pay • Rp ${total.toLocaleString()}`
                )}
              </Button>
            </div>
          </div>
        )}
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