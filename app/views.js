// NusaData — one function per page. Each page is built from data.js and drawn
// with the SVG builders in charts.js. Nothing here fetches anything.

import {
  HEADLINES, POPULATION_SERIES, AGE_GROUPS, GDP_GROWTH, INFLATION,
  UNEMPLOYMENT, POVERTY, SECTORS, HDI_SERIES, STUNTING, EDUCATION,
  PROVINCES, PROVINCE_NOTES, SOURCES, provinceShare,
} from './data.js';
import { barChart, lineChart, hbarChart, donut } from './charts.js';

const ESC = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const idr = (n) => String(n).replace('.', ',');

function sourceLine(id) {
  return `<p class="src">Sumber: <a href="#/sumber">${ESC(id)}</a> — lihat halaman Sumber untuk rilis lengkapnya.</p>`;
}

function kpiCard(h) {
  return `<a class="kpi" href="${h.route}">
    <span class="kpi-label">${ESC(h.label)}</span>
    <span class="kpi-value">${ESC(h.value)}</span>
    <span class="kpi-unit">${ESC(h.unit)}</span>
    <span class="kpi-change">${ESC(h.change)}</span>
  </a>`;
}

export function dashboard() {
  const popLine = lineChart(POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.pop })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + ' jt', unit: 'juta jiwa',
  });
  const gdpBars = barChart(GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), {
    color: '#b45309', valueLabel: (v) => idr(v) + '%', unit: 'persen',
  });
  const sectorBars = hbarChart(SECTORS.slice(0, 5).map((s) => ({ label: s.name, value: s.share })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + '%',
  });
  const topProv = PROVINCES.slice(0, 3).map((p) => `<li><a href="#/provinsi/${p.slug}">${ESC(p.name)}</a> — <strong>${idr(p.pop)} juta</strong> jiwa (${idr(provinceShare(p))}% dari Indonesia)</li>`).join('');
  return `
  <section class="hero">
    <h1>Indonesia dalam angka, 2024</h1>
    <p class="lede">281,6 juta penduduk, ekonomi Rp22.139 triliun yang tumbuh 5,03%, IPM 75,02 — semua angka nyata dari BPS, Kemenkes, dan Bank Dunia.</p>
    <label class="search">Cari indikator
      <input id="q" type="search" placeholder="Contoh: inflasi, stunting, PDB…" autocomplete="off">
    </label>
  </section>
  <section aria-label="Angka utama">
    <div class="kpi-grid" id="kpi-grid">${HEADLINES.map(kpiCard).join('')}</div>
    <p class="hint" id="kpi-hint">Klik sebuah kartu untuk membuka halaman detailnya.</p>
  </section>
  <div class="two-col">
    <section class="card">
      <h2><a href="#/penduduk">Penduduk, 2020–2025</a></h2>
      <p class="card-sub">Juta jiwa · BPS</p>
      ${popLine}
      <p>Pertumbuhan melambat: 1,08% per tahun dalam lima tahun terakhir (SUPAS 2025), dari 1,43% pada 2010.</p>
    </section>
    <section class="card">
      <h2><a href="#/ekonomi">Pertumbuhan PDB, 2020–2024</a></h2>
      <p class="card-sub">Persen per tahun · BPS</p>
      ${gdpBars}
      <p>2020 adalah satu-satunya tahun negatif dalam lima tahun ini (−2,07%), lalu ekonomi kembali di atas 5% selama tiga tahun berturut-turut.</p>
    </section>
  </div>
  <section class="findings">
    <h2>Tiga hal yang perlu dibaca dulu</h2>
    <ol>
      <li><strong>Pertumbuhan stabil, harga terkendali.</strong> Ekonomi tumbuh 5,03% pada 2024 sementara inflasi turun ke 1,57% — kombinasi yang tidak terjadi setiap tahun.</li>
      <li><strong>Kemiskinan terus turun.</strong> Dari 9,03% pada Maret 2024 menjadi 8,47% pada Maret 2025 — 1,37 juta orang keluar dari kemiskinan dalam setahun.</li>
      <li><strong>Jawa masih menampung lebih dari separuh penduduk.</strong> 55,65% penduduk tinggal di Jawa (SUPAS 2025), jadi hampir semua indikator nasional bergerak mengikuti Jawa.</li>
    </ol>
  </section>
  <div class="two-col">
    <section class="card">
      <h2><a href="#/ekonomi">Lima lapangan usaha terbesar, 2024</a></h2>
      <p class="card-sub">Pangsa terhadap PDB · BPS</p>
      ${sectorBars}
      <p>Industri pengolahan tetap tulang punggung: 18,98% dari PDB dan penyumbang pertumbuhan terbesar (0,9 poin dari 5,03%).</p>
    </section>
    <section class="card">
      <h2><a href="#/provinsi">Provinsi terpadat</a></h2>
      <p class="card-sub">BPS 2024</p>
      <ul class="plain">${topProv}</ul>
      <p>Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — menampung 130,05 juta jiwa, atau 46,2% dari seluruh Indonesia.</p>
      <p><a class="btn" href="#/provinsi">Lihat semua provinsi →</a></p>
    </section>
  </div>`;
}

