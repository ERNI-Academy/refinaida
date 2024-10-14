import { RefineBacklog, RefineFeature } from "@/types/common";

export type AidaRefineFeatureResponse = RefineFeature;
export type AidaRefineRequirementsResponse = RefineBacklog[];

export const parseAidaRefineFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefineRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse => JSON.parse(response);
