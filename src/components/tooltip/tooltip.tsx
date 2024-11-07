import {
  Tooltip as TooltipWrapper,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";

interface TooltipProps {
  text: React.ReactNode;
  children: React.ReactNode;
  side?: "bottom" | "top" | "right" | "left" | undefined;
}

const Tooltip = ({ children, text, side = "bottom" }: TooltipProps) => (
  <TooltipProvider>
    <TooltipWrapper>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>{text}</TooltipContent>
    </TooltipWrapper>
  </TooltipProvider>
);

export default Tooltip;
