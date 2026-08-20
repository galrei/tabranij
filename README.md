# TABRANIJ

Lab kristal 3D untuk anatomi satu lilin harga.

**T**inggi · **A**tas · **B**awah · **R**endah · **A**wal · **N**eto · **I**nti · **J**ulat

## Parameter

Empat harga bebas:

| Huruf | Nama | Arti |
| --- | --- | --- |
| T | Tinggi | Harga tertinggi periode |
| A | Awal | Harga pembuka |
| I | Inti | Harga kini / harga penutupan |
| R | Rendah | Harga terendah periode |

Empat turunan:

| Huruf | Nama | Rumus |
| --- | --- | --- |
| A | Atas | `max(Awal, Inti)` — tepi atas tubuh |
| B | Bawah | `min(Awal, Inti)` — tepi bawah tubuh |
| N | Neto | `|Inti − Awal|` — tubuh kristal, terbentuk dari Awal dan Inti |
| J | Julat | `Tinggi − Rendah` — seluruh tinggi |

Neto bukan harga. Neto adalah tubuh yang lahir dari Awal (pembuka) dan Inti (kini / tutup).

## Halaman publik

Lab 3D: [galrei.github.io/tabranij](https://galrei.github.io/tabranij/)

Halaman itu adalah *build* dari kode React Three Fiber yang sama (`npm run build:pages`), bukan salinan HTML.


## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:8080`.

## Isi

- Lab 3D kristal harga (seret untuk memutar, ketuk label anatomi)
- Slider parameter TABRANIJ
- Preset: Kristal, Marubozu, Doji, Palu, Tembak bintang
- Ensiklopedia delapan unsur

Repo terkait: [galrei/grafiktabranij](https://github.com/galrei/grafiktabranij) (indikator MQL5 + token Jetton).
