import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatContainer } from "./ChatContainer";
import { cn } from "@/lib/utils";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  // Show bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!bubbleDismissed && !isOpen) {
        setShowBubble(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [bubbleDismissed, isOpen]);

  // Hide bubble when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
    }
  }, [isOpen]);

  // Listen for external open event
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setBubbleDismissed(true);
      setShowBubble(false);
    };

    window.addEventListener('openChatWidget', handleOpenEvent);
    return () => window.removeEventListener('openChatWidget', handleOpenEvent);
  }, []);

  const handleBubbleClick = () => {
    setShowBubble(false);
    setBubbleDismissed(true);
    setIsOpen(true);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setBubbleDismissed(true);
      setShowBubble(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble message */}
      {showBubble && !isOpen && (
        <div 
          className="absolute bottom-20 right-0 animate-fade-in cursor-pointer"
          onClick={handleBubbleClick}
        >
          <div className="relative bg-card border border-border rounded-2xl rounded-br-sm p-4 shadow-xl max-w-[280px]">
            {/* Close button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
                setBubbleDismissed(true);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                <span className="text-lg">☀️</span>
              </div>
              <div>
                <p className="text-card-foreground font-medium text-sm">
                  Olá! 👋 Quer descobrir quanto pode economizar com energia solar?
                </p>
                <p className="text-primary font-semibold text-sm mt-1">
                  Peça seu orçamento sem compromisso!
                </p>
              </div>
            </div>

            {/* Pointer triangle */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-20 right-0 w-[380px] h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-border animate-scale-in",
            "max-sm:fixed max-sm:inset-4 max-sm:w-auto max-sm:h-auto max-sm:bottom-auto max-sm:right-auto"
          )}
        >
          {/* Close button for chat */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-14 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
          <ChatContainer />
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={handleButtonClick}
        className={cn(
          "w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 flex items-center justify-center transition-all hover:scale-110",
          isOpen && "bg-destructive shadow-destructive/40"
        )}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>
    </div>
  );
};
