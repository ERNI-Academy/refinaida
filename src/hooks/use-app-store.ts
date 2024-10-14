import { create } from "zustand";

import { RefineBacklog, RefineFeature } from "@/types/common";

interface AppStoreState {
  feature: string;
  setFeature: (feature: string) => void;
  context: string;
  setContext: (context: string) => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
  refineFeature: RefineFeature;
  setRefineFeature: (refineFeature: RefineFeature) => void;
  refineBacklog: RefineBacklog[];
  setRefineBacklog: (refineBackLog: RefineBacklog[]) => void;
  currentRefineBacklog: RefineBacklog | undefined;
  setCurrentRefineBacklog: (
    currentRefineBacklog: RefineBacklog | undefined
  ) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  aidaAuth: { apiKey: string; endpoint: string };
  setAidaAuth: (apiKey: string, endpoint: string) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  feature: "",
  setFeature: (feature: string) => set({ feature }),
  context: "",
  setContext: (context: string) => set({ context }),
  questions: [],
  setQuestions: (questions: string[]) => set({ questions }),
  refineFeature: {} as RefineFeature,
  setRefineFeature: (refineFeature: RefineFeature) => set({ refineFeature }),
  refineBacklog: [],
  setRefineBacklog: (refineBacklog: RefineBacklog[]) => set({ refineBacklog }),
  currentRefineBacklog: undefined,
  setCurrentRefineBacklog: (currentRefineBacklog: RefineBacklog | undefined) =>
    set({ currentRefineBacklog }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  aidaAuth: { apiKey: "", endpoint: "" },
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
