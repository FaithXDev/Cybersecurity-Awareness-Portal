import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, X } from "lucide-react";
import { Chatbot } from "./Chatbot";

interface ChatButtonProps {
  className?: string;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ className = "" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowTooltip(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        {/* Tooltip */}
        {showTooltip && !isChatOpen && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2 animate-in slide-in-from-bottom-2 fade-in-50 duration-300">
            <div className="relative">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg border max-w-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      🤖 Ask CyberSafe AI anything!
                    </p>
                    <p className="text-xs opacity-90">
                      Get instant cybersecurity help
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setShowTooltip(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"></div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <Button
          onClick={handleOpenChat}
          size="lg"
          className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group ${
            isChatOpen ? "scale-95" : "hover:scale-110"
          }`}
          disabled={isChatOpen}
        >
          <div className="relative">
            <Bot className="h-6 w-6" />

            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping" />

            {/* AI indicator */}
            <div className="absolute -top-1 -right-1">
              <Badge variant="secondary" className="h-5 px-1 text-xs">
                <Bot className="h-2 w-2" />
              </Badge>
            </div>
          </div>
        </Button>

        {/* Status indicator */}
        <div className="absolute -top-1 -left-1">
          <div className="w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse" />
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={handleCloseChat} />
    </>
  );
};

export default ChatButton;
