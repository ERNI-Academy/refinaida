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
import { Message } from "@/features/refine-feature/refine-feature-chat/refine-feature-chat.types";
import { useAppStore } from "@/hooks/use-app-store";
import { handleEnterKey } from "@/lib/utils";
import { QuestionsAndAnswers } from "@/types/common";

type RefineFeatureChatProps = {
  className: string;
};

const RefineFeatureChat = ({ className }: RefineFeatureChatProps) => {
  const { t } = useTranslation();

  const {
    questionsAndAnswers,
    setQuestionsAndAnswers,
    isLoading,
    setIsLoading,
  } = useAppStore();

  const [input, setInput] = useState<string>("");
  const [currentQuestionsAndAnswers, setCurrentQuestionsAndAnswers] =
    useState<QuestionsAndAnswers>(questionsAndAnswers[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: currentQuestionsAndAnswers.id,
      text: currentQuestionsAndAnswers.question,
      sender: USER_AIDA,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getQuestionId = useCallback(
    (currentQuestion: string) =>
      questionsAndAnswers.find((qa) => qa.question === currentQuestion)?.id,
    [questionsAndAnswers]
  );

  const handleAnswerChange = useCallback(
    (currentQuestion: string, answer: string) => {
      const questionId = getQuestionId(currentQuestion);
      if (questionId) {
        const updatedQuestionsAndAnswers = questionsAndAnswers.map((qa) =>
          qa.id === getQuestionId(currentQuestion) ? { ...qa, answer } : qa
        );
        setQuestionsAndAnswers(updatedQuestionsAndAnswers);
        console.log(updatedQuestionsAndAnswers);
      }
    },
    [getQuestionId, questionsAndAnswers, setQuestionsAndAnswers]
  );

  const getNextUnansweredQuestion = useCallback((): string | undefined => {
    const questionAndAnswer: QuestionsAndAnswers | undefined =
      questionsAndAnswers.find((qa) => !qa.answer);
    if (questionAndAnswer) {
      setCurrentQuestionsAndAnswers(questionAndAnswer);
      return questionAndAnswer.question;
    }
    return undefined;
  }, [questionsAndAnswers]);

  useEffect(() => {
    let timeout: any;
    const nexQuestion = getNextUnansweredQuestion();
    if (isLoading && nexQuestion !== undefined) {
      const aidaMessage: Message = {
        id: currentQuestionsAndAnswers.id,
        text: nexQuestion,
        sender: USER_AIDA,
      };
      timeout = setTimeout(() => {
        setIsLoading(false);
        setMessages((prevState) => [...prevState, aidaMessage]);
      }, 1500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    currentQuestionsAndAnswers.id,
    getNextUnansweredQuestion,
    isLoading,
    setIsLoading,
  ]);

  const handleSendMessage = useCallback(() => {
    if (input.length && !isLoading) {
      const answer = input.trim();
      handleAnswerChange(currentQuestionsAndAnswers.question, answer);
      const userMessage: Message = {
        id: currentQuestionsAndAnswers.id,
        text: input.trim(),
        sender: USER,
      };
      setIsLoading(true);
      setMessages((prevState) => [...prevState, userMessage]);
      setInput("");
    }
  }, [
    input,
    isLoading,
    handleAnswerChange,
    currentQuestionsAndAnswers.question,
    currentQuestionsAndAnswers.id,
    setIsLoading,
  ]);

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
                  sender: USER_AIDA,
                }}
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
