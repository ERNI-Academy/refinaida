export type Feature = {
  name: string;
  context: string;
  textDocument?: string | null;
};

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
  summary: string;
  issueType: string;
  priority: string;
  assignee: string;
  release: string;
  description: string;
};