export function penduduk() {
  const popLine = lineChart(POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.pop })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + ' jt', unit: 'juta jiwa',
  });
  const ageDonut = donut(AGE_GROUPS.map((a, i) => ({ label: a.group, value: a.share, color: ['#0e7490', '#b45309', '#64748b'][i] })), '68,1%', {});
  const povertyBars = barChart(POVERTY.map((p) => ({ label: p.year, value: p.value })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + '%', unit: 'persen penduduk miskin',
  });
  return `
  <h1>Penduduk</h1>
  <p class="lede">281,6 juta jiwa pada 2024 — negara terpadat keempat di dunia — dengan pertumbuhan yang terus melambat dan usia produktif yang masih dominan.</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="kpi-label">Penduduk 2024</span><span class="kpi-value">281,6 jt</span><span class="kpi-unit">BPS</span><span class="kpi-change">+1,04% dari 2023</span></div>
    <div class="kpi"><span class="kpi-label">Tinggal di Jawa</span><span class="kpi-value">55,65%</span><span class="kpi-unit">158,41 jt jiwa · SUPAS 2025</span><span class="kpi-change">Sumatera 21,89%</span></div>
    <div class="kpi"><span class="kpi-label">Rasio ketergantungan</span><span class="kpi-value">45,05</span><span class="kpi-unit">SUPAS 2025</span><span class="kpi-change">100 usia produktif menanggung 45 nonproduktif</span></div>
    <div class="kpi"><span class="kpi-label">Penduduk miskin</span><span class="kpi-value">8,47%</span><span class="kpi-unit">Mar 2025 · 23,85 jt orang</span><span class="kpi-change">Garis kemiskinan Rp609.160/kapita/bulan</span></div>
  </div>
  <div class="two-col">
    <section class="card"><h2>Jumlah penduduk, 2020–2025</h2><p class="card-sub">Juta jiwa · BPS</p>${popLine}${sourceLine('bps-pop')}</section>
    <section class="card"><h2>Struktur umur, 2024</h2><p class="card-sub">Pangsa penduduk · World Bank</p>${ageDonut}
    <p>Indonesia masih dalam bonus demografi: 68,1% penduduk berusia produktif (15–64 tahun). Anak-anak 24,6%, lansia 7,3%.</p></section>
  </div>
  <section class="card"><h2>Kemiskinan terus turun</h2><p class="card-sub">Persen penduduk miskin · BPS (Susenas)</p>${povertyBars}
  <p>Di kota 6,73%, di desa 11,03% (Maret 2025). Kemiskinan ekstrem 0,85% (2,38 juta orang) dan gini ratio 0,375 pada Maret 2025.</p>${sourceLine('bps-poverty')}</section>`;
}

