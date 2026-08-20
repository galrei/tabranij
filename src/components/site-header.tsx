import { Link } from "@tanstack/react-router";
import { AuthSlot } from "@/components/auth-slot";
import { CrystalMark } from "@/components/crystal-mark";

export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <Link
        to="/"
        className="pointer-events-auto flex items-center gap-2 text-fg"
      >
        <CrystalMark className="size-7 text-primary" />
        <span className="font-display text-lg font-semibold tracking-[0.22em]">
          TABRANIJ
        </span>
      </Link>
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2">
        <a
          href="#lab"
          className="hidden h-9 items-center rounded-md px-3 text-sm text-muted hover:text-fg sm:inline-flex"
        >
          Lab
        </a>
        <a
          href="#anatomi"
          className="hidden h-9 items-center rounded-md px-3 text-sm text-muted hover:text-fg sm:inline-flex"
        >
          Anatomi
        </a>
        <AuthSlot />
      </nav>
    </header>
  );
}
