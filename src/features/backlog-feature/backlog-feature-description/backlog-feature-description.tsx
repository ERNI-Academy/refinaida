import "./backlog-feature-description.scss";

import { useTranslation } from "react-i18next";

import MarkdownRenderer from "@/components/markdown/markdown";
import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { t } = useTranslation();

  const { currentRefinedBacklog, isLoading } = useAppStore();

  return (
    <Card
      className={`backlog-feature-description-wrapper overflow-y-auto shadow-lg ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
      height="500px"
    >
      {currentRefinedBacklog?.description ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{currentRefinedBacklog.title}</CardTitle>
          <MarkdownRenderer content={currentRefinedBacklog.description} />
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
