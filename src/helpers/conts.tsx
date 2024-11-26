import { Feature, RefinedFeature } from "@/types/common";

export const NewFeature: Feature = {
  name: "",
  context: "",
  textDocument: null,
};

export const NewRefinedFeature: RefinedFeature = {
  summary: "",
  description: { old: undefined, new: undefined },
  questions: [],
};
