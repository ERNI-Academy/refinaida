import { AzureOpenAI } from "openai";
// import { zodResponseFormat } from "openai/helpers/zod";
import { ZodObject } from "zod";

const ERROR_MESSAGE = "No response from AIDA";

class AidaService {
  private static instance: AidaService;
  private client: AzureOpenAI;

  private constructor(apiKey: string, endpoint: string) {
    const deployment = import.meta.env.VITE_AZURE_OPEN_AI_DEPLOYMENT as string;
    const apiVersion = import.meta.env.VITE_AZURE_OPEN_AI_API_VERSION as string;
    this.client = new AzureOpenAI({
      apiKey,
      endpoint,
      deployment,
      apiVersion,
      dangerouslyAllowBrowser: true,
    });
  }

  public static getInstance(apiKey: string, endpoint: string): AidaService {
    if (!AidaService.instance) {
      AidaService.instance = new AidaService(apiKey, endpoint);
    }
    return AidaService.instance;
  }

  async generateResponse(
    prompt: string,
    jsonSchema: ZodObject<any>
  ): Promise<string> {
    // console.log("AidaService - GenerateResponse...");
    const result = await this.client.chat.completions.create({
      stream: false,
      model: "gpt-4o",
      //   response_format: zodResponseFormat(jsonSchema, "response"),
      messages: [{ role: "user", content: prompt }],
    });

    if (result.choices && result.choices.length > 0) {
      return result.choices[0].message.content as string;
    } else {
      throw new Error(ERROR_MESSAGE);
    }
  }
}

export default AidaService;
