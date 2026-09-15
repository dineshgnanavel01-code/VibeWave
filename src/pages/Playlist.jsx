import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {Play,UserPlus,UserCheck,MoreHorizontal,Headphones,Heart,Disc3,Radio,Sparkles,Music2,BadgeCheck,Users,Mic2, Album} from "lucide-react";
import { songs, albums } from "../data/musicData";

const ease = [0.16, 1, 0.3, 1];

const spring = {
  type: "spring",
  stiffness: 180,
  damping: 18,
};

export default function Artist({ artist, onPlay }) {
  const [following, setFollowing] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);

  const artistName = artist?.name || "Popular Artist";
  const artistImage = artist?.image || songs[0]?.image;

 
  const artistSongs = useMemo(() => {
    const matched = songs.filter(
      (song) =>
        song.artist?.toLowerCase() === artistName.toLowerCase()
    );

    return matched.length > 0 ? matched : songs.slice(0, 8);
  }, [artistName]);

  const displayedSongs = artistSongs.slice(0, 8);
  const artistAlbums = useMemo(() => {
    const matched = albums.filter(
      (album) =>
        album.artist?.toLowerCase() === artistName.toLowerCase() ||
        album.artistName?.toLowerCase() === artistName.toLowerCase()
    );

    return matched.length > 0 ? matched : albums.slice(0, 4);
  }, [artistName]);

  
  const singles = useMemo(() => {
    const albumTitles = new Set(
      artistAlbums.map((album) => album.title)
    );

    const matchedSingles = artistSongs.filter(
      (song) => !albumTitles.has(song.album)
    );

    return (
      matchedSingles.length > 0
        ? matchedSingles
        : artistSongs.slice(0, 4)
    ).slice(0, 4);
  }, [artistAlbums, artistSongs]);

  

  const playArtist = () => {
    if (displayedSongs[0]) {
      onPlay?.(displayedSongs[0]);
    }
  };

 
  const toggleLike = (songId) => {
    setLikedSongs((current) =>
      current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId]
    );
  };

  
  const playAlbum = (album) => {
    const albumSong = songs.find(
      (song) =>
        song.album?.toLowerCase() === album.title?.toLowerCase()
    );

    onPlay?.(albumSong || displayedSongs[0]);
  };

  

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#020303] pb-28 pt-16 text-white lg:ml-72 lg:w-[calc(100vw-18rem)]">

      <section className="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <motion.div
            initial={{
              scale: 1.2,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              ease,
            }}
            className="absolute inset-0"
          >
            <img
              src={artistImage}
              alt=""
              className="h-full w-full object-cover opacity-[0.08] blur-3xl"
            />

            <div className="absolute inset-0 bg-black/80" />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#020303]" />
          </motion.div>

          <motion.div
            animate={{
              x: ["-10%", "15%", "-10%"],
              y: ["0%", "8%", "0%"],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[5%] top-[-180px] h-[500px] w-[500px] rounded-full bg-green-500/[0.08] blur-[140px]"
          />

          <motion.div
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["0%", "-8%", "0%"],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-100px] top-[20%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.05] blur-[140px]"
          />

          <motion.div
            animate={{
              x: ["-140%", "140%"],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 h-full w-[25%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-green-400/[0.035] to-transparent"
          />

          {[...Array(24)].map((_, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                x: `${(index * 47) % 100}%`,
                y: `${(index * 31) % 90}%`,
              }}
              animate={{
                y: [
                  `${(index * 31) % 90}%`,
                  `${((index * 31) % 90) - 8}%`,
                  `${(index * 31) % 90}%`,
                ],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + (index % 5),
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="absolute h-1 w-1 rounded-full bg-green-400"
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-[1500px]">

          
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              rotateX: 5,
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
            whileHover={{
              y: -4,
            }}
            style={{
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080c0b]/90 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80" />

            <motion.div
              animate={{
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-green-500/10 blur-[120px]"
            />

            <motion.div
              initial={{
                x: "-120%",
              }}
              whileHover={{
                x: "120%",
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-y-0 z-30 w-[20%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
            />

            <div className="relative z-10 flex flex-col lg:flex-row">

            
              <div className="relative flex shrink-0 items-center justify-center p-5 sm:p-7 lg:w-[390px] lg:p-8">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-[calc(100%-40px)] w-[calc(100%-40px)] max-w-[350px] rounded-full border border-dashed border-green-400/20"
                >
                  <span className="absolute left-1/2 top-[-4px] h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                </motion.div>

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-[calc(100%-80px)] w-[calc(100%-80px)] max-w-[310px] rounded-full border border-cyan-400/10"
                >
                  <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.35, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute h-64 w-64 rounded-full bg-green-500/20 blur-[90px]"
                />
                <motion.div
                  whileHover={{
                    rotateY: -8,
                    rotateX: 5,
                    scale: 1.035,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative z-10 aspect-square w-full max-w-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                >
                  <motion.img
                    src={artistImage}
                    alt={artistName}
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-white/[0.08]" />

                  <motion.div
                    animate={{
                      y: ["-120%", "150%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "linear",
                    }}
                    className="absolute left-0 top-0 h-[35%] w-full bg-gradient-to-b from-transparent via-white/[0.07] to-transparent"
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.6,
                      duration: 0.5,
                    }}
                    className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-xl"
                  >
                    <BadgeCheck
                      size={15}
                      className="fill-green-400 text-black"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-green-400 backdrop-blur-xl"
                  >
                    <Disc3 size={20} />
                  </motion.div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400">
                      Artist
                    </p>

                    <p className="mt-1 truncate text-lg font-black">
                      {artistName}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 5, -4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-3 z-20 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-[#07100c]/90 text-green-400 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:right-5"
                >
                  <Headphones size={24} />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-3 top-10 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-black/70 text-cyan-400 shadow-xl backdrop-blur-xl sm:left-5"
                >
                  <Music2 size={19} />
                </motion.div>
              </div>

              

              <div className="flex min-w-0 flex-1 flex-col justify-center px-5 pb-7 sm:px-7 sm:pb-8 lg:px-3 lg:py-10 lg:pr-10">

               
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                  }}
                  className="mb-3 flex items-center gap-2"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                    }}
                    className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-400 sm:text-[11px]">
                    VibeWave Artist
                  </span>
                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease,
                  }}
                  whileHover={{
                    x: 3,
                    textShadow:
                      "0 0 50px rgba(74,222,128,0.3)",
                  }}
                  className="max-w-4xl break-words text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
                >
                  {artistName}
                </motion.h1>

                
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base"
                >
                  Experience the sound, energy and unforgettable music
                  of {artistName}. Discover popular tracks, releases and
                  your next favorite vibe.
                </motion.p>

                <div className="mt-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                  {[
                    ["10M+", "Listeners"],
                    [displayedSongs.length, "Top Tracks"],
                    [
                      artistAlbums.length + singles.length,
                      "Releases",
                    ],
                  ].map(([value, label], index) => (
                    <motion.div
                      key={label}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.55 + index * 0.1,
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.04,
                        rotateX: 5,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-3 py-3 backdrop-blur-xl sm:min-w-[120px] sm:px-5"
                    >
                      <p className="text-base font-black sm:text-lg">
                        {value}
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-600 sm:text-xs">
                        {label}
                      </p>
                    </motion.div>
                  ))}
                </div>

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
                    delay: 0.8,
                  }}
                  className="mt-7 flex flex-wrap gap-2.5"
                >

                  <motion.button
                    type="button"
                    onClick={playArtist}
                    whileHover={{
                      scale: 1.06,
                      y: -4,
                      rotateX: 5,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-green-400 px-7 py-3.5 font-bold text-black shadow-[0_15px_50px_rgba(34,197,94,0.25)]"
                  >
                    <motion.span
                      initial={{
                        x: "-120%",
                      }}
                      whileHover={{
                        x: "120%",
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="absolute inset-0 skew-x-[-20deg] bg-white/30"
                    />

                    <Play
                      size={17}
                      fill="currentColor"
                      className="relative"
                    />

                    <span className="relative">
                      Play
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() =>
                      setFollowing((current) => !current)
                    }
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      rotateX: 4,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className={`relative flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3.5 font-semibold backdrop-blur-xl transition-all ${
                      following
                        ? "border-green-400/40 bg-green-400/10 text-green-400 shadow-[0_12px_35px_rgba(34,197,94,0.12)]"
                        : "border-white/10 bg-white/[0.04] text-white hover:border-green-400/30 hover:bg-green-400/[0.06]"
                    }`}
                  >
                    {following ? (
                      <UserCheck size={17} />
                    ) : (
                      <UserPlus size={17} />
                    )}

                    <span>
                      {following ? "Following" : "Follow"}
                    </span>

                    {following && (
                      <motion.span
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,.8)]"
                      />
                    )}
                  </motion.button>

                  
                  <motion.button
                    type="button"
                    whileHover={{
                      rotate: 90,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 backdrop-blur-xl transition-colors hover:text-white"
                  >
                    <MoreHorizontal size={19} />
                  </motion.button>
                </motion.div>
              </div>

             

              <div className="hidden w-[245px] shrink-0 border-l border-white/[0.06] bg-white/[0.015] p-7 xl:flex xl:flex-col xl:justify-between">

                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
                      Artist Vibe
                    </span>

                    <Radio
                      size={18}
                      className="text-green-400"
                    />
                  </div>

               
                  <div className="flex h-24 items-center justify-center gap-1.5 rounded-2xl border border-white/[0.06] bg-black/30 px-5">
                    {[4, 7, 11, 16, 23, 14, 9, 18, 12, 6].map(
                      (height, index) => (
                        <motion.span
                          key={index}
                          animate={{
                            height: [
                              height,
                              height + 8,
                              height - 2,
                              height,
                            ],
                          }}
                          transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            delay: index * 0.08,
                            ease: "easeInOut",
                          }}
                          className="w-1 rounded-full bg-green-400/70"
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="flex items-center gap-3 text-zinc-500">
                    <Users
                      size={16}
                      className="text-green-400"
                    />

                    <span className="text-xs">
                      10M+ listeners
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-500">
                    <Mic2
                      size={16}
                      className="text-green-400"
                    />

                    <span className="text-xs">
                      {displayedSongs.length} popular tracks
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-500">
                    <Music2
                      size={16}
                      className="text-green-400"
                    />

                    <span className="text-xs">
                      VibeWave exclusive
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="mb-7 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-green-400 sm:text-[11px]">
              <Sparkles size={13} />
              Artist Collection
            </p>

            <h2 className="text-3xl font-black sm:text-4xl">
              Popular Songs
            </h2>
          </div>

          <motion.div
            whileHover={{
              rotate: 180,
              scale: 1.1,
            }}
            className="hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-green-400 sm:block"
          >
            <Radio size={22} />
          </motion.div>
        </motion.div>

        <div
          className="grid gap-3 md:grid-cols-2"
          style={{
            perspective: "1400px",
          }}
        >
          {displayedSongs.map((song, index) => {
            const isLiked = likedSongs.includes(song.id);

            return (
              <motion.article
                key={song.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                  ease,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? -2 : 2,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative flex min-w-0 items-center gap-2.5 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080b0a] p-3 transition-colors duration-300 hover:border-green-400/20 hover:bg-[#0c120f] sm:gap-3"
              >

               
                <motion.span
                  initial={{
                    x: "-130%",
                  }}
                  whileHover={{
                    x: "130%",
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
                />

                <span className="relative z-10 w-6 shrink-0 text-center text-[11px] font-black text-zinc-700 transition-colors group-hover:text-green-400 sm:w-7 sm:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>

               
                <motion.div
                  whileHover={{
                    rotateY: -8,
                    rotateX: 4,
                    scale: 1.06,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative z-10 h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-16 sm:w-16"
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 transition group-hover:opacity-100" />

                  <motion.button
                    type="button"
                    onClick={() => onPlay?.(song)}
                    whileHover={{
                      scale: 1.12,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-[0_0_25px_rgba(74,222,128,.45)] transition-opacity group-hover:opacity-100"
                  >
                    <Play
                      size={14}
                      fill="currentColor"
                    />
                  </motion.button>
                </motion.div>

                <div className="relative z-10 min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold transition-colors group-hover:text-green-400 sm:text-base">
                    {song.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-zinc-600">
                    {song.album}
                  </p>

                  <div className="mt-1.5 flex h-3 items-end gap-[2px] opacity-0 transition-opacity group-hover:opacity-100">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.span
                        key={bar}
                        animate={{
                          height: [3, 11, 5, 9, 3],
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

          
                <span className="hidden shrink-0 text-xs text-zinc-700 sm:block">
                  {song.duration}
                </span>

                 <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLike(song.id);
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: -8,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                    isLiked
                      ? "bg-green-400/10 text-green-400"
                      : "text-zinc-600 hover:bg-white/5 hover:text-green-400"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={
                      isLiked
                        ? "currentColor"
                        : "none"
                    }
                  />
                </motion.button>

              
                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute bottom-0 left-5 right-5 h-[2px] origin-left bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
                />
              </motion.article>
            );
          })}
        </div>
      </section>


      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="mb-8"
        >
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-green-400 sm:text-[11px]">
            <Album size={14} />
            Discography
          </p>

          <h2 className="text-3xl font-black sm:text-4xl">
            Albums & Singles
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Explore releases from {artistName}.
          </p>
        </motion.div>

       

        <div className="mb-12">

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-black sm:text-2xl">
              Albums
            </h3>

            <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-zinc-500">
              {artistAlbums.length} Releases
            </span>
          </div>

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            style={{
              perspective: "1400px",
            }}
          >
            {artistAlbums.map((album, index) => (
              <motion.article
                key={album.id || album.title}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: 7,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.025,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080b0a] p-3 shadow-xl"
              >

                <motion.div
                  animate={{
                    opacity: [0.05, 0.12, 0.05],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-400 blur-3xl"
                />

                <motion.div
                  whileHover={{
                    rotateY: -6,
                    rotateX: 3,
                    scale: 1.04,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

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
                    className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-green-400 backdrop-blur-xl"
                  >
                    <Disc3 size={18} />
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={() => playAlbum(album)}
                    whileHover={{
                      scale: 1.12,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-[0_0_30px_rgba(74,222,128,.4)] transition-all duration-300 group-hover:opacity-100"
                  >
                    <Play
                      size={17}
                      fill="currentColor"
                    />
                  </motion.button>
                </motion.div>

                <div
                  className="relative z-10 pt-4"
                  style={{
                    transform: "translateZ(25px)",
                  }}
                >
                  <h4 className="truncate font-black transition-colors group-hover:text-green-400">
                    {album.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600">
                    <span>Album</span>
                    <span>•</span>
                    <span>{artistName}</span>
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
                    duration: 0.4,
                  }}
                  className="absolute bottom-0 left-4 right-4 h-[2px] origin-left bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
                />
              </motion.article>
            ))}
          </div>
        </div>

       

        <div>

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-black sm:text-2xl">
              Singles
            </h3>

            <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-zinc-500">
              {singles.length} Tracks
            </span>
          </div>

          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            style={{
              perspective: "1400px",
            }}
          >
            {singles.map((song, index) => (
              <motion.article
                key={`single-${song.id}`}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease,
                }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: index % 2 === 0 ? -5 : 5,
                  scale: 1.025,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080b0a] p-3 shadow-xl"
              >

           
                <motion.div
                  whileHover={{
                    rotateY: -7,
                    rotateX: 4,
                    scale: 1.04,
                  }}
                  transition={spring}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

               
                  <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-green-400 backdrop-blur-xl">
                    Single
                  </div>

                  
                  <motion.button
                    type="button"
                    onClick={() => onPlay?.(song)}
                    whileHover={{
                      scale: 1.12,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-[0_0_30px_rgba(74,222,128,.4)] transition-all duration-300 group-hover:opacity-100"
                  >
                    <Play
                      size={17}
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
                      duration: 0.8,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />
                </motion.div>

                
                <div
                  className="relative z-10 pt-4"
                  style={{
                    transform: "translateZ(25px)",
                  }}
                >
                  <h4 className="truncate font-black transition-colors group-hover:text-green-400">
                    {song.title}
                  </h4>

                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600">
                    <span>Single</span>
                    <span>•</span>
                    <span>{song.duration}</span>
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
                    duration: 0.4,
                  }}
                  className="absolute bottom-0 left-4 right-4 h-[2px] origin-left bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

     

      <section className="mx-auto max-w-[1500px] px-4 pb-10 sm:px-6 lg:px-8">

        <motion.div
          whileHover={{
            y: -7,
            rotateX: 3,
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
          className="group relative overflow-hidden rounded-[2rem] border border-green-400/10 bg-gradient-to-br from-green-950/60 via-zinc-950 to-cyan-950/40 p-7 shadow-[0_30px_80px_rgba(0,0,0,.5)] sm:p-10"
        >

         
          <motion.div
            animate={{
              x: ["-120%", "150%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-white/[0.04]"
          />

         
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-500/10 blur-3xl"
          />

          <div
            className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <div>
              <div className="mb-3 flex items-center gap-2 text-green-400">
                <Sparkles size={17} />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Keep Listening
                </span>
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                More music from {artistName}.
              </h2>

              <p className="mt-2 text-sm text-zinc-600">
                Discover more tracks and create your perfect vibe.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={playArtist}
              whileHover={{
                scale: 1.07,
                x: -4,
                rotateX: 7,
                rotateY: -4,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-bold text-black"
            >
              <motion.span
                initial={{
                  x: "-120%",
                }}
                whileHover={{
                  x: "120%",
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute inset-0 skew-x-[-20deg] bg-green-300/50"
              />

              <Play
                size={17}
                fill="currentColor"
                className="relative"
              />

              <span className="relative">
                Start Listening
              </span>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}