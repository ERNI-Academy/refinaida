import { Card, CardHeader } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { currentRefineBacklog } = useAppStore();
  
  return (
    <Card className="w-2/5">
      <CardHeader>{currentRefineBacklog.description}</CardHeader>
    </Card>
  );
};

export default BacklogFeatureDescription;
