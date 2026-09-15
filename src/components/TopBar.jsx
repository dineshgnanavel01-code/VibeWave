import { useEffect, useMemo, useRef, useState } from "react";

import {
  Menu,
  Search,
  Bell,
  User,
  Settings as SettingsIcon,
  LogOut,
  X,
  Play,
  Sparkles,
  ChevronRight,
  Music2,
  Headphones,
  LogIn,
  UserPlus,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { songs } from "../data/musicData";

import { useAuth } from "../context/AuthContext";

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
  onNavigate,
  onProfile,
  onSettings,
  onLogin,
  onSignup,
  onLogout,
}) {
  const { user, logout } = useAuth();

  const [focused, setFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "VW";

  const goProfile = () => {
    setProfileOpen(false);
    onProfile?.();
  };

  const goSettings = () => {
    setProfileOpen(false);
    onSettings?.();
  };

  const goLogin = () => {
    setProfileOpen(false);
    onLogin?.();
  };

  const goSignup = () => {
    setProfileOpen(false);
    onSignup?.();
  };

  const handleLogout = () => {
    setProfileOpen(false);

    if (onLogout) {
      onLogout();
    } else {
      logout?.();
    }
  };

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
      document.removeEventListener("mousedown", closeDropdowns);
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
      document.removeEventListener("keydown", handleKeyboard);
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
      style={{ perspective: "1400px" }}
    >
      {/* Background Glow */}
      <motion.div
        className="
          pointer-events-none
          absolute left-[15%] top-0
          h-16 w-72 rounded-full
          bg-green-400/5 blur-3xl
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
          absolute right-[15%] top-0
          h-16 w-60 rounded-full
          bg-cyan-400/5 blur-3xl
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
          relative flex h-full
          items-center gap-2 sm:gap-3
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Mobile Menu */}
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <motion.button
            type="button"
            onClick={() => setMobileOpen(true)}
            whileHover={{
              scale: 1.08,
              rotateY: -10,
              rotateX: 5,
            }}
            whileTap={{ scale: 0.9 }}
            transition={spring}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-white/10
              bg-white/[0.04]
              text-zinc-300
              hover:border-green-400/30
              hover:bg-green-400/10
              hover:text-green-400
            "
          >
            <Menu size={21} />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              setSearch("");
              onNavigate?.("Home");
            }}
            className="group flex items-center gap-2"
          >
            <div
              className="
                flex h-9 w-9 items-center
                justify-center rounded-xl
                bg-gradient-to-br
                from-green-400
                via-cyan-400
                to-blue-500
                text-lg
              "
            >
              🎵
            </div>

            <div className="hidden text-left min-[400px]:block">
              <h1
                className="
                  bg-gradient-to-r
                  from-green-400 via-cyan-400 to-blue-400
                  bg-clip-text
                  text-base font-black
                  text-transparent
                "
              >
                VibeWave
              </h1>

              <p className="text-[6px] font-medium uppercase tracking-[2px] text-zinc-500">
                Music Everywhere
              </p>
            </div>
          </motion.button>
        </div>

        {/* SEARCH */}
        <motion.div
          ref={searchRef}
          className="relative min-w-0 flex-1"
        >
          <motion.div
            animate={{
              rotateX: focused ? 1.5 : 0,
            }}
            transition={spring}
            className={`
              relative flex h-11 items-center
              overflow-hidden rounded-2xl border
              ${
                focused
                  ? "border-green-400/40 bg-zinc-900/95 shadow-[0_15px_45px_rgba(34,197,94,0.12)]"
                  : "border-white/10 bg-white/[0.04]"
              }
            `}
          >
            <div className="ml-4">
              <Search
                size={18}
                className={
                  focused
                    ? "text-green-400"
                    : "text-zinc-500"
                }
              />
            </div>

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
                h-full min-w-0 flex-1
                bg-transparent px-3
                text-sm text-white
                outline-none
                placeholder:text-zinc-600
              "
            />

            {!search && (
              <div
                className="
                  mr-3 hidden items-center gap-1
                  rounded-lg border border-white/10
                  bg-white/[0.04]
                  px-2 py-1
                  text-[10px] text-zinc-600
                  md:flex
                "
              >
                <span>⌘</span>
                <span>K</span>
              </div>
            )}

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="
                  mr-2 flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  text-zinc-500
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X size={16} />
              </button>
            )}
          </motion.div>

          {/* SEARCH RESULTS */}
          <AnimatePresence>
            {focused && search.trim() && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                }}
                className="
                  absolute left-0 right-0 top-[50px]
                  z-50 max-h-[430px]
                  overflow-y-auto rounded-2xl
                  border border-white/10
                  bg-[#080a0b]/95
                  p-2
                  shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                  backdrop-blur-2xl
                "
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={13}
                      className="text-green-400"
                    />

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
                    {results.map((song) => (
                      <motion.button
                        key={song.id}
                        type="button"
                        onClick={() => playSong(song)}
                        whileHover={{
                          x: 5,
                          scale: 1.015,
                        }}
                        className="
                          group flex w-full
                          items-center gap-3
                          rounded-xl p-2
                          text-left
                          hover:bg-white/[0.07]
                        "
                      >
                        <div className="relative shrink-0">
                          <img
                            src={song.image}
                            alt={song.title}
                            className="
                              h-12 w-12 rounded-xl
                              object-cover
                            "
                          />

                          <div
                            className="
                              absolute inset-0
                              flex items-center justify-center
                              rounded-xl
                              bg-black/65
                              opacity-0
                              group-hover:opacity-100
                            "
                          >
                            <Play
                              size={17}
                              fill="currentColor"
                            />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {song.title}
                          </p>

                          <p className="truncate text-xs text-zinc-500">
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

                        <div
                          className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-full
                            border border-white/10
                            bg-white/[0.04]
                            text-zinc-500
                            group-hover:bg-green-400
                            group-hover:text-black
                          "
                        >
                          <Play
                            size={14}
                            fill="currentColor"
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-10 text-center">
                    <Music2
                      size={24}
                      className="mx-auto mb-3 text-zinc-600"
                    />

                    <p className="text-sm font-semibold text-zinc-300">
                      No music found
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Try another song, artist or album
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT CONTROLS */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">

          {/* Notifications */}
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
              }}
              whileTap={{ scale: 0.9 }}
              className="
                relative flex h-10 w-10
                items-center justify-center
                rounded-xl border border-white/10
                bg-white/[0.04]
                text-zinc-400
                hover:border-green-400/30
                hover:text-white
              "
            >
              <Bell size={18} />

              <span
                className="
                  absolute right-2 top-2
                  h-1.5 w-1.5
                  rounded-full bg-green-400
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
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.94,
                  }}
                  className="
                    absolute right-0 top-12
                    w-72 rounded-2xl
                    border border-white/10
                    bg-[#080a0b]/95
                    p-3
                    shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                    backdrop-blur-2xl
                  "
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
                    <div className="flex gap-3 rounded-xl p-3 hover:bg-white/5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/10">
                        <Headphones
                          size={17}
                          className="text-green-400"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white">
                          New music is here
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-500">
                          Check out the latest releases.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl p-3 hover:bg-white/5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                        <Sparkles
                          size={17}
                          className="text-cyan-400"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white">
                          Your playlist is ready
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-500">
                          Discover songs picked for you.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              whileHover={{
                scale: 1.03,
                rotateY: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                group flex items-center gap-2
                rounded-xl border border-transparent
                p-1
                hover:border-white/10
                hover:bg-white/[0.05]
              "
            >
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-green-400
                  via-cyan-400
                  to-blue-500
                  text-[11px]
                  font-black
                  text-blackhttps://vibe-wave-six.vercel.app/
                "
              >
                {initials}
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-xs font-bold text-white">
                  {user?.name || "vibewave"}
                </p>

                <p className="text-[9px] text-green-400">
                  {user ? "Premium Member" : "Guest"}
                </p>
              </div>

              <ChevronRight
                size={14}
                className={`
                  hidden text-zinc-600 transition
                  lg:block
                  ${profileOpen ? "rotate-90" : ""}
                `}
              />
            </motion.button>

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.94,
                  }}
                  transition={spring}
                  className="
                    absolute right-0 top-12
                    w-64 overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-[#080a0b]/95
                    shadow-[0_30px_80px_rgba(0,0,0,0.7)]
                    backdrop-blur-2xl
                  "
                >
                  {/* CLICKABLE PROFILE HEADER */}
                  <button
                    type="button"
                    onClick={goProfile}
                    className="
                      relative w-full
                      border-b border-white/10
                      p-4 text-left
                      transition
                      hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
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
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-white">
                          {user?.name || "VibeWave"}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-zinc-500">
                          {user?.email || "Guest Account"}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="p-2">
                    {/* PROFILE */}
                    <motion.button
                      type="button"
                      onClick={goProfile}
                      whileHover={{
                        x: 5,
                        scale: 1.02,
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm font-medium
                        text-zinc-300
                        hover:bg-white/[0.07]
                        hover:text-white
                      "
                    >
                      <User size={17} />
                      View Profile
                    </motion.button>

                    {/* SETTINGS */}
                    <motion.button
                      type="button"
                      onClick={goSettings}
                      whileHover={{
                        x: 5,
                        scale: 1.02,
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm font-medium
                        text-zinc-300
                        hover:bg-white/[0.07]
                        hover:text-white
                      "
                    >
                      <SettingsIcon size={17} />
                      Settings
                    </motion.button>

                    <div className="my-1 border-t border-white/10" />

                    {!user ? (
                      <>
                        {/* LOGIN */}
                        <motion.button
                          type="button"
                          onClick={goLogin}
                          whileHover={{
                            x: 5,
                            scale: 1.02,
                          }}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            text-emerald-400
                            hover:bg-emerald-400/10
                          "
                        >
                          <LogIn size={17} />
                          Log In
                        </motion.button>

                        {/* SIGN UP */}
                        <motion.button
                          type="button"
                          onClick={goSignup}
                          whileHover={{
                            x: 5,
                            scale: 1.02,
                          }}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            text-cyan-400
                            hover:bg-cyan-400/10
                          "
                        >
                          <UserPlus size={17} />
                          Sign Up
                        </motion.button>
                      </>
                    ) : (
                      <>
                        {/* LOGOUT */}
                        <motion.button
                          type="button"
                          onClick={handleLogout}
                          whileHover={{
                            x: 5,
                            scale: 1.02,
                          }}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            text-red-400
                            hover:bg-red-500/10
                          "
                        >
                          <LogOut size={17} />
                          Log out
                        </motion.button>
                      </>
                    )}
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