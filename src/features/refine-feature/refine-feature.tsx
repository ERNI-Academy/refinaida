import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import { Button } from "@/components/ui/button/button";
import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
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

  const [isSmall, setIsSmall] = useState(false);

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
        <div className="w-full flex gap-4">
          <RefineFeatureChat className={`${isSmall ? "w-4/6" : "w-2/4"}`} />
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => setIsSmall((prevState) => !prevState)}>
              {isSmall ? (
                <ChevronLeftIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          <RefineFeatureRequirements
            className={`${isSmall ? "w-2/6" : "w-2/4"}`}
          />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-2/4 flex justify-between">
            <Button
              className="w-2/6"
              variant={"outline"}
              onClick={() => navigate(routes.default)}
            >
              {t("refineFeature.buttons.back")}
            </Button>
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