export function ekonomi(tab = 'growth') {
  const tabs = [
    { id: 'growth', label: 'Pertumbuhan PDB' },
    { id: 'inflation', label: 'Inflasi' },
    { id: 'jobs', label: 'Pengangguran' },
    { id: 'sectors', label: 'Lapangan usaha' },
  ];
  const buttons = tabs.map((t) => `<button type="button" class="tab${t.id === tab ? ' active' : ''}" data-tab="${t.id}" aria-pressed="${t.id === tab}">${t.label}</button>`).join('');
  let body = '';
  if (tab === 'growth') {
    body = `<h2>Pertumbuhan PDB, 2020–2024</h2><p class="card-sub">Persen per tahun · BPS</p>
    ${barChart(GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })), { color: '#b45309', valueLabel: (v) => idr(v) + '%' })}
    <p>PDB 2024 mencapai Rp22.139,0 triliun. Konsumsi rumah tangga tumbuh 4,94%; investasi (PMTB) 4,61%; ekspor barang dan jasa 6,51%.</p>${sourceLine('bps-gdp')}`;
  } else if (tab === 'inflation') {
    body = `<h2>Inflasi tahunan, 2020–2024</h2><p class="card-sub">Persen (y-on-y, Desember) · BPS</p>
    ${barChart(INFLATION.map((p) => ({ label: String(p.year), value: p.value })), { color: '#0e7490', valueLabel: (v) => idr(v) + '%' })}
    <p>Inflasi 2024 (1,57%) adalah yang terendah dalam lima tahun ini, setelah sempat 5,51% pada 2022. Sasaran Bank Indonesia: 2,5% ± 1%.</p>${sourceLine('bps-gdp')}`;
  } else if (tab === 'jobs') {
    body = `<h2>Pengangguran terbuka, 2021–2024</h2><p class="card-sub">Persen, Agustus · BPS</p>
    ${barChart(UNEMPLOYMENT.map((p) => ({ label: String(p.year), value: p.value })), { color: '#0e7490', valueLabel: (v) => idr(v) + '%' })}
    <p>Agustus 2024: 144,64 juta orang bekerja (bertambah 4,79 juta dari Agustus 2023) dan 7,47 juta orang menganggur.</p>${sourceLine('bps-labour')}`;
  } else {
    const rows = SECTORS.map((s) => `<tr><td>${ESC(s.name)}</td><td>${idr(s.share)}%</td><td>${s.growth === null ? '—' : idr(s.growth) + '%'}</td></tr>`).join('');
    body = `<h2>Lapangan usaha, 2024</h2><p class="card-sub">Pangsa dan pertumbuhan terhadap PDB · BPS</p>
    ${hbarChart(SECTORS.map((s) => ({ label: s.name, value: s.share })), { color: '#b45309', valueLabel: (v) => idr(v) + '%' })}
    <table><thead><tr><th>Lapangan usaha</th><th>Pangsa PDB</th><th>Tumbuh</th></tr></thead><tbody>${rows}</tbody></table>
    <p>Pertumbuhan tertinggi 2024: jasa lainnya 9,80%, transportasi dan pergudangan 8,69%, akomodasi dan makan minum 8,56%.</p>${sourceLine('bps-gdp')}`;
  }
  return `
  <h1>Ekonomi</h1>
  <p class="lede">Ekonomi terbesar ke-16 di dunia (US$1.396,3 miliar, World Bank 2024) dengan PDB per kapita Rp78,6 juta. Pilih indikator di bawah untuk melihat grafiknya.</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="kpi-label">PDB 2024</span><span class="kpi-value">Rp22.139 T</span><span class="kpi-unit">harga berlaku</span><span class="kpi-change">Dari Rp20.892 T pada 2023</span></div>
    <div class="kpi"><span class="kpi-label">PDB per kapita</span><span class="kpi-value">US$4.960</span><span class="kpi-unit">Rp78,6 juta · 2024</span><span class="kpi-change">World Bank: US$4.925</span></div>
    <div class="kpi"><span class="kpi-label">Pertumbuhan</span><span class="kpi-value">5,03%</span><span class="kpi-unit">2024 (c-to-c)</span><span class="kpi-change">Dari 5,05% pada 2023</span></div>
    <div class="kpi"><span class="kpi-label">Inflasi</span><span class="kpi-value">1,57%</span><span class="kpi-unit">2024 (y-on-y)</span><span class="kpi-change">Dari 2,61% pada 2023</span></div>
  </div>
  <div class="tabs" role="tablist" aria-label="Indikator ekonomi">${buttons}</div>
  <section class="card" id="econ-panel">${body}</section>
  <p><button type="button" class="btn" id="download-csv">Unduh data halaman ini (CSV)</button> <span class="hint">File dibuat dari angka di halaman ini, tanpa internet.</span></p>`;
}

