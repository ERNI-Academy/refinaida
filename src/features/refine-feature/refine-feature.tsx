import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import { Button } from "@/components/ui/button/button";
import RefineFeatureChat from "@/features/refine-feature/refine-feature-chat/refine-feature-chat";
import RefineFeatureRequirements from "@/features/refine-feature/refine-feature-requirements/refine-feature-requirements";
import { useAppStore } from "@/hooks/use-app-store";
import { routes } from "@/router.tsx";

const RefineFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { feature } = useAppStore();

  return (
    <Container size="lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-lg font-bold text-gray-500">
            {t("refine.feature.title")}
          </span>
          <span className="text-5xl text-ellipsis whitespace-nowrap w-full text-center overflow-hidden">
            {feature}
          </span>
        </div>
        <div className="w-full flex gap-4">
          <RefineFeatureChat />
          <RefineFeatureRequirements />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-2/4 flex justify-between">
            <Button
              className="w-2/6"
              variant={"outline"}
              onClick={() => navigate(routes.default)}
            >
              {t("refine.feature.button.back")}
            </Button>
            <Button className="w-7/12">
              {t("refine.feature.button.send")}
            </Button>
          </div>
          <div className="w-2/4 flex">
            <Button
              className="w-7/12 ml-auto"
              onClick={() => navigate(routes.backlogFeature)}
            >
              {t("refine.feature.button.getRequirements")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RefineFeature;
