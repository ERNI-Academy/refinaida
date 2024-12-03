export interface Feature {
  name: string;
  context: string;
  textDocument?: string | null;
}

export interface Message {
  id: string;
  text: string | string[];
  sender: string;
}

export interface Description {
  old?: string;
  new?: string;
}

export interface RefinedFeature {
  summary: string;
  description: Description;
  questions: string[];
}

export interface RefinedBacklog {
  code: string;
  summary: string;
  issueType: string;
  priority: string;
  assignee: string;
  release: string;
  description: Description;
}
