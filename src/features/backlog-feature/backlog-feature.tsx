import { Logs } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container/container";
import Sidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button/button";
import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
import BacklogFeatureDetail from "@/features/backlog-feature/backlog-feature-detail/backlog-feature-detail";
import BacklogFeatureList from "@/features/backlog-feature/backlog-feature-list/backlog-feature-list";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineDetailBacklog from "@/hooks/use-refine-detail-backlog";
import useRefineRequirements from "@/hooks/use-refine-requirements";
import { downloadCsv, jsonToCsv } from "@/utils/utils";

const BacklogFeature = () => {
  const { t } = useTranslation();

  const {
    feature,
    refinedBacklog,
    currentCodeRefinedStory,
    setCurrentCodeRefinedStory,
    isLoading,
    isLoadingDetail,
  } = useAppStore();

  const { fetchRefinedRequirements } = useRefineRequirements();
  const { fetchRefineDetailBacklog } = useRefineDetailBacklog();

  const handleDownloadCSV = () => {
    const csv = jsonToCsv(refinedBacklog);
    downloadCsv(csv, `${feature.name}_storys.csv`);
  };

  const handleThinkMore = useCallback(() => {
    setCurrentCodeRefinedStory("");
    fetchRefinedRequirements();
  }, [setCurrentCodeRefinedStory, fetchRefinedRequirements]);

  return (
    <Container size="lg">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-gray-500">
            {t("backlogFeature.title")}
          </span>
          <span className="text-5xl text-ellipsis whitespace-nowrap w-full text-center overflow-hidden">
            {feature.name}
          </span>
        </div>
        <div className="flex flex-col w-full p-0">
          <span className="text-2xl font-bold text-gray-500">
            {t("backlogFeature.secondTitle")}
          </span>
        </div>
        <Sidebar
          height="500px"
          leftSlot={<BacklogFeatureList />}
          leftWidth="w-2/4"
          leftIcon={<Logs className="h-6 w-6 cursor-pointer" />}
          rightSlot={<BacklogFeatureDetail />}
          rightWidth="w-10"
        />
        <div className="w-full flex gap-4">
          <div className="w-1/2 flex justify-between">
            <ButtonLoading
              className="w-5/12"
              onClick={handleThinkMore}
              isLoading={isLoading}
              disabled={isLoadingDetail}
            >
              {t("backlogFeature.buttons.thinkMore")}
            </ButtonLoading>
          </div>
          <div className="w-1/2 flex">
            <ButtonLoading
              className="w-5/12"
              onClick={fetchRefineDetailBacklog}
              isLoading={isLoadingDetail}
              disabled={!currentCodeRefinedStory ? true : false}
            >
              {t("backlogFeature.buttons.refineDetail")}
            </ButtonLoading>
            <Button
              className="w-5/12 ml-auto"
              onClick={handleDownloadCSV}
              disabled={isLoading || isLoadingDetail}
            >
              {t("backlogFeature.buttons.export")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BacklogFeature;
