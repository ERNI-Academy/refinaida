import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import Spinner from "@/components/ui/spinner/spinner";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineFeatureName from "@/hooks/use-refine-feature-name";
import { routes } from "@/router";
import { handleEnterKey } from "@/utils/utils";

const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { feature, setFeature, isLoading } = useAppStore();

  const { fetchRefinedFeatureName } = useRefineFeatureName();

  const handleRefine = useCallback(async () => {
    await fetchRefinedFeatureName();
    navigate(routes.refineFeature);
  }, [fetchRefinedFeatureName, navigate]);

  return (
    <Container>
      {!isLoading ? (
        <Card className="w-9/12 p-5">
          <CardHeader>
            <CardTitle className="text-5xl p-1 font-semibold text-center">
              {t("newFeature.title")}
            </CardTitle>
            <CardDescription className="text-lg p-0 text-gray-500 text-center">
              {t("newFeature.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 items-center">
              <Input
                className="w-3/5"
                placeholder={t("newFeature.input.placeholder")}
                value={feature.name}
                onChange={(e) =>
                  setFeature({ ...feature, name: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, handleRefine)}
                disabled={isLoading}
              />
              <Button className="w-2/6" onClick={handleRefine}>
                {t("newFeature.buttons.startRefining")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Spinner fullScreen />
      )}
    </Container>
  );
};

export default NewFeature;
