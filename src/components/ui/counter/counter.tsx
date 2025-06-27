import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";

interface CounterProps {
  className: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

const Counter = ({
  className,
  value = 0,
  setValue,
  min = 0,
  max = 100,
}: CounterProps) => {
  const increment = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  return (
    <div
      className={cn("flex items-center justify-between px-5 py-2", className)}
    >
      <Button
        variant={"brandPrimary"}
        onClick={decrement}
        className={`text-white w-8 h-8 flex items-center justify-center rounded-full transition duration-200 ease-in-out shadow-md disabled:bg-gray-400 disabled:opacity-60`}
        disabled={value <= min}
      >
        <span className="font-bold text-lg">-</span>
      </Button>
      <span className="text-sm">{value}</span>
      <Button
        variant={"brandPrimary"}
        onClick={increment}
        className={`text-white w-8 h-8 flex items-center justify-center rounded-full transition duration-200 ease-in-out shadow-md disabled:bg-gray-400 disabled:opacity-60`}
        disabled={value >= max}
      >
        <span className="font-bold">+</span>
      </Button>
    </div>
  );
};

export default Counter;