export function kesehatan() {
  const stuntingLine = lineChart(STUNTING.map((p) => ({ label: String(p.year), value: p.value })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + '%', unit: 'persen balita',
  });
  return `
  <h1>Kesehatan</h1>
  <p class="lede">Orang Indonesia hidup lebih lama dari sebelumnya — 74,15 tahun saat lahir pada 2024 — dan stunting balita turun di bawah 20% untuk pertama kalinya.</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="kpi-label">Umur harapan hidup</span><span class="kpi-value">74,15 thn</span><span class="kpi-unit">saat lahir, 2024</span><span class="kpi-change">Dari 73,37 thn pada 2020</span></div>
    <div class="kpi"><span class="kpi-label">Stunting balita</span><span class="kpi-value">19,8%</span><span class="kpi-unit">SSGI 2024</span><span class="kpi-change">Dari 21,5% pada 2023</span></div>
    <div class="kpi"><span class="kpi-label">Wasting balita</span><span class="kpi-value">7,4%</span><span class="kpi-unit">SSGI 2024</span><span class="kpi-change">Turun 1,1 poin dari 2023</span></div>
    <div class="kpi"><span class="kpi-label">Balita overweight</span><span class="kpi-value">3,4%</span><span class="kpi-unit">SSGI 2024</span><span class="kpi-change">Turun 0,8 poin dari 2023</span></div>
  </div>
  <div class="two-col">
    <section class="card"><h2>Stunting balita, 2021–2024</h2><p class="card-sub">Persen · Kemenkes (SSGI)</p>${stuntingLine}
    <p>Dari 37,6% pada 2013 menjadi 19,8% pada 2024. Target RPJMN: 14,2% pada 2029. Enam provinsi menampung sekitar separuh balita stunting: Jawa Barat, Jawa Tengah, Jawa Timur, Sumatera Utara, NTT, dan Banten.</p>${sourceLine('kemenkes')}</section>
    <section class="card"><h2>Yang membaik, yang tertinggal</h2>
    <ul class="plain">
      <li><strong>Membaik:</strong> umur harapan hidup naik 0,78 tahun selama 2020–2024.</li>
      <li><strong>Membaik:</strong> stunting, wasting, dan overweight semuanya turun pada 2024.</li>
      <li><strong>Tertinggal:</strong> stunting tertinggi masih di Papua Pegunungan (40,0%) dan NTT (37,0%) pada SSGI 2024.</li>
      <li><strong>Tertinggal:</strong> jurang antar-daerah besar — sepersepuluh kabupaten/kota dengan harapan hidup tertinggi hidup 11,7 tahun lebih lama dari sepersepuluh terendah.</li>
    </ul>
    <p>Angka jurang daerah di atas diringkas dari laporan Social Determinants of Health (ARC Institute, 2026) yang mengolah data BPS dan Kemenkes 1991–2025.</p></section>
  </div>`;
}

export function pendidikan() {
  const hdiLine = lineChart(HDI_SERIES.map((p) => ({ label: String(p.year), value: p.value })), {
    color: '#0e7490', valueLabel: (v) => idr(v), unit: 'indeks',
  });
  const completionBars = hbarChart(EDUCATION.completion.map((c) => ({ label: c.level, value: c.value })), {
    color: '#0e7490', valueLabel: (v) => idr(v) + '%',
  });
  const years = EDUCATION.schoolYears.map((s) => `<li><strong>${ESC(s.value)}</strong> — ${ESC(s.label)} (${s.year})</li>`).join('');
  return `
  <h1>Pendidikan</h1>
  <p class="lede">Hampir semua anak menyelesaikan SD (97,84%), tapi hanya dua dari tiga yang menyelesaikan SMA (67,07%). Di situlah jurang pendidikan Indonesia pada 2024.</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="kpi-label">IPM</span><span class="kpi-value">75,02</span><span class="kpi-unit">kategori tinggi, 2024</span><span class="kpi-change">Naik dari 73,77 pada 2022</span></div>
    <div class="kpi"><span class="kpi-label">Harapan lama sekolah</span><span class="kpi-value">13,21 thn</span><span class="kpi-unit">usia 7+, 2024</span><span class="kpi-change">Dari 12,98 thn pada 2020</span></div>
    <div class="kpi"><span class="kpi-label">Rata-rata lama sekolah</span><span class="kpi-value">8,85 thn</span><span class="kpi-unit">usia 25+, 2024</span><span class="kpi-change">Setara kelas 9 (SMP)</span></div>
    <div class="kpi"><span class="kpi-label">Pengeluaran riil/kapita</span><span class="kpi-value">Rp12,34 jt</span><span class="kpi-unit">per tahun, disesuaikan, 2024</span><span class="kpi-change">Naik 3,71% dari 2023</span></div>
  </div>
  <div class="two-col">
    <section class="card"><h2>IPM, 2022–2025</h2><p class="card-sub">Indeks · BPS</p>${hdiLine}
    <p>IPM tertinggi 2024: DKI Jakarta dan DI Yogyakarta, di atas 80. Terendah: Papua Pegunungan, 54,43 — selisih lebih dari 25 poin.</p>${sourceLine('bps-hdi')}</section>
    <section class="card"><h2>Tingkat penyelesaian pendidikan, 2024</h2><p class="card-sub">Persen · BPS (Susenas Maret 2024)</p>${completionBars}
    <p>63,84% penduduk usia 15 tahun ke atas telah mencapai wajib belajar 9 tahun.</p>${sourceLine('bps-edu')}</section>
  </div>
  <section class="card"><h2>Lama sekolah dalam tiga angka</h2><ul class="plain">${years}</ul>
  <p>Rata-rata lama sekolah penduduk usia 15 tahun ke atas (9,22 tahun, Susenas 2024) sedikit lebih tinggi dari angka usia 25 tahun ke atas (8,85 tahun) karena generasi muda bersekolah lebih lama.</p></section>`;
}

