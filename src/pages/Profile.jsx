import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  User,
  Settings,
  Music,
  Heart,
  Clock3,
  Disc3,
} from "lucide-react";

export default function Profile({ user, onBack, onSettings }) {
  const name = user?.name || "vibewave";
  const email = user?.email || "guest@vibewave.com";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "VW";

  const stats = [
    {
      icon: Music,
      value: "128",
      label: "Songs Played",
    },
    {
      icon: Heart,
      value: "42",
      label: "Liked Songs",
    },
    {
      icon: Clock3,
      value: "18h",
      label: "Listening Time",
    },
    {
      icon: Disc3,
      value: "12",
      label: "Playlists",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-4 pb-32 pt-24 text-white sm:px-6 lg:pl-72 lg:pr-8">
      <div className="mx-auto max-w-6xl">
        {/* BACK */}
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to VibeWave
        </motion.button>

        {/* PROFILE HERO */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-green-400/10 via-zinc-900 to-cyan-400/10 p-6 sm:p-10"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 via-cyan-400 to-blue-500 text-2xl font-black text-black shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                {initials}
              </div>

              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-green-400">
                  My Profile
                </p>

                <h1 className="text-3xl font-black sm:text-4xl">{name}</h1>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Mail size={15} />
                    {email}
                  </span>
                </div>

                <span className="mt-3 inline-flex rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-400">
                  Premium Member
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onSettings}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-green-400/30 hover:bg-green-400/10 hover:text-white"
            >
              <Settings size={17} />
              Account Settings
            </button>
          </div>
        </motion.section>

        {/* STATS */}
        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-green-400/20"
              >
                <Icon size={20} className="mb-4 text-green-400" />

                <p className="text-2xl font-black">{stat.value}</p>

                <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </section>

        {/* ACCOUNT INFORMATION */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Account Information</h2>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-4 border-b border-white/10 p-5">
              <User className="text-green-400" size={20} />

              <div>
                <p className="text-xs text-zinc-500">Full Name</p>

                <p className="mt-1 font-semibold">{name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <Mail className="text-cyan-400" size={20} />

              <div>
                <p className="text-xs text-zinc-500">Email Address</p>

                <p className="mt-1 font-semibold">{email}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}