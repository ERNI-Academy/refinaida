import "./backlog-feature-list.scss";

import { useCallback } from "react";

import { Card } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";
import { RefinedBacklog } from "@/types/common";

const BacklogFeatureList = () => {
  const { refinedBacklog, setCurrentRefinedBacklog, isLoading } = useAppStore();

  const handleDetailBacklogItem = useCallback(
    (refineBacklogItem: RefinedBacklog) => {
      setCurrentRefinedBacklog(refineBacklogItem);
    },
    [setCurrentRefinedBacklog]
  );

  return (
    <div
      className={`flex flex-col h-full w-full backlog-feature-list-wrapper overflow-y-auto p-5 ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
    >
      {refinedBacklog.map((refinedBacklogItem) => (
        <Card
          className={`w-full mb-4 last:mb-0 p-3 h-30  bg-gray-50 shadow-sm ${
            isLoading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
          } `}
          onClick={() => handleDetailBacklogItem(refinedBacklogItem)}
          key={refinedBacklogItem.code}
        >
          <div className="p-2 pb-0">
            <h2 className="text-lg font-semibold">
              {refinedBacklogItem.title}
            </h2>
          </div>
          <div className="p-2">
            <p className="text-gray-600">
              <strong>Code:</strong> {refinedBacklogItem.code}
            </p>
            <p className="text-gray-600">
              <strong>Release:</strong> {refinedBacklogItem.release}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BacklogFeatureList;
