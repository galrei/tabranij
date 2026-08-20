import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, TrendingUp } from "lucide-react";
import {
  ACRONYM_PARTS,
  ANATOMY,
  ANATOMY_BY_ID,
  HARGA_PARTS,
  PRESETS,
  TURUNAN_PARTS,
  derivedOf,
  seededSeries,
} from "@/lib/anatomy";
import { useTabranij } from "@/lib/tabranij-store";
import { Button } from "@/components/ui/button";
import { CandleGlyph, CandleStrip } from "@/components/candle-strip";
import { cn } from "@/lib/utils";

const SLIDER_MIN = 70;
const SLIDER_MAX = 145;

export function LabHint() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-4 sm:top-[4.5rem]">
      <p className="max-w-md text-center text-xs tracking-wide text-muted sm:text-sm">
        Cermin ilmiah anatomi lilin harga. Seret untuk memutar.
      </p>
    </div>
  );
}

export function BrandPill() {
  return (
    <div className="rounded-full bg-surface/80 px-5 py-2 shadow-[var(--shadow-border)]">
      <p className="font-display text-sm font-semibold tracking-[0.38em] text-primary">
        TABRANIJ
      </p>
    </div>
  );
}

export function AnatomyPanel() {
  const selected = useTabranij((s) => s.selected);
  const select = useTabranij((s) => s.select);
  const autoRotate = useTabranij((s) => s.autoRotate);
  const setAutoRotate = useTabranij((s) => s.setAutoRotate);
  const requestResetView = useTabranij((s) => s.requestResetView);
  const prices = useTabranij((s) => s.prices);
  const patchPrices = useTabranij((s) => s.patchPrices);
  const applyPrices = useTabranij((s) => s.applyPrices);
  const part = selected ? ANATOMY_BY_ID[selected] : null;
  const derived = derivedOf(prices);
  const series = useMemo(() => seededSeries(32, 42), []);
  const [activeCandle, setActiveCandle] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 8) {
        select(ACRONYM_PARTS[n - 1] ?? null);
      }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setAutoRotate(!useTabranij.getState().autoRotate);
      }
      if (e.key === "r" || e.key === "R") requestResetView();
      if (e.key === "Escape") select(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestResetView, select, setAutoRotate]);

  const derivedValue: Record<(typeof TURUNAN_PARTS)[number], number> = {
    atas: derived.atas,
    bawah: derived.bawah,
    neto: derived.neto,
    julat: derived.julat,
  };

  return (
    <div className="p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-display text-xs tracking-[0.22em] text-muted uppercase">
          Anatomi
        </p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={() => setAutoRotate(!autoRotate)}
            aria-label={autoRotate ? "Jeda putaran" : "Putar otomatis"}
          >
            {autoRotate ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={() => requestResetView()}
            aria-label="Reset kamera"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1">
        {ANATOMY.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => select(item.id)}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-medium",
              selected === item.id
                ? "bg-fg text-bg"
                : "bg-fg/5 text-muted hover:text-fg",
            )}
          >
            <span
              style={{ color: selected === item.id ? undefined : item.color }}
            >
              {item.letter}
            </span>
            <span className="hidden sm:inline">{item.name}</span>
          </button>
        ))}
      </div>

      {part ? (
        <article className="mb-4 rounded-lg bg-bg p-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className="font-display text-2xl font-semibold leading-none"
              style={{ color: part.color }}
            >
              {part.letter}
            </span>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              {part.name}
            </h2>
            <span className="text-xs tracking-wide text-muted uppercase">
              {part.en}
            </span>
          </div>
          <p className="mt-2 font-display text-xs tracking-wide text-primary">
            {part.formula}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fg/90">{part.detail}</p>
        </article>
      ) : (
        <p className="mb-4 text-sm text-muted">
          Ketuk label pada kristal atau pilih unsur TABRANIJ.
        </p>
      )}

      <div className="mb-3 flex items-center justify-between">
        <p className="font-display text-xs tracking-[0.22em] text-muted uppercase">
          Parameter TABRANIJ
        </p>
        <span className="inline-flex items-center gap-1 text-xs text-muted">
          <TrendingUp className="size-3.5" />
          {derived.naik ? "Naik" : "Turun"}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <CandleGlyph prices={prices} className="h-16 w-7 text-muted" />
        <div className="min-w-0 flex-1 space-y-2">
          {HARGA_PARTS.map((id) => {
            const item = ANATOMY_BY_ID[id];
            return (
              <PriceSlider
                key={id}
                label={item.name}
                color={item.color}
                value={prices[id]}
                onChange={(v) => patchPrices({ [id]: v })}
                onFocus={() => select(id)}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-1.5">
        {TURUNAN_PARTS.map((id) => {
          const item = ANATOMY_BY_ID[id];
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => select(id)}
              className={cn(
                "flex items-baseline justify-between gap-2 rounded-md px-2.5 py-2 text-left",
                active ? "bg-fg/10" : "bg-fg/5 hover:bg-fg/8",
              )}
            >
              <span className="flex items-baseline gap-1.5">
                <span
                  className="font-display text-sm font-semibold"
                  style={{ color: item.color }}
                >
                  {item.letter}
                </span>
                <span className="text-xs text-muted">{item.name}</span>
              </span>
              <span className="font-display text-xs tabular-nums text-fg">
                {derivedValue[id].toFixed(1)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              applyPrices(p.prices);
              setActiveCandle(null);
            }}
            className="h-8 rounded-full bg-fg/5 px-2.5 text-xs text-muted hover:text-fg"
            title={p.hint}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="mb-2 font-display text-xs tracking-[0.22em] text-muted uppercase">
        Seri harga
      </p>
      <CandleStrip
        candles={series}
        activeIndex={activeCandle}
        onPick={(c, i) => {
          applyPrices(c);
          setActiveCandle(i);
        }}
      />
    </div>
  );
}

function PriceSlider({
  label,
  color,
  value,
  onChange,
  onFocus,
}: {
  label: string;
  color: string;
  value: number;
  onChange: (v: number) => void;
  onFocus: () => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-xs font-medium" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerDown={onFocus}
        className="min-w-0 flex-1"
        aria-label={label}
      />
      <span className="w-12 text-right font-display text-xs tabular-nums text-fg">
        {value.toFixed(1)}
      </span>
    </label>
  );
}
