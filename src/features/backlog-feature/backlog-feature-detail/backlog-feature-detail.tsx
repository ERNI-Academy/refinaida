import "./backlog-feature-detail.scss";

import { useTranslation } from "react-i18next";

import { Card, CardHeader, CardTitle } from "@/components/ui/card/card";
import BacklogFeatureDetailItem from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item";
import { DetailType } from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item.const";
import useGetDetailRefinedFeature from "@/features/backlog-feature/hooks/use-detail-refined-backlog";
import { useAppStore } from "@/stores/use-app-store";
import { useBacklogFeatureStore } from "@/stores/use-backlog-feature-store";
import { RefinedBacklogDetailList } from "@/types/common";

const BacklogFeatureDetail = () => {
  const { t } = useTranslation();

  const { isLoading } = useAppStore();
  const { isLoadingDetail } = useBacklogFeatureStore();

  const { detailRefinedBacklog } = useGetDetailRefinedFeature();

  const backlogFeatureDetailList: RefinedBacklogDetailList[] = [
    {
      type: DetailType.BUSINESS_VALUE,
      value: detailRefinedBacklog?.details.businessValue || "",
    },
    {
      type: DetailType.DESCRIPTION,
      value: detailRefinedBacklog?.details.description || "",
    },
    {
      type: DetailType.ACCEPTANCE_CRITERIA,
      value: detailRefinedBacklog?.details.acceptanceCriteria || [],
    },
    {
      type: DetailType.ADDICIONAL_NOTES,
      value: detailRefinedBacklog?.details.additionalNotes || "",
    },
  ];

  let detailContent;
  if (isLoadingDetail) {
    detailContent = (
      <div className="flex items-center justify-center h-full">
        {t("backlogFeature.detail.itemUpdating")}
      </div>
    );
  } else if (detailRefinedBacklog) {
    detailContent = (
      <CardHeader className="w-full h-full p-10">
        <CardTitle className="mb-3">{detailRefinedBacklog.summary}</CardTitle>
        <div className="pb-10">
          {backlogFeatureDetailList.map(
            ({ type, value }: RefinedBacklogDetailList) => (
              <BacklogFeatureDetailItem key={type} type={type} value={value} />
            )
          )}
        </div>
      </CardHeader>
    );
  } else {
    detailContent = (
      <div className="flex items-center justify-center h-full">
        {t("backlogFeature.detail.itemNotSelected")}
      </div>
    );
  }

  return (
    <Card
      className={`backlog-feature-detail-wrapper overflow-y-auto shadow-lg ${
        isLoading ? "opacity-60" : "opacity-100"
      } `}
      height="500px"
    >
      {detailContent}
    </Card>
  );
};

export default BacklogFeatureDetail;
