export type PartId =
  | "tinggi"
  | "atas"
  | "bawah"
  | "rendah"
  | "awal"
  | "neto"
  | "inti"
  | "julat";

/** Empat harga bebas TABRANIJ. Atas, Bawah, Neto, Julat dihitung dari sini. */
export type Prices = {
  tinggi: number;
  awal: number;
  inti: number;
  rendah: number;
};

export type Derived = {
  atas: number;
  bawah: number;
  neto: number;
  julat: number;
  naik: boolean;
};

export type AnatomyPart = {
  id: PartId;
  letter: string;
  name: string;
  en: string;
  acronymIndex: number;
  color: string;
  formula: string;
  summary: string;
  detail: string;
  kind: "harga" | "turunan";
};

export const ANATOMY: AnatomyPart[] = [
  {
    id: "tinggi",
    letter: "T",
    name: "Tinggi",
    en: "High",
    acronymIndex: 0,
    color: "#3b9eff",
    formula: "max(harga dalam periode)",
    kind: "harga",
    summary: "Ujung atas sumbu — harga tertinggi yang tercapai.",
    detail:
      "Tinggi adalah puncak julat. Pada kristal, ia duduk di bola biru di ujung sumbu atas. Semua tekanan beli dalam periode itu tercatat di sini, meski Inti tidak menutup di titik ini.",
  },
  {
    id: "atas",
    letter: "A",
    name: "Atas",
    en: "Top",
    acronymIndex: 1,
    color: "#dce7ff",
    formula: "max(Awal, Inti)",
    kind: "turunan",
    summary: "Puncak tubuh Neto — tepi atas kristal.",
    detail:
      "Atas adalah tepi atas tubuh Neto. Jika Inti ≥ Awal, Atas = Inti. Jika Inti < Awal, Atas = Awal. Ia memisahkan tubuh kristal dari sumbu menuju Tinggi.",
  },
  {
    id: "bawah",
    letter: "B",
    name: "Bawah",
    en: "Bottom",
    acronymIndex: 2,
    color: "#9aa8c7",
    formula: "min(Awal, Inti)",
    kind: "turunan",
    summary: "Dasar tubuh Neto — tepi bawah kristal.",
    detail:
      "Bawah adalah tepi bawah tubuh Neto. Lawan dari Atas. Jika Inti ≥ Awal, Bawah = Awal. Jika Inti < Awal, Bawah = Inti. Sumbu menuju Rendah tumbuh dari sini.",
  },
  {
    id: "rendah",
    letter: "R",
    name: "Rendah",
    en: "Low",
    acronymIndex: 3,
    color: "#ff5a3c",
    formula: "min(harga dalam periode)",
    kind: "harga",
    summary: "Ujung bawah sumbu — harga terendah yang tercapai.",
    detail:
      "Rendah adalah dasar julat. Pada kristal, ia duduk di bola merah-oranye di ujung sumbu bawah. Semua tekanan jual dalam periode itu tercatat di sini.",
  },
  {
    id: "awal",
    letter: "A",
    name: "Awal",
    en: "Open",
    acronymIndex: 4,
    color: "#2ee6a8",
    formula: "harga pembuka periode",
    kind: "harga",
    summary: "Harga saat periode dimulai — pintu masuk kristal.",
    detail:
      "Awal adalah harga pembuka. Bersama Inti, ia membentuk tubuh Neto. Pada lilin naik, Awal menempel di Bawah. Pada lilin turun, Awal menempel di Atas. Panah hijau menandai sisi buka.",
  },
  {
    id: "neto",
    letter: "N",
    name: "Neto",
    en: "Body",
    acronymIndex: 5,
    color: "#4ec8ff",
    formula: "|Inti − Awal|",
    kind: "turunan",
    summary: "Tubuh kristal — terbentuk dari harga Awal dan harga Inti.",
    detail:
      "Neto adalah tubuh kristal, bukan sebuah harga. Ia terbentuk dari dua harga: Awal (pembuka) dan Inti (kini / penutupan). Tingginya adalah selisih mutlak keduanya. Kristal membesar ketika selisih itu lebar, dan merosot menjadi doji ketika Awal ≈ Inti.",
  },
  {
    id: "inti",
    letter: "I",
    name: "Inti",
    en: "Close / Last",
    acronymIndex: 6,
    color: "#6d8cff",
    formula: "harga kini / harga penutupan",
    kind: "harga",
    summary: "Harga saat ini dan harga akhir periode.",
    detail:
      "Inti adalah harga kini sekaligus harga penutupan. Ia menutup tubuh Neto bersama Awal. Pada lilin naik, Inti menempel di Atas. Pada lilin turun, Inti menempel di Bawah. Panah biru pada diagram menandai sisi tutup.",
  },
  {
    id: "julat",
    letter: "J",
    name: "Julat",
    en: "Range",
    acronymIndex: 7,
    color: "#5ce1ff",
    formula: "Tinggi − Rendah",
    kind: "turunan",
    summary: "Seluruh tinggi kristal — amplitudo periode.",
    detail:
      "Julat adalah jarak dari Rendah ke Tinggi. Kurung bercahaya di kiri diagram mengukur keseluruhan batang. Julat lebar berarti volatilitas tinggi; julat sempit berarti pasar tenang.",
  },
];

export const ANATOMY_BY_ID = Object.fromEntries(
  ANATOMY.map((p) => [p.id, p]),
) as Record<PartId, AnatomyPart>;

