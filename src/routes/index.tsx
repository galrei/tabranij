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
      <section id="lab" className="lab-shell">
        <div className="lab-stage">
          <CrystalStage />
          <SiteHeader />
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
