import { ArrowLeft, Clock, CheckCircle, Coffee, RotateCcw, ChevronRight, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from '../assets/LogoWhite.png';
import {Customizations} from "@/types";

// FIX: Updated CartItem interface to match App.tsx
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  customizations?: Customizations;
}

// FIX: Updated Order interface to match App.tsx
interface Order {
  id: string;
  items: CartItem[];
  total: number;
  orderDate: Date;
  status: 'completed' | 'preparing' | 'ready' | 'served' | 'done';
}

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
  // onOrderClick: (order: Order) => void;
  onReorder: (orderItems: CartItem[]) => void;
}

// export default function OrderHistory({ orders, onBack, onOrderClick, onReorder }: OrderHistoryProps) {
export default function OrderHistory({ orders, onBack, onReorder }: OrderHistoryProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ready':
        return <Coffee className="w-5 h-5 text-blue-500" />;
      case 'served':
        return <Utensils className="w-5 h-5 text-green-500" />;
      case 'completed':
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'served':
        return 'Served';
      case 'completed':
      case 'done':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'served':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
      case 'done':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const orderDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - orderDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today, ${orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return orderDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
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
            <h1 className="text-xl font-bold text-white">Order History</h1>
          </div>
          
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Coffee className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm">
              Start exploring our delicious menu and place your first order to see it here.
            </p>
            <Button onClick={onBack} className="bg-[#84482b] hover:bg-[#6d3a23] text-white px-8 py-3">
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                // onClick={() => onOrderClick(order)}
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">Order #{order.id.slice(-6)}</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{getStatusText(order.status)}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      Rp {order.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.reduce((total, item) => total + item.quantity, 0)} items
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="space-y-3 mb-4">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        {item.customizations && (
                          <p className="text-xs text-gray-500">
                            {item.customizations.size} • {item.customizations.milk}
                            {item.customizations.notes && ` • ${item.customizations.notes}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">×{item.quantity}</p>
                        <p className="text-xs text-gray-500">Rp {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-500">
                        +{order.items.length - 2} more items
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering order click
                      onReorder(order.items);
                    }}
                    className="flex-1 border-[#84482b] text-[#84482b] hover:bg-[#84482b] hover:text-white rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                  
                  {order.status === 'preparing' && (
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering order click
                        alert('Tracking feature coming soon!');
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Track Order
                    </Button>
                  )}
                  
                  {order.status === 'ready' && (
                    <Button
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering order click
                        alert('Ready for pickup!');
                      }}
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Ready!
                    </Button>
                  )}
                </div>
              </div>
            ))}
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