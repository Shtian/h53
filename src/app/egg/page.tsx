"use client";

import { EggOrderForm } from "./EggOrderForm";
import { OrderSummary } from "./OrderSummary";
import { useEggOrders } from "./useEggOrders";

export default function EggPage() {
  const { orders, isLoaded, addOrder, removeOrder, clearOrders } =
    useEggOrders();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-slate-400">Laster...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-10 text-slate-50">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold">Eggbestilling</h1>
        <p className="text-sm text-slate-300">
          Velg type og legg til i bestillingen
        </p>
      </header>

      <EggOrderForm onAdd={addOrder} />

      <OrderSummary
        orders={orders}
        onRemove={removeOrder}
        onClear={clearOrders}
      />
    </div>
  );
}
