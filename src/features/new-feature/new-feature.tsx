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
import useAida from "@/hooks/use-aida";
import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { routes } from "@/router";
const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setFeature, feature, setQuestions, setContext } = useAppStore();

  const { refineFeature } = useAida();

  const onClick = useCallback(async () => {
    try {
      const response = (await refineFeature(feature, "")) as string;
      const parsedResponse = parseAidaRefineFeatureResponse(response);
      console.log(parsedResponse);
      setQuestions(parsedResponse.questions);
      setContext(parsedResponse.feature);
      navigate(routes.refineFeature);
    } catch (error) {
      console.error(error);
    }
  }, [refineFeature, feature, setQuestions, setContext, navigate]);

  return (
    <Container>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-5xl font-semibold text-center">
            {t("newFeature.title")}
          </CardTitle>
          <CardDescription className="text-lg text-gray-500 text-center">
            {t("newFeature.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 items-center">
            <Input
              className="w-3/5"
              placeholder="Adding user authentication"
              onChange={(e) => setFeature(e.target.value)}
            />
            <Button className="w-2/6" onClick={() => onClick()}>
              {t("newFeature.buttons.startRefining")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewFeature;
