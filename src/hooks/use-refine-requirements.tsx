import { useCallback } from "react";

import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineRequirementsResponse } from "@/lib/aida";
import { sendRefinedRequirements } from "@/utils/utils-aida-service";

const useRefineRequirements = () => {
  const { context, setRefineBacklog, setIsLoading } = useAppStore();

  const fetchRefineRequiremets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedRequirements(context);
      const parsedResponse = parseAidaRefineRequirementsResponse(response);
      setRefineBacklog(parsedResponse);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
    }
  }, [context, setRefineBacklog, setIsLoading]);

  return { fetchRefineRequiremets };
};

export default useRefineRequirements;
