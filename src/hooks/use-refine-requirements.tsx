import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import { mapRefinedBacklogResponse } from "@/helpers/helpers";
import { parseAidaRefinedRequirementsResponse } from "@/lib/aida";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";
import { sendRefinedRequirements } from "@/utils/utils-aida-service";

const useRefineRequirements = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature, setIsLoading } = useAppStore();
  const { configureRequirements } = useRefineFeatureStore();
  const { setRefinedBacklog } = useBacklogFeatureStore();

  const fetchRefinedRequirements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedRequirements(
        feature.context,
        configureRequirements.userStories,
        configureRequirements.acceptanceCriteria
      );
      const parsedResponse = parseAidaRefinedRequirementsResponse(response);
      const mapRefinedBacklog = mapRefinedBacklogResponse(parsedResponse);
      setRefinedBacklog(mapRefinedBacklog);
    } catch (error: any) {
      toast({
        variant: ToastVariant.Error,
        title: t("components.toaster.genericError.title"),
        description: t("components.toaster.genericError.description"),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    configureRequirements,
    feature.context,
    setRefinedBacklog,
    toast,
    t,
  ]);

  return { fetchRefinedRequirements };
};

export default useRefineRequirements;
