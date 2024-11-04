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
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [feature.context, setRefinedBacklog, setIsLoading]);

  return { fetchRefinedRequirements };
};

export default useRefineRequirements;
