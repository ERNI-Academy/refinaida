import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineRequirementsResponse } from "@/lib/aida";
import { sendRefinedRequirements } from "@/utils/utils-aida-service";

const useRefineRequirements = () => {
  const { context, setRefinedBacklog, setIsLoading } = useAppStore();

  const fetchRefineRequiremets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedRequirements(context);
      const parsedResponse = parseAidaRefineRequirementsResponse(response);
      setRefinedBacklog(parsedResponse);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
    }
  }, [context, setRefinedBacklog, setIsLoading]);

  return { fetchRefineRequiremets };
};

export default useRefineRequirements;
