import { ChevronRight } from "lucide-react";

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        )}
      </div>

      <button className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white">
        Show all
        <ChevronRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}