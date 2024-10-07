import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const KEY_ENTER = "Enter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleEnterKey = (
  e: React.KeyboardEvent<HTMLElement>,
  onEnter: () => void | Promise<void>
) => {
  if (e.key === KEY_ENTER) {
    onEnter();
  }
};
