import "./backlog-feature-detail.scss";

import { useTranslation } from "react-i18next";

import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import BacklogFeatureDetailItem from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item";
import { DetailType } from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item.const";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";

const BacklogFeatureDetail = () => {
  const { t } = useTranslation();

  const { isLoading } = useAppStore();
  const { isLoadingDetail } = useBacklogFeatureStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  return (
    <Card
      className={`backlog-feature-detail-wrapper overflow-y-auto shadow-lg ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
      height="500px"
    >
      {isLoadingDetail ? (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.detail.itemUpdating")}
        </div>
      ) : detailRefinedBacklog ? (
        <CardHeader className="w-full h-full p-10">
          <CardTitle className="mb-3">{detailRefinedBacklog.summary}</CardTitle>
          <div className="pb-10">
            <BacklogFeatureDetailItem
              type={DetailType.BUSINESS_VALUE}
              value={detailRefinedBacklog.details.businessValue}
            />
            <BacklogFeatureDetailItem
              type={DetailType.DESCRIPTION}
              value={detailRefinedBacklog.details.description}
            />
            <BacklogFeatureDetailItem
              type={DetailType.ACCEPTANCE_CRITERIA}
              value={detailRefinedBacklog.details.acceptanceCriteria}
            />
            <BacklogFeatureDetailItem
              type={DetailType.ADDICIONAL_NOTES}
              value={detailRefinedBacklog.details.addicionalNotes}
            />
          </div>
        </CardHeader>
      ) : (
        <div className="flex items-center justify-center h-full">
          {t("backlogFeature.detail.itemNotSelected")}
        </div>
      )}
    </Card>
  );
};

export default BacklogFeatureDetail;
