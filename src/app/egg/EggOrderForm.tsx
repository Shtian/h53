"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BOILED_OPTIONS,
  type BoiledDoneness,
  type EggOrder,
  type EggType,
  FRIED_OPTIONS,
} from "./types";

type Props = {
  onAdd: (order: Omit<EggOrder, "id">) => void;
};

export function EggOrderForm({ onAdd }: Props) {
  const [eggType, setEggType] = useState<EggType>("boiled");
  const [doneness, setDoneness] = useState<BoiledDoneness>("medium");
  const [bothSides, setBothSides] = useState(false);
  const [brokenYolk, setBrokenYolk] = useState(false);

  const handleAdd = () => {
    if (eggType === "boiled") {
      onAdd({ type: "boiled", doneness });
    } else {
      onAdd({ type: "fried", bothSides, brokenYolk });
    }
  };

  return (
    <div className="space-y-6">
      {/* Egg Type Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setEggType("boiled")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-widest transition-colors ${
            eggType === "boiled"
              ? "bg-slate-100 text-slate-900"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          Kokt
        </button>
        <button
          type="button"
          onClick={() => setEggType("fried")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-widest transition-colors ${
            eggType === "fried"
              ? "bg-slate-100 text-slate-900"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          Stekt
        </button>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {eggType === "boiled"
          ? BOILED_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-4 transition-colors ${
                  doneness === option.value
                    ? "border-slate-500 bg-slate-800/60"
                    : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600"
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    doneness === option.value
                      ? "border-sky-400 bg-sky-400"
                      : "border-slate-500"
                  }`}
                >
                  {doneness === option.value && (
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                  )}
                </div>
                <input
                  type="radio"
                  name="doneness"
                  value={option.value}
                  checked={doneness === option.value}
                  onChange={() => setDoneness(option.value)}
                  className="sr-only"
                />
                <span className="text-slate-200">{option.label}</span>
              </label>
            ))
          : FRIED_OPTIONS.map((option) => {
              const isChecked =
                option.key === "bothSides" ? bothSides : brokenYolk;
              return (
                <label
                  key={option.key}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-4 transition-colors ${
                    isChecked
                      ? "border-slate-500 bg-slate-800/60"
                      : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                      isChecked ? "border-sky-400 bg-sky-400" : "border-slate-500"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="h-3 w-3 text-slate-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (option.key === "bothSides") {
                        setBothSides(e.target.checked);
                      } else {
                        setBrokenYolk(e.target.checked);
                      }
                    }}
                    className="sr-only"
                  />
                  <span className="text-slate-200">{option.label}</span>
                </label>
              );
            })}
      </div>

      {/* Add Button */}
      <Button
        onClick={handleAdd}
        size="lg"
        className="w-full py-6 text-sm uppercase tracking-widest"
      >
        Legg til egg
      </Button>
    </div>
  );
}
