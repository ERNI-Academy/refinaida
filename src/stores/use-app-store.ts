import { create } from "zustand";

import { NewFeature } from "@/helpers/conts";
import { Feature } from "@/types/common";

interface AppStoreState {
  feature: Feature;
  setFeature: (feature: Feature) => void;
  updateFeature: (updateFeature: Partial<Feature>) => void;
  resetFeature: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  aidaAuth: { apiKey: string; endpoint: string };
  setAidaAuth: (apiKey: string, endpoint: string) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  feature: NewFeature,
  setFeature: (feature: Feature) => set({ feature }),
  updateFeature: (updateFeature: Partial<Feature>) =>
    set((state) => ({
      feature: { ...state.feature, ...updateFeature },
    })),
  resetFeature: () => set({ feature: NewFeature }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  aidaAuth: { apiKey: "", endpoint: "" },
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
