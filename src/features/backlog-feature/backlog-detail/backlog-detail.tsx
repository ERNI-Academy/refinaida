import { useTranslation } from "react-i18next";

import { DetailOptions } from "@/features/backlog-feature/backlog-detail/backlog-details.conts";

interface BacklogDetailProps {
  detailOption: DetailOptions;
  value: string | string[];
}

const BacklogDetail = ({ detailOption, value }: BacklogDetailProps) => {
  const { t } = useTranslation();

  return (
    <div className="pb-5">
      <p className="font-bold">
        {t(`backlogFeature.description.detailOptions.${detailOption}`)}
      </p>

      {detailOption !== DetailOptions.ACCEPTANCE_CRITERIA ? (
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

export default BacklogDetail;
