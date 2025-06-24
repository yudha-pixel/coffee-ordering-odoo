import { useState } from 'react';
import { ArrowLeft, Bell, Check, AlertTriangle, Info, X, Eye } from 'lucide-react';
import { Button } from './ui/button';
import LogoWhite from '../assets/LogoWhite.png';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
  actionLabel?: string;
  actionHandler?: () => void;
}

interface Order {
  id: string;
  items: any[];
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

interface NotificationsPageProps {
  onBack: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onShowOrderDetail: (order: Order) => void;
  orders: Order[];
}

export default function NotificationsPage({ 
  onBack, 
  notifications, 
  onMarkAsRead, 
  onShowOrderDetail, 
  orders 
}: NotificationsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') {
      return !notification.isRead;
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <X className="w-5 h-5 text-red-600" />;
    }
  };

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleNotificationAction = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }

    // Handle custom action if available
    if (notification.actionHandler) {
      notification.actionHandler();
    } else if (notification.actionLabel && notification.actionLabel.includes('Order')) {
      // Try to find and show order detail if it's order-related
      const orderMatch = notification.message.match(/#(\d+)/);
      if (orderMatch) {
        const orderId = orderMatch[1];
        const order = orders.find(o => o.id === orderId);
        if (order) {
          onShowOrderDetail(order);
        }
      }
    }
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        onMarkAsRead(notification.id);
      }
    });
  };

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
            <h1 className="text-xl font-bold text-white">Notifications</h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Filter and Stats */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {notifications.length} Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="text-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#84482b] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-[#84482b] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                {filter === 'unread' 
                  ? 'All notifications have been read.' 
                  : 'You will receive notifications about your orders, promotions, and account updates here.'
                }
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-2xl p-4 transition-all cursor-pointer hover:shadow-md ${
                    getNotificationBgColor(notification.type)
                  } ${
                    !notification.isRead 
                      ? 'border-l-4 border-l-blue-500' 
                      : ''
                  }`}
                  onClick={() => handleNotificationAction(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {notification.message}
                      </p>
                      
                      {notification.actionLabel && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationAction(notification);
                          }}
                          className="bg-[#84482b] hover:bg-[#6d3a23] text-white text-xs px-3 py-1 h-auto"
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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