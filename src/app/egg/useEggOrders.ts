"use client";

import { useCallback, useEffect, useState } from "react";
import type { EggOrder } from "./types";

const STORAGE_KEY = "egg-orders";

export function useEggOrders() {
  const [orders, setOrders] = useState<EggOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch {
        setOrders([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const addOrder = useCallback((order: Omit<EggOrder, "id">) => {
    const newOrder: EggOrder = {
      ...order,
      id: crypto.randomUUID(),
    };
    setOrders((prev) => [...prev, newOrder]);
  }, []);

  const removeOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return {
    orders,
    isLoaded,
    addOrder,
    removeOrder,
    clearOrders,
  };
}
