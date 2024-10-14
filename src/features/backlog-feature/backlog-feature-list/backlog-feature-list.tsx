import "./backlog-feature-list.scss";

import { useCallback } from "react";

import { Card } from "@/components/ui/card/card";
import Spinner from "@/components/ui/spinner/spinner";
import { useAppStore } from "@/hooks/use-app-store";
import { RefineBacklog } from "@/types/common";

const BacklogFeatureList = () => {
  const { refineBacklog, setCurrentRefineBacklog, isLoading } = useAppStore();

  const handleDetailBacklogItem = useCallback(
    (refineBacklogItem: RefineBacklog) => {
      setCurrentRefineBacklog(refineBacklogItem);
    },
    [setCurrentRefineBacklog]
  );

  const BacklogItem = (refineBacklogItem: RefineBacklog) => {
    return (
      <Card
        className="w-full mb-4 last:mb-0 p-3 h-30 hover:cursor-pointer bg-gray-50 shadow-sm"
        onClick={() => handleDetailBacklogItem(refineBacklogItem)}
      >
        <div className="p-2 pb-0">
          <h2 className="text-lg font-semibold">{refineBacklogItem.title}</h2>
        </div>
        <div className="p-2">
          <p className="text-gray-600">
            <strong>Code:</strong> {refineBacklogItem.code}
          </p>
          <p className="text-gray-600">
            <strong>Release:</strong> {refineBacklogItem.release}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <Card className="w-3/5 p-5 shadow-lg backlog-feature-wrapper overflow-y-auto">
      {!isLoading ? (
        refineBacklog.map((refineBacklogItem) => (
          <BacklogItem
            key={refineBacklogItem.code}
            title={refineBacklogItem.title}
            code={refineBacklogItem.code}
            release={refineBacklogItem.release}
            description={refineBacklogItem.description}
          />
        ))
      ) : (
        <Spinner className="h-full w-full" />
      )}
    </Card>
  );
};

export default BacklogFeatureList;
