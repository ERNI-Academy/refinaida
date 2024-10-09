import { RefineFeature } from "@/types/common";

export type AidaRefineFeatureResponse = RefineFeature;

export const parseAidaRefineFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);
