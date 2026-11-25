// NusaData — every figure on this site, in one place, with its year and source.
// Anchor year is 2024 unless a row says otherwise. All figures come from the
// releases listed on the Sources page (BPS, Kemenkes SSGI, World Bank WDI).
// Shares marked "derived" are plain arithmetic on the two figures named beside them.

export const META = {
  country: 'Indonesia',
  anchorYear: 2024,
  updated: 'November 2026',
  currency: 'Rp',
};

export const SOURCES = [
  { id: 'bps-pop', who: 'BPS — Jumlah penduduk menurut provinsi', year: 2024, note: 'Penduduk 281,6 juta jiwa; Jawa Barat 50,35 juta; Jawa Timur 41,81 juta; Jawa Tengah 37,89 juta.' },
  { id: 'bps-gdp', who: 'BPS — Perekonomian Indonesia 2024 (rilis 5 Feb 2025)', year: 2024, note: 'PDB Rp22.139,0 triliun; PDB per kapita Rp78,6 juta (US$4.960,3); tumbuh 5,03%.' },
  { id: 'bps-poverty', who: 'BPS — Profil Kemiskinan di Indonesia, Maret 2025 (BRS 63/07/2025)', year: 2025, note: 'Penduduk miskin 8,47% (23,85 juta orang); garis kemiskinan Rp609.160/kapita/bulan; gini 0,375.' },
  { id: 'bps-labour', who: 'BPS — Keadaan Ketenagakerjaan Indonesia, Agustus 2024', year: 2024, note: 'TPT 4,91%; penduduk bekerja 144,64 juta orang; penganggur 7,47 juta orang.' },
  { id: 'bps-hdi', who: 'BPS — Indeks Pembangunan Manusia 2024 (rilis 15 Nov 2024)', year: 2024, note: 'IPM 75,02; umur harapan hidup 74,15 tahun; harapan lama sekolah 13,21 tahun; rata-rata lama sekolah (25+) 8,85 tahun.' },
  { id: 'bps-edu', who: 'BPS — Statistik Pendidikan 2024 (Susenas Maret 2024)', year: 2024, note: 'Tingkat penyelesaian SD 97,84%, SMP 91,15%, SMA 67,07%; rata-rata lama sekolah (15+) 9,22 tahun.' },
  { id: 'kemenkes', who: 'Kemenkes — Survei Status Gizi Indonesia (SSGI) 2024', year: 2024, note: 'Stunting balita 19,8% (dari 21,5% pada 2023); wasting 7,4%; overweight 3,4%.' },
  { id: 'wb', who: 'World Bank — World Development Indicators 2024', year: 2024, note: 'PDB US$1.396,3 miliar; PDB per kapita US$4.925; penduduk usia 0–14 tahun 24,6%, 65+ tahun 7,3%.' },
  { id: 'bps-supas', who: 'BPS — Hasil Survei Penduduk Antar Sensus (SUPAS) 2025', year: 2025, note: 'Penduduk 284,67 juta jiwa; Jawa 55,65% (158,41 juta); Sumatera 21,89% (62,32 juta); rasio ketergantungan 45,05.' },
];

// Headline cards on the dashboard. value is the big number, unit its label,
// change is the move against the previous comparable period, in plain words.
export const HEADLINES = [
  { id: 'pop', label: 'Penduduk', value: '281,6 jt', unit: 'jiwa, 2024', change: '+1,04% dari 2023', route: '#/penduduk', source: 'bps-pop' },
  { id: 'gdp', label: 'PDB', value: 'Rp22.139 T', unit: 'harga berlaku, 2024', change: 'Tumbuh 5,03%', route: '#/ekonomi', source: 'bps-gdp' },
  { id: 'gdppc', label: 'PDB per kapita', value: 'Rp78,6 jt', unit: 'US$4.960, 2024', change: 'Dari Rp75,0 jt pada 2023', route: '#/ekonomi', source: 'bps-gdp' },
  { id: 'inflation', label: 'Inflasi tahunan', value: '1,57%', unit: 'Des 2024 (y-on-y)', change: 'Dari 2,61% pada 2023', route: '#/ekonomi', source: 'bps-gdp' },
  { id: 'jobs', label: 'Pengangguran terbuka', value: '4,91%', unit: 'Agustus 2024', change: 'Dari 5,32% pada Agu 2023', route: '#/ekonomi', source: 'bps-labour' },
  { id: 'poor', label: 'Penduduk miskin', value: '8,47%', unit: 'Maret 2025 · 23,85 jt orang', change: 'Dari 9,03% pada Mar 2024', route: '#/penduduk', source: 'bps-poverty' },
  { id: 'hdi', label: 'Indeks Pembangunan Manusia', value: '75,02', unit: 'kategori tinggi, 2024', change: 'Naik 0,63 poin dari 2023', route: '#/pendidikan', source: 'bps-hdi' },
  { id: 'life', label: 'Umur harapan hidup', value: '74,15 thn', unit: 'saat lahir, 2024', change: 'Naik 0,22 tahun dari 2023', route: '#/kesehatan', source: 'bps-hdi' },
];

