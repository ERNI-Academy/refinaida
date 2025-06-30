import { useLocation } from "react-router-dom";

import { ShellHeader } from "@/components/shell-header";
import BackNewFeatureDialog from "@/features/shared/back-new-feature-dialog/back-new-feature-dialog";
import { routes } from "@/router";

type ShellProps = {
  children: React.ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 px-4 border-b bg-background">
        {location.pathname === routes.default ? (
          <ShellHeader />
        ) : (
          <BackNewFeatureDialog
            trigger={
              <div className="cursor-pointer">
                <ShellHeader />
              </div>
            }
          />
        )}
      </header>
      <main className="h-full w-full flex-1 bg-muted/40">{children}</main>
    </div>
  );
};
