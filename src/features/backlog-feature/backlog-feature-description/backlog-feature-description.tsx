import "./backlog-feature-description.scss";

import { useTranslation } from "react-i18next";

import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import BacklogDetail from "@/features/backlog-feature/backlog-detail/backlog-detail";
import { DetailOptions } from "@/features/backlog-feature/backlog-detail/backlog-details.conts";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeatureDescription = () => {
  const { t } = useTranslation();

  const { isLoading, isLoadingDescription } = useAppStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  return (
    <Card
      className={`backlog-feature-description-wrapper overflow-y-auto shadow-lg ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
      height="500px"
    >
      {isLoadingDescription ? (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.description.itemUpdating")}
        </div>
      ) : detailRefinedBacklog ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{detailRefinedBacklog.summary}</CardTitle>
          <div className="pb-10">
            <BacklogDetail
              detailOption={DetailOptions.DESCRIPTION}
              value={detailRefinedBacklog.details.description}
            />
            <BacklogDetail
              detailOption={DetailOptions.ACCEPTANCE_CRITERIA}
              value={detailRefinedBacklog.details.acceptanceCriteria}
            />
            <BacklogDetail
              detailOption={DetailOptions.ADDICIONAL_NOTES}
              value={detailRefinedBacklog.details.addicionalNotes}
            />
          </div>
        </CardHeader>
      ) : (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.description.itemNotSelected")}
        </div>
      )}
    </Card>
  );
};

export default BacklogFeatureDescription;
