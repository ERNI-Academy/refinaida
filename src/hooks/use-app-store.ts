import { create } from "zustand";

interface AppStoreState {
  feature: string;
  setFeature: (feature: string) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  feature: "",
  setFeature: (feature: string) => set({ feature }),
}));
