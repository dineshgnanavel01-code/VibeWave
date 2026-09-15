import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  Music2,
  ArrowUpRight,
  Headphones,
} from "lucide-react";

import PlaylistCard from "../components/PlaylistCard";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import PodcastCard from "../components/PodcastCard";
import SectionHeader from "../components/SectionHeader";
import {songs, artists, playlists,albums,podcasts,categories} from "../data/musicData";

const ease = [0.16, 1, 0.3, 1];

const spring = {
  type: "spring",
  stiffness: 180,
  damping: 16,
};

export default function Home({ onPlay, onExplore }) {
  const browseSectionRef = useRef(null);

  const playSong = (song) => {
    if (!song) return;
    onPlay?.(song);
  };

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      browseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030505] pb-28 pt-16 text-white lg:ml-72">
      <div className="mx-auto max-w-[1750px] px-4 py-6 sm:px-6 lg:px-8">

       
        <motion.section
          initial={{
            opacity: 0,
            y: 40,
            rotateX: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          style={{
            perspective: 1600,
            transformStyle: "preserve-3d",
          }}
          className="group relative mb-12 min-h-[500px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#06251a] via-[#071412] to-[#061421] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
        >
          <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "45px 45px"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -40, 50, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-40 top-[-100px] h-[450px] w-[450px] rounded-full bg-green-500/20 blur-[110px]"
          />

          <motion.div
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.8, 1.15, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-180px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]"
          />

          {[...Array(18)].map((_, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -25, 0],
                x: [0, index % 2 === 0 ? 10 : -10, 0],
                opacity: [0.1, 0.8, 0.1],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: 3 + index * 0.25,
                repeat: Infinity,
                delay: index * 0.15,
              }}
              className="absolute h-1 w-1 rounded-full bg-green-300 shadow-[0_0_15px_rgba(74,222,128,0.9)]"
              style={{
                left: `${4 + ((index * 7) % 94)}%`,
                top: `${10 + ((index * 13) % 78)}%`,
              }}
            />
          ))}

          <div className="relative z-10 flex min-h-[500px] items-center px-6 py-12 sm:px-10 lg:px-16">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_430px]">

              <div className="max-w-3xl">

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -30,
                    rotateY: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.7,
                  }}
                  whileHover={{
                    rotateX: 5,
                    y: -3,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-green-400 backdrop-blur-xl"
                >
                  <Sparkles size={15} />
                  Made for your vibeWave
                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                  }}
                  whileHover={{
                    x: 5,
                    rotateX: 3,
                    textShadow: "0 0 40px rgba(34,197,94,.35)",
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl"
                >
                  Your music.
                  <br />
                  Your{" "}
                  <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    VibeWave.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base"
                >
                  Discover millions of songs, trending playlists and artists
                  you love. Tune in and let VibeWave soundtrack your day.
                </motion.p>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.65,
                  }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <motion.button
                    type="button"
                    onClick={() => playSong(songs[0])}
                    whileHover={{
                      y: -6,
                      scale: 1.05,
                      rotateX: 7,
                      rotateY: -4,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-green-400 px-7 py-3.5 font-black text-black shadow-[0_20px_50px_rgba(34,197,94,.25)]"
                  >
                    <motion.span
                      animate={{
                        x: ["-150%", "150%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="absolute inset-y-0 w-10 -skew-x-12 bg-white/40"
                    />

                    <Play size={19} fill="currentColor" className="relative" />

                    <span className="relative">Play Music</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleExploreClick}
                    whileHover={{
                      y: -6,
                      scale: 1.04,
                      rotateX: 6,
                      rotateY: 3,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-7 py-3.5 font-bold backdrop-blur-xl transition hover:border-green-400/30 hover:bg-green-400/10"
                  >
                    Explore
                    <ArrowUpRight size={18} />
                  </motion.button>
                </motion.div>
              </div>

              
              <motion.div
                initial={{
                  opacity: 0,
                  x: 100,
                  rotateY: 30,
                  rotateX: 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.3,
                  ease,
                }}
                className="relative mx-auto hidden h-[370px] w-[370px] lg:block"
                style={{
                  perspective: 1400,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{
                    rotateZ: 360,
                  }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-10 rounded-full border border-dashed border-green-400/20"
                >
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-green-400 shadow-[0_0_25px_#4ade80]" />
                </motion.div>

                <motion.div
                  animate={{
                    rotateZ: -360,
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-4 rounded-full border border-cyan-400/20"
                >
                  <span className="absolute bottom-[-3px] left-1/2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.25, 0.55, 0.25],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-4 rounded-full bg-green-500/20 blur-[80px]"
                />

                
                <motion.div
                  animate={{
                    y: [0, -14, 0],
                    rotateZ: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    rotateX: 18,
                    rotateY: -18,
                    scale: 1.08,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute inset-12 cursor-pointer rounded-full border border-white/10 bg-gradient-to-br from-zinc-700 via-zinc-950 to-black shadow-[0_50px_120px_rgba(0,0,0,.9)]"
                  onClick={() => playSong(songs[0])}
                >
                  <motion.img
                    src={songs[0]?.image}
                    alt={songs[0]?.title || "Music"}
                    animate={{
                      rotateZ: 360,
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="absolute inset-7 h-[calc(100%-56px)] w-[calc(100%-56px)] rounded-full object-cover opacity-70"
                  />

                  <div className="absolute inset-7 rounded-full bg-black/45" />

                  <div className="absolute inset-12 rounded-full border border-white/10" />
                  <div className="absolute inset-16 rounded-full border border-white/[0.08]" />
                  <div className="absolute inset-20 rounded-full border border-green-400/10" />

                  <motion.div
                    animate={{
                      rotateZ: -360,
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-green-400/40 bg-black/90 shadow-[0_0_45px_rgba(74,222,128,.2)] backdrop-blur-xl">
                      <Headphones size={28} className="text-green-400" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-400 text-black shadow-[0_0_45px_rgba(74,222,128,.6)]">
                      <Play size={25} fill="currentColor" />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotateZ: [0, 3, -3, 0],
                    rotateY: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "translateZ(100px)",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute bottom-2 right-[-20px] rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{
                        rotateY: 20,
                        rotateX: 10,
                      }}
                      className="h-12 w-12 overflow-hidden rounded-xl border border-green-400/20"
                    >
                      <img
                        src={songs[0]?.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <div>
                      <p className="text-xs font-bold">Now Playing</p>

                      <p className="mt-1 max-w-[100px] truncate text-[10px] text-zinc-500">
                        {songs[0]?.title || "VibeWave Mix"}
                      </p>

                      <div className="mt-2 flex items-end gap-1">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <motion.span
                            key={bar}
                            animate={{
                              height: [5, 17, 9, 20, 5],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: bar * 0.1,
                            }}
                            className="w-1 rounded-full bg-green-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

      
        <section className="mb-12">
          <SectionHeader
            title="Recently Played"
            subtitle="Jump back into your favorites"
          />

          <div
            className="grid gap-3 md:grid-cols-2"
            style={{
              perspective: "1500px",
            }}
          >
            {songs.slice(0, 6).map((song, index) => (
              <motion.button
                key={song.id}
                type="button"
                onClick={() => playSong(song)}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -25 : 25,
                  rotateX: 8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.55,
                  ease,
                }}
                whileHover={{
                  y: -7,
                  scale: 1.018,
                  rotateX: 4,
                  rotateY: index % 2 === 0 ? -3 : 3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#080c0b] via-[#0a100e] to-[#070909] p-3 text-left shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-green-400/25 hover:shadow-[0_25px_60px_rgba(34,197,94,0.14)] sm:gap-4 sm:p-3.5"
              > <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: 1,
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-400/[0.08] via-transparent to-cyan-400/[0.04]"
                />

                <motion.div
                  initial={{
                    x: "-140%",
                  }}
                  whileHover={{
                    x: "140%",
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="pointer-events-none absolute inset-y-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                />

                {/* Number */}
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotateY: 15,
                  }}
                  className="relative z-10 flex w-7 shrink-0 items-center justify-center text-xs font-black text-zinc-600 transition-colors group-hover:text-green-400 sm:w-8 sm:text-sm"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>

                <motion.div
                  whileHover={{
                    rotateY: -14,
                    rotateX: 7,
                    scale: 1.09,
                    z: 30,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative z-10 h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg sm:h-[68px] sm:w-[68px]"
                >
                  <motion.img
                    src={song.image}
                    alt={song.title}
                    whileHover={{
                      scale: 1.18,
                      rotateZ: 2,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/45" />

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-400 text-black shadow-[0_0_25px_rgba(74,222,128,0.5)]">
                      <Play size={15} fill="currentColor" />
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{
                      x: "-150%",
                    }}
                    whileHover={{
                      x: "150%",
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/15"
                  />
                </motion.div>

                <div
                  className="relative z-10 min-w-0 flex-1"
                  style={{
                    transform: "translateZ(25px)",
                  }}
                >
                  <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-green-400 sm:text-[15px]">
                    {song.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {song.artist}
                  </p>

                  <div className="mt-2 flex h-3 items-end gap-[3px] opacity-0 transition-opacity group-hover:opacity-100">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.span
                        key={bar}
                        animate={{
                          height: [3, 10, 5, 12, 4],
                        }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: bar * 0.08,
                        }}
                        className="w-[2px] rounded-full bg-green-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="relative z-10 hidden min-w-0 max-w-[150px] lg:block">
                  <p className="truncate text-xs text-zinc-600">
                    {song.album}
                  </p>
                </div>

                <div className="relative z-10 hidden xl:block">
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-zinc-500">
                    {song.language || "Music"}
                  </span>
                </div>

                <span className="relative z-10 hidden shrink-0 text-xs text-zinc-600 sm:block">
                  {song.duration}
                </span>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="relative z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10 text-green-400 sm:flex"
                >
                  <Play size={14} fill="currentColor" />
                </motion.div>

                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                  }}
                  className="absolute bottom-0 left-5 right-5 z-20 h-[2px] origin-left bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
                />
              </motion.button>
            ))}
          </div>
        </section>

       
        <section className="mb-12">
          <SectionHeader
            title="Trending Playlists"
            subtitle="What's hot right now"
          />

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            style={{
              perspective: "1500px",
            }}
          >
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 7,
                  rotateY: 6,
                  scale: 1.035,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group"
              >
                <motion.div
                  whileHover={{
                    z: 20,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <PlaylistCard
                    playlist={playlist}
                    onPlay={() =>
                      playSong(songs[playlist.id - 1] || songs[0])
                    }
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        
        <section className="mb-12">
          <SectionHeader
            title="Popular Artists"
            subtitle="Artists you might love"
          />

          <div
            className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
            style={{
              perspective: "1500px",
            }}
          >
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: 15,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -14,
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.06,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group"
              >
                <motion.div
                  whileHover={{
                    rotateY: 10,
                    rotateX: -5,
                    z: 30,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ArtistCard artist={artist} onClick={() => {}} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <SectionHeader
            title="Featured Albums"
            subtitle="Fresh albums and timeless favorites"
          />

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            style={{
              perspective: "1500px",
            }}
          >
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -13,
                  rotateX: 7,
                  rotateY: -7,
                  scale: 1.035,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <AlbumCard
                  album={album}
                  onPlay={() =>
                    playSong(
                      songs.find((song) => song.album === album.title) ||
                        songs[0]
                    )
                  }
                />
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <SectionHeader
            title="Popular Podcasts"
            subtitle="Listen, learn and get inspired"
          />

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            style={{
              perspective: "1500px",
            }}
          >
            {podcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateY: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateY: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 7,
                  rotateY: 6,
                  scale: 1.035,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  whileHover={{
                    rotateY: -7,
                    rotateX: 4,
                    z: 20,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <PodcastCard podcast={podcast} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
        <section ref={browseSectionRef}>
          <SectionHeader
            title="Browse All"
            subtitle="Explore music by category"
          />

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            style={{
              perspective: "1500px",
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -14,
                  rotateX: 9,
                  rotateY: -8,
                  scale: 1.04,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 shadow-xl"
              >
               
                <motion.div
                  whileHover={{
                    rotateY: -8,
                    rotateX: 5,
                    scale: 1.03,
                    z: 25,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative overflow-hidden"
                >
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    whileHover={{
                      scale: 1.16,
                      rotateZ: 2,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-cyan-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  <motion.div
                    initial={{
                      x: "-140%",
                    }}
                    whileHover={{
                      x: "140%",
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{
                    transform: "translateZ(40px)",
                  }}
                >
                  <motion.div
                    whileHover={{
                      rotateY: 15,
                      rotateX: -5,
                      scale: 1.1,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-green-400 backdrop-blur-xl"
                  >
                    <Music2 size={17} />
                  </motion.div>

                  <h3 className="font-black transition-colors group-hover:text-green-400">
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  animate={{
                    x: ["-120%", "140%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-sm"
                />
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-10" />
      </div>
    </main>
  );
}