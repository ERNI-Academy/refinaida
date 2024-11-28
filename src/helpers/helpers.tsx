import { AidaRefineFeatureResponse } from "@/lib/aida";
import { RefinedBacklog, RefinedFeature } from "@/types/common";

export const getDetailRefinedBacklog = (
  code: string,
  refinedBacklog: RefinedBacklog[]
): RefinedBacklog | undefined => refinedBacklog.find((rb) => rb.code === code);

export const mapRefinedFeatureResponse = (
  response: AidaRefineFeatureResponse,
  currentFeature: RefinedFeature
): RefinedFeature => {
  return {
    summary: response.summary,
    description: {
      old: currentFeature.description.new,
      new: response.description,
    },
    questions: response.questions,
  };
};
