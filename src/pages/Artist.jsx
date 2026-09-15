import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  UserPlus,
  UserCheck,
  MoreHorizontal,
  Headphones,
  Heart,
  Disc3,
  Radio,
  Sparkles,
  Music2,
  BadgeCheck,
  Users,
  Mic2,
  Album,
  Maximize2,
} from "lucide-react";
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
  
  // Player state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);

  const artistName = artist?.name || "Popular Artist";
  const artistImage = artist?.image || songs[0]?.image;

  const artistSongs = useMemo(() => {
    const matched = songs.filter(
      (song) => song.artist?.toLowerCase() === artistName.toLowerCase()
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
    const albumTitles = new Set(artistAlbums.map((album) => album.title));
    const matchedSingles = artistSongs.filter(
      (song) => !albumTitles.has(song.album)
    );
    return (
      matchedSingles.length > 0 ? matchedSingles : artistSongs.slice(0, 4)
    ).slice(0, 4);
  }, [artistAlbums, artistSongs]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    onPlay?.(song);
  };

  const playArtist = () => {
    if (displayedSongs[0]) {
      handlePlaySong(displayedSongs[0]);
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
      (song) => song.album?.toLowerCase() === album.title?.toLowerCase()
    );
    handlePlaySong(albumSong || displayedSongs[0]);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = displayedSongs.findIndex((s) => s.id === currentSong.id);
    const nextSong = displayedSongs[(currentIndex + 1) % displayedSongs.length];
    handlePlaySong(nextSong);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const currentIndex = displayedSongs.findIndex((s) => s.id === currentSong.id);
    const prevSong =
      displayedSongs[
        (currentIndex - 1 + displayedSongs.length) % displayedSongs.length
      ];
    handlePlaySong(prevSong);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#020303] pb-36 pt-16 text-white lg:ml-72 lg:w-[calc(100vw-18rem)]">
      {/* Artist Hero Section */}
      <section className="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease }}
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
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[5%] top-[-180px] h-[500px] w-[500px] rounded-full bg-green-500/[0.08] blur-[140px]"
          />

          <motion.div
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["0%", "-8%", "0%"],
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-100px] top-[20%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.05] blur-[140px]"
          />
        </div>

        <div className="relative mx-auto max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 35, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080c0b]/90 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80" />

            <div className="relative z-10 flex flex-col lg:flex-row">
              {/* Artist Card Image Container */}
              <div className="relative flex shrink-0 items-center justify-center p-5 sm:p-7 lg:w-[390px] lg:p-8">
                <motion.div
                  whileHover={{ rotateY: -8, rotateX: 5, scale: 1.035 }}
                  transition={spring}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative z-10 aspect-square w-full max-w-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src={artistImage}
                    alt={artistName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-white/[0.08]" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
                    <BadgeCheck size={15} className="fill-green-400 text-black" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400">
                      Artist
                    </p>
                    <p className="mt-1 truncate text-lg font-black">
                      {artistName}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Artist Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-center px-5 pb-7 sm:px-7 sm:pb-8 lg:px-3 lg:py-10 lg:pr-10">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-400 sm:text-[11px]">
                    VibeWave Artist
                  </span>
                </div>

                <h1 className="max-w-4xl break-words text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                  {artistName}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                  Experience the sound, energy and unforgettable music of{" "}
                  {artistName}. Discover popular tracks, releases and your next
                  favorite vibe.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <motion.button
                    type="button"
                    onClick={playArtist}
                    whileHover={{ scale: 1.06, y: -4 }}
                    whileTap={{ scale: 0.94 }}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-green-400 px-7 py-3.5 font-bold text-black shadow-[0_15px_50px_rgba(34,197,94,0.25)]"
                  >
                    <Play size={17} fill="currentColor" />
                    <span>Play All</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => setFollowing((curr) => !curr)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 rounded-full border px-6 py-3.5 font-semibold backdrop-blur-xl transition-all ${
                      following
                        ? "border-green-400/40 bg-green-400/10 text-green-400"
                        : "border-white/10 bg-white/[0.04] text-white hover:border-green-400/30"
                    }`}
                  >
                    {following ? <UserCheck size={17} /> : <UserPlus size={17} />}
                    <span>{following ? "Following" : "Follow"}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Songs Section */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-green-400 sm:text-[11px]">
              <Sparkles size={13} /> Artist Collection
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">Popular Songs</h2>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {displayedSongs.map((song, index) => {
            const isLiked = likedSongs.includes(song.id);
            const isCurrentPlaying = currentSong?.id === song.id;

            return (
              <motion.article
                key={song.id}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => handlePlaySong(song)}
                className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors ${
                  isCurrentPlaying
                    ? "border-green-400/50 bg-[#0d1813]"
                    : "border-white/[0.06] bg-[#080b0a] hover:border-green-400/20 hover:bg-[#0c120f]"
                }`}
              >
                <span className="w-6 shrink-0 text-center text-xs font-black text-zinc-600 group-hover:text-green-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play size={16} fill="currentColor" className="text-green-400" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-sm font-bold ${
                      isCurrentPlaying ? "text-green-400" : "text-white"
                    }`}
                  >
                    {song.title}
                  </h3>
                  <p className="truncate text-xs text-zinc-500">{song.album}</p>
                </div>

                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isLiked
                      ? "text-green-400"
                      : "text-zinc-600 hover:text-green-400"
                  }`}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                </motion.button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* FIXED MUSIC PLAYER CARD */}
      <AnimatePresence>
        {currentSong && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed bottom-3 left-3 right-3 z-50 rounded-2xl border border-white/10 bg-[#080d0b]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:left-76 lg:right-6"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              {/* Song Info */}
              <div className="flex items-center gap-3 min-w-0 md:w-1/4">
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className="h-12 w-12 shrink-0 rounded-xl object-cover border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {currentSong.title}
                  </p>
                  <p className="truncate text-xs text-zinc-400">
                    {currentSong.artist || artistName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLike(currentSong.id)}
                  className="text-zinc-400 hover:text-green-400"
                >
                  <Heart
                    size={18}
                    fill={
                      likedSongs.includes(currentSong.id)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      likedSongs.includes(currentSong.id)
                        ? "text-green-400"
                        : ""
                    }
                  />
                </button>
              </div>

              {/* Player Controls & Timeline */}
              <div className="flex flex-col items-center gap-1.5 flex-1 max-w-xl">
                <div className="flex items-center gap-4">
                  <button
                    onClick={playPrev}
                    className="text-zinc-400 hover:text-white transition"
                  >
                    <SkipBack size={18} />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-black shadow-[0_0_20px_rgba(74,222,128,0.4)] transition hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={playNext}
                    className="text-zinc-400 hover:text-white transition"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex w-full items-center gap-2 text-[10px] text-zinc-400">
                  <span>1:20</span>
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setProgress(pos * 100);
                    }}
                    className="relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-green-400"
                    />
                  </div>
                  <span>{currentSong.duration || "3:45"}</span>
                </div>
              </div>

              {/* Extra Controls */}
              <div className="hidden items-center justify-end gap-3 md:flex md:w-1/4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-zinc-400 hover:text-white"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-zinc-400 ${isMuted ? "w-0" : "w-2/3"}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}