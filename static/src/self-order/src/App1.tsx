import { useState, useEffect, useCallback } from "react";

// Icon
import {Check,Bell,Plus,WifiOff} from "lucide-react";

import Cart from "./components/Cart";
import PaymentSuccess from "./components/PaymentSuccess";
import MenuDetailOverlay from "./components/MenuDetailOverlay";
import OrderHistory from "./components/OrderHistory";
import OrderDetail from "./components/OrderDetail";
import SettingsPage from "./components/Settings";
import NotificationsPage from "./components/Notifications";
import Login from "./components/Login.tsx";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import FloatingCartCard from "./components/FloatingCartCard";
import ContactSupport from "./components/ContactSupport";
import DeveloperFeedback from "./components/DeveloperFeedback";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

// Component Import
import LoadingSkeleton from "./components/LoadingSkeleton";
import FeedbackModal from "./components/FeedbackModal.tsx";
import ErrorState from "./components/ErrorState.tsx";
import Logo from "./components/Logo.tsx";
import MenuItemComponent from "./components/MenuItemComponent.tsx";
import SearchSection from "./components/SearchSection.tsx";
import NavigationDrawer from "./components/NavigationDrawer.tsx";
import AnimatedHamburgerIcon from "./components/AnimatedHamburgerIcon.tsx";
import FavoritesSection from "./components/FavoritesSection.tsx";

// Data Imports
import { availableVouchers } from "./data/vouchers";
import { useProducts } from "@/hooks/useProducts.ts";
import { useAppManager } from '@/hooks/useAppManager';


// Type Imports
import {
  CartItem,
  FavoriteItem,
  OrderItem,
  OrderHistoryItem,
  UserUser,
  Voucher,
  Notification,
  Customizations, Product
} from "./types";


// Timeout duration for data loading
const LOADING_TIMEOUT = 10000; // 10 seconds

