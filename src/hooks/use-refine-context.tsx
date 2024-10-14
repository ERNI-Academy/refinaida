import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { sendRefinedContext } from "@/utils/utils-aida-service";

const useRefineContext = () => {
  const { feature, setContext, setRefinedFeature, setIsLoading } =
    useAppStore();

  const fetchRefineContext = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoading(true);
        const response = await sendRefinedContext(feature, user_input);
        const parsedResponse = parseAidaRefineFeatureResponse(response);
        const context: string = `${parsedResponse.summary}. ${parsedResponse.description}`;
        setContext(context);
        setRefinedFeature(parsedResponse);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error);
      }
    },
    [feature, setContext, setRefinedFeature, setIsLoading]
  );

  return { fetchRefineContext };
};

export default useRefineContext;
