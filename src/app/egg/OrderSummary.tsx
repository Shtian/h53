"use client";

import { Button } from "@/components/ui/button";
import type { EggOrder } from "./types";

type Props = {
  orders: EggOrder[];
  onRemove: (id: string) => void;
  onClear: () => void;
};

type GroupedOrder = {
  key: string;
  label: string;
  count: number;
  ids: string[];
};

function getOrderLabel(order: EggOrder): string {
  if (order.type === "boiled") {
    const labels: Record<string, string> = {
      hardkokt: "Hardkokt",
      medium: "Medium",
      bløtkokt: "Bløtkokt",
    };
    return labels[order.doneness || "medium"];
  }

  const parts: string[] = [];
  if (order.bothSides) parts.push("begge sider");
  if (order.brokenYolk) parts.push("sprekt plomme");
  return parts.length > 0 ? parts.join(", ") : "vanlig";
}

function getOrderKey(order: EggOrder): string {
  if (order.type === "boiled") {
    return `boiled-${order.doneness}`;
  }
  return `fried-${order.bothSides ? "b" : ""}${order.brokenYolk ? "y" : ""}`;
}

function groupOrders(orders: EggOrder[]): {
  boiled: GroupedOrder[];
  fried: GroupedOrder[];
} {
  const boiledGroups = new Map<string, GroupedOrder>();
  const friedGroups = new Map<string, GroupedOrder>();

  for (const order of orders) {
    const key = getOrderKey(order);
    const groups = order.type === "boiled" ? boiledGroups : friedGroups;
    const existing = groups.get(key);
    if (existing) {
      existing.count++;
      existing.ids.push(order.id);
    } else {
      groups.set(key, {
        key,
        label: getOrderLabel(order),
        count: 1,
        ids: [order.id],
      });
    }
  }

  return {
    boiled: Array.from(boiledGroups.values()),
    fried: Array.from(friedGroups.values()),
  };
}

function OrderGroup({
  title,
  groups,
  onRemove,
}: {
  title: string;
  groups: GroupedOrder[];
  onRemove: (id: string) => void;
}) {
  if (groups.length === 0) return null;

  const total = groups.reduce((sum, g) => sum + g.count, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
          {title}
        </h3>
        <span className="text-sm text-slate-400">{total} stk</span>
      </div>
      <div className="divide-y divide-slate-700/50 rounded-xl border border-slate-700/50 bg-slate-800/30">
        {groups.map((group) => (
          <div
            key={group.key}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-slate-200">{group.label}</span>
            <div className="flex items-center gap-3">
              <span className="min-w-[2rem] text-right font-medium text-slate-100">
                x{group.count}
              </span>
              <button
                type="button"
                onClick={() => onRemove(group.ids[group.ids.length - 1])}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
                aria-label={`Fjern en ${group.label}`}
              >
                −
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderSummary({ orders, onRemove, onClear }: Props) {
  const { boiled, fried } = groupOrders(orders);
  const total = orders.length;

  if (total === 0) {
    return (
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 py-12 text-center">
        <p className="text-slate-400">Ingen egg bestilt enda</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderGroup title="Kokte egg" groups={boiled} onRemove={onRemove} />
      <OrderGroup title="Stekte egg" groups={fried} onRemove={onRemove} />

      <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
        <span className="text-lg font-semibold">Totalt</span>
        <span className="text-lg font-semibold">{total} egg</span>
      </div>

      <Button
        variant="outline"
        onClick={onClear}
        className="w-full border-red-500/30 text-red-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
      >
        Tøm bestilling
      </Button>
    </div>
  );
}
