import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import { getDetailRefinedBacklog } from "@/helpers/helpers";
import { useAppStore } from "@/hooks/use-app-store";
import { sendRefinedDescription } from "@/utils/utils-aida-service";

const useRefineDescription = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    feature,
    refinedBacklog,
    updateRefinedBacklog,
    currentCodeRefinedStory,
    setIsLoadingDescription,
  } = useAppStore();

  const fetchRefinedDescription = useCallback(async () => {
    try {
      setIsLoadingDescription(true);
      const currentRefinedStory = getDetailRefinedBacklog(
        currentCodeRefinedStory as string,
        refinedBacklog
      );
      const response = await sendRefinedDescription(
        feature.context,
        currentRefinedStory?.description as string
      );
      updateRefinedBacklog(
        currentRefinedStory?.code as string,
        "description",
        response
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
    refinedBacklog,
    feature.context,
    updateRefinedBacklog,
    currentCodeRefinedStory,
    toast,
    t,
  ]);

  return { fetchRefinedDescription };
};

export default useRefineDescription;
