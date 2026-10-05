import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Course } from "./courses";

/** Same localStorage key as the original portal, so carts carry over. */
const STORAGE_KEY = "hca_cart";

export interface CartItem extends Course {
  qty: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable (private mode) — cart stays in memory */
    }
  }, [cart]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addToCart = useCallback((course: Course) => {
    setCart((prev) =>
      prev.find((i) => i.id === course.id)
        ? prev.map((i) => (i.id === course.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...course, qty: 1 }],
    );
  }, []);

  const removeFromCart = useCallback((id: string) => setCart((prev) => prev.filter((i) => i.id !== id)), []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return setCart((prev) => prev.filter((i) => i.id !== id));
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems: cart.reduce((n, i) => n + i.qty, 0),
    }),
    [cart, addToCart, removeFromCart, updateQty, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
