import { Sun, MoreVertical } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-whatsapp-dark text-primary-foreground">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
        <Sun className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-base">Zap Solar ☀️</h2>
        <p className="text-xs opacity-80">Assistente de Energia Solar</p>
      </div>
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
};
