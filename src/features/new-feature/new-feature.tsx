import { FileCheck2, FilePlus2 } from "lucide-react";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Container } from "@/components/layout/container/container";
import { useToast } from "@/components/toaster/hook/use-toast";
import { Button } from "@/components/ui/button/button";
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

const NewFeature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { feature, updateFeature, isLoading } = useAppStore();
  const { setMessages } = useRefineFeatureStore();

  const { fetchRefinedFeatureName } = useRefineFeatureName();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRefine = useCallback(async () => {
    setMessages([]);
    await fetchRefinedFeatureName();
    navigate(routes.refineFeature);
  }, [setMessages, fetchRefinedFeatureName, navigate]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    let textDocument: string | null = null;

    try {
      if (file && file.type === "application/pdf") {
        textDocument = await convertPdfToText(file);
      } else if (file && file.type === "text/plain") {
        textDocument = await file.text();
      } else {
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
        return;
      }
      updateFeature({ textDocument });
      toast({
        variant: ToastVariant.Success,
        title: t("components.toaster.uploadDocumentSuccess.title"),
        description: t("components.toaster.uploadDocumentSuccess.description"),
      });
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
          <CardDescription className="text-lg p-0 text-gray-500 text-center">
            {t("newFeature.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex w-3/6">
              <Input
                className="w-full"
                placeholder={t("newFeature.input.placeholder")}
                value={feature.name}
                onChange={(e) => updateFeature({ name: e.target.value })}
                onKeyDown={(e) => handleEnterKey(e, handleRefine)}
                disabled={isLoading}
              />
            </div>
            <div className="flex w-3/6 gap-4">
              <ButtonLoading
                className="flex w-5/6"
                onClick={handleRefine}
                isLoading={isLoading}
              >
                {t("newFeature.buttons.startRefining")}
              </ButtonLoading>
              <div className="flex w-auto">
                <Input
                  type="file"
                  accept=".pdf, .txt"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!feature.textDocument ? (
                    <FilePlus2 className="h-6 w-6" />
                  ) : (
                    <FileCheck2 className="h-6 w-6" color="#15803D" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewFeature;
