import { Bot, User } from "lucide-react";
import { memo, useEffect, useState } from "react";

import {
  MESSAGE_THINKING,
  USER,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import { Message } from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.types";

interface MessageTextProps {
  message: Message;
  isLoading?: boolean;
}

const MessageText = ({ message, isLoading = false }: MessageTextProps) => {
  const [loadingText, setLoadingText] = useState<string>(MESSAGE_THINKING);

  const isUser = message.sender === USER;

  useEffect(() => {
    let interval: any;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText((prev) => {
          if (prev.includes("...")) return MESSAGE_THINKING;
          return prev + ".";
        });
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <div className={`flex mb-4  ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex gap-2">
        <div
          className={`p-2 inline-block ${
            isUser
              ? "order-1 bg-blue-800 text-white rounded-except-br"
              : "order-3 bg-gray-200 text-black rounded-except-bl"
          }`}
        >
          {!isUser && isLoading ? loadingText : message.text}
        </div>
        <div className="flex items-end order-2">
          {isUser ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

export default memo(MessageText);
