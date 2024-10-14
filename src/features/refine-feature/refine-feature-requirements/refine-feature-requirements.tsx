import "./refine-feature-requirements.scss";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import Spinner from "@/components/ui/spinner/spinner";
import { useAppStore } from "@/hooks/use-app-store";

type RefineFeatureRequirementsProps = {
  className: string;
};

const RefineFeatureRequirements = ({
  className,
}: RefineFeatureRequirementsProps) => {
  const { refinedFeature, isLoading } = useAppStore();

  return (
    <Card className={`${className} requirements-wrapper overflow-y-auto p-0`}>
      {!isLoading ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{`Summary: ${refinedFeature.summary}`}</CardTitle>
          <CardDescription>{`Description: ${refinedFeature.description}`}</CardDescription>
        </CardHeader>
      ) : (
        <Spinner className="h-full w-full" />
      )}
    </Card>
  );
};

export default RefineFeatureRequirements;
