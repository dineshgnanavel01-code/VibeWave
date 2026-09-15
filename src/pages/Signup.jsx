import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Signup({
  onSignupSuccess,
  onLogin,
  onBack,
}) {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    login?.({
      name,
      email,
    });

    onSignupSuccess?.();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-24 pt-24 text-white">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="
          w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          p-6 shadow-2xl
          sm:p-8
        "
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
            <UserPlus
              size={25}
              className="text-cyan-400"
            />
          </div>

          <h1 className="text-3xl font-black">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Join VibeWave and start your music journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-xs font-semibold text-zinc-400">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
              <User
                size={17}
                className="text-zinc-500"
              />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                className="
                  h-12 w-full
                  bg-transparent px-3
                  text-sm outline-none
                  placeholder:text-zinc-700
                "
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-zinc-400">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
              <Mail
                size={17}
                className="text-zinc-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="
                  h-12 w-full
                  bg-transparent px-3
                  text-sm outline-none
                  placeholder:text-zinc-700
                "
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-zinc-400">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
              <Lock
                size={17}
                className="text-zinc-500"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                className="
                  h-12 w-full
                  bg-transparent px-3
                  text-sm outline-none
                  placeholder:text-zinc-700
                "
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              flex h-12 w-full
              items-center justify-center
              rounded-xl
              bg-gradient-to-r
              from-green-400
              to-cyan-400
              font-bold text-black
              transition
              hover:opacity-90
            "
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="font-bold text-green-400 hover:text-green-300"
          >
            Log In
          </button>
        </p>
      </motion.div>
    </main>
  );
}