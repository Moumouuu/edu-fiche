import { create } from "zustand";

interface ResponseModalState {
  count: number;
  increment: () => void;
  setCount: (count: number) => void;
}

export const useUserLimitSheet = create<ResponseModalState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setCount: (count: number) => set({ count }),
}));
