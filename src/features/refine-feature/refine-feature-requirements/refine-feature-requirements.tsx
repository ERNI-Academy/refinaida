import "./refine-feature-requirements.scss";

import TextDiff from "@/components/textDiff/textDiff";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import Spinner from "@/components/ui/spinner/spinner";
import { useAppStore } from "@/hooks/use-app-store";

const RefineFeatureRequirements = () => {
  const { refinedFeature, isLoadingChat } = useAppStore();

  return (
    <Card
      className={
        "refine-feature-requirements-wrapper overflow-y-auto shadow-lg"
      }
      height="550px"
    >
      {!isLoadingChat ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{`Summary: ${refinedFeature.summary}`}</CardTitle>
          {refinedFeature.description.new && refinedFeature.description.old ? (
            <TextDiff
              oldText={`Description: ${refinedFeature.description.old}`}
              newText={`Description: ${refinedFeature.description.new}`}
            />
          ) : (
            <CardDescription>{`Description: ${refinedFeature.description.new}`}</CardDescription>
          )}
        </CardHeader>
      ) : (
        <Spinner className="h-full w-full" />
      )}
    </Card>
  );
};

export default RefineFeatureRequirements;
