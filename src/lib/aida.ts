export type AidaRefineFeatureResponse = {
  feature: string;
  questions: string[];
};

export const parseAidaRefineFeatureResponse = (
  response: string
): AidaRefineFeatureResponse => {
  const parsedResponse = JSON.parse(response);
  return parsedResponse.feature;
};
