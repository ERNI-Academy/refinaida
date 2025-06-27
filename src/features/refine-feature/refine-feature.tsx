import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container/container";
import Sidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button/button";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import BackNewFeatureDialog from "@/features/shared/back-new-feature-dialog/back-new-feature-dialog";
import ConfigureRequirementsDialog from "@/features/shared/configure-requirements-dialog/configure-requirements-dialog";
import { RequirementTypeEnum } from "@/features/shared/configure-requirements-dialog/configure-requirements-dialog.conts";
import { useAppStore } from "@/stores/use-app-store";

const RefineFeature = () => {
  const { t } = useTranslation();

  const { feature } = useAppStore();

  return (
    <Container size="lg">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-brand-secondary-50">
            {t("refineFeature.title")}
          </span>
          <span className="text-5xl text-brand-primary whitespace-nowrap w-full text-center overflow-hidden max-w-[35ch] truncate">
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
            <ConfigureRequirementsDialog
              trigger={
                <Button className="w-7/12 ml-auto" variant="brandPrimary">
                  {t("refineFeature.configureRequirementsDialog.button")}
                </Button>
              }
              type={RequirementTypeEnum.GET_REQUIREMENTS}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
