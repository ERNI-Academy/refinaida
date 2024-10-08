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
import useAida from "@/hooks/use-aida";
import { useAppStore } from "@/hooks/use-app-store";
import { parseAidaRefineFeatureResponse } from "@/lib/aida";
import { handleEnterKey } from "@/lib/utils";
import { routes } from "@/router";
import { QuestionsAndAnswers } from "@/types/common";

const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    feature,
    setFeature,
    setQuestionsAndAnswers,
    setContext,
    isLoading,
    setIsLoading,
  } = useAppStore();

  const { refineFeature } = useAida();

  const handleQuestionsAndAnswers = useCallback(
    (questions: string[]): void => {
      const questionsAndAnswers: QuestionsAndAnswers[] = questions.map(
        (question) => ({
          id: crypto.randomUUID(),
          question: question,
        })
      );
      setQuestionsAndAnswers(questionsAndAnswers);
    },
    [setQuestionsAndAnswers]
  );

  const handleRefine = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = (await refineFeature(feature, "")) as string;
      const parsedResponse = parseAidaRefineFeatureResponse(response);
      setContext(parsedResponse.feature);
      handleQuestionsAndAnswers(parsedResponse.questions);
      setIsLoading(false);
      navigate(routes.refineFeature);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [
    setIsLoading,
    refineFeature,
    feature,
    setContext,
    handleQuestionsAndAnswers,
    navigate,
  ]);

  return (
    <Container>
      {!isLoading ? (
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
                placeholder={t("newFeature.input.placeholder")}
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e, handleRefine)}
              />
              <Button className="w-2/6" onClick={handleRefine}>
                {t("newFeature.buttons.startRefining")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default NewFeature;
