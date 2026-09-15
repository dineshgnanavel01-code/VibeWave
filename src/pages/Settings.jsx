import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Lock,
  Palette,
  User,
} from "lucide-react";

export default function Settings({ user, onBack }) {
  return (
    <main className="min-h-screen bg-black px-4 pb-32 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={onBack}
          className="
            mb-6 flex items-center gap-2
            text-sm text-zinc-400
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
          Back to Profile
        </button>

        <h1 className="text-3xl font-black">
          Settings
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your VibeWave account and preferences.
        </p>

        <div className="mt-8 space-y-3">
          {[
            {
              icon: User,
              title: "Account",
              description:
                user?.email || "Manage your account information",
            },
            {
              icon: Bell,
              title: "Notifications",
              description:
                "Manage music and playlist notifications",
            },
            {
              icon: Palette,
              title: "Appearance",
              description:
                "Customize your VibeWave experience",
            },
            {
              icon: Lock,
              title: "Privacy & Security",
              description:
                "Manage your privacy and security",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 5,
                }}
                className="
                  flex w-full items-center
                  gap-4 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-5 text-left
                  hover:border-green-400/20
                  hover:bg-white/[0.05]
                "
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10">
                  <Icon
                    size={20}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <p className="font-bold">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}