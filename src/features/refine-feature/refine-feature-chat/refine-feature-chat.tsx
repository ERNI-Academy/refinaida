import "./refine-feature-chat.scss";

import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader } from "@/components/ui/card/card";
import { Textarea } from "@/components/ui/textarea/textarea";
import MessageText from "@/features/refine-feature/refine-feature-chat/message-text/message-text";
import {
  TypeMessageEnum,
  UserEnum,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineFeature from "@/hooks/use-refine-feature";
import { Message } from "@/types/common";
import { handleEnterKey } from "@/utils/utils";

type RefineFeatureChatProps = {
  className: string;
};

const RefineFeatureChat = ({ className }: RefineFeatureChatProps) => {
  const { t } = useTranslation();

  const {
    refineFeature: { questions },
    isLoading,
  } = useAppStore();
  const { fetchRefineFeature } = useRefineFeature();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "questions",
      text: questions,
      sender: UserEnum.USER_AIDA,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   addMessage(TypeMessageEnum.QUESTIONS, questions, UserEnum.USER_AIDA);
  // }, [questions]);

  const addMessage = (
    type: TypeMessageEnum,
    text: string | string[],
    user: UserEnum
  ) => {
    const message: Message = {
      id: `${type}-${crypto.randomUUID()}`,
      text: text,
      sender: user,
    };
    setMessages((prevState) => [...prevState, message]);
  };

  const handleSendMessage = useCallback(async () => {
    if (input.length) {
      const answers = input.trim();
      addMessage(TypeMessageEnum.ANSWERS, answers, UserEnum.USER);
      setInput("");
      await fetchRefineFeature(answers);
      addMessage(TypeMessageEnum.QUESTIONS, questions, UserEnum.USER_AIDA);
    }
  }, [input, fetchRefineFeature, questions]);

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
            {messages.map((message) => (
              <MessageText
                key={`${message.id}-${message.sender}`}
                message={message}
              />
            ))}
            {isLoading && (
              <MessageText
                message={{
                  id: "loadingMessage",
                  text: "",
                  sender: UserEnum.USER_AIDA,
                }}
                isLoading
              />
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex w-full pt-4 bg-white gap-4 justify-center items-center">
            <div className="w-11/12">
              <Textarea
                className="flex-grow border border-gray-300 p-2 rounded-lg resize-none"
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
