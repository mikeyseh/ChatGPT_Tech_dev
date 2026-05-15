import { motion, AnimatePresence } from "motion/react";

interface HologramPopupProps {
  show: boolean;
  title: string;
  preview: string;
  timestamp: string;
  position: { x: number; y: number };
}

export function HologramPopup({ show, title, preview, timestamp, position }: HologramPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-80 p-5 rounded-lg backdrop-blur-2xl border-2 border-[var(--jarvis-cyan)] bg-[var(--jarvis-glass)] relative"
            style={{
              boxShadow:
                "0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.1)",
              transform: "rotateX(5deg) rotateY(-5deg)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--jarvis-cyan)] to-transparent animate-pulse" />

            <h4 className="text-[var(--jarvis-cyan)] mb-2 tracking-wider">
              {title}
            </h4>
            <p className="text-white/70 text-sm line-clamp-3 mb-3">
              {preview}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--jarvis-cyan)]/60">{timestamp}</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--jarvis-cyan)]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="absolute inset-0 rounded-lg opacity-30 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
