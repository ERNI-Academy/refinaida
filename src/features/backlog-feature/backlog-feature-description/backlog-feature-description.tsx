import MarkdownRenderer from "@/components/markdown/markdown";
import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { currentRefineBacklog } = useAppStore();

  return (
    <Card className="w-2/5">
      {currentRefineBacklog?.description && (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{currentRefineBacklog.title}</CardTitle>
          <MarkdownRenderer content={currentRefineBacklog.description} />
        </CardHeader>
      )}
    </Card>
  );
};

export default BacklogFeatureDescription;
