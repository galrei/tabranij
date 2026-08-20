import { ANATOMY, ACRONYM_PARTS } from "@/lib/anatomy";
import { useTabranij } from "@/lib/tabranij-store";
import { cn } from "@/lib/utils";

export function Encyclopedia() {
  const select = useTabranij((s) => s.select);
  const selected = useTabranij((s) => s.selected);

  return (
    <section id="anatomi" className="relative z-10 bg-bg px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-xs tracking-[0.28em] text-primary uppercase">
          Delapan unsur
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          TABRANIJ adalah anatomi lengkap satu lilin harga.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Empat harga bebas — Tinggi, Awal, Inti, Rendah — membentuk empat
          turunan: Atas, Bawah, Neto, Julat. Neto adalah tubuh kristal yang
          lahir dari Awal dan Inti. Inti adalah harga kini dan harga penutupan.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {ANATOMY.map((part, i) => (
            <li key={part.id}>
              <button
                type="button"
                onClick={() => {
                  select(part.id);
                  document.getElementById("lab")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={cn(
                  "flex h-full w-full flex-col rounded-xl bg-surface p-5 text-left shadow-[var(--shadow-border)] transition-shadow duration-150",
                  selected === part.id
                    ? "shadow-[var(--shadow-border-hover)]"
                    : "hover:shadow-[var(--shadow-border-hover)]",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-display text-3xl font-semibold leading-none"
                    style={{ color: part.color }}
                  >
                    {part.letter}
                  </span>
                  <span className="font-display text-xs tabular-nums tracking-[0.2em] text-muted">
                    {String(i + 1).padStart(2, "0")} · {part.en}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {part.name}
                </h3>
                <p className="mt-1 font-display text-xs tracking-wide text-primary">
                  {part.formula}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {part.summary}
                </p>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-14 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <img
            src="/tabranij-source.jpg"
            alt="Diagram sumber TABRANIJ: kristal harga dengan label Tinggi, Atas, Inti, Neto, Awal, Bawah, Rendah, dan Julat."
            className="mx-auto max-h-[420px] w-full object-contain outline outline-1 -outline-offset-1 outline-fg/10"
          />
        </div>

        <div className="mt-8 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <h3 className="font-display text-lg font-semibold">
            Empat harga, empat turunan
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Parameter TABRANIJ bukan OHLC. Tinggi, Awal, Inti, dan Rendah
            adalah harga yang diukur. Atas, Bawah, Neto, dan Julat dihitung
            dari keempatnya. Neto adalah tubuh — selisih Awal dan Inti — bukan
            harga penutupan.
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Tinggi", "Harga tertinggi periode"],
              ["Atas", "max(Awal, Inti) — tepi atas Neto"],
              ["Bawah", "min(Awal, Inti) — tepi bawah Neto"],
              ["Rendah", "Harga terendah periode"],
              ["Awal", "Harga pembuka"],
              ["Neto", "Tubuh = |Inti − Awal|"],
              ["Inti", "Harga kini / harga penutupan"],
              ["Julat", "Tinggi − Rendah"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <dt className="font-display text-sm font-medium text-fg">{k}</dt>
                <dd className="text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-sm tracking-[0.28em] text-primary">
            {ACRONYM_PARTS.map((id) => ANATOMY.find((p) => p.id === id)?.letter).join(
              " ",
            )}
          </p>
          <p className="text-xs text-muted">
            Model kristal harga · TABRANIJ
          </p>
        </footer>
      </div>
    </section>
  );
}
