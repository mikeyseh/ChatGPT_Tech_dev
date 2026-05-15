import { motion, AnimatePresence } from "motion/react";
import { X, Activity, MessageCircle, Zap } from "lucide-react";
import { StatsRing } from "./StatsRing";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
            <div
              className="bg-[var(--jarvis-glass)] backdrop-blur-2xl border-2 border-[var(--jarvis-purple)] rounded-2xl p-8 relative"
              style={{
                boxShadow:
                  "0 0 60px rgba(138, 43, 226, 0.4), inset 0 0 40px rgba(138, 43, 226, 0.1)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--jarvis-blue)] via-[var(--jarvis-purple)] to-[var(--jarvis-red)] rounded-t-2xl" />

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[var(--jarvis-purple)] tracking-widest flex items-center gap-3">
                  <Activity className="w-7 h-7" />
                  SYSTEM STATS
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--jarvis-red)]/20 rounded-lg transition-colors group"
                >
                  <X className="w-6 h-6 text-[var(--jarvis-red)] group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="space-y-4">
                <StatsRing
                  label="MESSAGES SENT"
                  value="1,247"
                  percentage={87}
                  color="var(--jarvis-blue)"
                />
                <StatsRing
                  label="TOKENS USED"
                  value="2.1M"
                  percentage={62}
                  color="var(--jarvis-purple)"
                />
                <StatsRing
                  label="AVG RESPONSE"
                  value="1.42s"
                  percentage={95}
                  color="var(--jarvis-cyan)"
                />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: MessageCircle, label: "Active Chats", value: "12" },
                  { icon: Zap, label: "Uptime", value: "99.8%" },
                  { icon: Activity, label: "CPU Load", value: "34%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="p-4 rounded-lg bg-[var(--jarvis-glass)] border border-white/10 text-center"
                  >
                    <stat.icon className="w-6 h-6 text-[var(--jarvis-cyan)] mx-auto mb-2" />
                    <p className="font-['JetBrains_Mono'] text-xl text-white/90">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/50 mt-1 tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div
                className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(138, 43, 226, 0.05) 2px, rgba(138, 43, 226, 0.05) 4px)",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
