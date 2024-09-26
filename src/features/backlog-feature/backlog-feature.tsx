import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container/container";
import { Button } from "@/components/ui/button/button";
import BacklogFeatureDescription from "@/features/backlog-feature/backlog-feature-description/backlog-feature-description";
import BacklogFeatureList from "@/features/backlog-feature/backlog-feature-list/backlog-feature-list";
import { useAppStore } from "@/hooks/use-app-store";

const BacklogFeature = () => {
  const { t } = useTranslation();
  const { feature } = useAppStore();

  return (
    <Container size="lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-gray-500">
            {t("backlog.feature.title")}
          </span>
          <span className="text-5xl text-ellipsis whitespace-nowrap w-full text-center overflow-hidden">
            {feature}
          </span>
        </div>
        <div className="w-full">
          <span className="text-2xl font-bold text-gray-500">
            {t("backlog.feature.backLog.title")}
          </span>
        </div>
        <div className="w-full flex gap-4">
          <BacklogFeatureList />
          <BacklogFeatureDescription />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-3/5 flex justify-between">
            <Button className="w-5/12">
              {t("backlog.feature.button.export")}
            </Button>
            <Button className="w-5/12">
              {t("backlog.feature.button.thinkMore")}
            </Button>
          </div>
          <div className="w-2/5 flex">
            <Button className="w-7/12 ml-auto">
              {t("backlog.feature.button.refineRequirements")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BacklogFeature;
