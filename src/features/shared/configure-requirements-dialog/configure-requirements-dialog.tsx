import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button/button";
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
import { RequirementTypeEnum } from "@/features/shared/configure-requirements-dialog/configure-requirements-dialog.conts";
import useRefineRequirements from "@/hooks/use-refine-requirements";
import { routes } from "@/router";
import { useAppStore } from "@/stores/use-app-store";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";

interface ConfigureRequirementsDialogProps {
  trigger: React.ReactNode;
  type: RequirementTypeEnum;
}

const ConfigureRequirementsDialog = ({
  trigger,
  type,
}: ConfigureRequirementsDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoading } = useAppStore();
  const { configureRequirements, setConfigureRequirements } =
    useRefineFeatureStore();

  const { fetchRefinedRequirements } = useRefineRequirements();

  const [isOpen, setIsOpen] = useState(false);
  const [userStories, setUserStories] = useState(
    configureRequirements.userStories
  );
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(
    configureRequirements.acceptanceCriteria
  );

  useEffect(() => {
    setConfigureRequirements({
      userStories,
      acceptanceCriteria,
    });
  }, [userStories, acceptanceCriteria, setConfigureRequirements]);

  const handleRequirements = useCallback(async () => {
    await fetchRefinedRequirements();
    navigate(routes.backlogFeature);
  }, [fetchRefinedRequirements, navigate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Counter
              className="w-3/6"
              value={userStories}
              setValue={setUserStories}
              min={1}
              max={15}
            />
          </div>
          <div className="flex w-6/6 items-center">
            <Label htmlFor="name" className="flex w-3/6 text-sm text-right">
              {t(
                "refineFeature.configureRequirementsDialog.dialog.labels.acceptanceCriteria"
              )}
            </Label>
            <Counter
              className="w-3/6"
              value={acceptanceCriteria}
              setValue={setAcceptanceCriteria}
              min={1}
              max={15}
            />
          </div>
        </div>
        <DialogFooter>
          {type === RequirementTypeEnum.GET_REQUIREMENTS && (
            <ButtonLoading
              variant={"brandPrimary"}
              className="w-6/12 ml-auto"
              onClick={handleRequirements}
              isLoading={isLoading}
            >
              {t(
                "refineFeature.configureRequirementsDialog.dialog.buttons.getRequirements"
              )}
            </ButtonLoading>
          )}
          {type === RequirementTypeEnum.SAVE_REQUIREMENTS && (
            <Button
              variant={"brandPrimary"}
              className="w-6/12 ml-auto"
              onClick={() => setIsOpen(false)}
            >
              {t(
                "refineFeature.configureRequirementsDialog.dialog.buttons.saveRequirements"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureRequirementsDialog;
