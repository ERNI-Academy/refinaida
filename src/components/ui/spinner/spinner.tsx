import React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  small: 4,
  medium: 8,
  large: 12,
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  className = "",
  fullScreen = false,
}) => {
  const { t } = useTranslation();

  const sizeValue = sizeMap[size];
  const sizeStyle = {
    width: `${sizeValue * 0.25}rem`,
    height: `${sizeValue * 0.25}rem`,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "fixed inset-0" : "",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <div
          className="border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"
          style={sizeStyle}
        />
        <span className="text-gray-500">{t("components.spinner.text")}</span>
      </div>
    </div>
  );
};

export default Spinner;
