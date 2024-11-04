import { Logs } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container/container";
import Sidebar from "@/components/sidebar/sidebar";
import { useToast } from "@/components/toaster/hook/use-toast";
import { Button } from "@/components/ui/button/button";
import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
import BacklogFeatureDescription from "@/features/backlog-feature/backlog-feature-description/backlog-feature-description";
import BacklogFeatureList from "@/features/backlog-feature/backlog-feature-list/backlog-feature-list";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineRequirements from "@/hooks/use-refine-requirements";

const BacklogFeature = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { feature, setCurrentRefinedBacklog, isLoading } = useAppStore();

  const { fetchRefinedRequirements } = useRefineRequirements();

  const handleThinkMore = useCallback(async () => {
    try {
      setCurrentRefinedBacklog(undefined);
      await fetchRefinedRequirements();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("components.toaster.genericError.title"),
        description: t("components.toaster.genericError.description"),
      });
      throw error;
    }
  }, [setCurrentRefinedBacklog, fetchRefinedRequirements, toast, t]);

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
          rightSlot={<BacklogFeatureDescription />}
          rightWidth="w-10"
        />
        <div className="w-full flex gap-4">
          <div className="w-1/2 flex justify-between">
            <Button className="w-5/12" disabled>
              {t("backlogFeature.buttons.export")}
            </Button>
            <ButtonLoading
              className="w-5/12"
              onClick={handleThinkMore}
              isLoading={isLoading}
            >
              {t("backlogFeature.buttons.thinkMore")}
            </ButtonLoading>
          </div>
          <div className="w-1/2 flex">
            <Button className="w-7/12 ml-auto" disabled>
              {t("backlogFeature.buttons.refineRequirements")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BacklogFeature;
