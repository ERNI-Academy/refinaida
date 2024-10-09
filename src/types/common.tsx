export interface Message {
  id: string;
  text: string | string[];
  sender: string;
}

export type RefineFeature = {
  summary: string;
  description: string;
  questions: string[];
};
