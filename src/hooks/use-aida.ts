import { useMemo } from "react";

import refineFeaturePrompt from "@/prompts/refine-feature.txt?raw";
import AidaService from "@/services/aida-service";

const useAida = () => {
  const aidaService = useMemo(() => {
    return AidaService.getInstance(
      import.meta.env.VITE_AZURE_OPEN_AI_API_KEY as string,
      import.meta.env.VITE_AZURE_OPEN_AI_ENDPOINT as string
    );
  }, []);

  const refineFeature = async (feature: string, context?: string) => {
    try {
      let prompt: string;
      if (context) {
        prompt = refineFeaturePrompt
          .replace("{{feature_info}}", feature)
          .replace("{{feature_context}}", context);
      } else {
        prompt = refineFeaturePrompt.replace("{{feature_info}}", feature);
      }
      return await aidaService.generateResponse(prompt);
    } catch (error) {
      return error;
    }
  };
  return { refineFeature };
};

export default useAida;
