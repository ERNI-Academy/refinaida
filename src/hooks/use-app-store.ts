import { create } from "zustand";

import { QuestionsAndAnswers } from "@/types/common";

interface AppStoreState {
  feature: string;
  setFeature: (feature: string) => void;
  context: string;
  setContext: (context: string) => void;
  questionsAndAnswers: QuestionsAndAnswers[];
  setQuestionsAndAnswers: (questionsAndAnswers: QuestionsAndAnswers[]) => void;
  // Revisar si es necesario questions and setQuestions
  questions: string[];
  setQuestions: (questions: string[]) => void;
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
  questionsAndAnswers: [],
  setQuestionsAndAnswers: (questionsAndAnswers: QuestionsAndAnswers[]) =>
    set({ questionsAndAnswers }),
  // Revisar si es necesario questions and setQuestions
  questions: [],
  setQuestions: (questions: string[]) => set({ questions }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  aidaAuth: { apiKey: "", endpoint: "" },
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
