import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button/button.const";
import { cn } from "@/lib/utils";

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  asChild?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "opacity-50 cursor-not-allowed": isLoading,
        })}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        <div className="flex items-center justify-center space-x-2">
          <span>{props.children}</span>
          {isLoading && (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent"></div>
          )}
        </div>
      </Comp>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
