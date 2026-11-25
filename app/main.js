// NusaData — router and the controls that make the pages work.
// Routes (hash, so the site works from plain static files):
//   #/                     dashboard
//   #/penduduk             population, age structure, poverty
//   #/ekonomi              GDP, inflation, jobs, sectors (tabs)
//   #/kesehatan            life expectancy, stunting
//   #/pendidikan           HDI, schooling, completion
//   #/provinsi             six largest provinces, searchable and sortable
//   #/provinsi/<slug>      one province
//   #/sumber               sources and method
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  GDP_GROWTH, INFLATION, UNEMPLOYMENT, SECTORS, POPULATION_SERIES,
  POVERTY, PROVINCES, provinceShare,
} from './data.js';
import {
  dashboard, penduduk, ekonomi, kesehatan, pendidikan,
  provinsiList, provinceDetail, sources, missing,
} from './views.js';
import { hbarChart } from './charts.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('nav a')];
let econTab = 'growth';
let provSort = 'pop';

function setActiveNav(route) {
  navLinks.forEach((a) => {
    const target = a.getAttribute('href');
    const on = target === route || (route.startsWith('#/provinsi') && target === '#/provinsi');
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  let html = '';
  let title = 'NusaData — Statistik Indonesia';
  let route = '#/';
  if (parts.length === 0) {
    html = dashboard(); route = '#/';
  } else if (parts[0] === 'penduduk') {
    html = penduduk(); title = 'Penduduk | NusaData'; route = '#/penduduk';
  } else if (parts[0] === 'ekonomi') {
    html = ekonomi(econTab); title = 'Ekonomi | NusaData'; route = '#/ekonomi';
  } else if (parts[0] === 'kesehatan') {
    html = kesehatan(); title = 'Kesehatan | NusaData'; route = '#/kesehatan';
  } else if (parts[0] === 'pendidikan') {
    html = pendidikan(); title = 'Pendidikan | NusaData'; route = '#/pendidikan';
  } else if (parts[0] === 'provinsi' && parts[1]) {
    html = provinceDetail(decodeURIComponent(parts[1])); title = 'Provinsi | NusaData'; route = '#/provinsi';
  } else if (parts[0] === 'provinsi') {
    html = provinsiList('', provSort); title = 'Provinsi | NusaData'; route = '#/provinsi';
  } else if (parts[0] === 'sumber') {
    html = sources(); title = 'Sumber & Metode | NusaData'; route = '#/sumber';
  } else {
    html = missing(); title = 'Tidak ditemukan | NusaData';
  }
  document.title = title;
  app.innerHTML = html;
  setActiveNav(route);
  wirePage();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function wirePage() {
  // Dashboard: live-filter the headline cards as you type.
  const q = document.getElementById('q');
  if (q) {
    q.addEventListener('input', () => {
      const needle = q.value.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll('#kpi-grid .kpi').forEach((card) => {
        const hit = !needle || card.textContent.toLowerCase().includes(needle);
        card.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      const hint = document.getElementById('kpi-hint');
      if (hint) hint.textContent = needle ? `${shown} dari 8 indikator cocok dengan “${q.value.trim()}”.` : 'Klik sebuah kartu untuk membuka halaman detailnya.';
    });
  }

  // Economy tabs: swap the panel without leaving the page.
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => { econTab = btn.getAttribute('data-tab'); render(); });
  });

  // Province search: filter the table rows in place, keeping focus in the box.
  const provQ = document.getElementById('prov-q');
  if (provQ) {
    provQ.addEventListener('input', () => {
      const needle = provQ.value.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll('tbody tr').forEach((row) => {
        const hit = !needle || row.textContent.toLowerCase().includes(needle);
        row.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      const hint = document.getElementById('compare-hint');
      if (hint && needle && shown === 0) hint.textContent = 'Tidak ada provinsi yang cocok dengan pencarian itu.';
    });
  }

  // Province sort buttons: re-render the list in the chosen order.
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      provSort = btn.getAttribute('data-sort');
      const query = document.getElementById('prov-q') ? document.getElementById('prov-q').value : '';
      app.innerHTML = provinsiList(query, provSort);
      wirePage();
    });
  });

  // Province compare: up to three checked provinces, drawn as a bar chart.
  const boxes = [...document.querySelectorAll('[data-compare]')];
  if (boxes.length) {
    const drawCompare = () => {
      const picked = boxes.filter((b) => b.checked).map((b) => PROVINCES.find((p) => p.slug === b.getAttribute('data-compare')));
      const chart = document.getElementById('compare-chart');
      const hint = document.getElementById('compare-hint');
      if (!chart) return;
      if (picked.length === 0) {
        chart.innerHTML = '';
        if (hint) hint.textContent = 'Centang hingga tiga provinsi pada tabel di atas untuk membandingkan jumlah penduduknya.';
        return;
      }
      if (hint) hint.textContent = `${picked.length} provinsi dipilih — penduduk 2024 (juta jiwa). Pangsa nasional: ${picked.map((p) => `${p.name} ${String(provinceShare(p)).replace('.', ',')}%`).join(' · ')}.`;
      chart.innerHTML = hbarChart(picked.map((p) => ({ label: p.name, value: p.pop })), {
        color: '#0e7490', valueLabel: (v) => `${String(v).replace('.', ',')} jt`,
      });
    };
    boxes.forEach((b) => b.addEventListener('change', () => {
      const checked = boxes.filter((x) => x.checked);
      if (checked.length > 3) { b.checked = false; return; }
      drawCompare();
    }));
  }

  // CSV download: build the file from the data already on the page.
  const dl = document.getElementById('download-csv');
  if (dl) dl.addEventListener('click', downloadCsv);
}

function csvCell(v) {
  const s = String(v).replace(/"/g, '""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

function downloadCsv() {
  const lines = [['indikator', 'tahun', 'nilai', 'satuan']];
  POPULATION_SERIES.forEach((p) => lines.push(['Penduduk', p.year, p.pop, 'juta jiwa']));
  GDP_GROWTH.forEach((p) => lines.push(['Pertumbuhan PDB', p.year, p.value, 'persen']));
  INFLATION.forEach((p) => lines.push(['Inflasi', p.year, p.value, 'persen']));
  UNEMPLOYMENT.forEach((p) => lines.push(['Pengangguran terbuka (Agustus)', p.year, p.value, 'persen']));
  POVERTY.forEach((p) => lines.push(['Penduduk miskin', p.year, p.value, 'persen']));
  SECTORS.forEach((s) => lines.push([`Pangsa PDB — ${s.name}`, 2024, s.share, 'persen']));
  PROVINCES.forEach((p) => lines.push([`Penduduk — ${p.name}`, 2024, p.pop, 'juta jiwa']));
  const csv = lines.map((row) => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nusadata-indonesia-2024.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

window.addEventListener('hashchange', render);
render();
