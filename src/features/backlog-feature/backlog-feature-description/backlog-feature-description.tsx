import "./backlog-feature-description.scss";

import MarkdownRenderer from "@/components/markdown/markdown";
import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { currentRefinedBacklog } = useAppStore();

  return (
    <Card className="w-1/2 shadow-lg overflow-y-auto" maxHeight="500px">
      {currentRefinedBacklog?.description && (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{currentRefinedBacklog.title}</CardTitle>
          <MarkdownRenderer content={currentRefinedBacklog.description} />
        </CardHeader>
      )}
    </Card>
  );
};

export default BacklogFeatureDescription;
