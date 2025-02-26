import { Label } from "@radix-ui/react-label";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ButtonLoading } from "@/components/ui/button-loading/button-loading";
import Counter from "@/components/ui/counter/counter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineRequirements from "@/hooks/use-refine-requirements";
import { routes } from "@/router";

interface ConfigureRequirementsDialogProps {
  trigger: React.ReactNode;
}

const ConfigureRequirementsDialog = ({
  trigger,
}: ConfigureRequirementsDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoading } = useAppStore();

  const { fetchRefinedRequirements } = useRefineRequirements();

  const handleRequirements = useCallback(async () => {
    await fetchRefinedRequirements();
    navigate(routes.backlogFeature);
  }, [fetchRefinedRequirements, navigate]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="md:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {t("refineFeature.configureRequirementsDialog.dialog.title")}
          </DialogTitle>
          <DialogDescription>
            {t("refineFeature.configureRequirementsDialog.dialog.subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-2 px-6">
          <div className="flex w-6/6 items-center">
            <Label htmlFor="name" className="flex w-3/6 text-sm text-right">
              {t(
                "refineFeature.configureRequirementsDialog.dialog.labels.userStories"
              )}
            </Label>
            <Counter className="w-3/6" initialValue={10} min={1} max={15} />
          </div>
          <div className="flex w-6/6 items-center">
            <Label htmlFor="name" className="flex w-3/6 text-sm text-right">
              {t(
                "refineFeature.configureRequirementsDialog.dialog.labels.acceptanceCriteria"
              )}
            </Label>
            <Counter className="w-3/6" initialValue={5} min={1} max={15} />
          </div>
        </div>
        <DialogFooter>
          <ButtonLoading
            className="w-7/12 ml-auto"
            onClick={handleRequirements}
            isLoading={isLoading}
          >
            {t(
              "refineFeature.configureRequirementsDialog.dialog.buttons.getRequirements"
            )}
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureRequirementsDialog;
