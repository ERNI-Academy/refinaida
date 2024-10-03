import { create } from "zustand";

interface AppStoreState {
  feature: string;
  context: string;
  questions: string[];
  aidaAuth: { apiKey: string; endpoint: string };
  setFeature: (feature: string) => void;
  setContext: (context: string) => void;
  setQuestions: (questions: string[]) => void;
  setAidaAuth: (apiKey: string, endpoint: string) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  feature: "",
  context: "",
  questions: [],
  aidaAuth: { apiKey: "", endpoint: "" },
  setFeature: (feature: string) => set({ feature }),
  setContext: (context: string) => set({ context }),
  setQuestions: (questions: string[]) => set({ questions }),
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
