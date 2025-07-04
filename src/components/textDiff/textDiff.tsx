import { Change, diffWords } from "diff";
import { useEffect, useState } from "react";

interface TextDiffProps {
  oldText: string;
  newText: string;
}

const TextDiff = ({ oldText, newText }: TextDiffProps) => {
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  useEffect(() => {
    const diff = diffWords(oldText, newText);
    setDiffResult(diff);
  }, [newText, oldText]);

  return (
    <div>
      {diffResult.map((part: any, index: number) => {
        const style = {
          backgroundColor: part.added
            ? "lightgreen"
            : part.removed
            ? "salmon"
            : "white",
          textDecoration: part.removed ? "line-through" : "none",
        };
        return (
          <span
            className="text-sm text-muted-foreground"
            key={index}
            style={style}
          >
            {part.value}
          </span>
        );
      })}
    </div>
  );
};

export default TextDiff;
