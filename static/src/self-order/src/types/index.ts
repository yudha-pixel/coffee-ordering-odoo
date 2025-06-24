// src/types/index.ts
export interface ProductProduct {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Default price
  variants?: {
    sizes?: {
      Small: number; // Extra price (can be negative for discount)
      Regular: number; // Usually 0 for base price
      Large: number; // Extra price
    };
    milk?: {
      Regular: number;
      'Oat Milk': number;
      'Almond Milk': number;
      'Soy Milk': number;
    };
  };
  image: string;
  category: string;
  isNew?: boolean;
  isRecommended?: boolean;
  orderCount?: number;
  comboWith?: string[]; // IDs of recommended combo items
}

export interface CartItem {
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

export interface FavoriteItem {
  id: string;
  menuItemId: string;
  name: string;
  customizations: {
    size: string;
    milk: string;
    toppings: string[];
    notes: string;
  };
  totalPrice: number;
  savedAt: Date;
}

export interface OrderItem {
  id: string;
  items: CartItem[];
  total: number;
  orderDate: Date;
  status: 'preparing' | 'ready' | 'served' | 'done';
}

export interface OrderHistoryItem {
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
  cashPaymentCode?: string; // Add cash payment code
}

export interface Voucher {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface UserUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  isRead: boolean;
  actionLabel?: string;
  actionHandler?: () => void;
}

export interface Customizations {
    size: string;
    milk: string;
    toppings: string[];
    notes: string;
}