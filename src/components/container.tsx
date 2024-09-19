type ContainerSize = "sm" | "md" | "lg" | "full";
type ContainerProps = {
  children: React.ReactNode;
  size?: ContainerSize;
};

const Container = ({ children, size = "md" }: ContainerProps) => {
  const sizeClasses = {
    sm: "container mx-auto my-12 px-12",
    md: "container mx-auto my-8 px-8",
    lg: "container mx-auto my-4 px-4",
    full: "w-full mx-auto my-4 px-4",
  };

  return <div className={sizeClasses[size]}>{children}</div>;
};

export default Container;
