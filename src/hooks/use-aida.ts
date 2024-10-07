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
      import.meta.env.VITE_AZURE_OPEN_AI_API_KEY as string,
      import.meta.env.VITE_AZURE_OPEN_AI_ENDPOINT as string
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
