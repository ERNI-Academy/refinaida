import { create } from "zustand";

import {
  NewConfigureRequirements,
  NewFeature,
  NewRefinedFeature,
} from "@/helpers/conts";
import {
  ConfigureRequirements,
  Feature,
  Message,
  RefinedBacklog,
  RefinedFeature,
} from "@/types/common";

interface AppStoreState {
  feature: Feature;
  setFeature: (feature: Feature) => void;
  updateFeature: (updateFeature: Partial<Feature>) => void;
  resetFeature: () => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  refinedFeature: RefinedFeature;
  setRefinedFeature: (refinedFeature: RefinedFeature) => void;
  resetRefinedFeature: () => void;
  configureRequirements: ConfigureRequirements;
  setConfigureRequirements: (
    configureRequirements: ConfigureRequirements
  ) => void;
  resetConfigureRequirements: () => void;
  refinedBacklog: RefinedBacklog[];
  setRefinedBacklog: (refinedBackLog: RefinedBacklog[]) => void;
  updateRefinedBacklog: (
    code: string,
    key: keyof RefinedBacklog,
    value: any
  ) => void;
  currentCodeRefinedStory: string;
  setCurrentCodeRefinedStory: (currentCodeRefinedStory: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingChat: boolean;
  setIsLoadingChat: (isLoadingChat: boolean) => void;
  isLoadingDetail: boolean;
  setIsLoadingDetail: (isLoadingDetail: boolean) => void;
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
  refinedFeature: NewRefinedFeature,
  setRefinedFeature: (refinedFeature: RefinedFeature) =>
    set({ refinedFeature }),
  resetRefinedFeature: () => set({ refinedFeature: NewRefinedFeature }),
  configureRequirements: NewConfigureRequirements,
  setConfigureRequirements: (configureRequirements: ConfigureRequirements) =>
    set({ configureRequirements }),
  resetConfigureRequirements: () =>
    set({ configureRequirements: NewConfigureRequirements }),
  refinedBacklog: [],
  setRefinedBacklog: (refinedBacklog: RefinedBacklog[]) =>
    set({ refinedBacklog }),
  updateRefinedBacklog: (code: string, key: keyof RefinedBacklog, value: any) =>
    set((state) => ({
      refinedBacklog: state.refinedBacklog.map((item) =>
        item.code === code ? { ...item, [key]: value } : item
      ),
    })),
  currentCodeRefinedStory: "",
  setCurrentCodeRefinedStory: (currentCodeRefinedStory: string) =>
    set({ currentCodeRefinedStory }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isLoadingChat: false,
  setIsLoadingChat: (isLoadingChat: boolean) => set({ isLoadingChat }),
  isLoadingDetail: false,
  setIsLoadingDetail: (isLoadingDetail: boolean) => set({ isLoadingDetail }),
  aidaAuth: { apiKey: "", endpoint: "" },
  setAidaAuth: (apiKey: string, endpoint: string) =>
    set({ aidaAuth: { apiKey, endpoint } }),
}));
