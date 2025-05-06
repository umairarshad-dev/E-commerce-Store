'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });

    toast.success('Item added to cart!');
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id: string, color: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, color, size);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
