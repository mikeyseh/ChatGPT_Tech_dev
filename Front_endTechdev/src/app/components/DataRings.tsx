import { motion } from "motion/react";

export function DataRings() {
  return (
    <div className="absolute top-6 left-6 flex items-center gap-3">
      <div className="relative w-12 h-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-[var(--jarvis-blue)] rounded-full"
            style={{
              opacity: 0.3 - i * 0.1,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3 - i * 0.1, 0, 0.3 - i * 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[var(--jarvis-blue)] rounded-full animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-1 bg-[var(--jarvis-blue)] rounded-full"
            style={{
              filter: "drop-shadow(0 0 4px var(--jarvis-blue))",
            }}
            animate={{
              width: [20 + Math.random() * 20, 30 + Math.random() * 30, 20 + Math.random() * 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
