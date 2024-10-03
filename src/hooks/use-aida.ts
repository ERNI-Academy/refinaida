import { useMemo } from "react";
import { z } from "zod";

import refineFeaturePrompt from "@/prompts/refine-feature.txt?raw";
import AidaService from "@/services/aida-service";

const refineFeatureResponseSchema = z.object({
  feature: z.string(),
  questions: z.array(z.string()),
});

const useAida = () => {
  const aidaService = useMemo(() => {
    return AidaService.getInstance(
      import.meta.env.VITE_AIDA_API_KEY as string,
      "https://services-aida-apps.openai.azure.com"
    );
  }, []);

  const refineFeature = async (feature: string, context: string) => {
    try {
      const prompt = refineFeaturePrompt
        .replace("{{feature_info}}", feature)
        .replace("{{feature_context}}", context);
      return await aidaService.generateResponse(
        prompt,
        refineFeatureResponseSchema
      );
    } catch (error) {
      return error;
    }
  };
  return { refineFeature };
};

export default useAida;
