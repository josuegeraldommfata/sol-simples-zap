import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickReplyButtonProps {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
  disabled?: boolean;
}

export const QuickReplyButton = ({
  label,
  onClick,
  variant = "outline",
  disabled = false,
}: QuickReplyButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={cn(
        "rounded-full text-sm font-normal border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all",
        variant === "default" && "bg-primary text-primary-foreground"
      )}
    >
      {label}
    </Button>
  );
};
