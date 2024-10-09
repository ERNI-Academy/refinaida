import { Card, CardHeader } from "@/components/ui/card/card";
import { Textarea } from "@/components/ui/textarea/textarea";
import { useAppStore } from "@/hooks/use-app-store";

type RefineFeatureRequirementsProps = {
  className: string;
};

const RefineFeatureRequirements = ({
  className,
}: RefineFeatureRequirementsProps) => {
  const { refineFeature } = useAppStore();

  return (
    <Card className={className}>
      <CardHeader className="w-full h-full ">
        <Textarea
          className="w-full h-full resize-none"
          value={`Summary: ${refineFeature.summary}\n\nDescription: ${refineFeature.description}`}
          readOnly
        />
      </CardHeader>
    </Card>
  );
};

export default RefineFeatureRequirements;
