import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  mask?: "cpf" | "cep" | "none";
}

const applyMask = (value: string, mask: "cpf" | "cep" | "none"): string => {
  const numbers = value.replace(/\D/g, "");
  
  if (mask === "cpf") {
    return numbers
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  }
  
  if (mask === "cep") {
    return numbers
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
  
  return value;
};

export const ChatInput = ({
  onSend,
  placeholder = "Digite uma mensagem...",
  disabled = false,
  mask = "none",
}: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyMask(e.target.value, mask);
    setValue(maskedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 bg-whatsapp-light border-t">
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 rounded-full bg-card border-0 focus-visible:ring-1 focus-visible:ring-primary"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !value.trim()}
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