export function provinsiList(query = '', sort = 'pop') {
  const q = query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  if (sort === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, 'id'));
  else if (sort === 'share') rows = [...rows].sort((a, b) => provinceShare(b) - provinceShare(a));
  else rows = [...rows].sort((a, b) => b.pop - a.pop);
  const tableRows = rows.map((p) => `<tr>
    <td><a href="#/provinsi/${p.slug}">${ESC(p.name)}</a></td>
    <td>${ESC(p.island)}</td><td>${ESC(p.capital)}</td>
    <td>${idr(p.pop)} jt</td><td>${idr(provinceShare(p))}%</td>
    <td>${p.density === null ? '—' : p.density.toLocaleString('id-ID')}</td>
    <td><label class="cmp"><input type="checkbox" data-compare="${p.slug}"> Bandingkan</label></td>
  </tr>`).join('');
  const empty = rows.length === 0 ? `<p class="hint">Tidak ada provinsi yang cocok dengan “${ESC(query)}”. Hapus kata kunci untuk melihat semuanya.</p>` : '';
  return `
  <h1>Provinsi &amp; daerah</h1>
  <p class="lede">Enam provinsi terpadat menampung 168,75 juta jiwa — 59,9% dari Indonesia. Cari, urutkan, lalu centang hingga tiga provinsi untuk membandingkannya.</p>
  <div class="controls">
    <label class="search">Cari provinsi, pulau, atau ibu kota
      <input id="prov-q" type="search" placeholder="Contoh: Jawa, Medan, Sumatera…" value="${ESC(query)}" autocomplete="off">
    </label>
    <div class="sort" role="group" aria-label="Urutkan provinsi">
      <button type="button" class="tab${sort === 'pop' ? ' active' : ''}" data-sort="pop">Penduduk terbanyak</button>
      <button type="button" class="tab${sort === 'name' ? ' active' : ''}" data-sort="name">Nama A–Z</button>
      <button type="button" class="tab${sort === 'share' ? ' active' : ''}" data-sort="share">Pangsa terbesar</button>
    </div>
  </div>
  <section class="card">
    <table>
      <thead><tr><th>Provinsi</th><th>Pulau</th><th>Ibu kota</th><th>Penduduk 2024</th><th>Pangsa</th><th>Kepadatan (jiwa/km²)</th><th>Bandingkan</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    ${empty}
    <p class="src">Sumber: BPS 2024. Pangsa dihitung dari penduduk nasional 281,6 juta jiwa. “—” berarti kepadatan 2024 tidak diterbitkan di sumber yang kami pakai.</p>
  </section>
  <section class="card" id="compare-box">
    <h2>Perbandingan provinsi</h2>
    <p class="hint" id="compare-hint">Centang hingga tiga provinsi pada tabel di atas untuk membandingkan jumlah penduduknya.</p>
    <div id="compare-chart"></div>
  </section>`;
}

