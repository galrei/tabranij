import { createFileRoute } from "@tanstack/react-router";
import { CrystalStage } from "@/components/crystal-stage";
import { Encyclopedia } from "@/components/encyclopedia";
import {
  AnatomyPanel,
  BrandPill,
  LabHint,
} from "@/components/lab-overlay";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <section
        id="lab"
        className="flex h-dvh min-h-[640px] flex-col overflow-hidden lg:flex-row"
      >
        <div className="relative min-h-0 flex-1">
          <CrystalStage />
          <SiteHeader />
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
