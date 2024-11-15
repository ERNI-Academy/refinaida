import { Send } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import Sidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button/button";
import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
import BackNewFeatureDialog from "@/features/new-feature/back-new-feature-dialog/back-new-feature-dialog";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineRequirements from "@/hooks/use-refine-requirements";
import { routes } from "@/router.tsx";

const RefineFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { feature, isLoading } = useAppStore();

  const { fetchRefinedRequirements } = useRefineRequirements();

  const handleRequirements = useCallback(async () => {
    await fetchRefinedRequirements();
    navigate(routes.backlogFeature);
  }, [fetchRefinedRequirements, navigate]);

  return (
    <Container size="lg">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-gray-500">
            {t("refineFeature.title")}
          </span>
          <span className="text-5xl text-ellipsis whitespace-nowrap w-full text-center overflow-hidden">
            {feature.name}
          </span>
        </div>
        <Sidebar
          height="550px"
          leftSlot={<RefineFeatureChat />}
          leftWidth="w-2/4"
          leftIcon={<Send className="h-6 w-6 cursor-pointer" />}
          rightSlot={<RefineFeatureRequirements />}
          rightWidth="w-10"
        />
        <div className="w-full flex gap-4">
          <div className="w-2/4 flex justify-between">
            <BackNewFeatureDialog
              trigger={
                <Button className="w-2/6" variant={"outline"}>
                  {t("refineFeature.backNewFeatureDialog.button")}
                </Button>
              }
            />
          </div>
          <div className="w-2/4 flex">
            <ButtonLoading
              className="w-7/12 ml-auto"
              onClick={handleRequirements}
              isLoading={isLoading}
            >
              {t("refineFeature.buttons.getRequirements")}
            </ButtonLoading>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
