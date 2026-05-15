import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, ChevronLeft } from "lucide-react";
import { HologramPopup } from "./HologramPopup";

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Code Optimization",
    preview: "How can I optimize this React component to reduce re-renders?",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "Database Migration",
    preview: "Help me write a migration script for PostgreSQL...",
    timestamp: "5h ago",
  },
  {
    id: "3",
    title: "API Integration",
    preview: "What's the best way to handle rate limiting with external APIs?",
    timestamp: "1d ago",
  },
  {
    id: "4",
    title: "Security Audit",
    preview: "Review my authentication implementation for vulnerabilities",
    timestamp: "2d ago",
  },
  {
    id: "5",
    title: "Performance Analysis",
    preview: "My app is slow, can you help identify bottlenecks?",
    timestamp: "3d ago",
  },
];

export function ChatSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredConv, setHoveredConv] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (id: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.right + 20,
      y: rect.top,
    });
    setHoveredConv(id);
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? "60px" : "320px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full bg-[var(--jarvis-glass)] backdrop-blur-xl border-r border-[var(--jarvis-blue)]/20 relative"
        style={{
          boxShadow: "inset -1px 0 20px rgba(0, 170, 255, 0.1)",
        }}
      >
        <div className="p-4 border-b border-[var(--jarvis-blue)]/20 flex items-center justify-between">
          {!isCollapsed && (
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[var(--jarvis-blue)] tracking-wider"
            >
              CHAT HISTORY
            </motion.h3>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-[var(--jarvis-blue)]/10 rounded-lg transition-colors"
          >
            <ChevronLeft
              className="w-5 h-5 text-[var(--jarvis-blue)] transition-transform duration-300"
              style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-73px)] custom-scrollbar">
          {mockConversations.map((conv) => (
            <motion.div
              key={conv.id}
              onMouseEnter={(e) => handleMouseEnter(conv.id, e)}
              onMouseLeave={() => setHoveredConv(null)}
              className="p-4 border-b border-[var(--jarvis-blue)]/10 hover:bg-[var(--jarvis-blue)]/5 cursor-pointer relative group transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              {!isCollapsed ? (
                <>
                  <h4 className="text-white/90 mb-1 truncate">{conv.title}</h4>
                  <p className="text-white/50 text-sm truncate">{conv.preview}</p>
                  <span className="text-xs text-[var(--jarvis-blue)]/60 mt-1 block">
                    {conv.timestamp}
                  </span>
                </>
              ) : (
                <MessageSquare className="w-5 h-5 text-[var(--jarvis-blue)] mx-auto" />
              )}

              <div
                className="absolute left-0 top-0 w-1 h-full bg-[var(--jarvis-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 10px var(--jarvis-blue)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {!isCollapsed && hoveredConv && (
        <HologramPopup
          show={true}
          title={mockConversations.find((c) => c.id === hoveredConv)?.title || ""}
          preview={mockConversations.find((c) => c.id === hoveredConv)?.preview || ""}
          timestamp={mockConversations.find((c) => c.id === hoveredConv)?.timestamp || ""}
          position={popupPosition}
        />
      )}
    </>
  );
}
