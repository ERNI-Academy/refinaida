export interface Message {
  id: string;
  text: string | string[];
  sender: string;
}

export type RefinedFeature = {
  summary: string;
  description: string;
  questions: string[];
};

export type RefinedBacklog = {
  code: string;
  title: string;
  release: string;
  description?: string;
};
