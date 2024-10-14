import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { currentRefineBacklog } = useAppStore();

  return (
    <Card className="w-2/5">
      <CardHeader className="w-full h-full p-10">
        <CardTitle className="mb-3">{currentRefineBacklog.title}</CardTitle>
        <CardDescription>{currentRefineBacklog.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BacklogFeatureDescription;
