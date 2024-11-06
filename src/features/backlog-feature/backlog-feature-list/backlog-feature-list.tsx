import "./backlog-feature-list.scss";

import { Bookmark, ChevronsDown, CircleUserRound } from "lucide-react";
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
          className={`w-full mb-4 last:mb-0 h-30 backlog-list-card bg-gray-70 shadow-sm ${
            isLoading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
          } `}
          onClick={() => handleDetailBacklogItem(refinedBacklogItem)}
          key={refinedBacklogItem.code}
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex">
              <h2 className="text-md">{refinedBacklogItem.summary}</h2>
            </div>
            <div className="flex gap-1">
              <div className="flex w-1/12">
                <Bookmark className="h-6 w-6" color="#63BA3C" />
              </div>
              <div className="flex w-5/12">
                <p className="text-gray-600 font-semibold">
                  {refinedBacklogItem.code}
                </p>
              </div>
              <div className="flex w-1/12 ml-auto">
                <ChevronsDown className="h-6 w-6" color="#0065FF" />
              </div>
              <div className="flex w-1/12">
                <CircleUserRound className="h-6 w-6" color="#626F86" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BacklogFeatureList;
