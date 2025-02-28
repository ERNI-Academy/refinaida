import refineDetailBacklogPrompt from "@/prompts/refine-detail-backlog.txt?raw";
import refineFeatureContextPrompt from "@/prompts/refine-feature-context.txt?raw";
import refineFeatureNamePrompt from "@/prompts/refine-feature-name.txt?raw";
import refineRequirementsPrompt from "@/prompts/refine-requirements.txt?raw";
import AidaService from "@/services/aida-service";

export const sendRefinedFeatureName = async (
  feature: string,
  textDocument?: string | null
): Promise<string> => {
  try {
    let prompt: string;
    if (textDocument) {
      prompt = refineFeatureNamePrompt
        .replace("{{feature_name}}", feature)
        .replace("{{feature_text_document}}", textDocument);
    } else {
      prompt = refineFeatureNamePrompt.replace("{{feature_name}}", feature);
    }
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const sendRefinedFeatureContext = async (
  context: string,
  user_input: string
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineFeatureContextPrompt
      .replace("{{feature_context}}", context)
      .replace("{{feature_user_input}}", user_input);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const sendRefinedRequirements = async (
  context: string,
  userStories: number,
  acceptanceCriteria: number
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineRequirementsPrompt
      .replace("{{feature_context}}", context)
      .replace("{{userStories}}", userStories.toString())
      .replace("{{acceptanceCriteria}}", acceptanceCriteria.toString());
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const sendRefinedDetailBacklog = async (
  context: string,
  detailBacklog: string
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineDetailBacklogPrompt
      .replace("{{feature_context}}", context)
      .replace("{{detailBacklog}}", detailBacklog);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};
