import "./refine-feature-chat.scss";

import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Textarea } from "@/components/ui/textarea/textarea";
import MessageText from "@/features/refine-feature/refine-feature-chat/message-text/message-text";
import {
  TypeMessageEnum,
  UserEnum,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import useRefineFeatureContext from "@/hooks/use-refine-feature-context";
import { useAppStore } from "@/stores/use-app-store";
import { useRefineFeatureStore } from "@/stores/use-refine-feature-store";
import { handleEnterKey } from "@/utils/utils";

const RefineFeatureChat = () => {
  const { t } = useTranslation();

  const { isLoading } = useAppStore();
  const {
    refinedFeature: { questions },
    messages,
    addMessage,
    isLoadingChat,
  } = useRefineFeatureStore();

  const { fetchRefineFeatureContext } = useRefineFeatureContext();

  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    addMessage({
      id: `${TypeMessageEnum.QUESTIONS}-${crypto.randomUUID()}`,
      text: questions,
      sender: UserEnum.USER_AIDA,
    });
  }, [addMessage, questions]);

  const handleSendMessage = useCallback(() => {
    if (input.length) {
      const userInput = input.trim();
      addMessage({
        id: `${TypeMessageEnum.ANSWERS}-${crypto.randomUUID()}`,
        text: userInput,
        sender: UserEnum.USER,
      });
      setInput("");
      fetchRefineFeatureContext(userInput);
    }
  }, [input, addMessage, fetchRefineFeatureContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isLoadingChat]);

  return (
    <div className="flex flex-col h-full w-full refine-feature-chat overflow-y-auto">
      <div className="flex-grow chat-wrapper overflow-y-auto">
        {messages.map((message) => (
          <MessageText
            key={`${message.id}-${message.sender}`}
            message={message}
          />
        ))}
        {isLoadingChat && (
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
      <div className="flex w-full pt-4 gap-4 justify-center items-center p-6">
        <div className="w-11/12">
          <Textarea
            className="flex-grow border border-gray-300 p-2 rounded-lg resize-none"
            placeholder={t("refineFeature.chat.sendMessage.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, handleSendMessage)}
            disabled={isLoading || isLoadingChat}
          />
        </div>
        <div className="w-1/12 items-center justify-center">
          <Send
            className={`h-6 w-6 ${
              !isLoading && !isLoadingChat
                ? "cursor-pointer text-black"
                : "cursor-not-allowed text-gray-400"
            }`}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default RefineFeatureChat;
