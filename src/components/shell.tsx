import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import ERNI_Logo from "@/assets/ERNI_coat-of-arms_dark-blue.png";
import BackNewFeatureDialog from "@/features/shared/back-new-feature-dialog/back-new-feature-dialog";
import { routes } from "@/router";

type ShellProps = {
  children: React.ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const header = (styles?: string) => (
    <div className="flex w-auto">
      <img src={ERNI_Logo} className="h-8" />
      <h1
        className={`ml-4 text-2xl uppercase font-mono text-brand-primary ${styles}`}
      >
        {t("header.title")}
      </h1>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 px-4 border-b bg-background">
        {location.pathname === routes.default ? (
          header()
        ) : (
          <BackNewFeatureDialog trigger={header("cursor-pointer")} />
        )}
      </header>
      <main className="h-full w-full flex-1 bg-muted/40">{children}</main>
    </div>
  );
};
