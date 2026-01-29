import { useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplyButton } from "./QuickReplyButton";
import { useChatFlow } from "@/hooks/useChatFlow";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatContainer = () => {
  const {
    messages,
    isTyping,
    inputType,
    buttons,
    startChat,
    handleButtonClick,
    handleTextInput,
  } = useChatFlow();

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startChat();
    }
  }, [startChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-whatsapp-bg">
      <ChatHeader />
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        
        {inputType === "buttons" && buttons.length > 0 && !isTyping && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {buttons.map((btn) => (
              <QuickReplyButton
                key={btn.value}
                label={btn.label}
                onClick={() => handleButtonClick(btn.value, btn.label)}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {(inputType === "text" || inputType === "cpf" || inputType === "cep") && !isTyping && (
        <ChatInput
          onSend={handleTextInput}
          mask={inputType === "cpf" ? "cpf" : inputType === "cep" ? "cep" : "none"}
          placeholder={
            inputType === "cpf"
              ? "Digite seu CPF..."
              : inputType === "cep"
              ? "Digite o CEP..."
              : "Digite sua mensagem..."
          }
        />
      )}
    </div>
  );
};
