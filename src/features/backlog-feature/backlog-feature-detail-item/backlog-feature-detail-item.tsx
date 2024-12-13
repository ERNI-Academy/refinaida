import { useTranslation } from "react-i18next";

import { DetailType } from "@/features/backlog-feature/backlog-feature-detail-item/backlog-feature-detail-item.const";

interface BacklogDetailProps {
  type: DetailType;
  value: string | string[];
}

const BacklogFeatureDetailItem = ({ type, value }: BacklogDetailProps) => {
  const { t } = useTranslation();

  return (
    <div className="pb-2">
      <p className="font-bold">
        {t(`backlogFeature.detail.detailOptions.${type}`)}
      </p>

      {type !== DetailType.ACCEPTANCE_CRITERIA ? (
        <p>{value}</p>
      ) : (
        (value as string[]).map((acceptanceCriteria: any, i) => (
          <p key={i} className="pb-2">
            {acceptanceCriteria}
          </p>
        ))
      )}
    </div>
  );
};

export default BacklogFeatureDetailItem;
