export interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    description: string | '';
    product_variant_id: number;
    isNew: boolean;
    isRecommend: boolean;
    orderCount: number;
    category: string | '';
    comboIds?: number[];
    variants?: Record<string, {
        display_type: string;
        values: Record<string, number>;
    }>;
    product_variants?: ProductVariant[];
}

export interface ProductCategory {
    id: string;
    name: string;
    products: Product[];
}

export interface ProductVariant {
    id: number;
    price: number;
    combination: Record<string, string>;
}

export interface CartItem {
  id: number;
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
  id: number;
  menuItemId: number;
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
  id: number;
  items: CartItem[];
  total: number;
  orderDate: Date;
  status: 'preparing' | 'ready' | 'served' | 'done';
}

export interface OrderHistoryItem {
  id: number;
  items: CartItem[];
  total: number;
  discount?: number;
  orderDate: Date;
  status: 'preparing' | 'ready' | 'served' | 'done';
  paymentMethod?: string;
  transactionId?: number;
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
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Notification {
  id: number;
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

export type LoadingState = "loading" | "success" | "error" | "timeout" | "offline";

