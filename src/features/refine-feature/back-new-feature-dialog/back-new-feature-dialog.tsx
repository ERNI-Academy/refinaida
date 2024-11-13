import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog/alert-dialog";
import { Button } from "@/components/ui/button/button";
import { useAppStore } from "@/hooks/use-app-store";
import { routes } from "@/router";

const BackNewFeatureDialog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { resetFeature } = useAppStore();

  const handleBackNewFeature = () => {
    resetFeature();
    navigate(routes.default);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-2/6" variant={"outline"}>
          {t("refineFeature.backNewFeatureDialog.button")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("refineFeature.backNewFeatureDialog.dialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("refineFeature.backNewFeatureDialog.dialog.subtitle")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("components.alertDialog.buttons.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleBackNewFeature}>
            {t("components.alertDialog.buttons.continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BackNewFeatureDialog;
