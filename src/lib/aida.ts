export type AidaRefineFeatureResponse = {
  feature: string;
  questions: string[];
};

export const parseAidaRefineFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => JSON.parse(response);
