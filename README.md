[![National statistics site bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hermansto/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hermansto/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia

Situs statistik nasional tentang Indonesia, tahun jangkar 2024: penduduk, ekonomi (PDB, inflasi, pengangguran), kesehatan, pendidikan, dan provinsi — semua angka nyata dari BPS, Kementerian Kesehatan (SSGI), dan Bank Dunia, dengan sumber di setiap halaman.

Situs statis tanpa build step dan tanpa permintaan jaringan: buka `app/index.html` lewat server statis apa pun. Grafik digambar sebagai SVG polos dari angka di `app/data.js`.

## Halaman

- `#/` — Beranda: 8 angka utama, tiga temuan, grafik penduduk & PDB, lapangan usaha, provinsi terpadat; kotak cari memfilter kartu indikator.
- `#/penduduk` — Jumlah penduduk 2020–2025, struktur umur, kemiskinan.
- `#/ekonomi` — Tab Pertumbuhan PDB / Inflasi / Pengangguran / Lapangan usaha, plus unduh CSV.
- `#/kesehatan` — Umur harapan hidup, stunting balita 2021–2024.
- `#/pendidikan` — IPM, lama sekolah, tingkat penyelesaian pendidikan.
- `#/provinsi` — Enam provinsi terpadat: cari, urutkan, bandingkan hingga tiga provinsi; klik nama untuk halaman detail provinsi.
- `#/sumber` — Semua sumber dan metode singkat.

## Menjalankan lokal

```sh
node serve.ts
# buka http://localhost:8080
```

## Menyerahkan (hand-in)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis `dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts` (disalin dari kit tanpa diubah).
