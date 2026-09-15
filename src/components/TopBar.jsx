import { useEffect, useMemo, useRef, useState } from "react";
import {Menu, Search, Bell,User,Settings,LogOut,X,Play,Sparkles,ChevronRight,Music2,Headphones,Radio,Waves,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { songs } from "../data/musicData";

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 18,
};

export default function TopBar({
  setMobileOpen,
  search,
  setSearch,
  onPlay,
}) {
  const [focused, setFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationRef = useRef(null)

  const results = useMemo(() => {
    const query = (search || "").trim().toLowerCase();

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
      .slice(0, 10);
  }, [search]);
  useEffect(() => {
    const closeDropdowns = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeDropdowns
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        const input =
          searchRef.current?.querySelector("input");

        input?.focus();
        setFocused(true);
      }

      if (event.key === "Escape") {
        setFocused(false);
        setProfileOpen(false);
        setNotificationOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, []);

  const playSong = (song) => {
    if (!song) return;

    onPlay?.(song);
    setFocused(false);
  };

  const clearSearch = () => {
    setSearch("");

    requestAnimationFrame(() => {
      searchRef.current
        ?.querySelector("input")
        ?.focus();
    });
  };

  return (
    <header
      className="
        fixed left-0 right-0 top-0 z-50
        h-16
        border-b border-white/[0.06]
        bg-black/75
        px-2
        backdrop-blur-2xl
        sm:px-4
        lg:left-72
        lg:px-6
      "
      style={{
        perspective: "1400px",
      }}
    >
<motion.div
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-0
          h-16
          w-72
          rounded-full
          bg-green-400/5
          blur-3xl
        "
        animate={{
          x: [0, 80, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[15%]
          top-0
          h-16
          w-60
          rounded-full
          bg-cyan-400/5
          blur-3xl
        "
        animate={{
          x: [0, -60, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="
          relative
          flex h-full
          items-center
          gap-2
          sm:gap-3
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <motion.button
            type="button"
            onClick={() => setMobileOpen(true)}
            whileHover={{
              scale: 1.08,
              rotateY: -10,
              rotateX: 5,
              z: 20,
            }}
            whileTap={{
              scale: 0.9,
            }}
            transition={spring}
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              overflow-hidden
              rounded-xl
              border border-white/10
              bg-white/[0.04]
              text-zinc-300
              shadow-lg
              hover:border-green-400/30
              hover:bg-green-400/10
              hover:text-green-400
            "
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
              "
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />

            <Menu
              size={21}
              className="relative z-10"
            />
          </motion.button>


          <motion.button
            type="button"
            onClick={() => {
              setSearch("");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            whileHover={{
              scale: 1.03,
              rotateY: -5,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="group flex items-center gap-2"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              whileHover={{
                rotateY: 20,
                rotateX: -10,
                scale: 1.08,
              }}
              transition={spring}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="
                  absolute inset-0
                  rounded-xl
                  bg-green-400/30
                  blur-md
                "
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />


              <div
                className="
                  relative
                  flex h-9 w-9
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-br
                  from-green-400
                  via-cyan-400
                  to-blue-500
                  text-lg
                  shadow-[0_8px_25px_rgba(34,197,94,0.25)]
                "
              >
                <span className="relative z-10">
                  🎵
                </span>

                <motion.div
                  className="
                    absolute
                    -left-10
                    top-0
                    h-full
                    w-8
                    rotate-12
                    bg-white/40
                    blur-sm
                  "
                  animate={{
                    x: [0, 80],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </div>
            </motion.div>

            <div className="hidden text-left min-[400px]:block">
              <h1
                className="
                  bg-gradient-to-r
                  from-green-400
                  via-cyan-400
                  to-blue-400
                  bg-clip-text
                  text-base
                  font-black
                  leading-none
                  text-transparent
                "
              >
                VibeWave
              </h1>

              <p className="mt-1 text-[6px] font-medium uppercase tracking-[2px] text-zinc-500">
                Music Everywhere
              </p>
            </div>
          </motion.button>
        </div>

       
        <motion.div
          ref={searchRef}
          className="relative min-w-0 flex-1"
          style={{
            transformStyle: "preserve-3d",
          }}
        >

          <AnimatePresence>
            {focused && (
              <>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -inset-3
                    rounded-3xl
                    bg-green-400/10
                    blur-2xl
                  "
                />

                <motion.div
                  className="
                    pointer-events-none
                    absolute
                    -inset-[1px]
                    rounded-2xl
                    border border-green-400/20
                  "
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </>
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{
              y: -1,
              rotateX: 2,
              scale: 1.005,
            }}
            animate={{
              rotateX: focused ? 1.5 : 0,
            }}
            transition={spring}
            className={`
              relative
              flex h-11
              items-center
              overflow-hidden
              rounded-2xl
              border
              transition-all
              duration-300
              ${
                focused
                  ? "border-green-400/40 bg-zinc-900/95 shadow-[0_15px_45px_rgba(34,197,94,0.12)]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
              }
            `}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="
                pointer-events-none
                absolute
                -left-20
                top-0
                h-full
                w-16
                rotate-12
                bg-white/[0.08]
                blur-md
              "
              animate={{
                x: ["0%", "900%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
            <motion.div
              animate={{
                rotate: focused ? -8 : 0,
                scale: focused ? 1.1 : 1,
              }}
              className="relative z-10 ml-4"
            >
              <Search
                size={18}
                className={
                  focused
                    ? "text-green-400"
                    : "text-zinc-500"
                }
              />
            </motion.div>


            <input
              type="text"
              value={search ?? ""}
              onChange={(e) => {
                setSearch(e.target.value);
                setFocused(true);
              }}
              onFocus={() => setFocused(true)}
              placeholder="Search songs, artists, albums..."
              className="
                relative z-10
                h-full
                min-w-0
                flex-1
                bg-transparent
                px-3
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
              "
            />
            {!search && (
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                }}
                className="
                  relative z-10
                  mr-3
                  hidden
                  items-center
                  gap-1
                  rounded-lg
                  border border-white/10
                  bg-white/[0.04]
                  px-2
                  py-1
                  text-[10px]
                  text-zinc-600
                  md:flex
                "
              >
                <span>⌘</span>
                <span>K</span>
              </motion.div>
            )}

            {search && (
              <motion.button
                initial={{
                  scale: 0,
                  rotate: -90,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                type="button"
                onClick={clearSearch}
                className="
                  relative z-10
                  mr-2
                  flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  text-zinc-500
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X size={16} />
              </motion.button>
            )}
          </motion.div>

          <AnimatePresence>
            {focused && search.trim() && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.94,
                  rotateX: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                  rotateX: -5,
                }}
                transition={spring}
                className="
                  absolute
                  left-0
                  right-0
                  top-[50px]
                  z-50
                  max-h-[430px]
                  overflow-y-auto
                  rounded-2xl
                  border border-white/10
                  bg-[#080a0b]/95
                  p-2
                  shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                  backdrop-blur-2xl
                "
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                }}
              >

                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Sparkles
                        size={13}
                        className="text-green-400"
                      />
                    </motion.div>

                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-zinc-500">
                      Search Results
                    </span>
                  </div>

                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[9px] text-zinc-600">
                    {results.length} found
                  </span>
                </div>


                {results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((song, index) => (
                      <motion.button
                        key={song.id}
                        initial={{
                          opacity: 0,
                          x: -15,
                          rotateY: -8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          rotateY: 0,
                        }}
                        transition={{
                          delay: index * 0.035,
                          ...spring,
                        }}
                        whileHover={{
                          x: 5,
                          scale: 1.015,
                          rotateY: -2,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        type="button"
                        onClick={() => playSong(song)}
                        className="
                          group
                          relative
                          flex w-full
                          items-center
                          gap-3
                          overflow-hidden
                          rounded-xl
                          p-2
                          text-left
                          transition
                          hover:bg-white/[0.07]
                        "
                        style={{
                          transformStyle: "preserve-3d",
                          perspective: "900px",
                        }}
                      >

                        <motion.div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-green-400/10
                            via-transparent
                            to-cyan-400/5
                            opacity-0
                          "
                          whileHover={{
                            opacity: 1,
                          }}
                        />

                        

                        <motion.div
                          whileHover={{
                            rotateY: 12,
                            rotateX: -5,
                            scale: 1.08,
                            z: 25,
                          }}
                          transition={spring}
                          className="
                            relative
                            z-10
                            shrink-0
                          "
                          style={{
                            transformStyle:
                              "preserve-3d",
                          }}
                        >
                          <img
                            src={song.image}
                            alt={song.title}
                            className="
                              h-12 w-12
                              rounded-xl
                              object-cover
                              shadow-lg
                            "
                          />

                          <div
                            className="
                              absolute inset-0
                              flex items-center
                              justify-center
                              rounded-xl
                              bg-black/65
                              opacity-0
                              transition
                              group-hover:opacity-100
                            "
                          >
                            <Play
                              size={17}
                              fill="currentColor"
                            />
                          </div>
                        </motion.div>

                        <div className="relative z-10 min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {song.title}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-zinc-500">
                            {song.artist}
                          </p>

                          <div className="mt-1 flex items-center gap-1">
                            <span className="rounded-md bg-green-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-green-400">
                              {song.language}
                            </span>

                            <span className="truncate text-[9px] text-zinc-600">
                              {song.album}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{
                            rotateY: 15,
                            rotateX: -8,
                            scale: 1.12,
                            z: 30,
                          }}
                          transition={spring}
                          className="
                            relative z-10
                            flex h-9 w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border border-white/10
                            bg-white/[0.04]
                            text-zinc-500
                            shadow-lg
                            transition
                            group-hover:border-green-400/30
                            group-hover:bg-green-400
                            group-hover:text-black
                          "
                          style={{
                            transformStyle:
                              "preserve-3d",
                          }}
                        >
                          <Play
                            size={14}
                            fill="currentColor"
                          />
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="px-5 py-10 text-center"
                  >
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        rotateY: [0, 8, -8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="
                        mx-auto mb-3
                        flex h-14 w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-green-400/10
                        to-cyan-400/10
                        text-zinc-600
                      "
                    >
                      <Music2 size={24} />
                    </motion.div>

                    <p className="text-sm font-semibold text-zinc-300">
                      No music found
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Try another song, artist or album
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        
          <div
            ref={notificationRef}
            className="relative hidden sm:block"
          >
            <motion.button
              type="button"
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              whileHover={{
                scale: 1.08,
                rotateY: -8,
                rotateX: 5,
                y: -2,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={spring}
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-white/10
                bg-white/[0.04]
                text-zinc-400
                shadow-lg
                hover:border-green-400/30
                hover:bg-green-400/10
                hover:text-white
              "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, -8, 8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              >
                <Bell size={18} />
              </motion.div>

              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  right-2
                  top-2
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-400
                  shadow-[0_0_8px_rgba(74,222,128,0.9)]
                "
              />
            </motion.button>
            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.9,
                    rotateX: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.94,
                  }}
                  transition={spring}
                  className="
                    absolute
                    right-0
                    top-12
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-[#080a0b]/95
                    p-3
                    shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                    backdrop-blur-2xl
                  "
                  style={{
                    transformOrigin: "top right",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between px-2">
                    <p className="text-sm font-bold text-white">
                      Notifications
                    </p>

                    <span className="rounded-full bg-green-400/10 px-2 py-1 text-[9px] font-bold text-green-400">
                      2 NEW
                    </span>
                  </div>

                  <div className="space-y-1">
                    {[
                      {
                        icon: Headphones,
                        color: "text-green-400",
                        bg: "bg-green-400/10",
                        title: "New music is here",
                        text: "Check out the latest releases.",
                      },
                      {
                        icon: Sparkles,
                        color: "text-cyan-400",
                        bg: "bg-cyan-400/10",
                        title: "Your playlist is ready",
                        text: "Discover songs picked for you.",
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.title}
                          initial={{
                            opacity: 0,
                            x: 15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.08,
                          }}
                          whileHover={{
                            x: 4,
                            scale: 1.02,
                          }}
                          className="
                            flex gap-3
                            rounded-xl
                            p-3
                            hover:bg-white/5
                          "
                        >
                          <div
                            className={`
                              flex h-9 w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${item.bg}
                            `}
                          >
                            <Icon
                              size={17}
                              className={item.color}
                            />
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-white">
                              {item.title}
                            </p>

                            <p className="mt-1 text-[10px] text-zinc-500">
                              {item.text}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            ref={profileRef}
            className="relative"
          >
            <motion.button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              whileHover={{
                scale: 1.03,
                rotateY: -4,
                y: -1,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={spring}
              className="
                group
                flex items-center gap-2
                rounded-xl
                border border-transparent
                p-1
                hover:border-white/10
                hover:bg-white/[0.05]
              "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                whileHover={{
                  rotateY: 18,
                  rotateX: -8,
                  rotateZ: -3,
                  scale: 1.08,
                  z: 20,
                }}
                transition={spring}
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="
                    absolute
                    -inset-1
                    rounded-full
                    bg-gradient-to-r
                    from-green-400
                    via-cyan-400
                    to-blue-500
                    opacity-0
                    blur-md
                  "
                  whileHover={{
                    opacity: 0.6,
                  }}
                />

                <div
                  className="
                    relative
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-green-400
                    via-cyan-400
                    to-blue-500
                    text-[11px]
                    font-black
                    text-black
                    shadow-lg
                  "
                >
                  DG
                </div>

                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-2.5
                    w-2.5
                    rounded-full
                    border-2
                    border-black
                    bg-green-400
                  "
                />
              </motion.div>

              <div className="hidden text-left lg:block">
                <p className="text-xs font-bold text-white">
                  John Doe
                </p>

                <p className="text-[9px] text-green-400">
                  Premium Member
                </p>
              </div>

              <motion.div
                animate={{
                  rotate: profileOpen ? 90 : 0,
                }}
              >
                <ChevronRight
                  size={14}
                  className="hidden text-zinc-600 lg:block"
                />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.9,
                    rotateX: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.94,
                  }}
                  transition={spring}
                  className="
                    absolute
                    right-0
                    top-12
                    w-64
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-[#080a0b]/95
                    shadow-[0_30px_80px_rgba(0,0,0,0.7)]
                    backdrop-blur-2xl
                  "
                  style={{
                    transformOrigin: "top right",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="
                      relative
                      overflow-hidden
                      border-b border-white/10
                      p-4
                    "
                  >
                    <motion.div
                      className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        bg-green-400/10
                        blur-2xl
                      "
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />

                    <div className="relative flex items-center gap-3">
                      <motion.div
                        whileHover={{
                          rotateY: 20,
                          scale: 1.1,
                        }}
                        className="
                          flex h-11 w-11
                          items-center justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-green-400
                          via-cyan-400
                          to-blue-500
                          font-black
                          text-black
                        "
                      >
                        DG
                      </motion.div>

                      <div>
                        <p className="font-bold text-white">
                          Dinesh G
                        </p>

                        <p className="mt-0.5 text-[10px] text-zinc-500">
                          vibewave@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  

                  <div className="p-2">
                    {[
                      {
                        icon: User,
                        text: "View Profile",
                      },
                      {
                        icon: Settings,
                        text: "Settings",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <motion.button
                          key={item.text}
                          type="button"
                          whileHover={{
                            x: 5,
                            scale: 1.02,
                          }}
                          transition={spring}
                          className="
                            flex w-full
                            items-center gap-3
                            rounded-xl
                            px-3 py-2.5
                            text-sm
                            text-zinc-300
                            hover:bg-white/[0.07]
                            hover:text-white
                          "
                        >
                          <Icon size={17} />
                          {item.text}
                        </motion.button>
                      );
                    })}

                    <div className="my-1 border-t border-white/10" />

                    <motion.button
                      type="button"
                      whileHover={{
                        x: 5,
                        scale: 1.02,
                      }}
                      className="
                        flex w-full
                        items-center gap-3
                        rounded-xl
                        px-3 py-2.5
                        text-sm
                        text-red-400
                        hover:bg-red-500/10
                      "
                    >
                      <LogOut size={17} />
                      Log out
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}