export function provinceDetail(slug) {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return missing();
  const note = PROVINCE_NOTES[slug] || '';
  const others = PROVINCES.filter((x) => x.slug !== slug).slice(0, 4).map((x) => `<li><a href="#/provinsi/${x.slug}">${ESC(x.name)}</a> — ${idr(x.pop)} juta jiwa</li>`).join('');
  const compareBars = hbarChart(PROVINCES.slice(0, 4).map((x) => ({ label: x.name, value: x.pop, color: x.slug === slug ? '#b45309' : '#0e7490' })), {
    valueLabel: (v) => `${idr(v)} jt`,
  });
  return `
  <p><a href="#/provinsi">← Semua provinsi</a></p>
  <h1>${ESC(p.name)}</h1>
  <p class="lede">${ESC(note)}</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="kpi-label">Penduduk 2024</span><span class="kpi-value">${idr(p.pop)} jt</span><span class="kpi-unit">BPS</span><span class="kpi-change">Peringkat #${PROVINCES.indexOf(p) + 1} dari 38 provinsi</span></div>
    <div class="kpi"><span class="kpi-label">Pangsa nasional</span><span class="kpi-value">${idr(provinceShare(p))}%</span><span class="kpi-unit">dari 281,6 juta jiwa</span><span class="kpi-change">Pulau ${ESC(p.island)}</span></div>
    <div class="kpi"><span class="kpi-label">Kepadatan</span><span class="kpi-value">${p.density === null ? '—' : p.density.toLocaleString('id-ID')}</span><span class="kpi-unit">jiwa/km² · BPS 2024</span><span class="kpi-change">${p.density === null ? 'Tidak diterbitkan di sumber ini' : 'DKI Jakarta: 16.165 jiwa/km²'}</span></div>
    <div class="kpi"><span class="kpi-label">Ibu kota</span><span class="kpi-value">${ESC(p.capital)}</span><span class="kpi-unit">Provinsi ${ESC(p.name)}</span><span class="kpi-change">Lihat halaman provinsi untuk membandingkan</span></div>
  </div>
  <section class="card"><h2>${ESC(p.name)} di antara empat provinsi terpadat</h2><p class="card-sub">Juta jiwa, 2024 · BPS — batang oranye adalah provinsi ini</p>${compareBars}</section>
  <section class="card"><h2>Provinsi lain yang terpadat</h2><ul class="plain">${others}</ul>
  <p><a class="btn" href="#/provinsi">Kembali ke daftar provinsi →</a></p></section>
  ${sourceLine('bps-pop')}`;
}

export function sources() {
  const rows = SOURCES.map((s) => `<tr><td><strong>${ESC(s.who)}</strong><br>${ESC(s.note)}</td><td>${s.year}</td></tr>`).join('');
  return `
  <h1>Sumber &amp; metode</h1>
  <p class="lede">Setiap angka di situs ini berasal dari rilis resmi di bawah. Tidak ada angka yang diambil dari media sosial, tidak ada perkiraan kami sendiri — kecuali yang diberi label “derived”, yang berarti hasil hitung sederhana dari dua angka yang disebutkan di sampingnya.</p>
  <section class="card">
    <table><thead><tr><th>Sumber</th><th>Tahun data</th></tr></thead><tbody>${rows}</tbody></table>
  </section>
  <section class="card"><h2>Metode singkat</h2>
  <ul class="plain">
    <li><strong>Tahun jangkar 2024.</strong> Sebagian besar angka memakai 2024; pengecualian diberi label tahunnya (kemiskinan Maret 2025, SUPAS 2025).</li>
    <li><strong>Bahasa angka Indonesia.</strong> Koma dipakai sebagai pemisah desimal (5,03%), titik sebagai pemisah ribuan (22.139).</li>
    <li><strong>Tanpa jaringan.</strong> Situs ini tidak mengambil data dari mana pun saat dibuka; semua angka tersimpan di berkas situs sendiri.</li>
    <li><strong>Yang tidak kami tampilkan:</strong> angka provinsi di luar enam terpadat, karena tabel BPS per provinsi yang kami pakai merangkum enam teratas; menampilkan sisanya tanpa sumber berarti mengarang.</li>
  </ul>
  <p><button type="button" class="btn" id="download-csv">Unduh semua angka (CSV)</button></p></section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
  <p>Halaman yang Anda cari tidak ada di situs ini. Mungkin tautannya salah ketik.</p>
  <p><a class="btn" href="#/">Kembali ke beranda →</a></p>`;
}
