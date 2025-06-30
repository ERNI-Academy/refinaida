import * as React from "react";
import { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const borderStyles = "border border-brand-secondary-95 rounded-md";
const disabledStyles = "disabled:cursor-not-allowed disabled:opacity-50";
const fileStyles =
  "file:border-0 file:bg-transparent file:text-sm file:font-medium";
const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background focus-visible:ring-brand-primary";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          {...props}
          ref={ref}
          type={type}
          className={cn(
            "flex h-10 bg-background px-3 py-2 text-sm text-brand-secondary-10 placeholder:text-muted-foreground",
            borderStyles,
            fileStyles,
            focusStyles,
            disabledStyles,
            className
          )}
        />
        {error && <p className="mt-2 text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
