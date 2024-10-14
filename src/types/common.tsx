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

export type RefineBacklog = {
  code: string;
  title: string;
  release: string;
  description?: string;
};
