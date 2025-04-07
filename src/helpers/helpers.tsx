import {
  AidaRefineFeatureResponse,
  AidaRefineRequirementsResponse,
} from "@/lib/aida";
import {
  RefinedBacklog,
  RefinedBacklogDetails,
  RefinedBacklogExport,
  RefinedFeature,
} from "@/types/common";

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

export const mapRefinedBacklogResponse = (
  response: AidaRefineRequirementsResponse[]
): RefinedBacklog[] =>
  response.map((backlogItem) => ({
    code: backlogItem.code,
    summary: backlogItem.summary,
    issueType: backlogItem.issueType,
    priority: backlogItem.priority,
    assignee: backlogItem.assignee,
    release: backlogItem.release,
    details: {
      businessValue: backlogItem.details.businessValue,
      description: backlogItem.details.description,
      acceptanceCriteria: backlogItem.details.acceptanceCriteria,
      additionalNotes: backlogItem.details.additionalNotes,
    } as RefinedBacklogDetails,
  }));

export const mapRefinedBacklogToExport = (
  refinedBacklog: RefinedBacklog[]
): RefinedBacklogExport[] =>
  refinedBacklog.map((refinedBacklogItem) => ({
    key: refinedBacklogItem.code,
    summary: refinedBacklogItem.summary,
    issueType: refinedBacklogItem.issueType,
    priority: refinedBacklogItem.priority,
    assignee: refinedBacklogItem.assignee,
    release: refinedBacklogItem.release,
    description: transformBacklogDetailsToString(refinedBacklogItem.details),
  }));

export const transformBacklogDetailsToString = (
  refinedBacklogDetails: RefinedBacklogDetails
): string => {
  return `
  Business value: ${refinedBacklogDetails.businessValue}
  Description: ${refinedBacklogDetails.description}
  Acceptance criteria: ${refinedBacklogDetails.acceptanceCriteria.join("; ")}
  Additional notes: ${refinedBacklogDetails.additionalNotes}
  `;
};

export const transformDetailsToString = (
  details: RefinedBacklogDetails
): string => {
  const { businessValue, description, acceptanceCriteria, additionalNotes } =
    details;
  return `${businessValue} ${description} ${acceptanceCriteria.join(
    " "
  )} ${additionalNotes}`;
};
