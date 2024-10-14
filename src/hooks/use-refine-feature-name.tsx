import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { sendRefinedFeatureName } from "@/utils/utils-aida-service";

const useRefineFeatureName = () => {
  const { feature, setFeature, setRefinedFeature, setIsLoading } =
    useAppStore();

  const fetchRefineFeatureName = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedFeatureName(feature.name);
      const parsedResponse = parseAidaRefineFeatureResponse(response);
      setFeature({
        ...feature,
        context: `${parsedResponse.summary}. ${parsedResponse.description}`,
      });
      setRefinedFeature(parsedResponse);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
    }
  }, [feature, setFeature, setRefinedFeature, setIsLoading]);

  return { fetchRefineFeatureName };
};

export default useRefineFeatureName;
