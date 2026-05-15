import { motion } from "motion/react";

interface StatsRingProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

export function StatsRing({ label, value, percentage, color }: StatsRingProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--jarvis-glass)] border border-white/10 backdrop-blur-sm">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="45"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-['JetBrains_Mono'] text-white/90"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            {value}
          </motion.span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-white/60 text-sm tracking-wider">{label}</p>
        <motion.div
          className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
