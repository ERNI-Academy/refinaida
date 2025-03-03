import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { transformDetailsToString } from "@/helpers/helpers";
import { parseAidaRefinedDetailBacklogResponse } from "@/lib/aida";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";
import { RefinedBacklogDetails } from "@/types/common";
import { sendRefinedDetailBacklog } from "@/utils/utils-aida-service";

const useRefineDetailBacklog = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature } = useAppStore();
  const { updateRefinedBacklog, setIsLoadingDetail } = useBacklogFeatureStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  const fetchRefineDetailBacklog = useCallback(async () => {
    try {
      setIsLoadingDetail(true);
      const currentDetailBacklog = transformDetailsToString(
        detailRefinedBacklog?.details as RefinedBacklogDetails
      );
      const response = await sendRefinedDetailBacklog(
        feature.context,
        currentDetailBacklog
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
    detailRefinedBacklog?.details,
    detailRefinedBacklog?.code,
    feature.context,
    updateRefinedBacklog,
    toast,
    t,
  ]);

  return { fetchRefineDetailBacklog };
};

export default useRefineDetailBacklog;