export const POPULATION_SERIES = [
  { year: 2020, pop: 270.20 },
  { year: 2022, pop: 275.77 },
  { year: 2023, pop: 278.70 },
  { year: 2024, pop: 281.60 },
  { year: 2025, pop: 284.44 },
];

export const AGE_GROUPS = [
  { group: '0–14 tahun', share: 24.6, note: 'Anak-anak · World Bank 2024' },
  { group: '15–64 tahun', share: 68.1, note: 'Usia produktif · derived: 100 − 24,6 − 7,3' },
  { group: '65+ tahun', share: 7.3, note: 'Lansia · World Bank 2024' },
];

export const GDP_GROWTH = [
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

export const INFLATION = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const UNEMPLOYMENT = [
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

export const POVERTY = [
  { year: 'Mar 2024', value: 9.03, people: 25.22 },
  { year: 'Sep 2024', value: 8.57, people: 24.06 },
  { year: 'Mar 2025', value: 8.47, people: 23.85 },
];

export const SECTORS = [
  { name: 'Industri pengolahan', share: 18.98, growth: 4.43 },
  { name: 'Perdagangan besar & eceran', share: 13.07, growth: 4.86 },
  { name: 'Pertanian, kehutanan & perikanan', share: 12.61, growth: 0.67 },
  { name: 'Konstruksi', share: 10.09, growth: 5.03 },
  { name: 'Pertambangan & penggalian', share: 9.15, growth: null },
  { name: 'Lapangan usaha lainnya', share: 36.10, growth: null, note: 'Sisa dari 100% · derived' },
];

export const HDI_SERIES = [
  { year: 2022, value: 73.77 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
  { year: 2025, value: 75.90 },
];

export const STUNTING = [
  { year: 2021, value: 24.4 },
  { year: 2022, value: 21.6 },
  { year: 2023, value: 21.5 },
  { year: 2024, value: 19.8 },
];

export const EDUCATION = {
  completion: [
    { level: 'SD / sederajat', value: 97.84 },
    { level: 'SMP / sederajat', value: 91.15 },
    { level: 'SMA / SMK sederajat', value: 67.07 },
  ],
  schoolYears: [
    { label: 'Harapan lama sekolah (usia 7+)', value: '13,21 tahun', year: 2024 },
    { label: 'Rata-rata lama sekolah (usia 25+)', value: '8,85 tahun', year: 2024 },
    { label: 'Rata-rata lama sekolah (usia 15+)', value: '9,22 tahun', year: 2024 },
  ],
};

// Six largest provinces, BPS 2024. share is pop / 281,6 juta (derived).
// density is BPS 2024 where published; Sumut has no published 2024 density here.
export const PROVINCES = [
  { slug: 'jawa-barat', name: 'Jawa Barat', island: 'Jawa', pop: 50.35, density: 1359, capital: 'Bandung' },
  { slug: 'jawa-timur', name: 'Jawa Timur', island: 'Jawa', pop: 41.81, density: 870, capital: 'Surabaya' },
  { slug: 'jawa-tengah', name: 'Jawa Tengah', island: 'Jawa', pop: 37.89, density: 1104, capital: 'Semarang' },
  { slug: 'sumatera-utara', name: 'Sumatera Utara', island: 'Sumatera', pop: 15.59, density: null, capital: 'Medan' },
  { slug: 'banten', name: 'Banten', island: 'Jawa', pop: 12.43, density: 1329, capital: 'Serang' },
  { slug: 'dki-jakarta', name: 'DKI Jakarta', island: 'Jawa', pop: 10.68, density: 16165, capital: 'Jakarta' },
];

export const PROVINCE_NOTES = {
  'jawa-barat': 'Provinsi terpadat di Indonesia: hampir 1 dari 5 penduduk Indonesia tinggal di sini. Kepadatan 1.359 jiwa/km² (BPS 2024).',
  'jawa-timur': 'Provinsi terpadat kedua, dengan Surabaya sebagai kota terbesar kedua di Indonesia.',
  'jawa-tengah': 'Provinsi terpadat ketiga; penduduk tersebar dari Semarang, Solo, hingga Purwokerto.',
  'sumatera-utara': 'Provinsi terpadat di luar Pulau Jawa; ibu kotanya Medan.',
  banten: 'Provinsi termuda di Pulau Jawa bagian barat; kepadatan 1.329 jiwa/km² (BPS 2024).',
  'dki-jakarta': 'Ibu kota dan provinsi terpadat per km² di Indonesia: 16.165 jiwa/km² (BPS 2024) — sekitar 12 kali Jawa Barat.',
};

export function provinceShare(p) {
  return Math.round((p.pop / 281.6) * 1000) / 10;
}

export function sourceById(id) {
  return SOURCES.find((s) => s.id === id) || null;
}
