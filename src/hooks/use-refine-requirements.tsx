import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedRequirementsResponse } from "@/lib/aida";
import { sendRefinedRequirements } from "@/utils/utils-aida-service";

const useRefineRequirements = () => {
  const { feature, setRefinedBacklog, setIsLoading } = useAppStore();

  const fetchRefinedRequirements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedRequirements(feature.context);
      const parsedResponse = parseAidaRefinedRequirementsResponse(response);
      setRefinedBacklog(parsedResponse);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
    }
  }, [feature.context, setRefinedBacklog, setIsLoading]);

  return { fetchRefinedRequirements };
};

export default useRefineRequirements;
