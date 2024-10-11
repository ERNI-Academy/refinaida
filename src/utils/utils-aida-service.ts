import refineFeaturePrompt from "@/prompts/refine-feature.txt?raw";
import AidaService from "@/services/aida-service";

export const sendRefinedFeature = async (
  feature: string,
  user_input?: string
): Promise<string> => {
  try {
    let prompt: string;
    if (user_input) {
      prompt = refineFeaturePrompt
        .replace("{{feature_info}}", feature)
        .replace("{{feature_user_input}}", user_input);
    } else {
      prompt = refineFeaturePrompt.replace("{{feature_info}}", feature);
    }
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};
