import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  ButtonType,
  buttonVariants,
} from "@/components/ui/button/button.const";
import { cn } from "@/lib/utils";

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  type?: ButtonType;
  asChild?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      className,
      variant,
      size,
      type = ButtonType.BUTTON,
      asChild = false,

      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Button = asChild ? Slot : "button";
    return (
      <Button
        type={type}
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
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
