import { cn } from "@/lib/utils";
import type { Prices } from "@/lib/anatomy";

export function CandleGlyph({
  prices,
  className,
}: {
  prices: Prices;
  className?: string;
}) {
  const span = Math.max(prices.tinggi - prices.rendah, 0.01);
  const y = (price: number) => ((prices.tinggi - price) / span) * 100;
  const top = Math.max(prices.awal, prices.inti);
  const bot = Math.min(prices.awal, prices.inti);
  const bullish = prices.inti >= prices.awal;
  return (
    <svg viewBox="0 0 40 100" className={className} aria-hidden="true">
      <line
        x1="20"
        x2="20"
        y1={y(prices.tinggi)}
        y2={y(prices.rendah)}
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="11"
        y={y(top)}
        width="18"
        height={Math.max(y(bot) - y(top), 2)}
        fill={bullish ? "#4ec8ff" : "#ff5a3c"}
      />
    </svg>
  );
}

export function CandleStrip({
  candles,
  activeIndex,
  onPick,
}: {
  candles: Prices[];
  activeIndex: number | null;
  onPick: (c: Prices, i: number) => void;
}) {
  const lo = Math.min(...candles.map((c) => c.rendah));
  const hi = Math.max(...candles.map((c) => c.tinggi));
  const span = Math.max(hi - lo, 0.01);
  const h = 64;
  const y = (price: number) => ((hi - price) / span) * (h - 8) + 4;

  return (
    <div className="flex w-full gap-px overflow-x-auto pb-1">
      {candles.map((c, i) => {
        const top = Math.max(c.awal, c.inti);
        const bot = Math.min(c.awal, c.inti);
        const bullish = c.inti >= c.awal;
        const active = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onPick(c, i)}
            className={cn(
              "relative h-16 w-3.5 shrink-0 rounded-sm",
              active ? "bg-fg/8" : "hover:bg-fg/5",
            )}
            aria-label={`Lilin ${i + 1}`}
          >
            <svg viewBox={`0 0 14 ${h}`} className="h-full w-full">
              <line
                x1="7"
                x2="7"
                y1={y(c.tinggi)}
                y2={y(c.rendah)}
                stroke="#8b97b8"
                strokeWidth="1.2"
              />
              <rect
                x="3"
                y={y(top)}
                width="8"
                height={Math.max(y(bot) - y(top), 1.5)}
                fill={bullish ? "#4ec8ff" : "#ff5a3c"}
                opacity={active ? 1 : 0.75}
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
