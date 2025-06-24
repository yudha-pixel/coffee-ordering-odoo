import { Check, Clock, Phone, MessageCircle, Eye } from 'lucide-react';
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

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  discount?: number;
  orderDate: Date;
  status: 'preparing' | 'ready' | 'served' | 'done';
  paymentMethod?: string;
  transactionId?: string;
  tableNumber?: string;
  voucherCode?: string;
  paymentStatus?: 'pending' | 'completed' | 'waiting_cash_confirmation';
}

interface PaymentSuccessProps {
  order: Order;
  onContinue: () => void;
  onViewOrder: () => void;
  onContactSupport: () => void;
}

export default function PaymentSuccess({ order, onContinue, onViewOrder, onContactSupport }: PaymentSuccessProps) {
  const getStatusMessage = () => {
    if (order.paymentMethod === 'cash' && order.paymentStatus === 'waiting_cash_confirmation') {
      return {
        title: 'Order Generated!',
        subtitle: 'Please proceed to the counter to complete payment',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200',
        iconBg: 'bg-amber-500',
        textColor: 'text-amber-900'
      };
    }
    
    return {
      title: 'Payment Successful!',
      subtitle: 'Your order has been confirmed and is being prepared',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500',
      textColor: 'text-green-900'
    };
  };

  const statusInfo = getStatusMessage();

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'ewallet': return 'E-Wallet';
      case 'cash': return 'Cash on Pickup';
      default: return method;
    }
  };

  const getEstimatedTime = () => {
    const orderTime = new Date(order.orderDate);
    const estimatedTime = new Date(orderTime.getTime() + 15 * 60000); // Add 15 minutes
    return estimatedTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="relative size-full bg-white">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Success Header */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-2xl p-6 text-center`}>
          <div className={`w-16 h-16 ${statusInfo.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {order.paymentMethod === 'cash' && order.paymentStatus === 'waiting_cash_confirmation' ? (
              <Clock className="w-8 h-8 text-white" />
            ) : (
              <Check className="w-8 h-8 text-white" />
            )}
          </div>
          
          <h2 className={`text-xl font-bold ${statusInfo.textColor} mb-2`}>
            {statusInfo.title}
          </h2>
          <p className={`${statusInfo.textColor} opacity-80`}>
            {statusInfo.subtitle}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium text-gray-900">#{order.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Table Number</span>
              <span className="font-medium text-gray-900">{order.tableNumber}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-900">{formatPaymentMethod(order.paymentMethod || '')}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Order Time</span>
              <span className="font-medium text-gray-900">
                {new Date(order.orderDate).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Ready Time</span>
              <span className="font-medium text-gray-900">{getEstimatedTime()}</span>
            </div>
            
            {order.voucherCode && (
              <div className="flex justify-between">
                <span className="text-gray-600">Voucher Applied</span>
                <span className="font-medium text-green-600">{order.voucherCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
          
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
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
              <span>Rp {(order.total - 2000 + (order.discount || 0)).toLocaleString()}</span>
            </div>
            
            {order.discount && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-Rp {order.discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>Rp 2,000</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total Paid</span>
              <span>Rp {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
          
          <div className="space-y-3">
            {order.paymentMethod === 'cash' && order.paymentStatus === 'waiting_cash_confirmation' ? (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Go to the counter</p>
                    <p className="text-sm text-blue-700">Show your order code or QR code to complete payment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Wait at your table</p>
                    <p className="text-sm text-blue-700">Your order will be prepared and delivered to {order.tableNumber}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Payment confirmed</p>
                    <p className="text-sm text-blue-700">Your order is now being prepared</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Estimated ready time: {getEstimatedTime()}</p>
                    <p className="text-sm text-blue-700">Your order will be delivered to {order.tableNumber}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
          
          <div className="space-y-3">
            <button
              onClick={onContactSupport}
              className="w-full flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow text-left"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Get help with your order</p>
              </div>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+622112345678"
                className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Call Us</span>
              </a>
              
              <a
                href="https://wa.me/622112345678?text=Hi, I need help with my order"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onViewOrder}
            variant="outline"
            className="w-full border-[#84482b] text-[#84482b] hover:bg-[#84482b] hover:text-white py-3 rounded-xl"
          >
            <Eye className="w-5 h-5 mr-2" />
            View Order Details
          </Button>
          
          <Button
            onClick={onContinue}
            className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 rounded-xl"
          >
            Continue Shopping
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