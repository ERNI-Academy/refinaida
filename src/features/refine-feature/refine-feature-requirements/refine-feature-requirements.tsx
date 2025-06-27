import "./refine-feature-requirements.scss";

import { FileDiff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import TextDiff from "@/components/textDiff/textDiff";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import Spinner from "@/components/ui/spinner/spinner";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";

const RefineFeatureRequirements = () => {
  const { refinedFeature, isLoadingChat } = useRefineFeatureStore();

  const existDescriptionOld: boolean = useMemo(
    () => !!(refinedFeature.description.new && refinedFeature.description.old),
    [refinedFeature.description]
  );

  const [toogleDiff, setToogleDiff] = useState<boolean>(existDescriptionOld);

  useEffect(() => setToogleDiff(true), [isLoadingChat]);

  return !isLoadingChat ? (
    <div className="relative">
      <FileDiff
        className={`absolute top-0 right-0 mt-6 mr-6 p-2 border border-gray-300 rounded-full ${
          existDescriptionOld
            ? "cursor-pointer text-black transition transform hover:scale-105 active:scale-95 shadow-lg"
            : "cursor-not-allowed text-gray-400 shadow-none"
        }`}
        size={36}
        style={{ zIndex: 10 }}
        onClick={() => setToogleDiff((prevState) => !prevState)}
      />
      <Card
        className={"refine-feature-requirements-wrapper shadow-lg relative"}
        height="550px"
      >
        <CardHeader className="w-full h-full overflow-y-auto p-10">
          <CardTitle className="mb-3 mr-4 text-brand-secondary-0">{`Summary: ${refinedFeature.summary}`}</CardTitle>
          {existDescriptionOld && toogleDiff ? (
            <TextDiff
              oldText={`Description: ${refinedFeature.description.old}`}
              newText={`Description: ${refinedFeature.description.new}`}
            />
          ) : (
            <CardDescription>{`Description: ${refinedFeature.description.new}`}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </div>
  ) : (
    <Spinner className="h-full w-full border rounded-lg bg-white" />
  );
};

export default RefineFeatureRequirements;
