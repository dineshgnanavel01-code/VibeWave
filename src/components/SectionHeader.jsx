import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group relative mb-6
        flex items-end justify-between
        gap-4
        rounded-2xl
        border border-white/[0.05]
        bg-gradient-to-r
        from-white/[0.035]
        via-transparent
        to-green-500/[0.02]
        px-4 py-3
        backdrop-blur-xl
        transition-all duration-500
        hover:border-green-400/10
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
        sm:px-5 sm:py-4
      "
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        animate={{
          x: [0, 40, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute left-10 top-0
          h-16 w-32
          rounded-full
          bg-green-500/10
          blur-3xl
        "
      />

      <div
        className="relative z-10 min-w-0"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <motion.div
            whileHover={{
              rotate: 180,
              scale: 1.15,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              flex h-6 w-6
              items-center justify-center
              rounded-lg
              border border-green-400/20
              bg-green-400/10
              text-green-400
            "
          >
            <Sparkles size={13} />
          </motion.div>

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-green-400/80
            "
          >
            VibeWave
          </span>
        </div>

        <motion.h2
          whileHover={{
            x: 4,
            textShadow: "0 0 20px rgba(74,222,128,0.25)",
          }}
          transition={{ duration: 0.25 }}
          className="
            truncate
            text-xl
            font-black
            tracking-tight
            text-white
            transition-colors
            duration-300
            group-hover:text-green-50
            sm:text-2xl
          "
        >
          {title}
        </motion.h2>

        {subtitle && (
          <p className="
            mt-1
            truncate
            text-xs
            text-zinc-500
            transition-colors
            duration-300
            group-hover:text-zinc-400
            sm:text-sm
          ">
            {subtitle}
          </p>
        )}

        <motion.div
          initial={{ width: "28px" }}
          whileHover={{ width: "90px" }}
          className="
            mt-3
            h-[2px]
            rounded-full
            bg-gradient-to-r
            from-green-400
            via-emerald-400
            to-transparent
          "
        />
      </div>

      <motion.button
        type="button"
        whileHover={{
          scale: 1.06,
          y: -3,
          rotateX: 5,
        }}
        whileTap={{
          scale: 0.94,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="
          group/button
          relative z-10
          flex shrink-0
          items-center gap-1.5
          overflow-hidden
          rounded-full
          border border-white/10
          bg-white/[0.04]
          px-4 py-2
          text-xs
          font-bold
          text-zinc-400
          backdrop-blur-xl
          transition-all duration-300
          hover:border-green-400/30
          hover:bg-green-400/10
          hover:text-green-400
          hover:shadow-[0_10px_30px_rgba(34,197,94,0.15)]
          sm:px-5 sm:py-2.5
          sm:text-sm
        "
      >
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{
            duration: 0.6,
          }}
          className="
            pointer-events-none
            absolute inset-y-0
            w-8
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />

        <span className="relative z-10">
          Show all
        </span>

        <motion.span
          className="relative z-10"
          whileHover={{
            x: 4,
            rotateY: -12,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <ChevronRight size={17} />
        </motion.span>
      </motion.button>

      <div
        className="
          pointer-events-none
          absolute bottom-0
          left-5 right-5
          h-px
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-green-400/60
          via-emerald-400/20
          to-transparent
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />
    </motion.div>
  );
}