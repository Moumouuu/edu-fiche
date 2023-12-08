import { create } from "zustand";

interface totalOfSheetsState {
  setValues: (values: any) => void;
  values: number;
}

export const useTotalOfSheets = create<totalOfSheetsState>((set) => ({
  setValues: (values) => set({ values }),
  values: -1,
}));
