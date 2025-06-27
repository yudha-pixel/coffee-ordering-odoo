// src/hooks/useAppManager.ts

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  CartItem,
  FavoriteItem,
  OrderItem,
  UserUser,
  ProductProduct,
  Customizations,
  Voucher,
  OrderHistoryItem, Product
} from '@/types';


// This hook will manage the core logic of your app
export const useAppManager = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('coffee-cart', []);
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('coffee-favorites', []);
  const [orders, setOrders] = useLocalStorage<OrderItem[]>('coffee-orders', []);
  const [user, setUser] = useLocalStorage<UserUser | null>('coffee-user', null);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // --- CART LOGIC ---
  const addToCart = (item: Product, quantity: number = 1, customizations?: Customizations) => {
    let actualPrice = item.price;

    // Calculate price with variants
    if (customizations) {
      if (customizations.size && item.variants?.sizes) {
        actualPrice += item.variants.sizes[customizations.size as keyof typeof item.variants.sizes] || 0;
      }
      if (customizations.milk && item.variants?.milk) {
        actualPrice += item.variants.milk[customizations.milk as keyof typeof item.variants.milk] || 0;
      }
    }

    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: actualPrice,
      image: item.image_url,
      category: item.category,
      quantity,
      customizations
    };

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
      );

      if (existingItemIndex >= 0) {
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, cartItem];
      }
    });
    return cartItem;
  };

  const updateCartItemQuantity = (itemId: number, quantity: number, customizations?: Customizations) => {
    if (quantity === 0) {
      removeFromCart(itemId, customizations);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && JSON.stringify(item.customizations) === JSON.stringify(customizations)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId: number, customizations?: Customizations) => {
    setCart(prevCart => prevCart.filter(item =>
      !(item.id === itemId && JSON.stringify(item.customizations) === JSON.stringify(customizations))
    ));
  };

  const saveFavorite = (item: ProductProduct, customizations: Customizations, totalPrice: number) => {
    const favorite: FavoriteItem = {
      id: Number(Date.now()),
      menuItemId: item.id,
      name: `${item.name} (${customizations.size || 'Regular'})`,
      customizations,
      totalPrice,
      savedAt: new Date()
    };

    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('coffee-favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (favoriteId: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('coffee-favorites', JSON.stringify(updatedFavorites));
  };

  // --- USER/ORDER LOGIC ---
  const handleLogin = (email: string): UserUser => { // Assume password validation happens here
    const userData: UserUser = {
      id: Number(Date.now()),
      name: email.split('@')[0],
      email,
      phone: '+1234567890'
    };
    setUser(userData);
    return userData;
  };

  const handleLogout = (): string => {
    const userName = user?.name || 'User';
    setUser(null);
    return userName;
  };

  const generateCashPaymentCode = () => {
    return `CASH${Date.now().toString().slice(-6)}`;
  };

  const handlePaymentComplete = (paymentMethod: string, transactionId: number) => {
    if (cart.length === 0) return;

    const tableNumber = `T${Math.floor(Math.random() * 50) + 1}`;
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = calculateDiscount(subtotal, appliedVoucher);
    const total = subtotal - discount;

    const newOrder: OrderHistoryItem = {
      id: Number(Date.now()),
      items: [...cart],
      total,
      discount,
      orderDate: new Date(),
      status: 'preparing',
      paymentMethod,
      transactionId,
      tableNumber,
      voucherCode: appliedVoucher?.code,
      paymentStatus: paymentMethod === 'cash' ? 'waiting_cash_confirmation' : 'completed',
      cashPaymentCode: paymentMethod === 'cash' ? generateCashPaymentCode() : undefined
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCart([]); // Clear the cart
    setAppliedVoucher(null);

    // Return the completed order so App.tsx can react
    return newOrder;
  };

  const calculateDiscount = (total: number, voucher: Voucher | null) => {
    if (!voucher) return 0;

    if (voucher.type === 'percentage') {
      return Math.floor(total * (voucher.discount / 100));
    } else {
      return voucher.discount;
    }
  };


  return {
    cart,
    favorites,
    orders,
    user,
    appliedVoucher,
    setAppliedVoucher,
    addToCart,
    updateCartItemQuantity,
    saveFavorite,
    removeFavorite,
    handleLogin,
    handleLogout,
    handlePaymentComplete,
    calculateDiscount,
    // ...return all other functions and state needed by App.tsx
  };
};