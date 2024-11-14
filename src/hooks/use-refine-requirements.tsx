import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedRequirementsResponse } from "@/lib/aida";
import { sendRefinedRequirements } from "@/utils/utils-aida-service";

const useRefineRequirements = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature, setRefinedBacklog, setIsLoading } = useAppStore();

  const fetchRefinedRequirements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedRequirements(feature.context);
      const parsedResponse = parseAidaRefinedRequirementsResponse(response);
      setRefinedBacklog(parsedResponse);
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
  }, [setIsLoading, feature.context, setRefinedBacklog, toast, t]);

  return { fetchRefinedRequirements };
};

export default useRefineRequirements;
