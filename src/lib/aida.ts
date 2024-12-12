import { RefinedBacklogDetails } from "@/types/common";

export interface AidaRefineFeatureResponse {
  summary: string;
  description: string;
  questions: string[];
}

export interface AidaRefineRequirementsResponse {
  code: string;
  summary: string;
  issueType: string;
  priority: string;
  assignee: string;
  release: string;
  details: RefinedBacklogDetails;
}

export type AidaRefineDetailBacklogResponse = RefinedBacklogDetails;

export const parseAidaRefinedFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefinedRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse[] => JSON.parse(response);

export const parseAidaRefinedDetailBacklogResponse = (
  response: string
): AidaRefineDetailBacklogResponse => JSON.parse(response);
