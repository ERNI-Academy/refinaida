import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import { mapRefinedFeatureResponse } from "@/helpers/helpers";
import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefinedFeatureResponse } from "@/lib/aida";
import { sendRefinedFeatureContext } from "@/utils/utils-aida-service";

const useRefineFeatureContext = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    feature,
    updateFeature,
    refinedFeature,
    setRefinedFeature,
    setIsLoadingChat,
  } = useAppStore();

  const fetchRefineFeatureContext = useCallback(
    async (user_input: string = "") => {
      try {
        setIsLoadingChat(true);
        const response = await sendRefinedFeatureContext(
          feature.context,
          user_input
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
        setIsLoadingChat(false);
      }
    },
    [
      setIsLoadingChat,
      feature.context,
      updateFeature,
      refinedFeature,
      setRefinedFeature,
      toast,
      t,
    ]
  );

  return { fetchRefineFeatureContext };
};

export default useRefineFeatureContext;
