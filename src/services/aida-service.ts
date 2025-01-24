import { AzureOpenAI } from "openai";

const ERROR_MESSAGE = "No response from AIDA";

interface IAidaService {
  generateResponse: (prompt: string) => Promise<string>;
}

let AidaService: IAidaService;

const getAidaInstance = (): IAidaService => {
  if (!AidaService) {
    const apiKey = import.meta.env.VITE_AZURE_OPEN_AI_API_KEY as string;
    const apiVersion = import.meta.env.VITE_AZURE_OPEN_AI_API_VERSION as string;
    const deployment = import.meta.env.VITE_AZURE_OPEN_AI_DEPLOYMENT as string;
    const endpoint = import.meta.env.VITE_AZURE_OPEN_AI_ENDPOINT as string;
    const model = import.meta.env.VITE_AZURE_OPEN_AI_MODEL as string;
    const temperature = 0.3;

    const client = new AzureOpenAI({
      apiKey,
      endpoint,
      deployment,
      apiVersion,
      dangerouslyAllowBrowser: true,
    });

    AidaService = {
      generateResponse: async (prompt: string): Promise<string> => {
        const result = await client.chat.completions.create({
          stream: false,
          model: model,
          messages: [{ role: "user", content: prompt }],
          temperature: temperature,
        });

        if (result.choices && result.choices.length > 0) {
          return result.choices[0].message.content as string;
        } else {
          throw new Error(ERROR_MESSAGE);
        }
      },
    };
  }

  return AidaService;
};

export default getAidaInstance();
