import "./backlog-feature-list.scss";

import { Bookmark, ChevronsDown, CircleUserRound } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Tooltip from "@/components/tooltip/tooltip";
import { Card } from "@/components/ui/card/card";
import { useAppStore } from "@/hooks/use-app-store";
import { RefinedBacklog } from "@/types/common";

const BacklogFeatureList = () => {
  const { t } = useTranslation();

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
              <Tooltip
                trigger={
                  <h2 className="text-md">{refinedBacklogItem.summary}</h2>
                }
                content={<p>{t("backlogFeature.list.fields.summary")}</p>}
              />
            </div>
            <div className="flex gap-1">
              <div className="flex w-1/12">
                <Tooltip
                  trigger={<Bookmark className="h-6 w-6" color="#63BA3C" />}
                  content={
                    <p>{`${t("backlogFeature.list.fields.issueType")}: ${
                      refinedBacklogItem.issueType
                    }`}</p>
                  }
                />
              </div>
              <div className="flex w-5/12">
                <Tooltip
                  trigger={
                    <p className="text-gray-600 font-semibold">
                      {refinedBacklogItem.code}
                    </p>
                  }
                  content={<p>{t("backlogFeature.list.fields.code")}</p>}
                />
              </div>
              <div className="flex w-1/12 ml-auto">
                <Tooltip
                  trigger={<ChevronsDown className="h-6 w-6" color="#0065FF" />}
                  content={
                    <p>{`${t("backlogFeature.list.fields.priority")}: ${
                      refinedBacklogItem.priority
                    }`}</p>
                  }
                />
              </div>
              <div className="flex w-1/12">
                <Tooltip
                  trigger={
                    <CircleUserRound className="h-6 w-6" color="#626F86" />
                  }
                  content={
                    <p>{`${t("backlogFeature.list.fields.assignee")}: ${
                      refinedBacklogItem.assignee
                    }`}</p>
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BacklogFeatureList;
