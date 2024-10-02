import { Card, CardHeader } from "@/components/ui/card/card";
import { Textarea } from "@/components/ui/textarea/textarea";

type RefineFeatureRequirementsProps = {
  className: string;
};

const RefineFeatureRequirements = ({
  className,
}: RefineFeatureRequirementsProps) => (
  <Card className={className}>
    <CardHeader className="w-full h-full ">
      <Textarea className="w-full h-full resize-none" />
    </CardHeader>
  </Card>
);

export default RefineFeatureRequirements;
