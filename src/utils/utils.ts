const KEY_ENTER = "Enter";

export const handleEnterKey = (
  e: React.KeyboardEvent<HTMLElement>,
  onEnter: () => void | Promise<void>
) => {
  if (e.key === KEY_ENTER) {
    onEnter();
  }
};
