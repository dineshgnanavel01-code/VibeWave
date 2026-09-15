import { motion } from "framer-motion";
import {Play, Heart, MoreHorizontal,Music2,Clock3,Disc3, ListMusic, Flame,Sparkles,Mic2, Podcast,Library,} from "lucide-react";
import {songs,artists,albums,playlists,podcasts,} from "../data/musicData";

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export default function CollectionPage({
  active,
  onPlay,
  onArtist,
  onPlaylist,
}) {
  const getPageData = () => {
    switch (active) {
      case "Liked Songs":
        return {
          title: "Liked Songs",
          subtitle: "Your favorite songs in one place",
          icon: Heart,
          gradient: "from-pink-500 to-purple-600",
          type: "songs",
          data: songs.slice(0, 8),
        };

      case "Recently Played":
        return {
          title: "Recently Played",
          subtitle: "Pick up where you left off",
          icon: Clock3,
          gradient: "from-blue-500 to-cyan-500",
          type: "songs",
          data: songs.slice(0, 8),
        };

      case "My Playlist":
        return {
          title: "My Playlist",
          subtitle: "Your personal music collection",
          icon: ListMusic,
          gradient: "from-green-500 to-emerald-600",
          type: "playlists",
          data: playlists,
        };

      case "Albums":
        return {
          title: "Albums",
          subtitle: "Explore your favorite albums",
          icon: Disc3,
          gradient: "from-orange-500 to-red-500",
          type: "albums",
          data: albums,
        };

      case "Your Library":
        return {
          title: "Your Library",
          subtitle: "Everything you love, all in one place",
          icon: Library,
          gradient: "from-green-500 to-cyan-500",
          type: "songs",
          data: songs,
        };

      case "Trending Now":
        return {
          title: "Trending Now",
          subtitle: "The hottest music right now",
          icon: Flame,
          gradient: "from-orange-500 to-red-600",
          type: "songs",
          data: songs.slice(0, 10),
        };

      case "New Releases":
        return {
          title: "New Releases",
          subtitle: "Fresh music just for you",
          icon: Sparkles,
          gradient: "from-purple-500 to-pink-600",
          type: "songs",
          data: songs.slice(2, 10),
        };

      case "Popular Artists":
        return {
          title: "Popular Artists",
          subtitle: "Discover artists everyone is listening to",
          icon: Mic2,
          gradient: "from-cyan-500 to-blue-600",
          type: "artists",
          data: artists,
        };

      case "Podcasts":
        return {
          title: "Podcasts",
          subtitle: "Listen to interesting stories and conversations",
          icon: Podcast,
          gradient: "from-indigo-500 to-purple-600",
          type: "podcasts",
          data: podcasts,
        };

      case "Bollywood Hits":
        return {
          title: "Bollywood Hits",
          subtitle: "Best Hindi songs and Bollywood vibes",
          icon: Music2,
          gradient: "from-purple-500 to-pink-500",
          type: "songs",
          data: songs.filter(
            (song) =>
              song.language?.toLowerCase() === "hindi"
          ),
        };

      case "Tamil Trending":
        return {
          title: "Tamil Trending",
          subtitle: "Latest Tamil hits and trending songs",
          icon: Music2,
          gradient: "from-orange-500 to-red-500",
          type: "songs",
          data: songs.filter(
            (song) =>
              song.language?.toLowerCase() === "tamil"
          ),
        };

      case "Telugu Hits":
        return {
          title: "Telugu Hits",
          subtitle: "Popular Telugu songs",
          icon: Music2,
          gradient: "from-blue-500 to-cyan-500",
          type: "songs",
          data: songs.filter(
            (song) =>
              song.language?.toLowerCase() === "telugu"
          ),
        };

      case "Punjabi Vibes":
        return {
          title: "Punjabi Vibes",
          subtitle: "Feel the best Punjabi music",
          icon: Music2,
          gradient: "from-yellow-400 to-orange-500",
          type: "songs",
          data: songs.filter(
            (song) =>
              song.language?.toLowerCase() === "punjabi"
          ),
        };

      case "Romantic Vibes":
        return {
          title: "Romantic Vibes",
          subtitle: "Love songs for every mood",
          icon: Heart,
          gradient: "from-pink-500 to-rose-600",
          type: "songs",
          data: songs.filter(
            (song) =>
              song.category?.toLowerCase() === "romantic"
          ),
        };

      default:
        return {
          title: active,
          subtitle: "Explore your music",
          icon: Music2,
          gradient: "from-green-500 to-cyan-500",
          type: "songs",
          data: songs,
        };
    }
  };

  const page = getPageData();
  const Icon = page.icon;

  return (
    <main className="min-h-screen bg-black pb-32 pt-20 lg:ml-72">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 sm:p-10"
        >          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${page.gradient} blur-[100px]`}
          />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <motion.div
              whileHover={{
                rotateY: 12,
                rotateZ: -5,
                scale: 1.08,
              }}
              transition={spring}
              className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${page.gradient} shadow-2xl`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Icon
                size={52}
                strokeWidth={1.5}
                className="text-white"
              />
            </motion.div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-green-400">
                VibeWave Collection
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                {page.title}
              </h1>

              <p className="mt-3 max-w-xl text-sm text-zinc-500 sm:text-base">
                {page.subtitle}
              </p>

              <p className="mt-4 text-xs text-zinc-600">
                {page.data.length} items available
              </p>
            </div>
          </div>
        </motion.section>
        {page.type === "songs" && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Songs
              </h2>

              <button
                type="button"
                onClick={() => {
                  if (page.data.length > 0) {
                    onPlay?.(page.data[0]);
                  }
                }}
                className="flex items-center gap-2 rounded-full bg-green-400 px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-300"
              >
                <Play size={16} fill="currentColor" />
                Play All
              </button>
            </div>

            <div className="space-y-2">
              {page.data.map((song, index) => (
                <motion.div
                  key={`${song.title}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    scale: 1.01,
                    x: 4,
                  }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 transition hover:border-green-400/20 hover:bg-white/[0.06]"
                >
                  <div className="w-7 text-center text-xs text-zinc-600">
                    {index + 1}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => onPlay?.(song)}
                    whileHover={{ scale: 1.05 }}
                    className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                  >
                    <img
                      src={song.image}
                      alt={song.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/50">
                      <Play
                        size={18}
                        fill="white"
                        className="text-white opacity-0 transition group-hover:opacity-100"
                      />
                    </div>
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => onPlay?.(song)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm font-semibold text-white">
                      {song.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {song.artist}
                    </p>
                  </button>

                  <div className="hidden text-xs text-zinc-600 md:block">
                    {song.album}
                  </div>

                  <div className="hidden text-xs text-zinc-600 sm:block">
                    {song.language}
                  </div>

                  <button
                    type="button"
                    className="rounded-full p-2 text-zinc-600 transition hover:bg-white/10 hover:text-white"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {page.type === "artists" && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-white">
              Artists
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {page.data.map((artist, index) => (
                <motion.button
                  key={artist.name}
                  type="button"
                  onClick={() => onArtist?.(artist)}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                    rotateY: -4,
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4 text-left transition hover:border-green-400/20 hover:bg-white/[0.06]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-full">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
                      <div className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-green-400 text-black opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                        <Play size={18} fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <p className="truncate text-sm font-bold text-white">
                    {artist.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Artist
                  </p>
                </motion.button>
              ))}
            </div>
          </section>
        )}
        {page.type === "playlists" && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-white">
              Playlists
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {page.data.map((playlist, index) => (
                <motion.button
                  key={playlist.title}
                  type="button"
                  onClick={() => onPlaylist?.(playlist)}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                    rotateY: -4,
                    scale: 1.03,
                  }}
                  className="group rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 text-left transition hover:border-green-400/20 hover:bg-white/[0.06]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <img
                      src={playlist.image}
                      alt={playlist.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-green-400 text-black opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Play size={17} fill="currentColor" />
                    </div>
                  </div>

                  <p className="mt-3 truncate text-sm font-bold text-white">
                    {playlist.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {playlist.description || "VibeWave Playlist"}
                  </p>
                </motion.button>
              ))}
            </div>
          </section>
        )}
        {page.type === "albums" && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-white">
              Albums
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {page.data.map((album, index) => (
                <motion.button
                  key={album.title}
                  type="button"
                  onClick={() => {
                    const albumSong = songs.find(
                      (song) =>
                        song.album?.toLowerCase() ===
                        album.title?.toLowerCase()
                    );

                    if (albumSong) {
                      onPlay?.(albumSong);
                    }
                  }}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                    rotateY: -4,
                    scale: 1.03,
                  }}
                  className="group rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 text-left transition hover:border-green-400/20 hover:bg-white/[0.06]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                      <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-green-400 text-black opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                        <Play size={18} fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 truncate text-sm font-bold text-white">
                    {album.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {album.artist}
                  </p>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {page.type === "podcasts" && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-white">
              Podcasts
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.data.map((podcast, index) => (
                <motion.button
                  key={podcast.title}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] text-left transition hover:border-green-400/20"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-400 text-black">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-bold text-white">
                      {podcast.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {podcast.description ||
                        "VibeWave Podcast"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}