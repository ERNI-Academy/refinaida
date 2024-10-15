import { RefinedBacklog, RefinedFeature } from "@/types/common";

export type AidaRefineFeatureResponse = RefinedFeature;
export type AidaRefineRequirementsResponse = RefinedBacklog[];

export const parseAidaRefineFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefineRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse => JSON.parse(response);
