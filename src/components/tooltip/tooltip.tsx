import {
  Tooltip as TooltipWrapper,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";

enum TooltipSide {
  BOTTOM = "bottom",
  TOP = "top",
  RIGHT = "right",
  LEFT = "left",
}

interface TooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: TooltipSide | undefined;
}

const Tooltip = ({
  trigger,
  content,
  side = TooltipSide.BOTTOM,
}: TooltipProps) => (
  <TooltipProvider>
    <TooltipWrapper>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipWrapper>
  </TooltipProvider>
);

export default Tooltip;
