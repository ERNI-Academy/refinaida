import {
  AidaRefineFeatureResponse,
  AidaRefineRequirementsResponse,
} from "@/lib/aida";
import {
  RefinedBacklog,
  RefinedBacklogDetails,
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
      addicionalNotes: backlogItem.details.addicionalNotes,
    } as RefinedBacklogDetails,
  }));

export const transformDetailsToString = (
  details: RefinedBacklogDetails
): string => {
  const { businessValue, description, acceptanceCriteria, addicionalNotes } =
    details;
  return `${businessValue} ${description} ${acceptanceCriteria.join(
    " "
  )} ${addicionalNotes}`;
};
