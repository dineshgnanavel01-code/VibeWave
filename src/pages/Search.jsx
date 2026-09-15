import { useMemo } from "react";
import { motion } from "framer-motion";
import {Search as SearchIcon,Play,Sparkles,Music2,Disc3,ListMusic,X,} from "lucide-react";
import {songs,artists,albums,playlists,categories,} from "../data/musicData";

const spring = {
  type: "spring",
  stiffness: 180,
  damping: 16,
};

export default function Search({search,setSearch,onPlay,
}) {
  const query = search.trim().toLowerCase();

  const songResults = useMemo(() => {
    if (!query) return [];

    return songs
      .filter((song) =>
        [
          song.title,
          song.artist,
          song.album,
          song.language,
          song.category,
        ].some((value) =>
          value?.toLowerCase().includes(query)
        )
      )
      .slice(0, 20);
  }, [query]);

  const artistResults = useMemo(() => {
    if (!query) return [];

    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(query)
    );
  }, [query]);

  const albumResults = useMemo(() => {
    if (!query) return [];

    return albums.filter(
      (album) =>
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query)
    );
  }, [query]);

  const playlistResults = useMemo(() => {
    if (!query) return [];

    return playlists.filter(
      (playlist) =>
        playlist.title.toLowerCase().includes(query) ||
        playlist.description.toLowerCase().includes(query)
    );
  }, [query]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030505] pb-28 pt-16 text-white lg:ml-72">

      
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-green-500/[0.07] blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-180px] top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[130px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1550px] px-4 py-8 sm:px-8 lg:px-10">

        
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="mb-3 flex items-center gap-2 text-green-400">
            <Sparkles size={17} />

            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              Discover your sound
            </span>
          </div>

          <motion.h1
            whileHover={{
              x: 5,
              rotateX: 3,
              textShadow:
                "0 0 40px rgba(74,222,128,.25)",
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl"
          >
            Search
          </motion.h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            Find your favorite songs, artists, albums and
            playlists.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            rotateX: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          whileHover={{
            y: -4,
            rotateX: 2,
          }}
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="group relative my-10"
        >
          {/* Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500/20 via-transparent to-cyan-500/20 opacity-0 blur-xl transition duration-500 group-focus-within:opacity-100 group-hover:opacity-100" />

          <div
            className="relative flex h-16 items-center rounded-full border border-white/10 bg-zinc-900/90 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl"
            style={{
              transform: "translateZ(25px)",
            }}
          >
            <SearchIcon
              className="ml-5 shrink-0 text-zinc-500 transition group-focus-within:text-green-400"
              size={22}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to listen to?"
              className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm font-medium text-white outline-none placeholder:text-zinc-600 sm:text-base"
            />

            {search && (
              <motion.button
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={clearSearch}
                className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={17} />
              </motion.button>
            )}
          </div>
        </motion.div>

        
        {!query ? (
          <section>
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
                delay: 0.25,
              }}
              className="mb-6 flex items-end justify-between"
            >
              <div>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Browse Categories
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Start exploring your favorite vibes.
                </p>
              </div>

              <Music2
                size={25}
                className="hidden text-green-400 sm:block"
              />
            </motion.div>

            <div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
              style={{
                perspective: "1400px",
              }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{
                    opacity: 0,
                    y: 35,
                    rotateX: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    delay: 0.1 + index * 0.06,
                  }}
                  whileHover={{
                    y: -12,
                    rotateX: 7,
                    rotateY: index % 2 === 0 ? -7 : 7,
                    scale: 1.035,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 shadow-xl"
                >
                  {/* Image */}
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    whileHover={{
                      scale: 1.15,
                      rotateZ: 2,
                    }}
                    transition={spring}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Green hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-cyan-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      transform: "translateZ(35px)",
                    }}
                  >
                    <motion.div
                      whileHover={{
                        rotateY: 15,
                        scale: 1.1,
                      }}
                      className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-green-400 backdrop-blur-xl"
                    >
                      <Music2 size={17} />
                    </motion.div>

                    <h3 className="font-black">
                      {category.title}
                    </h3>
                  </div>

                  {/* Shine */}
                  <motion.div
                    animate={{
                      x: ["-150%", "160%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-white/10 blur-sm"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <div className="space-y-12">

       
            {songResults.length > 0 && (
              <section>
                <ResultHeading
                  icon={<Music2 size={18} />}
                  title="Songs"
                  count={songResults.length}
                />

                <div
                  className="space-y-2"
                  style={{
                    perspective: "1400px",
                  }}
                >
                  {songResults.map((song, index) => (
                    <motion.button
                      key={song.id}
                      type="button"
                      onClick={() => onPlay(song)}
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      whileHover={{
                        y: -5,
                        rotateX: 3,
                        rotateY:
                          index % 2 === 0 ? -2 : 2,
                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-transparent bg-white/[0.025] p-3 text-left transition hover:border-white/[0.08] hover:bg-white/[0.06] sm:gap-4 sm:p-4"
                    >
                      {/* Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/[0.08] to-transparent opacity-0 transition group-hover:opacity-100" />

                      {/* Number */}
                      <span
                        className="relative hidden w-7 text-center text-sm font-bold text-zinc-600 sm:block"
                        style={{
                          transform: "translateZ(20px)",
                        }}
                      >
                        {index + 1}
                      </span>

                      {/* Image */}
                      <div
                        className="relative shrink-0 overflow-hidden rounded-xl"
                        style={{
                          transform: "translateZ(30px)",
                        }}
                      >
                        <motion.img
                          src={song.image}
                          alt={song.title}
                          whileHover={{
                            scale: 1.12,
                          }}
                          transition={spring}
                          className="h-14 w-14 object-cover sm:h-16 sm:w-16"
                        />

                        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

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
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-400 text-black shadow-lg">
                            <Play
                              size={16}
                              fill="currentColor"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Details */}
                      <div
                        className="relative min-w-0 flex-1"
                        style={{
                          transform: "translateZ(25px)",
                        }}
                      >
                        <p className="truncate font-bold">
                          {song.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-zinc-500 sm:text-sm">
                          {song.artist} • {song.album}
                        </p>
                      </div>

                      {/* Duration */}
                      <span
                        className="relative hidden text-sm text-zinc-600 sm:block"
                        style={{
                          transform: "translateZ(20px)",
                        }}
                      >
                        {song.duration}
                      </span>

                      {/* Play */}
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotateZ: 5,
                        }}
                        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-green-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Play
                          size={15}
                          fill="currentColor"
                        />
                      </motion.div>

                      {/* Bottom line */}
                      <span className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-gradient-to-r from-green-400 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />
                    </motion.button>
                  ))}
                </div>
              </section>
            )}

           
            {artistResults.length > 0 && (
              <section>
                <ResultHeading
                  icon={<Disc3 size={18} />}
                  title="Artists"
                  count={artistResults.length}
                />

                <div
                  className="flex flex-wrap gap-5 sm:gap-7"
                  style={{
                    perspective: "1200px",
                  }}
                >
                  {artistResults.map((artist, index) => (
                    <motion.div
                      key={artist.id}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.07,
                      }}
                      whileHover={{
                        y: -12,
                        rotateX: 7,
                        rotateY: -8,
                        scale: 1.05,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="group w-[110px] text-center sm:w-[140px]"
                    >
                      <div className="relative mx-auto aspect-square overflow-hidden rounded-full border-2 border-white/5 bg-zinc-900 shadow-2xl">
                        <motion.img
                          src={artist.image}
                          alt={artist.name}
                          whileHover={{
                            scale: 1.12,
                          }}
                          transition={spring}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-black">
                            <Play
                              size={17}
                              fill="currentColor"
                            />
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 truncate text-sm font-bold">
                        {artist.name}
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                        Artist
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            
            {albumResults.length > 0 && (
              <section>
                <ResultHeading
                  icon={<Disc3 size={18} />}
                  title="Albums"
                  count={albumResults.length}
                />

                <div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  style={{
                    perspective: "1400px",
                  }}
                >
                  {albumResults.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      whileHover={{
                        y: -10,
                        rotateX: 5,
                        rotateY: -5,
                        scale: 1.025,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950 p-3 shadow-xl"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <motion.img
                          src={album.image}
                          alt={album.title}
                          whileHover={{
                            scale: 1.1,
                            rotateZ: 1,
                          }}
                          transition={spring}
                          className="aspect-square w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/30" />

                        <motion.button
                          whileHover={{
                            scale: 1.12,
                            y: -3,
                          }}
                          onClick={() => {
                            const song = songs.find(
                              (item) =>
                                item.album === album.title
                            );

                            onPlay(song || songs[0]);
                          }}
                          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black opacity-100 shadow-xl sm:opacity-0 sm:translate-y-3 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                        >
                          <Play
                            size={18}
                            fill="currentColor"
                          />
                        </motion.button>
                      </div>

                      <div
                        className="px-1 pt-3"
                        style={{
                          transform: "translateZ(25px)",
                        }}
                      >
                        <p className="truncate font-bold">
                          {album.title}
                        </p>

                        <p className="mt-1 truncate text-sm text-zinc-500">
                          {album.artist}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            
            {playlistResults.length > 0 && (
              <section>
                <ResultHeading
                  icon={<ListMusic size={18} />}
                  title="Playlists"
                  count={playlistResults.length}
                />

                <div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  style={{
                    perspective: "1400px",
                  }}
                >
                  {playlistResults.map((playlist, index) => (
                    <motion.div
                      key={playlist.id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      whileHover={{
                        y: -10,
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.025,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950 p-3 shadow-xl"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <motion.img
                          src={playlist.image}
                          alt={playlist.title}
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={spring}
                          className="aspect-square w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            rotateY: 10,
                          }}
                          className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-green-400 backdrop-blur-xl"
                        >
                          <ListMusic size={17} />
                        </motion.div>

                        <motion.button
                          whileHover={{
                            scale: 1.12,
                            y: -3,
                          }}
                          onClick={() =>
                            onPlay(
                              songs[playlist.id - 1] ||
                                songs[0]
                            )
                          }
                          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-400 text-black opacity-100 shadow-xl sm:opacity-0 sm:translate-y-3 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                        >
                          <Play
                            size={18}
                            fill="currentColor"
                          />
                        </motion.button>
                      </div>

                      <div
                        className="px-1 pt-3"
                        style={{
                          transform: "translateZ(25px)",
                        }}
                      >
                        <p className="truncate font-bold">
                          {playlist.title}
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                          {playlist.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

          
            {songResults.length === 0 &&
              artistResults.length === 0 &&
              albumResults.length === 0 &&
              playlistResults.length === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-zinc-950 px-6 py-24 text-center shadow-2xl"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-green-400/10 bg-green-400/[0.06] text-green-400"
                  >
                    <SearchIcon size={30} />
                  </motion.div>

                  <h2 className="text-xl font-black">
                    No results found
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Try searching for another song, artist,
                    album or playlist.
                  </p>
                </motion.div>
              )}
          </div>
        )}
      </div>
    </main>
  );
}


function ResultHeading({ icon, title, count }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mb-5 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-400/10 bg-green-400/[0.07] text-green-400">
          {icon}
        </div>

        <h2 className="text-xl font-black sm:text-2xl">
          {title}
        </h2>

        <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold text-zinc-500">
          {count}
        </span>
      </div>
    </motion.div>
  );
}