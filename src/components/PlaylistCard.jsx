import { motion } from "framer-motion";
import { Play, ListMusic, Sparkles } from "lucide-react";

export default function PlaylistCard({ playlist, onPlay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -12,
        rotateX: 5,
        rotateY: -5,
        scale: 1.025,
      }}
      transition={{
        duration: 0.35,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-green-400/20 hover:shadow-[0_25px_60px_rgba(34,197,94,0.15)] sm:p-4"
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-500/10 blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
        className="relative overflow-hidden rounded-xl"
      >
        <motion.img
          src={playlist.image}
          alt={playlist.title}
          whileHover={{
            scale: 1.1,
            rotate: 1.5,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="aspect-square w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        <motion.span
          initial={{ x: "-140%" }}
          animate={{ x: "140%" }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 w-12 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
        />

        <motion.div
          whileHover={{
            scale: 1.1,
            rotateY: -10,
          }}
          className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
        >
          <ListMusic size={11} className="text-green-400" />
          Playlist
        </motion.div>

        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-3 top-3 text-green-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Sparkles size={16} />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => onPlay(playlist)}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{
            scale: 1.15,
            rotateX: 8,
            rotateY: -8,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-[0_10px_30px_rgba(34,197,94,0.4)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:h-13 sm:w-13"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-green-400 blur-xl"
          />

          <Play
            size={19}
            fill="currentColor"
            className="relative z-10 translate-x-[1px]"
          />
        </motion.button>
      </motion.div>

      <motion.div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        <motion.h3
          whileHover={{
            x: 3,
            textShadow: "0 0 18px rgba(74,222,128,0.35)",
          }}
          className="mt-4 truncate font-bold text-white"
        >
          {playlist.title}
        </motion.h3>

        <p className="mt-1 truncate text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
          {playlist.description}
        </p>

        <motion.div
          initial={{ width: "20%" }}
          whileHover={{ width: "100%" }}
          className="mt-3 h-[2px] rounded-full bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-cyan-400/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.article>
  );
}