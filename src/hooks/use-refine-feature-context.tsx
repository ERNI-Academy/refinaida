import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { sendRefinedFeatureContext } from "@/utils/utils-aida-service";

const useRefineFeatureContext = () => {
  const { feature, setFeature, setRefinedFeature, setIsLoading } =
    useAppStore();

  const fetchRefineFeatureContext = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoading(true);
        const response = await sendRefinedFeatureContext(
          feature.context,
          user_input
        );
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
    },
    [feature, setFeature, setRefinedFeature, setIsLoading]
  );

  return { fetchRefineFeatureContext };
};

export default useRefineFeatureContext;