export const ACRONYM = ["T", "A", "B", "R", "A", "N", "I", "J"] as const;

export const ACRONYM_PARTS: PartId[] = [
  "tinggi",
  "atas",
  "bawah",
  "rendah",
  "awal",
  "neto",
  "inti",
  "julat",
];

export const HARGA_PARTS: Array<keyof Prices> = [
  "tinggi",
  "awal",
  "inti",
  "rendah",
];

export const TURUNAN_PARTS = ["atas", "bawah", "neto", "julat"] as const;

export const DEFAULT_PRICES: Prices = {
  tinggi: 118.6,
  awal: 104.2,
  inti: 114.8,
  rendah: 96.4,
};

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function sanitizePrices(raw: Prices): Prices {
  const awal = round2(raw.awal);
  const inti = round2(raw.inti);
  const tinggi = round2(Math.max(raw.tinggi, awal, inti));
  const rendah = round2(Math.min(raw.rendah, awal, inti));
  return { tinggi, awal, inti, rendah };
}

export function derivedOf(p: Prices): Derived {
  const atas = round2(Math.max(p.awal, p.inti));
  const bawah = round2(Math.min(p.awal, p.inti));
  return {
    atas,
    bawah,
    neto: round2(Math.abs(p.inti - p.awal)),
    julat: round2(p.tinggi - p.rendah),
    naik: p.inti >= p.awal,
  };
}

export type CrystalLayout = {
  yHigh: number;
  yLow: number;
  yBodyTop: number;
  yBodyBot: number;
  yAwal: number;
  yInti: number;
  yNeto: number;
  yJulat: number;
  bodyH: number;
  tipH: number;
  crystalY: number;
  radius: number;
  upperWick: number;
  lowerWick: number;
  bullish: boolean;
  range: number;
  neto: number;
  julatH: number;
};

export const JULAT_WORLD = 4.7;

export function pricesToLayout(p: Prices): CrystalLayout {
  const d = derivedOf(p);
  const range = Math.max(d.julat, 0.01);
  const k = JULAT_WORLD / range;
  const yAt = (price: number) => (price - p.rendah) * k - JULAT_WORLD / 2;
  const yHigh = yAt(p.tinggi);
  const yLow = yAt(p.rendah);
  const yBodyTop = yAt(d.atas);
  const yBodyBot = yAt(d.bawah);
  const span = Math.max(yBodyTop - yBodyBot, 0.22);
  const tipH = Math.min(0.52, Math.max(0.22, span * 0.26));
  const yNeto = (yBodyTop + yBodyBot) / 2;
  return {
    yHigh,
    yLow,
    yBodyTop,
    yBodyBot,
    yAwal: yAt(p.awal),
    yInti: yAt(p.inti),
    yNeto,
    yJulat: (yHigh + yLow) / 2,
    bodyH: span,
    tipH,
    crystalY: yNeto,
    radius: 0.92,
    upperWick: Math.max(0, yHigh - (yBodyTop + tipH * 0.15)),
    lowerWick: Math.max(0, yBodyBot - tipH * 0.15 - yLow),
    bullish: d.naik,
    range,
    neto: d.neto,
    julatH: JULAT_WORLD,
  };
}

export type CandlePreset = {
  id: string;
  name: string;
  hint: string;
  prices: Prices;
};

export const PRESETS: CandlePreset[] = [
  {
    id: "kristal",
    name: "Kristal",
    hint: "Tubuh Neto penuh, sumbu seimbang",
    prices: DEFAULT_PRICES,
  },
  {
    id: "marubozu-naik",
    name: "Marubozu naik",
    hint: "Tanpa sumbu — Inti di Tinggi",
    prices: { awal: 100, tinggi: 116.4, rendah: 99.8, inti: 116.2 },
  },
  {
    id: "marubozu-turun",
    name: "Marubozu turun",
    hint: "Tanpa sumbu — Inti di Rendah",
    prices: { awal: 116.2, tinggi: 116.4, rendah: 99.8, inti: 100 },
  },
  {
    id: "doji",
    name: "Doji",
    hint: "Awal ≈ Inti, julat di sumbu",
    prices: { awal: 108, tinggi: 118.5, rendah: 97.2, inti: 108.15 },
  },
  {
    id: "palu",
    name: "Palu",
    hint: "Sumbu bawah panjang, Neto kecil",
    prices: { awal: 110.4, tinggi: 112.2, rendah: 96.1, inti: 111.6 },
  },
  {
    id: "tembak",
    name: "Tembak bintang",
    hint: "Sumbu atas panjang, penolakan",
    prices: { awal: 102.4, tinggi: 118.8, rendah: 100.2, inti: 101.1 },
  },
];

export function seededSeries(count = 28, seed = 42): Prices[] {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s % 10000) / 10000;
  };
  const candles: Prices[] = [];
  let price = 108;
  for (let i = 0; i < count; i++) {
    const awal = price;
    const drift = (rnd() - 0.47) * 3.4;
    const inti = Math.max(72, awal + drift + (rnd() - 0.5) * 1.8);
    const tinggi = Math.max(awal, inti) + rnd() * 2.6;
    const rendah = Math.min(awal, inti) - rnd() * 2.4;
    candles.push(sanitizePrices({ awal, inti, tinggi, rendah }));
    price = inti;
  }
  return candles;
}
