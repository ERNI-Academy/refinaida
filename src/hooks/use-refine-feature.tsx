import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { sendRefinedFeature } from "@/utils/utils-aida-service";

const useRefineFeature = () => {
  const { feature, setRefineFeature, setIsLoading } = useAppStore();

  const fetchRefineFeature = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoading(true);
        const response = await sendRefinedFeature(feature, user_input);
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

  return { fetchRefineFeature };
};

export default useRefineFeature;
