import { useTranslation } from "react-i18next";

import ERNI_Logo from "@/assets/ERNI_coat-of-arms_dark-blue.png";

export const ShellHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-auto">
      <img src={ERNI_Logo} className="h-8" />
      <h1 className={`ml-4 text-2xl uppercase font-mono text-brand-primary`}>
        {t("header.title")}
      </h1>
    </div>
  );
};
