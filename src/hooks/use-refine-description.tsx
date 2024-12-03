import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { useAppStore } from "@/hooks/use-app-store";
import { sendRefinedDescription } from "@/utils/utils-aida-service";

const useRefineDescription = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature, updateRefinedBacklog, setIsLoadingDescription } =
    useAppStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  const fetchRefinedDescription = useCallback(async () => {
    try {
      setIsLoadingDescription(true);
      const response = await sendRefinedDescription(
        feature.context,
        detailRefinedBacklog?.description.new as string
      );
      updateRefinedBacklog(
        detailRefinedBacklog?.code as string,
        "description",
        {
          old: detailRefinedBacklog?.description.new,
          new: response,
        }
      );
    } catch (error: any) {
      toast({
        variant: ToastVariant.Error,
        title: t("components.toaster.genericError.title"),
        description: t("components.toaster.genericError.description"),
      });
      throw error;
    } finally {
      setIsLoadingDescription(false);
    }
  }, [
    setIsLoadingDescription,
    feature.context,
    detailRefinedBacklog?.description,
    detailRefinedBacklog?.code,
    updateRefinedBacklog,
    toast,
    t,
  ]);

  return { fetchRefinedDescription };
};

export default useRefineDescription;
