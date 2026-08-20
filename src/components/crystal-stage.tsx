import { lazy, Suspense, useEffect, useState } from "react";

const loadCanvas = () => import("./crystal-canvas");
const CrystalCanvas = lazy(loadCanvas);
if (typeof window !== "undefined") void loadCanvas();

export function CrystalFallback() {
  return (
    <div className="crystal-stage-fill grid place-items-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="crystal-fallback" />
        <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">
          Menyusun kristal
        </p>
      </div>
    </div>
  );
}

export function CrystalStage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <CrystalFallback />;
  return (
    <Suspense fallback={<CrystalFallback />}>
      <CrystalCanvas />
    </Suspense>
  );
}
