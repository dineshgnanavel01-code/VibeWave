import { motion } from "framer-motion";
import {Play,Headphones,MoreHorizontal,Radio,} from "lucide-react";

export default function PodcastCard({ podcast, onPlay }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -12,
        rotateX: 4,
        rotateY: -4,
        scale: 1.025,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[1.5rem]
        border
        border-white/[0.07]
        bg-gradient-to-br
        from-[#111615]
        via-[#090c0b]
        to-black
        p-3
        shadow-[0_15px_50px_rgba(0,0,0,0.35)]
        transition-shadow
        duration-500
        hover:border-green-400/25
        hover:shadow-[0_30px_80px_rgba(34,197,94,0.12)]
        sm:p-4
      "
    >
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-green-500
          blur-[70px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-cyan-500/10
          blur-[70px]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

    
      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          rounded-2xl
        "
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <motion.img
          src={podcast.image}
          alt={podcast.title}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
        " />

        <motion.div
          initial={{
            x: "-130%",
          }}
          whileHover={{
            x: "130%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            w-1/3
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

        <div className="
          absolute
          left-3
          top-3
          flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/10
          bg-black/60
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          text-green-400
          backdrop-blur-xl
        ">
          <Radio size={11} />
          Podcast
        </div>

        
        <motion.button
          type="button"
          onClick={() => onPlay?.(podcast)}
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          whileHover={{
            scale: 1.12,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="
            absolute
            bottom-3
            right-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-green-400
            text-black
            opacity-0
            shadow-[0_10px_35px_rgba(34,197,94,0.35)]
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <Play
            size={19}
            fill="currentColor"
          />
        </motion.button>

        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            absolute
            bottom-3
            left-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-black/60
            text-white/80
            backdrop-blur-xl
            transition-all
            duration-300
            group-hover:text-green-400
          "
        >
          <Headphones size={16} />
        </motion.div>
      </div>

     
      <div
        className="relative z-10 mt-4"
        style={{
          transform: "translateZ(30px)",
        }}
      >
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">

            <motion.h3
              whileHover={{
                x: 3,
              }}
              className="
                truncate
                text-base
                font-black
                text-white
                transition-colors
                duration-300
                group-hover:text-green-400
                sm:text-lg
              "
            >
              {podcast.title}
            </motion.h3>

            <p className="
              mt-1
              truncate
              text-sm
              text-zinc-500
            ">
              {podcast.description ||
                podcast.category ||
                "VibeWave Original"}
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{
              rotate: 90,
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-zinc-600
              transition-colors
              hover:bg-white/10
              hover:text-white
            "
          >
            <MoreHorizontal size={18} />
          </motion.button>
        </div>

        <div className="
          mt-4
          flex
          h-5
          items-end
          gap-[3px]
          opacity-60
          transition-opacity
          duration-300
          group-hover:opacity-100
        ">
          {[4, 8, 12, 7, 15, 10, 17, 8, 13, 5, 11, 7, 15, 9].map(
            (height, index) => (
              <motion.span
                key={index}
                animate={{
                  height: [
                    height * 0.45,
                    height,
                    height * 0.65,
                    height * 0.9,
                  ],
                }}
                transition={{
                  duration: 0.8 + index * 0.03,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.04,
                }}
                className="
                  w-[3px]
                  rounded-full
                  bg-gradient-to-t
                  from-green-500
                  to-emerald-300
                "
              />
            )
          )}
        </div>

        <div className="
          mt-3
          flex
          items-center
          justify-between
          text-xs
          text-zinc-600
        ">
          <span className="flex items-center gap-1">
            <Headphones size={12} />
            Listen now
          </span>

          <span className="
            font-semibold
            text-zinc-500
            group-hover:text-green-400
          ">
            VibeWave
          </span>
        </div>
      </div>
      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          absolute
          bottom-0
          left-6
          right-6
          h-[2px]
          origin-left
          bg-gradient-to-r
          from-green-400
          via-emerald-400
          to-cyan-400
        "
      />
    </motion.article>
  );
}