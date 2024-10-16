import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "full";
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  minHeight?: string;
};

export const Container = ({
  children,
  className,
  size = "md",
  minHeight,
}: ContainerProps) => {
  const sizeClasses = {
    sm: "container mx-auto my-12 px-12",
    md: "container mx-auto my-8 px-8",
    lg: "container mx-auto my-4 px-4",
    full: "w-full mx-auto my-4 px-4",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "flex justify-center items-center",
        className
      )}
      style={{ minHeight: minHeight }}
    >
      {children}
    </div>
  );
};

export const ContainerFull = ({
  children,
  className,
  minHeight,
}: ContainerProps) => {
  return (
    <div
      className={cn("flex w-full", className)}
      style={{ minHeight: minHeight }}
    >
      {children}
    </div>
  );
};
