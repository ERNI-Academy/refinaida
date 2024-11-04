import "./refine-feature-chat.scss";

import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/components/toaster/hook/use-toast";
import { Textarea } from "@/components/ui/textarea/textarea";
import MessageText from "@/features/refine-feature/refine-feature-chat/message-text/message-text";
import {
  TypeMessageEnum,
  UserEnum,
} from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.const";
import { useAppStore } from "@/hooks/use-app-store";
import useRefineFeatureContext from "@/hooks/use-refine-feature-context";
import { handleEnterKey } from "@/utils/utils";

const RefineFeatureChat = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    refinedFeature: { questions },
    messages,
    addMessage,
    isLoading,
    isLoadingChat,
  } = useAppStore();
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

  const handleSendMessage = useCallback(async () => {
    if (input.length) {
      const userInput = input.trim();
      addMessage({
        id: `${TypeMessageEnum.ANSWERS}-${crypto.randomUUID()}`,
        text: userInput,
        sender: UserEnum.USER,
      });
      setInput("");
      try {
        await fetchRefineFeatureContext(userInput);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t("components.toaster.genericError.title"),
          description: t("components.toaster.genericError.description"),
        });
        throw error;
      }
    }
  }, [input, addMessage, fetchRefineFeatureContext, toast, t]);

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
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default RefineFeatureChat;
