export type BoiledDoneness = "hardkokt" | "medium" | "bløtkokt";

export type EggOrder = {
  id: string;
  type: "boiled" | "fried";
  doneness?: BoiledDoneness;
  bothSides?: boolean;
  brokenYolk?: boolean;
};

export type EggType = "boiled" | "fried";

export const BOILED_OPTIONS: { value: BoiledDoneness; label: string }[] = [
  { value: "hardkokt", label: "Hardkokt" },
  { value: "medium", label: "Medium" },
  { value: "bløtkokt", label: "Bløtkokt" },
];

export const FRIED_OPTIONS = [
  { key: "bothSides" as const, label: "Stekt på begge sider" },
  { key: "brokenYolk" as const, label: "Sprekt plomme" },
];
