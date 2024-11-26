import { AidaRefineFeatureResponse } from "@/lib/aida";
import refineDescriptionPrompt from "@/prompts/refine-description.txt?raw";
import refineFeatureContextPrompt from "@/prompts/refine-feature-context.txt?raw";
import refineFeatureNamePrompt from "@/prompts/refine-feature-name.txt?raw";
import refineRequirementsPrompt from "@/prompts/refine-requirements.txt?raw";
import AidaService from "@/services/aida-service";
import { RefinedFeature } from "@/types/common";

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
  context: string
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineRequirementsPrompt.replace("{{feature_context}}", context);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const sendRefinedDescription = async (
  context: string,
  description: string
): Promise<string> => {
  try {
    let prompt: string;
    prompt = refineDescriptionPrompt
      .replace("{{feature_context}}", context)
      .replace("{{description}}", description);
    return await AidaService.generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

export const mapRefinedFeatureResponse = (
  response: AidaRefineFeatureResponse,
  currentFeature: RefinedFeature
): RefinedFeature => {
  return {
    summary: response.summary,
    description: {
      old: currentFeature.description.new,
      new: response.description,
    },
    questions: response.questions,
  };
};
