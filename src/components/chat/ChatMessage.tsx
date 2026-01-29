import { ChatMessage as MessageType } from "@/types/lead";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.type === "bot";
  
  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 shadow-sm relative",
          isBot
            ? "bg-whatsapp-bubble-in text-foreground rounded-tl-none"
            : "bg-whatsapp-bubble-out text-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isBot ? "justify-start" : "justify-end"
        )}>
          <span className="text-[10px] text-muted-foreground">
            {message.timestamp.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {!isBot && (
            <CheckCheck className="w-3 h-3 text-primary" />
          )}
        </div>
      </div>
    </div>
  );
};
