import { motion, AnimatePresence } from "framer-motion";
import { Home,Search, Library, Heart,Clock3,Disc3,ListMusic, Flame,Sparkles,Mic2,Podcast,Settings, X, Music2,ChevronRight,Plus, Crown, Headphones,Radio, Waves,Play,Volume2,MoreHorizontal,Download,} from "lucide-react";

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export default function Sidebar({active,setActive,mobileOpen,setMobileOpen,onNavigate,
}) {
  const mainItems = [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Your Library", icon: Library },
  ];

  const libraryItems = [
    { name: "Liked Songs", icon: Heart, count: 128 },
    { name: "Recently Played", icon: Clock3, count: 24 },
    { name: "My Playlist", icon: ListMusic, count: 12 },
    { name: "Albums", icon: Disc3, count: 36 },
  ];

  const discoverItems = [
    { name: "Trending Now", icon: Flame },
    { name: "New Releases", icon: Sparkles },
    { name: "Popular Artists", icon: Mic2 },
    { name: "Podcasts", icon: Podcast },
  ];

  const collections = [
    {
      name: "Bollywood Hits",
      subtitle: "Hindi • 30 songs",
      emoji: "🇮🇳",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      name: "Tamil Trending",
      subtitle: "Tamil • 25 songs",
      emoji: "🎵",
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
    {
      name: "Telugu Hits",
      subtitle: "Telugu • 28 songs",
      emoji: "🎧",
      gradient: "from-blue-500 via-cyan-500 to-teal-400",
    },
    {
      name: "Punjabi Vibes",
      subtitle: "Punjabi • 22 songs",
      emoji: "🔥",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
    },
    {
      name: "Romantic Vibes",
      subtitle: "Love • 40 songs",
      emoji: "💕",
      gradient: "from-pink-500 via-rose-500 to-purple-500",
    },
  ];

  const handleNavigation = (name) => {
    setActive(name);
    setMobileOpen(false);

    if (onNavigate) {
      onNavigate(name);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const Equalizer = () => (
    <div className="ml-auto flex h-4 items-end gap-[2px]">
      {[0, 1, 2, 3].map((bar) => (
        <motion.span
          key={bar}
          animate={{
            height: ["25%", "100%", "45%", "80%", "25%"],
          }}
          transition={{
            duration: 0.8 + bar * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[3px] rounded-full bg-gradient-to-t from-green-400 to-cyan-300"
        />
      ))}
    </div>
  );

  const renderMenuItem = (item, compact = false) => {
    const Icon = item.icon;
    const isActive = active === item.name;

    return (
      <motion.button
        key={item.name}
        type="button"
        onClick={() => handleNavigation(item.name)}
        whileHover={{
          x: 5,
          scale: 1.015,
          rotateY: -2,
        }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        className={`
          group relative flex w-full items-center overflow-hidden
          rounded-xl text-left
          ${compact ? "gap-3 px-3 py-2.5" : "gap-4 px-4 py-3.5"}
          ${
            isActive
              ? "bg-gradient-to-r from-green-500/15 via-cyan-400/5 to-transparent text-white"
              : "text-zinc-400 hover:bg-white/[0.055] hover:text-white"
          }
        `}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {isActive && (
          <>
            <motion.div
              layoutId="sidebar-active"
              className="
                absolute inset-y-1 left-0 w-[3px]
                rounded-r-full
                bg-gradient-to-b
                from-green-300
                via-cyan-400
                to-blue-500
                shadow-[0_0_15px_rgba(34,197,94,0.9)]
              "
              transition={spring}
            />

            <motion.div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-r
                from-green-400/10
                via-cyan-400/5
                to-transparent
              "
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </>
        )}

        <motion.div
          className="
            pointer-events-none absolute -left-20 top-0
            h-full w-16
            rotate-12
            bg-white/10 blur-md
          "
          whileHover={{
            x: 300,
            transition: { duration: 0.6 },
          }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: isActive ? 0 : -8,
            scale: 1.18,
            z: 20,
          }}
          transition={spring}
          className="relative z-10 shrink-0"
        >
          <Icon
            size={compact ? 18 : 21}
            strokeWidth={isActive ? 2.5 : 2}
            className={`
              transition-colors duration-300
              ${
                isActive
                  ? "text-green-400 drop-shadow-[0_0_7px_rgba(74,222,128,0.6)]"
                  : "text-zinc-500 group-hover:text-cyan-300"
              }
            `}
          />
        </motion.div>

        <span
          className={`
            relative z-10 min-w-0 flex-1 truncate
            ${compact ? "text-sm" : "font-medium"}
          `}
        >
          {item.name}
        </span>

        {isActive ? (
          <Equalizer />
        ) : item.count !== undefined ? (
          <motion.span
            whileHover={{ scale: 1.15 }}
            className="
              relative z-10 ml-auto shrink-0
              rounded-full bg-white/[0.04]
              px-2 py-0.5
              text-[9px] text-zinc-600
              group-hover:bg-green-400/10
              group-hover:text-green-400
            "
          >
            {item.count}
          </motion.span>
        ) : null}
      </motion.button>
    );
  };

  return (
    <>
     
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="
              fixed inset-0 z-40
              bg-black/75
              backdrop-blur-md
              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      

      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          overflow-hidden
          border-r border-white/[0.07]
          bg-[#060808]/95
          shadow-[20px_0_80px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="
            pointer-events-none absolute
            -left-24 top-20
            h-64 w-64
            rounded-full
            bg-green-500/10
            blur-[100px]
          "
          animate={{
            x: [0, 35, 0],
            y: [0, 25, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            pointer-events-none absolute
            -right-24 bottom-32
            h-60 w-60
            rounded-full
            bg-cyan-500/10
            blur-[100px]
          "
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="
            relative z-20 hidden shrink-0
            border-b border-white/[0.06]
            bg-black/20
            px-5 py-4
            lg:flex lg:items-center lg:justify-between
          "
        >
          <motion.button
            type="button"
            onClick={() => handleNavigation("Home")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group text-left"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotateY: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-green-400
                  via-cyan-400
                  to-blue-500
                  shadow-[0_0_25px_rgba(34,197,94,0.25)]
                "
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Headphones size={21} className="relative z-10 text-black" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-white/30"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <div>
                <h1 className="bg-gradient-to-r from-green-300 via-cyan-300 to-blue-400 bg-clip-text text-lg font-black text-transparent">
                  VibeWave
                </h1>
                <p className="text-[8px] uppercase tracking-[2px] text-zinc-600">
                  Music Everywhere
                </p>
              </div>
            </div>
          </motion.button>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400/10 text-green-400"
          >
            <Radio size={13} />
          </motion.div>
        </div>

        
        <div
          className="
            relative z-20 flex shrink-0
            items-center justify-between
            border-b border-white/[0.06]
            bg-black/30
            px-5 py-3
            lg:hidden
          "
        >
          <button
            type="button"
            onClick={() => handleNavigation("Home")}
            className="flex items-center gap-2 text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-cyan-400">
              <Headphones size={17} className="text-black" />
            </div>
            <span className="font-black text-white">VibeWave</span>
          </button>

          <motion.button
            type="button"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(false)}
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </motion.button>
        </div>

       
        <div className="sidebar-scroll relative z-10 flex-1 overflow-y-auto overflow-x-hidden py-4">
          <div className="px-3">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">
              Navigation
            </p>
            <nav className="space-y-1">
              {mainItems.map((item) => renderMenuItem(item))}
            </nav>
          </div>

          <section className="mt-7 px-3">
            <div className="mb-2 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <Library size={15} className="text-green-400/70" />
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">
                  Library
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                title="Create Playlist"
                className="rounded-full p-1.5 text-zinc-600 hover:bg-green-400/10 hover:text-green-400"
              >
                <Plus size={16} />
              </motion.button>
            </div>

            <div className="space-y-1">
              {libraryItems.map((item) => renderMenuItem(item, true))}
            </div>
          </section>

          <section className="mt-7 border-t border-white/[0.06] px-3 pt-6">
            <div className="mb-2 px-3">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">
                <Waves size={13} className="text-cyan-400" />
                Discover
              </p>
            </div>

            <div className="space-y-1">
              {discoverItems.map((item) => renderMenuItem(item, true))}
            </div>
          </section>

          <section className="mt-7 border-t border-white/[0.06] px-3 pt-6">
            <div className="mb-3 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <Music2 size={15} className="text-purple-400" />
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-600">
                  Collections
                </p>
              </div>

              <ChevronRight size={14} className="text-zinc-700" />
            </div>

            <div className="space-y-2">
              {collections.map((collection, index) => {
                const isActive = active === collection.name;

                return (
                  <motion.button
                    key={collection.name}
                    type="button"
                    onClick={() => handleNavigation(collection.name)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, scale: 1.02, rotateY: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      group relative flex w-full items-center gap-3 overflow-hidden rounded-xl p-2 text-left
                      ${isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.045]"}
                    `}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "800px",
                    }}
                  >
                    <motion.div
                      className="absolute -left-16 top-0 h-full w-12 rotate-12 bg-white/10 blur-md"
                      whileHover={{ x: 260, transition: { duration: 0.6 } }}
                    />

                    <motion.div
                      whileHover={{
                        rotateZ: -5,
                        rotateY: 12,
                        scale: 1.12,
                        z: 20,
                      }}
                      transition={spring}
                      className={`
                        relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                        bg-gradient-to-br ${collection.gradient} text-lg shadow-lg
                      `}
                    >
                      {collection.emoji}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg border border-white/40"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    <div className="relative z-10 min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-medium ${
                          isActive
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {collection.name}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-zinc-600">
                        {collection.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      size={13}
                      className="relative z-10 shrink-0 text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section className="mt-7 px-3 pb-5">
            <motion.div
              whileHover={{ y: -3, scale: 1.015, rotateX: 2 }}
              transition={spring}
              className="
                group relative overflow-hidden rounded-2xl border border-white/[0.07]
                bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-green-950/30 p-3 shadow-lg
              "
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-green-400/10 blur-2xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400/10 text-green-400"
                >
                  <Download size={17} />
                </motion.div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-200">
                    VibeWave App
                  </p>
                  <p className="truncate text-[10px] text-zinc-600">
                    Listen anywhere
                  </p>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(74,222,128,0.08)",
                }}
                whileTap={{ scale: 0.96 }}
                className="
                  relative z-10 mt-3 w-full overflow-hidden rounded-lg border
                  border-green-400/10 py-2 text-xs font-medium text-zinc-400
                  transition hover:border-green-400/30 hover:text-green-300
                "
              >
                <span className="relative z-10">Get the App</span>
                <motion.span
                  className="absolute inset-y-0 -left-10 w-10 rotate-12 bg-white/10 blur-sm"
                  whileHover={{ x: 220, transition: { duration: 0.5 } }}
                />
              </motion.button>
            </motion.div>
          </section>
        </div>
        <div className="relative z-20 shrink-0 border-t border-white/[0.07] bg-black/40 px-3 pb-4 pt-3 backdrop-blur-xl">
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.025] p-2"
          >
            <motion.div
              className="absolute -left-5 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-purple-500/20 blur-xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              whileHover={{ rotateY: 15, rotateZ: -4, scale: 1.08 }}
              transition={spring}
              className="
                relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 font-bold
                text-white shadow-[0_0_18px_rgba(168,85,247,0.25)]
              "
              style={{ transformStyle: "preserve-3d" }}
            >
              DG
              <motion.div
                className="absolute inset-0 rounded-full border border-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <div className="relative z-10 min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="truncate text-xs font-semibold text-white">
                  Dinesh G
                </p>
                <Crown
                  size={11}
                  className="shrink-0 text-yellow-400"
                  fill="currentColor"
                />
              </div>

              <p className="truncate text-[10px] text-zinc-600">
                Free Account
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.15, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 rounded-lg p-2 text-zinc-600 transition hover:bg-green-400/10 hover:text-green-400"
            >
              <Settings size={16} />
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}