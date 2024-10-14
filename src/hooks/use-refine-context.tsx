import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { sendRefinedContext } from "@/utils/utils-aida-service";

const useRefineContext = () => {
  const { feature, setRefineFeature, setIsLoading } = useAppStore();

  const fetchRefineContext = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoading(true);
        const response = await sendRefinedContext(feature, user_input);
        const parsedResponse = parseAidaRefineFeatureResponse(response);
        setRefineFeature(parsedResponse);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error);
      }
    },
    [feature, setIsLoading, setRefineFeature]
  );

  return { fetchRefineContext };
};

export default useRefineContext;
