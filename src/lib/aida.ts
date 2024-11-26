import { RefinedBacklog } from "@/types/common";

export interface AidaRefineFeatureResponse {
  summary: string;
  description: string;
  questions: string[];
}

export type AidaRefineRequirementsResponse = RefinedBacklog[];

export const parseAidaRefinedFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefinedRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse => JSON.parse(response);
