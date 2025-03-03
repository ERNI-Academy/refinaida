import { create } from "zustand";

import { NewConfigureRequirements, NewRefinedFeature } from "@/helpers/conts";
import { ConfigureRequirements, Message, RefinedFeature } from "@/types/common";

interface RefineFeatureStoreState {
  refinedFeature: RefinedFeature;
  setRefinedFeature: (refinedFeature: RefinedFeature) => void;
  resetRefinedFeature: () => void;
  questions: string[];
  setQuestions: (questions: string[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  configureRequirements: ConfigureRequirements;
  setConfigureRequirements: (
    configureRequirements: ConfigureRequirements
  ) => void;
  resetConfigureRequirements: () => void;
  isLoadingChat: boolean;
  setIsLoadingChat: (isLoadingChat: boolean) => void;
}

export const useRefineFeatureStore = create<RefineFeatureStoreState>((set) => ({
  refinedFeature: NewRefinedFeature,
  setRefinedFeature: (refinedFeature: RefinedFeature) =>
    set({ refinedFeature }),
  resetRefinedFeature: () => set({ refinedFeature: NewRefinedFeature }),
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
  configureRequirements: NewConfigureRequirements,
  setConfigureRequirements: (configureRequirements: ConfigureRequirements) =>
    set({ configureRequirements }),
  resetConfigureRequirements: () =>
    set({ configureRequirements: NewConfigureRequirements }),
  isLoadingChat: false,
  setIsLoadingChat: (isLoadingChat: boolean) => set({ isLoadingChat }),
}));
