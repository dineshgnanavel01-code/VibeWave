import { useState } from "react";
import { motion } from "framer-motion";
import {Play,UserPlus,UserCheck,Check,} from "lucide-react";

const spring = {
  type: "spring",
  stiffness: 250,
  damping: 18,
};

export default function ArtistCard({ artist, onClick }) {
  const [following, setFollowing] = useState(false);

  const handleFollow = (e) => {
    e.stopPropagation();
    setFollowing((prev) => !prev);
  };

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="group"
    >
      <motion.div
        whileHover={{
          y: -10,
          rotateX: 8,
          rotateY: -6,
          scale: 1.04,
        }}
        transition={spring}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0b1110] to-[#060908] p-4 shadow-xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)]"
      >
        <motion.div
          whileHover={{
            z: 25,
          }}
          transition={spring}
          style={{
            transformStyle: "preserve-3d",
          }}
          onClick={onClick}
          className="relative cursor-pointer overflow-hidden rounded-2xl"
        >
          <motion.img
            src={artist.image}
            alt={artist.name}
            whileHover={{
              scale: 1.12,
              rotate: 2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="aspect-square w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          <motion.button
            type="button"
            onClick={onClick}
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.92,
            }}
            style={{
              transform: "translateZ(30px)",
            }}
            className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-[0_0_30px_rgba(74,222,128,.45)] transition-all duration-300 group-hover:opacity-100"
          >
            <Play
              size={18}
              fill="currentColor"
            />
          </motion.button>

          <motion.div
            initial={{
              x: "-140%",
            }}
            whileHover={{
              x: "140%",
            }}
            transition={{
              duration: 0.7,
            }}
            className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>

        <div
          className="mt-4"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <h3 className="truncate text-sm font-black text-white transition-colors duration-300 group-hover:text-green-400">
            {artist.name}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Artist
          </p>

          <motion.button
            type="button"
            onClick={handleFollow}
            whileHover={{
              y: -3,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            style={{
              transform: "translateZ(15px)",
            }}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all duration-300 ${
              following
                ? "border-green-400/40 bg-green-400/15 text-green-400"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-green-400/30 hover:bg-green-400/10 hover:text-green-400"
            }`}
          >
            {following ? (
              <>
                <UserCheck size={15} />
                <span>Following</span>
                <Check size={13} />
              </>
            ) : (
              <>
                <UserPlus size={15} />
                <span>Follow</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Ambient Hover Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/[0.12] via-transparent to-cyan-400/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}