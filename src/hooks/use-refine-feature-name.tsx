import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedFeatureResponse } from "@/lib/aida";
import { sendRefinedFeatureName } from "@/utils/utils-aida-service";

const useRefineFeatureName = () => {
  const { feature, setFeature, setRefinedFeature, setIsLoading } =
    useAppStore();

  const fetchRefinedFeatureName = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedFeatureName(feature.name);
      const parsedResponse = parseAidaRefinedFeatureResponse(response);
      setFeature({
        ...feature,
        context: `${parsedResponse.summary}. ${parsedResponse.description}`,
      });
      setRefinedFeature(parsedResponse);
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [feature, setFeature, setRefinedFeature, setIsLoading]);

  return { fetchRefinedFeatureName };
};

export default useRefineFeatureName;
