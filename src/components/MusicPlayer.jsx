import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {Shuffle,SkipBack,Play,Pause,SkipForward,Repeat,Volume2,Heart,Music2,} from "lucide-react";

export default function MusicPlayer({
  currentSong,
  playing,
  setPlaying,
}) {
  const [progress, setProgress] = useState(20);
  const [liked, setLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(66);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) return 0;
        return value + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing]);

  if (!currentSong) return null;

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          opacity: playing ? [0.35, 0.8, 0.35] : 0.25,
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
      />

      <div className="border-t border-white/[0.08] bg-[#080a0a]/95 px-3 py-3 shadow-[0_-15px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-5">
        <div
          className="mx-auto flex max-w-[1700px] items-center gap-3"
          style={{
            perspective: "1400px",
          }}
        >
          
          <motion.div
            whileHover={{
              y: -3,
              rotateX: 3,
              rotateY: -3,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="group flex min-w-0 flex-1 items-center gap-3 lg:w-[28%] lg:flex-none"
          >
            <div
              className="relative shrink-0"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={
                  playing
                    ? {
                        rotateY: [0, 360],
                      }
                    : {
                        rotateY: 0,
                      }
                }
                transition={{
                  duration: 8,
                  repeat: playing ? Infinity : 0,
                  ease: "linear",
                }}
                className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{
                    x: playing ? "120%" : "-120%",
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: playing ? Infinity : 0,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-y-0 w-5 -skew-x-12 bg-white/20 blur-sm"
                />
              </motion.div>

              {playing && (
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-end justify-center gap-[2px] rounded-full border border-black bg-green-400 p-1">
                  {[1, 2, 3].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={{
                        height: ["30%", "90%", "50%", "80%", "30%"],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: bar * 0.12,
                      }}
                      className="w-[2px] rounded-full bg-black"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <motion.p
                whileHover={{ x: 3 }}
                className="truncate text-xs font-bold text-white sm:text-sm"
              >
                {currentSong.title}
              </motion.p>

              <p className="mt-0.5 truncate text-[10px] text-zinc-500 sm:text-xs">
                {currentSong.artist}
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => setLiked(!liked)}
              whileHover={{
                scale: 1.2,
                rotateY: 15,
                y: -2,
              }}
              whileTap={{ scale: 0.8 }}
              className={`hidden shrink-0 sm:block ${
                liked
                  ? "text-green-400"
                  : "text-zinc-500 hover:text-green-400"
              }`}
            >
              <Heart
                size={17}
                fill={liked ? "currentColor" : "none"}
              />
            </motion.button>
          </motion.div>

         
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-5">
              <motion.button
                type="button"
                onClick={() => setShuffle(!shuffle)}
                whileHover={{
                  scale: 1.2,
                  rotateZ: 12,
                  y: -2,
                }}
                whileTap={{ scale: 0.85 }}
                className={`hidden sm:block ${
                  shuffle
                    ? "text-green-400"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <Shuffle size={17} />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.2,
                  x: -3,
                }}
                whileTap={{ scale: 0.8 }}
                className="text-zinc-400 hover:text-white"
              >
                <SkipBack size={20} fill="currentColor" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setPlaying(!playing)}
                whileHover={{
                  scale: 1.12,
                  rotateX: 8,
                  rotateY: -8,
                }}
                whileTap={{
                  scale: 0.88,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.15)] sm:h-11 sm:w-11"
              >
                <motion.span
                  animate={
                    playing
                      ? {
                          scale: [1, 1.35, 1],
                          opacity: [0.2, 0.45, 0.2],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full bg-green-400 blur-xl"
                />

                <span className="relative z-10">
                  {playing ? (
                    <Pause size={19} fill="currentColor" />
                  ) : (
                    <Play
                      size={19}
                      fill="currentColor"
                      className="translate-x-[1px]"
                    />
                  )}
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.2,
                  x: 3,
                }}
                whileTap={{ scale: 0.8 }}
                className="text-zinc-400 hover:text-white"
              >
                <SkipForward size={20} fill="currentColor" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setRepeat(!repeat)}
                whileHover={{
                  scale: 1.2,
                  rotateZ: -12,
                  y: -2,
                }}
                whileTap={{ scale: 0.85 }}
                className={`hidden sm:block ${
                  repeat
                    ? "text-green-400"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <Repeat size={17} />
              </motion.button>
            </div>

            <div className="hidden w-full max-w-2xl items-center gap-2 text-[10px] text-zinc-500 sm:flex">
              <span className="w-7 text-right">0:42</span>

              <div className="group/progress relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  animate={{
                    opacity: playing ? [0.3, 0.8, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-green-400/20 blur-sm"
                />

                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                />

                <motion.div
                  style={{
                    left: `${progress}%`,
                  }}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_10px_rgba(74,222,128,0.9)] transition-opacity group-hover/progress:opacity-100"
                />
              </div>

              <span className="w-7">{currentSong.duration}</span>
            </div>
          </div>

          <motion.div
            whileHover={{
              y: -2,
              rotateX: 3,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="hidden w-[28%] items-center justify-end gap-3 lg:flex"
          >
            <motion.button
              whileHover={{
                scale: 1.15,
                rotateY: -10,
              }}
              className="text-zinc-500 hover:text-green-400"
            >
              <Volume2 size={18} />
            </motion.button>

            <div className="group/volume relative h-1.5 w-28 cursor-pointer overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-300"
                animate={{
                  width: `${volume}%`,
                }}
              />

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <motion.div
              animate={
                playing
                  ? {
                      y: [0, -2, 0],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="hidden xl:block text-green-400/60"
            >
              <Music2 size={16} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}