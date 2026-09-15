import { motion } from "framer-motion";
import { Play, Disc3 } from "lucide-react";

export default function AlbumCard({ album, onPlay }) {
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
        perspective: 1000,
      }}
      className="
        group relative overflow-hidden
        rounded-2xl border border-white/5
        bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
        p-3 shadow-lg
        transition-shadow duration-500
        hover:border-green-500/20
        hover:shadow-[0_25px_60px_rgba(34,197,94,0.16)]
        sm:p-4
      "
    >
     
      <div
        className="
          pointer-events-none absolute
          -right-10 -top-10 h-32 w-32
          rounded-full bg-green-500/10
          blur-3xl opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />
      <motion.div
        whileHover={{
          scale: 1.035,
          z: 25,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="
          relative overflow-hidden
          rounded-xl
          shadow-xl
        "
      >
        <motion.img
          src={album.image}
          alt={album.title}
          className="
            aspect-square w-full
            object-cover
          "
          whileHover={{
            scale: 1.12,
            rotateZ: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />

        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-black/60 via-transparent to-transparent
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />

        <motion.button
          type="button"
          onClick={() => onPlay(album)}
          initial={{ opacity: 0, scale: 0.6, y: 15 }}
          whileHover={{
            scale: 1.12,
            rotateX: 8,
            rotateY: -8,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="
            absolute bottom-3 right-3
            flex h-12 w-12
            items-center justify-center
            rounded-full
            bg-green-500
            text-black
            opacity-0
            shadow-[0_10px_30px_rgba(34,197,94,0.45)]
            transition-all duration-300
            group-hover:opacity-100
            sm:h-13 sm:w-13
          "
        >
          <Play size={20} fill="currentColor" />
        </motion.button>
        <motion.div
          className="
            pointer-events-none absolute
            left-3 top-3
            flex h-8 w-8
            items-center justify-center
            rounded-full
            bg-black/60
            text-green-400
            opacity-0
            backdrop-blur-md
            transition-opacity duration-500
            group-hover:opacity-100
          "
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Disc3 size={17} />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <h3
          className="
            mt-4 truncate
            font-semibold
            text-white
            transition-colors duration-300
            group-hover:text-green-400
          "
        >
          {album.title}
        </h3>

        <p className="mt-1 truncate text-sm text-zinc-400">
          {album.artist} • {album.year}
        </p>
      </motion.div>

  
      <div
        className="
          pointer-events-none absolute
          bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent via-green-500/60 to-transparent
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />
    </motion.article>
  );
}