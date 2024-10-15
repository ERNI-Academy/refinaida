import { RefinedBacklog, RefinedFeature } from "@/types/common";

export type AidaRefineFeatureResponse = RefinedFeature;
export type AidaRefineRequirementsResponse = RefinedBacklog[];

export const parseAidaRefinedFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefinedRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse => JSON.parse(response);
