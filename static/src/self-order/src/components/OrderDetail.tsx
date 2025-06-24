import { ArrowLeft, Clock, CheckCircle, Utensils, HelpCircle, RefreshCw, MessageCircle, MapPin, Package } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from '../assets/LogoWhite.png';

// FIX: Updated CartItem interface to match App.tsx
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

// FIX: Updated Order interface to match App.tsx
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
  feedbackGiven?: boolean;
  cashPaymentCode?: string;
}

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
  onContactSupport: () => void;
  onAddToCart: (items: CartItem[]) => void;
}

export default function OrderDetail({ order, onBack, onContactSupport, onAddToCart }: OrderDetailProps) {
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return {
          icon: <Clock className="w-6 h-6" />,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          borderColor: 'border-orange-200',
          title: 'Preparing',
          description: 'Your order is being prepared by our baristas',
          progress: 25
        };
      case 'ready':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200',
          title: 'Ready',
          description: 'Your order is ready to be served',
          progress: 75
        };
      case 'served':
        return {
          icon: <Utensils className="w-6 h-6" />,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          title: 'Served',
          description: 'Your order has been served to your table',
          progress: 90
        };
      case 'done':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          title: 'Completed',
          description: 'Order completed - Thank you for dining with us!',
          progress: 100
        };
      default:
        return {
          icon: <Clock className="w-6 h-6" />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
          title: 'Processing',
          description: 'Order is being processed',
          progress: 10
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'ewallet': return 'E-Wallet';
      case 'cash': return 'Cash on Pickup';
      default: return method;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  // Track Order Steps
  const trackingSteps = [
    {
      id: 'ordered',
      title: 'Order Placed',
      description: 'Your order has been received',
      icon: <Package className="w-5 h-5" />,
      completed: true
    },
    {
      id: 'preparing',
      title: 'Preparing',
      description: 'Your order is being prepared',
      icon: <Clock className="w-5 h-5" />,
      completed: ['preparing', 'ready', 'served', 'done'].includes(order.status)
    },
    {
      id: 'ready',
      title: 'Ready',
      description: 'Your order is ready',
      icon: <CheckCircle className="w-5 h-5" />,
      completed: ['ready', 'served', 'done'].includes(order.status)
    },
    {
      id: 'served',
      title: 'Served',
      description: 'Enjoy your order!',
      icon: <Utensils className="w-5 h-5" />,
      completed: ['served', 'done'].includes(order.status)
    }
  ];

  // const generateQRCodeData = () => {
  //   if (order.cashPaymentCode) {
  //     return `CASH_PAYMENT:${order.cashPaymentCode}:${order.total}:${order.id}`;
  //   }
  //   return '';
  // };

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
            <h1 className="text-xl font-bold text-white">Order Details</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Card */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-2xl p-5`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${statusInfo.color}`}>
              {statusInfo.icon}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${statusInfo.color}`}>{statusInfo.title}</h3>
              <p className={`${statusInfo.color} opacity-80`}>{statusInfo.description}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${statusInfo.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{statusInfo.progress}% Complete</p>
        </div>

        {/* Track Order Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Track Your Order
          </h3>
          
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}>
                  {step.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className={`font-medium ${
                      step.completed 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    {step.completed && (
                      <CheckCircle className="w-4 h-4 ml-2 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
                
                {index < trackingSteps.length - 1 && (
                  <div className={`absolute left-9 mt-10 w-px h-6 ${
                    step.completed ? 'bg-green-300 dark:bg-green-700' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Estimated Time */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-xl">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <Clock className="w-4 h-4 inline mr-1" />
              {order.status === 'preparing' && 'Estimated ready time: 5-10 minutes'}
              {order.status === 'ready' && 'Your order is ready for pickup!'}
              {order.status === 'served' && 'Order served at your table'}
              {order.status === 'done' && 'Order completed'}
            </p>
          </div>
        </div>

        {/* Cash Payment QR Code */}
        {order.paymentMethod === 'cash' && order.cashPaymentCode && (
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Cash Payment Code</h3>
            <div className="text-center">
              {/* QR Code Placeholder */}
              <div className="w-32 h-32 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-3">
                <div className="text-xs text-gray-600 text-center">
                  QR Code<br/>
                  <span className="font-mono text-[10px]">{order.cashPaymentCode}</span>
                </div>
              </div>
              <p className="font-mono text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                {order.cashPaymentCode}
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Show this code to cashier or scan QR code to complete payment
              </p>
            </div>
          </div>
        )}

        {/* Order Info */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Information</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Order ID</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">#{order.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Date &amp; Time</span>
              <span className="font-medium text-gray-900 dark:text-gray-100 text-right">
                {formatDate(order.orderDate)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Table Number</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{order.tableNumber}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{formatPaymentMethod(order.paymentMethod || '')}</span>
            </div>
            
            {order.transactionId && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-right">{order.transactionId}</span>
              </div>
            )}
            
            {order.voucherCode && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Voucher Used</span>
                <span className="font-medium text-green-600">{order.voucherCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Ordered Items</h3>
          
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.name}
                    {item.customizations && item.customizations.size !== 'Regular' && ` (${item.customizations.size})`}
                  </p>
                  {item.customizations && item.customizations.milk !== 'Regular' && (
                    <p className="text-sm text-gray-500">• {item.customizations.milk}</p>
                  )}
                  {item.customizations?.notes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Note: {item.customizations.notes}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Payment Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>Rp {(order.total - 2000 + (order.discount || 0)).toLocaleString()}</span>
            </div>
            
            {order.discount && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-Rp {order.discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Service Fee</span>
              <span>Rp 2,000</span>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
              <span>Total Paid</span>
              <span>Rp {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Need Help?</h3>
          
          <button
            onClick={onContactSupport}
            className="w-full flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">Get Support</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact us about this order</p>
            </div>
          </button>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <a
              href="tel:+622112345678"
              className="flex items-center justify-center space-x-2 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">📞 Call</span>
            </a>
            
            <a
              href="https://wa.me/622112345678?text=Hi, I need help with order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Action Buttons - Changed "Reorder Items" to "Add to Cart" */}
        <div className="space-y-3">
          <Button
            onClick={() => onAddToCart(order.items)}
            className="w-full bg-[#84482b] hover:bg-[#6d3a23] text-white py-3 rounded-xl flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Add to Cart</span>
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