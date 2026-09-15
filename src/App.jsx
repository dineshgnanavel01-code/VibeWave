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
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { playlists, artists } from "./data/musicData";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);

  const { user, logout } = useAuth();

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProfile = () => {
    setActive("Profile");
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSettings = () => {
    setActive("Settings");
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogin = () => {
    setActive("Login");
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSignup = () => {
    setActive("Signup");
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = () => {
    logout?.();

    setActive("Home");
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

          <div className="relative z-40">
            <TopBar
              setMobileOpen={setMobileOpen}
              search={search}
              setSearch={setSearch}
              onPlay={handlePlay}
              onNavigate={handleNavigation}
              onProfile={handleProfile}
              onSettings={handleSettings}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onLogout={handleLogout}
            />

            {/* HOME */}
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

            {/* SEARCH */}
            {active === "Search" && (
              <Search
                search={search}
                setSearch={setSearch}
                onPlay={handlePlay}
                onArtist={handleArtist}
                onPlaylist={handlePlaylist}
              />
            )}

            {/* PLAYLIST */}
            {active === "Playlist" && (
              <Playlist
                playlist={selectedPlaylist}
                onPlay={handlePlay}
              />
            )}

            {/* ARTIST */}
            {active === "Artist" && (
              <Artist
                artist={selectedArtist}
                onPlay={handlePlay}
              />
            )}

            {/* COLLECTION PAGES */}
            {isCollectionPage && (
              <CollectionPage
                active={active}
                onPlay={handlePlay}
                onArtist={handleArtist}
                onPlaylist={handlePlaylist}
              />
            )}

            {/* PROFILE */}
            {active === "Profile" && (
              <Profile
                user={user}
                onBack={() => handleNavigation("Home")}
                onSettings={handleSettings}
              />
            )}

            {/* SETTINGS */}
            {active === "Settings" && (
              <Settings
                user={user}
                onBack={handleProfile}
              />
            )}

            {/* LOGIN */}
            {active === "Login" && (
              <Login
                onLoginSuccess={() => {
                  setActive("Home");
                  setMobileOpen(false);
                }}
                onSignup={handleSignup}
                onBack={() => handleNavigation("Home")}
              />
            )}

            {/* SIGN UP */}
            {active === "Signup" && (
              <Signup
                onSignupSuccess={() => {
                  setActive("Home");
                  setMobileOpen(false);
                }}
                onLogin={handleLogin}
                onBack={() => handleNavigation("Home")}
              />
            )}

            <MusicPlayer
              currentSong={currentSong}
              playing={playing}
              setPlaying={setPlaying}
            />
          </div>
        </div>
      )}
    </>
  );
}