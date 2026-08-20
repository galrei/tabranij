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
      <section id="lab" className="lab-shell">
        <div className="lab-stage">
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
              <span className="rounded-full bg-primary/15 px-2 py-0.5 font-sans text-[10px] tracking-normal text-primary">
                lab 3D
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
        <aside className="lab-panel">
          <AnatomyPanel />
        </aside>
      </section>
      <Encyclopedia />
    </main>
  );
}
