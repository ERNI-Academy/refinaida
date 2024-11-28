import "./backlog-feature-description.scss";

import { useTranslation } from "react-i18next";

import MarkdownRenderer from "@/components/markdown/markdown";
import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import { getDetailRefinedBacklog } from "@/helpers/helpers";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { t } = useTranslation();

  const {
    refinedBacklog,
    currentCodeRefinedStory,
    isLoading,
    isLoadingDescription,
  } = useAppStore();

  const currentRefinedStory = getDetailRefinedBacklog(
    currentCodeRefinedStory as string,
    refinedBacklog
  );

  return (
    <Card
      className={`backlog-feature-description-wrapper overflow-y-auto shadow-lg ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
      height="500px"
    >
      {isLoadingDescription ? (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.description.itemUpdating")}
        </div>
      ) : currentRefinedStory ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{currentRefinedStory.summary}</CardTitle>
          <div className="pb-10">
            <MarkdownRenderer content={currentRefinedStory.description} />
          </div>
        </CardHeader>
      ) : (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.description.itemNotSelected")}
        </div>
      )}
    </Card>
  );
};

export default BacklogFeatureDescription;
