import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedFeatureResponse } from "@/lib/aida";
import { sendRefinedFeatureContext } from "@/utils/utils-aida-service";

const useRefineFeatureContext = () => {
  const { feature, setFeature, setRefinedFeature, setIsLoadingChat } =
    useAppStore();

  const fetchRefineFeatureContext = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoadingChat(true);
        const response = await sendRefinedFeatureContext(
          feature.context,
          user_input
        );
        const parsedResponse = parseAidaRefinedFeatureResponse(response);
        setFeature({
          ...feature,
          context: `${parsedResponse.summary}. ${parsedResponse.description}`,
        });
        setRefinedFeature(parsedResponse);
        setIsLoadingChat(false);
      } catch (error: any) {
        setIsLoadingChat(false);
        console.error(error);
      }
    },
    [feature, setFeature, setRefinedFeature, setIsLoadingChat]
  );

  return { fetchRefineFeatureContext };
};

export default useRefineFeatureContext;
