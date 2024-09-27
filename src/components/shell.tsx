import { useTranslation } from "react-i18next";

type ShellProps = {
  children: React.ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-2xl uppercase font-mono">{t("header.title")}</h1>
      </header>
      <main className="h-full w-full flex-1 bg-muted/40">{children}</main>
    </div>
  );
};