export default function App() {
  const [cart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderHistoryItem | null>(null);
  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const [showAddedNotification] = useState(false);
  const [addedItem] = useState<CartItem | null>(null);
  const [showComboNotification, setShowComboNotification] = useState(false);
  const [comboAddedItem, setComboAddedItem] = useState<Product | null>(null);
  const [showMenuDetail, setShowMenuDetail] = useState(false);
  const [selectedMenuItem] = useState<Product | null>(null);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [showDeveloperFeedback, setShowDeveloperFeedback] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [user, setUser] = useState<UserUser | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState<OrderHistoryItem | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [criticalDataLoaded, setCriticalDataLoaded] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const manager = useAppManager();
  const { productGroups, loading, error } = useProducts();
  const allProducts = productGroups.flatMap(g => g.products.map(p => ({...p, category: g.category_name})));
  // const filteredItems = useFilteredProducts(allProducts, searchTerm, selectedCategory, () => manager.getLastOrderItems());


  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (loadingState === 'offline') {
        handleRetry();
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      setLoadingState('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadingState]);

  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  // Enhanced data loading with error handling and timeout
  const loadData = useCallback(async (attempt: number = 1): Promise<void> => {
    try {
      setLoadingState('loading');

      // Check if we're offline
      if (!navigator.onLine) {
        setLoadingState('offline');
        return;
      }

      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), LOADING_TIMEOUT);
      });

      // Simulate critical data loading first (header, navigation)
      const criticalDataPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          setCriticalDataLoaded(true);
          resolve();
        }, 500);
      });

      // Load critical data first
      await Promise.race([criticalDataPromise, timeoutPromise]);

      // Then load the rest of the data
      const dataLoadingPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          const savedFavorites = localStorage.getItem('coffee-favorites');
          const savedOrders = localStorage.getItem('coffee-orders');
          const savedUser = localStorage.getItem('coffee-user');
          const savedNotifications = localStorage.getItem('coffee-notifications');
          const savedDarkMode = localStorage.getItem('coffee-dark-mode');

          if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
          }

          if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
          }

          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }

          if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
          }

          if (savedDarkMode) {
            const darkMode = JSON.parse(savedDarkMode);
            setIsDarkMode(darkMode);
            document.documentElement.classList.toggle('dark', darkMode);
          }

          resolve();
        }, attempt === 1 ? 1000 : 2000); // Faster retry for subsequent attempts
      });

      await Promise.race([dataLoadingPromise, timeoutPromise]);
      setLoadingState('success');
      setRetryCount(0);

    } catch (error) {
      console.error('Loading error:', error);

      if (error instanceof Error && error.message === 'timeout') {
        setLoadingState('timeout');
      } else if (!navigator.onLine) {
        setLoadingState('offline');
      } else {
        setLoadingState('error');
      }
    }
  }, []);

  // Handle retry
  const handleRetry = useCallback(() => {
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);
    loadData(newRetryCount);
  }, [retryCount, loadData]);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add notification function
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Number(Date.now()),
      timestamp: new Date(),
      isRead: false
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('coffee-notifications', JSON.stringify(updatedNotifications));
  };

  // Add offline notification when connection is restored
  useEffect(() => {
    if (isOnline && loadingState === 'success') {
      // Add notification when connection is restored
      const offlineNotifications = notifications.filter(n => n.type === 'warning' && n.message.includes('offline'));
      if (offlineNotifications.length === 0) {
        addNotification({
          title: 'Connection Restored',
          message: 'You\'re back online! All features are now available.',
          type: 'success'
        });
      }
    }
  }, [isOnline, loadingState]);

  const filteredItems = allProducts.filter(item => {
    const productName = (item.name || item.description || '').toLowerCase()
    const matchesSearch = productName.includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false;

    switch (selectedCategory) {
      case "All":
        return true;
      case "New":
        return item.isNew;
      case "Recommended":
        return item.isRecommend;
      case "Most Ordered":
        return (item.orderCount || 0) >= 150;
      case "Last Order":
        { const lastOrderItemIds = getLastOrderItems();
        return lastOrderItemIds.includes(item.id); }
      default:
        return item.category === selectedCategory;
    }
  });


  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('coffee-dark-mode', JSON.stringify(newDarkMode));
  };

  // Check for completed orders that need feedback
  // useEffect(() => {
  //   const completedOrders = orders.filter(order =>
  //     order.status === 'completed' && !order.feedbackGiven
  //   );

  //   if (completedOrders.length > 0 && !showFeedbackModal) {
  //     // Show feedback for the most recent completed order
  //     setFeedbackOrder(completedOrders[0]);
  //     setShowFeedbackModal(true);
  //   }
  // }, [orders, showFeedbackModal]);

  const getFavoriteItem = (itemId: number, customizations?: Customizations): FavoriteItem | null => {
    if (!customizations) return null;
    const customString = JSON.stringify(customizations);
    return favorites.find(fav =>
      fav.menuItemId === itemId &&
      JSON.stringify(fav.customizations) === customString
    ) || null;
  };

  const isItemFavorited = (itemId: number, customizations?: Customizations) => {
    return !!getFavoriteItem(itemId, customizations);
  };

  // Handle register with notification
  const handleRegister = (userData: {name: string; email: string; phone: string; password: string}) => {
    const newUser: UserUser = {
      id: Number(Date.now()),
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    };

    setUser(newUser);
    localStorage.setItem('coffee-user', JSON.stringify(newUser));
    setShowRegister(false);

    // Add welcome notification
    addNotification({
      title: 'Account Created!',
      message: `Welcome ${newUser.name}! Your account has been successfully created.`,
      type: 'success'
    });
  };

  // Handle combo item add with notification
  const handleComboItemAdd = (comboItem: Product) => {
    manager.addToCart(comboItem, 1, { size: 'Regular', milk: 'Regular', toppings: [], notes: '' });

    // Show combo notification
    setComboAddedItem(comboItem);
    setShowComboNotification(true);
    setTimeout(() => {
      setShowComboNotification(false);
      setComboAddedItem(null);
    }, 2000);
  };

  // Get item quantity in cart (for default configuration)
  const getItemQuantityInCart = (itemId: number) => {
    const cartItem = cart.find(item =>
      item.id === itemId &&
      (JSON.stringify(item.customizations) === JSON.stringify({ size: 'Regular', milk: 'Regular', toppings: [], notes: '' }) ||
       !item.customizations)
    );
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quick add to cart (default configuration)
  // const handleQuickAddToCart = (item: ProductProduct) => {
  //   addToCart(item, 1, { size: 'Regular', milk: 'Regular', toppings: [], notes: '' });
  // };
  //
  // // Handle quantity change for menu items
  // const handleMenuItemQuantityChange = (item: ProductProduct, quantity: number) => {
  //   const defaultCustomizations = { size: 'Regular', milk: 'Regular', toppings: [], notes: '' };
  //
  //   if (quantity === 0) {
  //     removeFromCart(item.id, defaultCustomizations);
  //   } else {
  //     const currentQuantity = getItemQuantityInCart(item.id);
  //     const diff = quantity - currentQuantity;
  //     if (diff > 0) {
  //       addToCart(item, diff, defaultCustomizations);
  //     } else if (diff < 0) {
  //       updateCartItemQuantity(item.id, quantity, defaultCustomizations);
  //     }
  //   }
  // };
  //
  // const handleShowMenuDetail = (item: ProductProduct) => {
  //   setSelectedMenuItem(item);
  //   setShowMenuDetail(true);
  // };

  // Apply voucher
  const applyVoucher = (voucherCode: string, cartTotal: number) => {
    const voucher = availableVouchers.find(v =>
      v.code.toLowerCase() === voucherCode.toLowerCase() &&
      v.isActive &&
      cartTotal >= v.minOrder
    );

    if (voucher) {
      setAppliedVoucher(voucher);
      return true;
    }
    return false;
  };

  // Calculate discount

  // Update order status
  // const updateOrderStatus = (orderId: string, status: Order['status']) => {
  //   const updatedOrders = orders.map(order =>
  //     order.id === orderId ? { ...order, status } : order
  //   );
  //   setOrders(updatedOrders);
  //   localStorage.setItem('coffee-orders', JSON.stringify(updatedOrders));
  // };

  // Handle feedback submission
  const handleFeedbackSubmission = (orderId: number, rating: number, feedback: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, feedbackGiven: true } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('coffee-orders', JSON.stringify(updatedOrders));

    // In a real app, you'd send this to your backend
    console.log('Feedback submitted:', { orderId, rating, feedback });

    setShowFeedbackModal(false);
    setFeedbackOrder(null);
  };

  // Get user's last ordered items
  const getLastOrderItems = () => {
    if (orders.length === 0) return [];
    const lastOrder = orders[0];
    return lastOrder.items.map(item => item.id);
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId: number) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('coffee-notifications', JSON.stringify(updatedNotifications));
  };

  // Get unread notifications count
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartDiscount = manager.calculateDiscount(cartSubtotal, appliedVoucher);
  const cartTotal = cartSubtotal - cartDiscount;

  // Close drawer when clicking outside
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNavDrawer(false);
        setShowMenuDetail(false);
        setShowFeedbackModal(false);
      }
    };

    if (showNavDrawer || showMenuDetail || showFeedbackModal) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showNavDrawer, showMenuDetail, showFeedbackModal]);

  // Navigation handlers
  const handleShowOrderHistory = () => {
    setShowOrderHistory(true);
    setShowNavDrawer(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
    setShowNavDrawer(false);
  };

  const handleShowNotifications = () => {
    setShowNotifications(true);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setShowNavDrawer(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowNavDrawer(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowNavDrawer(false);
  };

  const handleShowContactSupport = () => {
    setShowContactSupport(true);
    setShowNavDrawer(false);
  };

  const handleShowDeveloperFeedback = () => {
    setShowDeveloperFeedback(true);
    setShowNavDrawer(false);
  };

  const handleShowTermsConditions = () => {
    setShowTermsConditions(true);
    setShowNavDrawer(false);
  };

  const handleShowPrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
    setShowNavDrawer(false);
  };

  const handleShowOrderDetail = (order: OrderItem) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const resetToMainMenu = () => {
    setShowOrderHistory(false);
    setShowOrderDetail(false);
    setShowSettings(false);
    setShowNotifications(false);
    setShowCart(false);
    setShowPaymentSuccess(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowFavorites(false);
    setShowContactSupport(false);
    setShowDeveloperFeedback(false);
    setShowTermsConditions(false);
    setShowPrivacyPolicy(false);
    setSelectedOrder(null);
    setCompletedOrder(null);
  };

  const backToOrderHistory = () => {
    setShowOrderDetail(false);
    setSelectedOrder(null);
  };

  const handlePaymentSuccessContinue = () => {
    resetToMainMenu();
  };

  const handlePaymentSuccessViewOrder = () => {
    if (completedOrder) {
      setShowPaymentSuccess(false);
      setSelectedOrder(completedOrder);
      setShowOrderDetail(true);
    }
  };

  // Render different screens
  if (showContactSupport) {
    return <ContactSupport onBack={resetToMainMenu} />;
  }

  if (showDeveloperFeedback) {
    return <DeveloperFeedback onBack={resetToMainMenu} />;
  }

  if (showTermsConditions) {
    return <TermsConditions onBack={resetToMainMenu} />;
  }

  if (showPrivacyPolicy) {
    return <PrivacyPolicy onBack={resetToMainMenu} />;
  }

  if (showLogin) {
    return (
      <Login
        onBack={resetToMainMenu}
        onLogin={manager.handleLogin}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onShowTermsConditions={handleShowTermsConditions}
        onShowPrivacyPolicy={handleShowPrivacyPolicy}
      />
    );
  }

  if (showRegister) {
    return (
      <Register
        onBack={resetToMainMenu}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onShowTermsConditions={handleShowTermsConditions}
        onShowPrivacyPolicy={handleShowPrivacyPolicy}
      />
    );
  }

  if (showFavorites) {
    return (
      <Favorites
        onBack={resetToMainMenu}
        favorites={favorites}
        menuItems={allProducts}
        onRemoveFavorite={manager.removeFavorite}
        onReorder={(favorite) => {
          const menuItem = allProducts.find(item => item.id === favorite.menuItemId);
          if (menuItem) {
            manager.addToCart(menuItem, 1, favorite.customizations);
          }
        }}
        onAddToCart={manager.addToCart}
      />
    );
  }

  if (showSettings) {
    return (
      <SettingsPage
        onBack={resetToMainMenu}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  if (showNotifications) {
    return (
      <NotificationsPage
        onBack={resetToMainMenu}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onShowOrderDetail={handleShowOrderDetail}
        orders={orders}
      />
    );
  }

  if (showPaymentSuccess && completedOrder) {
    return (
      <PaymentSuccess
        order={completedOrder}
        onContinue={handlePaymentSuccessContinue}
        onViewOrder={handlePaymentSuccessViewOrder}
        onContactSupport={handleShowContactSupport}
      />
    );
  }

  if (showOrderDetail && selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={backToOrderHistory}
        onContactSupport={handleShowContactSupport}
        onAddToCart={(orderItems) => {
          orderItems.forEach(item => {
            const menuItem = menuItems.find(mi => mi.id === item.id);
            if (menuItem) {
              addToCart(menuItem, item.quantity, item.customizations);
            }
          });
          resetToMainMenu();
        }}
      />
    );
  }

  if (showOrderHistory) {
    return (
      <OrderHistory
        orders={orders}
        onBack={resetToMainMenu}
        // onOrderClick={handleShowOrderDetail}
        onReorder={(orderItems) => {
          orderItems.forEach(item => {
            const menuItem = menuItems.find(mi => mi.id === item.id);
            if (menuItem) {
              addToCart(menuItem, item.quantity, item.customizations);
            }
          });
          setShowOrderHistory(false);
        }}
      />
    );
  }

  if (showCart) {
    return (
      <Cart
        items={cart}
        subtotal={cartSubtotal}
        discount={cartDiscount}
        total={cartTotal}
        appliedVoucher={appliedVoucher}
        availableVouchers={availableVouchers}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
        onBack={() => setShowCart(false)}
        onApplyVoucher={applyVoucher}
        onRemoveVoucher={() => setAppliedVoucher(null)}
        onProceedToPayment={() => {}} // Not used anymore
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div className={`relative size-full bg-white overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation Drawer with Blur Background */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        showNavDrawer ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Blurred Background from Menu UI */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
            showNavDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setShowNavDrawer(false)}
        />

        {/* Drawer */}
        <div className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-b from-[#167dda] to-[#104779] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          showNavDrawer ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <NavigationDrawer
            user={user}
            onClose={() => setShowNavDrawer(false)}
            onShowOrderHistory={handleShowOrderHistory}
            onShowSettings={handleShowSettings}
            onShowFavorites={handleShowFavorites}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
            onShowContactSupport={handleShowContactSupport}
            onShowDeveloperFeedback={handleShowDeveloperFeedback}
            onShowTermsConditions={handleShowTermsConditions}
            onShowPrivacyPolicy={handleShowPrivacyPolicy}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {showMenuDetail && selectedMenuItem && (
        <div className="fixed inset-0 z-50">
          {/* Clickable Blurred Background */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md cursor-pointer"
            onClick={() => setShowMenuDetail(false)}
          />

          <MenuDetailOverlay
            item={selectedMenuItem}
            menuItems={menuItems}
            favorites={favorites}
            onClose={() => setShowMenuDetail(false)}
            onAddToCart={addToCart}
            onSaveFavorite={saveFavorite}
            onRemoveFavorite={removeFavorite}
            getFavoriteItem={getFavoriteItem}
            onComboItemAdd={handleComboItemAdd}
          />
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && feedbackOrder && (
        <FeedbackModal
          order={feedbackOrder}
          onSubmit={handleFeedbackSubmission}
          onClose={() => {
            setShowFeedbackModal(false);
            setFeedbackOrder(null);
          }}
        />
      )}

      {/* Status Bar */}
      <div className="h-12 bg-white dark:bg-gray-900" />

      {/* Header with Notification Button - Show even during loading */}
      {(criticalDataLoaded || loadingState === 'success') && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm relative">
          <div className="flex items-center px-5 py-4">
            <div className="w-8 flex justify-start">
              <button
                onClick={() => setShowNavDrawer(true)}
                className="relative w-8 h-8 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              >
                <AnimatedHamburgerIcon isOpen={showNavDrawer} />
              </button>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </div>

            {/* Notification Button in Header */}
            <div className="w-8 flex justify-end">
              <button
                onClick={handleShowNotifications}
                className="relative w-8 h-8 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Connection Status Indicator */}
            <div className="absolute top-2 right-2">
              {!isOnline && (
                <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs">
                  <WifiOff className="w-3 h-3" />
                  <span>Offline</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="main-content px-5 py-6 space-y-6">
            {loading && <LoadingSkeleton />}
            {error &&
              <ErrorState
                state={loadingState} // You already have this state
                onRetry={handleRetry} // And this handler
                retryCount={retryCount}
                isOnline={isOnline}
              />
            }
            {!loading && !error && (
              <>
                {/* Search Section */}
                <SearchSection
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  lastOrderItems={getLastOrderItems()}
                />

                {/* Favorites Section */}
                {favorites.length > 0 && (
                  <FavoritesSection
                    favorites={favorites}
                    // menuItems should be changed to allProducts
                    menuItems={allProducts}
                    onReorder={(favorite) => {
                      const menuItem = allProducts.find(item => item.id === favorite.menuItemId);
                      if (menuItem) {
                        addToCart(menuItem, 1, favorite.customizations);
                      }
                    }}
                  />
                )}

                {/* Menu Items */}
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <MenuItemComponent
                      key={item.id}
                      item={item}
                      quantity={getItemQuantityInCart(item.id)}
                      isFavorited={isItemFavorited(item.id, { size: 'Regular', milk: 'Regular', toppings: [], notes: '' })}
                      // onShowDetail={handleShowMenuDetail}
                      // onQuickAdd={handleQuickAddToCart}
                      // onQuantityChange={handleMenuItemQuantityChange}
                      onToggleFavorite={(item) => {
                        const defaultCustomizations = { size: 'Regular', milk: 'Regular', toppings: [], notes: '' };
                        if (isItemFavorited(item.id, defaultCustomizations)) {
                          const favorite = favorites.find(fav =>
                            fav.menuItemId === item.id &&
                            JSON.stringify(fav.customizations) === JSON.stringify(defaultCustomizations)
                          );
                          if (favorite) {
                            removeFavorite(favorite.id);
                          }
                        } else {
                          saveFavorite(item, defaultCustomizations, item.price);
                        }
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Card */}
      <FloatingCartCard
        items={cart}
        total={cartTotal}
        onContinue={() => setShowCart(true)}
        isVisible={cart.length > 0}
      />

      {/* Add to Cart Notification */}
      {showAddedNotification && addedItem && (
        <div className={`fixed top-20 left-4 right-4 z-40 transform transition-all duration-300 ease-in-out ${
          showAddedNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="bg-white dark:bg-gray-800 mx-auto rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">{addedItem.name} added to cart</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rp {addedItem.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Combo Item Added Notification */}
      {showComboNotification && comboAddedItem && (
        <div className={`fixed top-32 left-4 right-4 z-40 transform transition-all duration-300 ease-in-out ${
          showComboNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="bg-blue-50 dark:bg-blue-900 mx-auto rounded-2xl shadow-xl border border-blue-200 dark:border-blue-700 p-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900 dark:text-blue-100">Combo: {comboAddedItem.name} added!</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Perfect pairing added to cart</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
