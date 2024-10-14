import refineContextPrompt from "@/prompts/refine-context.txt?raw";
import refineFeaturePrompt from "@/prompts/refine-feature.txt?raw";
import AidaService from "@/services/aida-service";

export const sendRefinedFeature = async (feature: string): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineFeaturePrompt.replace("{{feature_info}}", feature);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const sendRefinedContext = async (
  context: string,
  user_input: string
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineContextPrompt
      .replace("{{feature_context}}", context)
      .replace("{{feature_user_input}}", user_input);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};
