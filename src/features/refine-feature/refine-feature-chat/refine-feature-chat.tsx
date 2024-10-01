import "./refine-feature-chat.scss";

import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardHeader } from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";

interface Message {
  text: string;
  sender: string;
}

const USER = "You";
const USER_AIDA = "AIDA";
const MESSAGE_WELCOME = "Hi, I'm AIDA! How can I help you?";
const MESSAGE_DEFAULT = "Let me check...";

const RefineFeatureChat = () => {
  const { t } = useTranslation();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: MESSAGE_WELCOME, sender: USER_AIDA },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = {
        text: input,
        sender: USER,
      };
      const aidaMessage: Message = {
        text: MESSAGE_DEFAULT,
        sender: USER_AIDA,
      };
      setMessages([...messages, userMessage, aidaMessage]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="w-2/4">
      <CardHeader>
        <div className="flex flex-col h-screen bg-gray-50 chat-wrapper">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) =>
              message.sender === USER ? (
                <div key={index} className={"mb-4 flex justify-end"}>
                  <div className="flex gap-2">
                    <div
                      className={
                        "p-2 inline-block bg-blue-800 text-white rounded-except-br"
                      }
                    >
                      {message.text}
                    </div>
                    <div className="flex items-end">
                      <User className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className={"mb-4 flex justify-start"}>
                  <div className="flex gap-2">
                    <div className="flex items-end">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div
                      className={
                        "p-2 inline-block bg-gray-200 text-black rounded-except-bl"
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              )
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
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="w-1/12">
              <Send
                className="h-6 w-6 cursor-pointer"
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
