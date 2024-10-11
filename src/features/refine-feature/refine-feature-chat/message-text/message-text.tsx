import { Bot, User } from "lucide-react";
import { memo, useEffect, useState } from "react";

import {
  MESSAGE_THINKING,
  UserEnum,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import { Message } from "@/types/common";

interface MessageTextProps {
  message: Message;
  isLoading?: boolean;
}

const MessageText = ({ message, isLoading = false }: MessageTextProps) => {
  const [loadingText, setLoadingText] = useState<string>(MESSAGE_THINKING);

  const isUser = message.sender === UserEnum.USER;

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
          {Array.isArray(message.text) ? (
            message.text.map((question, index) => (
              <p
                key={question}
                className={index !== message.text.length - 1 ? "mb-2" : ""}
              >
                {!isUser && isLoading ? loadingText : question}
              </p>
            ))
          ) : (
            <p>{!isUser && isLoading ? loadingText : message.text}</p>
          )}
        </div>
        <div className="flex items-end order-2">
          {isUser ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

export default memo(MessageText);
