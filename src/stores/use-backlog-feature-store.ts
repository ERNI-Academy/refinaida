import { create } from "zustand";

import { RefinedBacklog } from "@/types/common";

interface BacklogFeatureStoreState {
  refinedBacklog: RefinedBacklog[];
  setRefinedBacklog: (refinedBackLog: RefinedBacklog[]) => void;
  updateRefinedBacklog: (
    code: string,
    key: keyof RefinedBacklog,
    value: any
  ) => void;
  currentCodeRefinedStory: string;
  setCurrentCodeRefinedStory: (currentCodeRefinedStory: string) => void;
  isLoadingDetail: boolean;
  setIsLoadingDetail: (isLoadingDetail: boolean) => void;
}

export const useBacklogFeatureStore = create<BacklogFeatureStoreState>(
  (set) => ({
    refinedBacklog: [],
    setRefinedBacklog: (refinedBacklog: RefinedBacklog[]) =>
      set({ refinedBacklog }),
    updateRefinedBacklog: (
      code: string,
      key: keyof RefinedBacklog,
      value: any
    ) =>
      set((state) => ({
        refinedBacklog: state.refinedBacklog.map((item) =>
          item.code === code ? { ...item, [key]: value } : item
        ),
      })),
    currentCodeRefinedStory: "",
    setCurrentCodeRefinedStory: (currentCodeRefinedStory: string) =>
      set({ currentCodeRefinedStory }),
    isLoadingDetail: false,
    setIsLoadingDetail: (isLoadingDetail: boolean) => set({ isLoadingDetail }),
  })
);
