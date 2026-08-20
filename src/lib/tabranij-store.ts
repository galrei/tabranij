import { create } from "zustand";
import {
  DEFAULT_PRICES,
  sanitizePrices,
  type PartId,
  type Prices,
} from "@/lib/anatomy";

type State = {
  selected: PartId | null;
  autoRotate: boolean;
  prices: Prices;
  resetViewToken: number;
  hovered: PartId | null;
  select: (id: PartId | null) => void;
  setHovered: (id: PartId | null) => void;
  setAutoRotate: (v: boolean) => void;
  patchPrices: (p: Partial<Prices>) => void;
  applyPrices: (c: Prices) => void;
  requestResetView: () => void;
};

export const useTabranij = create<State>((set) => ({
  selected: "neto",
  autoRotate: true,
  prices: DEFAULT_PRICES,
  resetViewToken: 0,
  hovered: null,
  select: (id) => set({ selected: id }),
  setHovered: (id) => set({ hovered: id }),
  setAutoRotate: (v) => set({ autoRotate: v }),
  patchPrices: (p) =>
    set((s) => ({
      prices: sanitizePrices({ ...s.prices, ...p }),
    })),
  applyPrices: (c) => set({ prices: sanitizePrices(c) }),
  requestResetView: () =>
    set((s) => ({ resetViewToken: s.resetViewToken + 1, autoRotate: false })),
}));
