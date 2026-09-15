import { motion } from "framer-motion";
import { Headphones, Music2, Radio, Sparkles } from "lucide-react";

export default function SplashScreen() {
  const bars = Array.from({ length: 7 });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#020504] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/20 blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[100px]"
        />
      </div>

      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] top-[25%] text-green-400/30"
      >
        <Sparkles size={22} />
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[18%] top-[30%] text-cyan-400/30"
      >
        <Music2 size={20} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ perspective: 1000 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-7 rounded-full border border-green-400/20 border-t-green-400/80 border-r-cyan-400/40"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-4 rounded-full border border-cyan-400/20 border-b-cyan-400/70"
          />

          <motion.div
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 0 20px rgba(74,222,128,.15)",
                "0 0 55px rgba(74,222,128,.35)",
                "0 0 20px rgba(74,222,128,.15)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-green-400/20 bg-gradient-to-br from-green-400/20 via-[#0c1712] to-cyan-400/10 backdrop-blur-xl"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-black shadow-[0_0_35px_rgba(74,222,128,.45)]">
              <Headphones size={34} strokeWidth={2.5} />

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full border border-green-300"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.7,
          }}
          className="mt-10 text-center"
        >
          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            <span className="text-white">Vibe</span>
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Wave
            </span>
          </h1>

          <p className="mt-3 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
            Feel the music
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex h-12 items-center justify-center gap-1.5"
        >
          {bars.map((_, index) => (
            <motion.span
              key={index}
              animate={{
                height: [8, 30 + (index % 3) * 7, 12, 38, 8],
              }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: index * 0.12,
                ease: "easeInOut",
              }}
              className="w-1.5 rounded-full bg-gradient-to-t from-green-500 to-cyan-300 shadow-[0_0_12px_rgba(74,222,128,.45)]"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            delay: 1,
            duration: 1.8,
            repeat: Infinity,
          }}
          className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-500"
        >
          <Radio size={14} className="text-green-400" />
          <span>Loading your vibes...</span>
        </motion.div>

        <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 shadow-[0_0_15px_rgba(74,222,128,.6)]"
          />
        </div>
      </div>
    </motion.div>
  );
}