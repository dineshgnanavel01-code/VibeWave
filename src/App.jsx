import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import CollectionPage from "./pages/CollectionPage";

import { playlists, artists } from "./data/musicData";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (song) => {
    if (!song) return;

    setCurrentSong(song);
    setPlaying(true);
  };

  const handlePlaylist = (playlist) => {
    if (!playlist) return;

    setSelectedPlaylist(playlist);
    setActive("Playlist");
    setMobileOpen(false);
  };

  const handleArtist = (artist) => {
    if (!artist) return;

    setSelectedArtist(artist);
    setActive("Artist");
    setMobileOpen(false);
  };

  const handleNavigation = (page) => {
    setActive(page);
    setMobileOpen(false);
  };

  const collectionPages = [
    "Your Library",
    "Liked Songs",
    "Recently Played",
    "My Playlist",
    "Albums",
    "Trending Now",
    "New Releases",
    "Popular Artists",
    "Podcasts",
    "Bollywood Hits",
    "Tamil Trending",
    "Telugu Hits",
    "Punjabi Vibes",
    "Romantic Vibes",
  ];

  const isCollectionPage = collectionPages.includes(active);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-white">
          <Sidebar
            active={active}
            setActive={handleNavigation}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <TopBar
            setMobileOpen={setMobileOpen}
            search={search}
            setSearch={setSearch}
            onPlay={handlePlay}
          />

          {active === "Home" && (
            <Home
              onPlay={handlePlay}
              onExplore={() => {
                setActive("Search");
                setSearch("");
                setMobileOpen(false);
              }}
              onPlaylist={handlePlaylist}
              onArtist={handleArtist}
            />
          )}

          {active === "Search" && (
            <Search
              search={search}
              setSearch={setSearch}
              onPlay={handlePlay}
              onArtist={handleArtist}
              onPlaylist={handlePlaylist}
            />
          )}

          {active === "Playlist" && (
            <Playlist
              playlist={selectedPlaylist}
              onPlay={handlePlay}
            />
          )}

          {active === "Artist" && (
            <Artist
              artist={selectedArtist}
              onPlay={handlePlay}
            />
          )}

          {isCollectionPage && (
            <CollectionPage
              active={active}
              onPlay={handlePlay}
              onArtist={handleArtist}
              onPlaylist={handlePlaylist}
            />
          )}

          <MusicPlayer
            currentSong={currentSong}
            playing={playing}
            setPlaying={setPlaying}
          />
        </div>
      )}
    </>
  );
}