import { CrystalMark } from "@/components/crystal-mark";
import { CrystalStage } from "@/components/crystal-stage";
import { Encyclopedia } from "@/components/encyclopedia";
import {
  AnatomyPanel,
  BrandPill,
  LabHint,
} from "@/components/lab-overlay";

export function PagesApp() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <section
        id="lab"
        className="flex h-dvh min-h-[640px] flex-col overflow-hidden lg:flex-row"
      >
        <div className="relative min-h-0 flex-1">
          <CrystalStage />
          <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <a
              href="#lab"
              className="pointer-events-auto flex items-center gap-2 text-fg"
            >
              <CrystalMark className="size-7 text-primary" />
              <span className="font-display text-lg font-semibold tracking-[0.22em]">
                TABRANIJ
              </span>
            </a>
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
              <a
                href="https://github.com/galrei/tabranij"
                className="inline-flex h-9 items-center rounded-md px-3 text-sm text-muted hover:text-fg"
              >
                Sumber
              </a>
            </nav>
          </header>
          <LabHint />
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
            <BrandPill />
          </div>
        </div>
        <aside className="relative z-20 max-h-[44vh] overflow-y-auto border-t border-border bg-surface lg:h-full lg:max-h-none lg:w-[360px] lg:shrink-0 lg:border-t-0 lg:border-l">
          <AnatomyPanel />
        </aside>
      </section>
      <Encyclopedia />
    </main>
  );
}
