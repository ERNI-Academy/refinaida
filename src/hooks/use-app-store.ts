import { create } from "zustand";

import {
  Feature,
  Message,
  RefinedBacklog,
  RefinedFeature,
} from "@/types/common";

interface AppStoreState {
  feature: Feature;
  setFeature: (feature: Feature) => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  refinedFeature: RefinedFeature;
  setRefinedFeature: (refinedFeature: RefinedFeature) => void;
  refinedBacklog: RefinedBacklog[];
  setRefinedBacklog: (refinedBackLog: RefinedBacklog[]) => void;
  currentRefinedBacklog: RefinedBacklog | undefined;
  setCurrentRefinedBacklog: (
    currentRefinedBacklog: RefinedBacklog | undefined
  ) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingChat: boolean;
  setIsLoadingChat: (isLoadingChat: boolean) => void;
  aidaAuth: { apiKey: string; endpoint: string };
  setAidaAuth: (apiKey: string, endpoint: string) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  feature: { name: "", context: "" },
  setFeature: (feature: Feature) => set({ feature }),
  questions: [],
  setQuestions: (questions: string[]) => set({ questions }),
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) =>
    set((state) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.text === message.text) {
        return state;
      }
      return { messages: [...state.messages, message] };
    }),
  refinedFeature: {} as RefinedFeature,
  setRefinedFeature: (refinedFeature: RefinedFeature) =>
    set({ refinedFeature }),
  refinedBacklog: [],
  setRefinedBacklog: (refinedBacklog: RefinedBacklog[]) =>
    set({ refinedBacklog }),
  currentRefinedBacklog: undefined,
  setCurrentRefinedBacklog: (
    currentRefinedBacklog: RefinedBacklog | undefined
  ) => set({ currentRefinedBacklog }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isLoadingChat: false,
  setIsLoadingChat: (isLoadingChat: boolean) => set({ isLoadingChat }),
  aidaAuth: { apiKey: "", endpoint: "" },
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
