import { useState } from "react";
import { Send, MoreVertical } from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatSidebar } from "./components/ChatSidebar";
import { SettingsModal } from "./components/SettingsModal";
import { DataRings } from "./components/DataRings";

const mockMessages = [
  {
    id: "1",
    role: "ai" as const,
    content: "Hello! I'm JARVIS, your AI assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "user" as const,
    content: "Can you help me optimize my React application?",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "ai" as const,
    content: "Of course! I'd be happy to help optimize your React application. To provide the best recommendations, I'll need to understand your current setup. Could you share details about performance bottlenecks you've noticed?",
    timestamp: "10:31 AM",
  },
];

export default function App() {
  const [message, setMessage] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div
      className="size-full flex relative overflow-hidden"
      style={{
        background: "var(--jarvis-bg)",
        backgroundImage: `
          linear-gradient(rgba(0, 170, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 170, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 170, 255, 0.03) 2px, rgba(0, 170, 255, 0.03) 4px)",
          animation: "scan 8s linear infinite",
        }}
      />

      <ChatSidebar />

      <div className="flex-1 flex flex-col relative">
        <div className="h-16 border-b border-[var(--jarvis-blue)]/20 flex items-center justify-between px-6 backdrop-blur-xl bg-[var(--jarvis-glass)]">
          <div className="flex items-center gap-4">
            <DataRings />
            <div className="ml-14">
              <h1 className="text-xl text-[var(--jarvis-blue)] tracking-widest">
                J.A.R.V.I.S.
              </h1>
              <p className="text-xs text-white/50">Just A Rather Very Intelligent System</p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 hover:bg-[var(--jarvis-purple)]/20 rounded-lg transition-all duration-300 group"
          >
            <MoreVertical className="w-5 h-5 text-[var(--jarvis-purple)] group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          {mockMessages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}
        </div>

        <div className="p-6 border-t border-[var(--jarvis-blue)]/20 backdrop-blur-xl bg-[var(--jarvis-glass)]">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="w-full px-6 py-4 rounded-xl bg-[var(--jarvis-glass)] border border-[var(--jarvis-blue)]/30 text-white/90 placeholder:text-white/40 outline-none focus:border-[var(--jarvis-blue)] transition-all duration-300 backdrop-blur-xl"
                style={{
                  boxShadow: "0 0 20px rgba(0, 170, 255, 0.1), inset 0 0 20px rgba(0, 170, 255, 0.05)",
                }}
              />
            </div>

            <button
              onClick={handleSend}
              className="p-4 rounded-xl bg-[var(--jarvis-blue)]/20 border border-[var(--jarvis-blue)] hover:bg-[var(--jarvis-blue)]/30 transition-all duration-300 group"
              style={{
                boxShadow: "0 0 30px rgba(0, 170, 255, 0.3)",
              }}
            >
              <Send className="w-5 h-5 text-[var(--jarvis-blue)] group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 170, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--jarvis-blue);
          border-radius: 10px;
          box-shadow: 0 0 10px var(--jarvis-blue);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--jarvis-cyan);
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}