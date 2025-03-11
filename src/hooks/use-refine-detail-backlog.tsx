import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { parseAidaRefinedDetailBacklogResponse } from "@/lib/aida";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";
import { sendRefinedDetailBacklog } from "@/utils/utils-aida-service";

const useRefineDetailBacklog = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature } = useAppStore();
  const { configureRequirements } = useRefineFeatureStore();
  const { updateRefinedBacklog, setIsLoadingDetail } = useBacklogFeatureStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  const fetchRefineDetailBacklog = useCallback(async () => {
    try {
      setIsLoadingDetail(true);
      const response = await sendRefinedDetailBacklog(
        feature.context,
        detailRefinedBacklog?.summary as string,
        configureRequirements.acceptanceCriteria
      );
      const parsedResponse = parseAidaRefinedDetailBacklogResponse(response);
      updateRefinedBacklog(
        detailRefinedBacklog?.code as string,
        "details",
        parsedResponse
      );
    } catch (error: any) {
      toast({
        variant: ToastVariant.Error,
        title: t("components.toaster.genericError.title"),
        description: t("components.toaster.genericError.description"),
      });
      throw error;
    } finally {
      setIsLoadingDetail(false);
    }
  }, [
    setIsLoadingDetail,
    feature.context,
    detailRefinedBacklog?.summary,
    detailRefinedBacklog?.code,
    configureRequirements.acceptanceCriteria,
    updateRefinedBacklog,
    toast,
    t,
  ]);

  return { fetchRefineDetailBacklog };
};

export default useRefineDetailBacklog;
