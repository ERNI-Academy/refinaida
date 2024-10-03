import { AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ZodObject } from "zod";

class AidaService {
  private static instance: AidaService;
  private client: AzureOpenAI;

  private constructor(apiKey: string, endpoint: string) {
    const deployment = "aida-apps-gpt-4o";
    const apiVersion = "2023-03-15-preview";
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
    console.log("AidaService - generateResponse");
    const result = await this.client.chat.completions.create({
      stream: false,
      model: "gpt-4o",
      //   response_format: zodResponseFormat(jsonSchema, "response"),
      messages: [{ role: "user", content: prompt }],
    });

    if (result.choices && result.choices.length > 0) {
      return result.choices[0].message.content as string;
    } else {
      throw new Error("No response from AIDA");
    }
  }
}

export default AidaService;
