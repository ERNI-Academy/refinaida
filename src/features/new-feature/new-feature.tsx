import { FileCheck2, FilePlus2 } from "lucide-react";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import { useToast } from "@/components/toaster/hook/use-toast";
import { Button } from "@/components/ui/button/button";
import { ButtonType } from "@/components/ui/button/button.const";
import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import { ToastVariant } from "@/components/ui/toast/toast.const";
import useRefineFeatureName from "@/hooks/use-refine-feature-name";
import { routes } from "@/router";
import { useAppStore } from "@/stores/use-app-store";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";
import { convertPdfToText, handleEnterKey } from "@/utils/utils";

interface NewFeatureFormValues {
  name: string;
}

const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { feature, updateFeature, isLoading } = useAppStore();
  const { setMessages } = useRefineFeatureStore();

  const { fetchRefinedFeatureName } = useRefineFeatureName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewFeatureFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const refineFeature = useCallback(async () => {
    setMessages([]);
    await fetchRefinedFeatureName();
    navigate(routes.refineFeature);
  }, [setMessages, fetchRefinedFeatureName, navigate]);

  const handleRefine = (data: NewFeatureFormValues) => {
    updateFeature({ name: data.name });
    refineFeature();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    let textDocument: string | null = null;

    try {
      if (file?.type !== "application/pdf" && file?.type !== "text/plain") {
        updateFeature({ textDocument: null });
        if (event.target.files?.length) {
          toast({
            variant: ToastVariant.Warning,
            title: t("components.toaster.typeDocumentWarning.title"),
            description: t(
              "components.toaster.typeDocumentWarning.description"
            ),
          });
        }
      } else {
        textDocument =
          file.type === "text/plain"
            ? await file.text()
            : await convertPdfToText(file);
        updateFeature({ textDocument });
        toast({
          variant: ToastVariant.Success,
          title: t("components.toaster.uploadDocumentSuccess.title"),
          description: t(
            "components.toaster.uploadDocumentSuccess.description"
          ),
        });
      }
    } catch {
      toast({
        variant: ToastVariant.Error,
        title: t("components.toaster.convertDocumentError.title"),
        description: t("components.toaster.convertDocumentError.description"),
      });
    }
  };

  return (
    <Container>
      <Card className="w-9/12 p-5">
        <CardHeader>
          <CardTitle className="text-5xl p-1 font-semibold text-center">
            {t("newFeature.title")}
          </CardTitle>
          <CardDescription className="text-lg p-0 text-center">
            {t("newFeature.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit(handleRefine)}
            className="flex flex-col gap-4 items-center"
          >
            <div className="flex w-3/6">
              <Input
                className="flex w-full"
                placeholder={t("newFeature.input.placeholder")}
                {...register("name", {
                  required: t("newFeature.validations.name.required"),
                  minLength: {
                    value: 3,
                    message: t("newFeature.validations.name.minLength"),
                  },
                })}
                error={errors.name}
                disabled={isLoading}
                onKeyDown={(e) => handleEnterKey(e, handleSubmit(handleRefine))}
              />
            </div>
            <div className="flex w-3/6 gap-4">
              <ButtonLoading
                variant="brandPrimary"
                className="flex w-full"
                isLoading={isLoading}
                type={ButtonType.SUBMIT}
              >
                {t("newFeature.buttons.startRefining")}
              </ButtonLoading>
              <div className="flex w-auto">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf, .txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  {!feature.textDocument ? (
                    <FilePlus2 className="h-6 w-6 text-brand-primary" />
                  ) : (
                    <FileCheck2 className="h-6 w-6" color="#15803D" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewFeature;
