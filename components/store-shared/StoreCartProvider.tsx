"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StoreModel } from "@/lib/mock-data";
import { getProduct } from "@/lib/mock-data";

export type CartLine = {
  productId: string;
  qty: number;
};

const FREE_SHIPPING_HT = 100;

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalHt: number;
  amountToFreeShipping: number;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(model: StoreModel) {
  return `assia-cart-${model}`;
}

function readStored(model: StoreModel): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(storageKey(model));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => l.productId && l.qty > 0);
  } catch {
    return [];
  }
}

function subtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const p = getProduct(line.productId);
    return sum + (p?.priceHt ?? 0) * line.qty;
  }, 0);
}

export function StoreCartProvider({ model, children }: { model: StoreModel; children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStored(model));
    setHydrated(true);
  }, [model]);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(storageKey(model), JSON.stringify(lines));
  }, [lines, model, hydrated]);

  const addItem = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) {
      setLines((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty } : l)));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const subtotalHt = useMemo(() => subtotal(lines), [lines]);
  const itemCount = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_HT - subtotalHt);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotalHt,
      amountToFreeShipping,
      addItem,
      removeItem,
      setQty,
      clearCart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toggleDrawer: () => setDrawerOpen((o) => !o),
    }),
    [lines, itemCount, subtotalHt, amountToFreeShipping, addItem, removeItem, setQty, clearCart, drawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useStoreCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useStoreCart must be used within StoreCartProvider");
  }
  return ctx;
}

export { FREE_SHIPPING_HT };
