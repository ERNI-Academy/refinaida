import "./backlog-feature-list.scss";

import { Bookmark, ChevronsDown, CircleUserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import Tooltip from "@/components/tooltip/tooltip";
import { Card } from "@/components/ui/card/card";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";

const BacklogFeatureList = () => {
  const { t } = useTranslation();

  const { isLoading } = useAppStore();
  const {
    refinedBacklog,
    currentCodeRefinedStorie,
    setCurrentCodeRefinedStorie,
    isLoadingDetail,
  } = useBacklogFeatureStore();

  return (
    <div
      className={`flex flex-col h-full w-full backlog-feature-list-wrapper overflow-y-auto p-5 ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
    >
      {refinedBacklog.map((refinedBacklogItem) => (
        <Card
          key={refinedBacklogItem.code}
          className={`w-full mb-4 last:mb-0 h-30 backlog-list-card shadow-sm ${
            isLoading || isLoadingDetail
              ? "hover:cursor-not-allowed"
              : "hover:cursor-pointer"
          } `}
          onClick={() => setCurrentCodeRefinedStorie(refinedBacklogItem.code)}
          isActive={currentCodeRefinedStorie === refinedBacklogItem.code}
          disabled={isLoading || isLoadingDetail}
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
            <div className="flex">
              <Tooltip
                trigger={
                  <h2 className="text-sm field-release bg-yellow-500 rounded-md text-white font-semibold uppercase ">
                    {refinedBacklogItem.release}
                  </h2>
                }
                content={<p>{t("backlogFeature.list.fields.release")}</p>}
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
