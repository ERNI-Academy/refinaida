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
import { useAppStore } from "@/hooks/use-app-store";
import { routes } from "@/router";

interface BackNewFeatureDialogProps {
  trigger: React.ReactNode;
}

const BackNewFeatureDialog = ({ trigger }: BackNewFeatureDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { resetFeature } = useAppStore();

  const handleBackNewFeature = () => {
    resetFeature();
    navigate(routes.default);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
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
