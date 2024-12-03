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
  description: string;
}

export const parseAidaRefinedFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);

export const parseAidaRefinedRequirementsResponse = (
  response: string
): AidaRefineRequirementsResponse[] => JSON.parse(response);
