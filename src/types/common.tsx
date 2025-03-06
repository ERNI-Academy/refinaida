import { DetailType } from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item.const";

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

export interface ConfigureRequirements {
  userStories: number;
  acceptanceCriteria: number;
}

export interface RefinedBacklogDetails {
  businessValue: string;
  description: string;
  acceptanceCriteria: string[];
  addicionalNotes: string;
}

export interface RefinedBacklog {
  code: string;
  summary: string;
  issueType: string;
  priority: string;
  assignee: string;
  release: string;
  details: RefinedBacklogDetails;
}

export interface RefinedBacklogDetailList {
  type: DetailType;
  value: string | string[];
}

export interface RefinedBacklogExport {
  key: string;
  summary: string;
  issueType: string;
  priority: string;
  assignee: string;
  release: string;
  description: string;
}
