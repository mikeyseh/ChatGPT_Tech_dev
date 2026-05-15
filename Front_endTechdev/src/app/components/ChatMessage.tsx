import { motion } from "motion/react";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      <div
        className={`max-w-[70%] px-5 py-4 rounded-xl backdrop-blur-xl relative group ${
          isUser
            ? "bg-[var(--jarvis-glass)] border border-[var(--jarvis-blue)]/30"
            : "bg-[var(--jarvis-glass)] border border-[var(--jarvis-purple)]/30"
        }`}
        style={{
          boxShadow: isUser
            ? "0 0 30px rgba(0, 170, 255, 0.2), inset 0 0 20px rgba(0, 170, 255, 0.05)"
            : "0 0 30px rgba(138, 43, 226, 0.2), inset 0 0 20px rgba(138, 43, 226, 0.05)",
        }}
      >
        <p
          className={`text-white/90 ${
            isUser ? "" : "font-['JetBrains_Mono']"
          }`}
        >
          {content}
        </p>
        <span className="text-xs text-white/40 mt-2 block">{timestamp}</span>

        <div
          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          style={{
            background: isUser
              ? "radial-gradient(circle at center, rgba(0, 170, 255, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}
