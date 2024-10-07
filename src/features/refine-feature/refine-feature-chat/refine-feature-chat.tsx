import "./refine-feature-chat.scss";

import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader } from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import MessageText from "@/features/refine-feature/refine-feature-chat/message-text/message-text";
import {
  USER,
  USER_AIDA,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import { useAppStore } from "@/hooks/use-app-store";
import { handleEnterKey } from "@/lib/utils";

interface Message {
  text: string;
  sender: string;
}

// Provisional constansts
// const MESSAGE_WELCOME = "Hi, I'm AIDA! How can I help you?";
const MESSAGE_INFORMATION = "Here you have the information...";

type RefineFeatureChatProps = {
  className: string;
};

const RefineFeatureChat = ({ className }: RefineFeatureChatProps) => {
  const { t } = useTranslation();

  const { questions, isLoading, setIsLoading } = useAppStore();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: questions[0], sender: USER_AIDA },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Provisional implementation
  useEffect(() => {
    let timeout: any;
    if (isLoading) {
      const aidaMessage: Message = {
        text: MESSAGE_INFORMATION,
        sender: USER_AIDA,
      };
      timeout = setTimeout(() => {
        setIsLoading(false);
        setMessages((prevState) => [...prevState, aidaMessage]);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, setIsLoading]);

  const handleSendMessage = useCallback(() => {
    if (input.length && !isLoading) {
      const userMessage: Message = {
        text: input.trim(),
        sender: USER,
      };

      setIsLoading(true);
      setMessages((prevState) => [...prevState, userMessage]);
      setInput("");
    }
  }, [input, isLoading, setIsLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col h-screen bg-gray-50 chat-wrapper">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <MessageText message={message} index={index} />
            ))}
            {isLoading && (
              <MessageText
                message={{
                  text: "",
                  sender: USER_AIDA,
                }}
                index={"loading"}
                isLoading
              />
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex w-full pt-4 bg-white gap-4 justify-center items-center">
            <div className="w-11/12">
              <Input
                className="flex-grow border border-gray-300 p-2 rounded-lg"
                placeholder={t("refineFeature.chat.sendMessage.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e, handleSendMessage)}
                disabled={isLoading}
              />
            </div>
            <div className="w-1/12 items-center justify-center">
              <Send
                className={`h-6 w-6 ${
                  !isLoading ? "cursor-pointer" : "cursor-not-allowed "
                }`}
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default RefineFeatureChat;
