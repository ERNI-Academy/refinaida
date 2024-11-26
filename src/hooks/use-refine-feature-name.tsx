import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedFeatureResponse } from "@/lib/aida";
import {
  mapRefinedFeatureResponse,
  sendRefinedFeatureName,
} from "@/utils/utils-aida-service";

const useRefineFeatureName = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    feature,
    updateFeature,
    refinedFeature,
    setRefinedFeature,
    setIsLoading,
  } = useAppStore();

  const fetchRefinedFeatureName = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await sendRefinedFeatureName(
        feature.name,
        feature.textDocument
      );
      const parsedResponse = parseAidaRefinedFeatureResponse(response);
      updateFeature({
        context: `${parsedResponse.summary}. ${parsedResponse.description}`,
      });
      const mapRefinedFeature = mapRefinedFeatureResponse(
        parsedResponse,
        refinedFeature
      );
      setRefinedFeature(mapRefinedFeature);
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
    feature.name,
    feature.textDocument,
    updateFeature,
    refinedFeature,
    setRefinedFeature,
    toast,
    t,
  ]);

  return { fetchRefinedFeatureName };
};

export default useRefineFeatureName;
