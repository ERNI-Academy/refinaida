import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import BackNewFeatureDialog from "@/features/shared/back-new-feature-dialog/back-new-feature-dialog";
import { routes } from "@/router";

type ShellProps = {
  children: React.ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        {location.pathname === routes.default ? (
          <h1 className="text-2xl uppercase font-mono">{t("header.title")}</h1>
        ) : (
          <BackNewFeatureDialog
            trigger={
              <h1 className="text-2xl uppercase font-mono cursor-pointer">
                {t("header.title")}
              </h1>
            }
          />
        )}
      </header>
      <main className="h-full w-full flex-1 bg-muted/40">{children}</main>
    </div>
  );
};
