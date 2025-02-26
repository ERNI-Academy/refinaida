import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/layout/container/container";
import Sidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button/button";
import BackNewFeatureDialog from "@/features/refine-feature/back-new-feature-dialog/back-new-feature-dialog";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureConfigDialog from "@/features/refine-feature/refine-feature-config-dialog/refine-feature-config-dialog";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import { useAppStore } from "@/hooks/use-app-store";

const RefineFeature = () => {
  const { t } = useTranslation();

  const { feature } = useAppStore();

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
            <RefineFeatureConfigDialog
              trigger={
                <Button className="w-7/12 ml-auto">
                  {t("refineFeature.configFeatureDialog.button")}
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
