import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

export default function MusicPlayer({ currentSong, playing, setPlaying }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [volume, setVolume] = useState(80);

  // Fallback track data matching your screenshot
  const song = currentSong || {
    title: "Kesariya",
    artist: "Arijit Singh",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80",
    currentTime: "0:42",
    duration: "4:28",
  };

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-between border-t border-white/10 bg-black px-4 text-white shadow-2xl sm:px-6">
      {/* Left: Song Details */}
      <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-zinc-900 border border-white/10">
          <img
            src={song.image}
            alt={song.title}
            className="h-full w-full object-cover"
          />
          {/* Animated Green Audio Badge */}
          <div className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
            <span className="flex h-2 w-2 items-center justify-between">
              <span className="h-full w-[1px] animate-pulse bg-black" />
              <span className="h-2/3 w-[1px] animate-ping bg-black" />
              <span className="h-full w-[1px] animate-pulse bg-black" />
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-bold text-white">{song.title}</h4>
          <p className="truncate text-xs text-zinc-400">{song.artist}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className={`shrink-0 transition hover:scale-110 ${
            isLiked ? "text-emerald-400" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Middle: Controls & Timeline */}
      <div className="flex flex-1 max-w-2xl flex-col items-center justify-center gap-1.5 px-4">
        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition ${
              isShuffle ? "text-emerald-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Shuffle size={16} />
          </button>

          <button
            type="button"
            className="text-zinc-400 transition hover:text-white"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>

          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.5)] transition hover:scale-105 active:scale-95"
          >
            {playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            className="text-zinc-400 transition hover:text-white"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>

          <button
            type="button"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition ${
              isRepeat ? "text-emerald-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full items-center gap-3 text-xs text-zinc-400">
          <span className="w-8 text-right font-mono text-[11px]">
            {song.currentTime || "0:42"}
          </span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
            className="group relative h-1 flex-1 cursor-pointer rounded-full bg-zinc-800"
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-emerald-400 transition-all group-hover:bg-emerald-300"
            />
          </div>
          <span className="w-8 text-left font-mono text-[11px]">
            {song.duration || "4:28"}
          </span>
        </div>
      </div>

      {/* Right: Volume & Music Icon */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[150px]">
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className="text-zinc-400 transition hover:text-white"
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Volume Slider Track */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newVol = (clickX / rect.width) * 100;
            setVolume(newVol);
            if (isMuted) setIsMuted(false);
          }}
          className="group relative h-1 w-24 cursor-pointer rounded-full bg-zinc-800"
        >
          <div
            style={{ width: `${isMuted ? 0 : volume}%` }}
            className="h-full rounded-full bg-emerald-400 transition-all group-hover:bg-emerald-300"
          />
        </div>

        <Music size={18} className="ml-2 text-emerald-400" />
      </div>
    </aside>
  );
}