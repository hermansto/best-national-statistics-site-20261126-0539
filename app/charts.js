// NusaData — small SVG chart builders. No library, no network: every chart is
// plain SVG drawn from the numbers in data.js, so it renders offline on any screen.

const ESC = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 2) => Number(n).toFixed(d).replace('.', ',');

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${ESC(label)}" preserveAspectRatio="xMidYMid meet">`;
}

// Vertical bars. points: [{label, value}]. valueLabel formats the number on top.
export function barChart(points, { width = 640, height = 260, color = '#0e7490', valueLabel = (v) => fmt(v), unit = '' } = {}) {
  const padL = 8, padB = 34, padT = 30;
  const max = Math.max(...points.map((p) => p.value), 0.01);
  const min = Math.min(0, ...points.map((p) => p.value));
  const span = max - min;
  const slot = (width - padL * 2) / points.length;
  const bw = Math.min(54, slot * 0.58);
  const zeroY = padT + ((max - 0) / span) * (height - padT - padB);
  let out = svgOpen(width, height, 'Grafik batang' + (unit ? ` (${unit})` : ''));
  out += `<line x1="${padL}" y1="${zeroY}" x2="${width - padL}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1"/>`;
  points.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const y = padT + ((max - p.value) / span) * (height - padT - padB);
    const h = Math.abs(zeroY - y);
    const top = Math.min(y, zeroY);
    const fill = p.value < 0 ? '#b45309' : color;
    out += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(h, 2).toFixed(1)}" rx="4" fill="${fill}"/>`;
    out += `<text x="${cx.toFixed(1)}" y="${(top - 8).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">${ESC(valueLabel(p.value))}</text>`;
    out += `<text x="${cx.toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#475569">${ESC(p.label)}</text>`;
  });
  return out + '</svg>';
}

// Line chart with dots. points: [{label, value}].
export function lineChart(points, { width = 640, height = 260, color = '#0e7490', valueLabel = (v) => fmt(v), unit = '' } = {}) {
  const padL = 14, padR = 14, padB = 34, padT = 30;
  const vals = points.map((p) => p.value);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  if (hi === lo) { hi += 1; lo -= 1; }
  const pad = (hi - lo) * 0.15; lo -= pad; hi += pad;
  const x = (i) => padL + (i * (width - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (height - padT - padB);
  let out = svgOpen(width, height, 'Grafik garis' + (unit ? ` (${unit})` : ''));
  out += `<line x1="${padL}" y1="${height - padB}" x2="${width - padR}" y2="${height - padB}" stroke="#94a3b8" stroke-width="1"/>`;
  out += `<polyline points="${points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="5" fill="#ffffff" stroke="${color}" stroke-width="3"/>`;
    out += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 12).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">${ESC(valueLabel(p.value))}</text>`;
    out += `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#475569">${ESC(p.label)}</text>`;
  });
  return out + '</svg>';
}

// Horizontal bars with a label on the left and a value on the right.
export function hbarChart(rows, { width = 640, color = '#0e7490', valueLabel = (v) => fmt(v, 1) + '%' } = {}) {
  const rowH = 44, labelW = 272, valueW = 74;
  const height = rows.length * rowH + 12;
  const max = Math.max(...rows.map((r) => r.value), 0.01);
  let out = svgOpen(width, height, 'Grafik batang horizontal');
  rows.forEach((r, i) => {
    const y = 12 + i * rowH;
    const barW = ((width - labelW - valueW - 16) * r.value) / max;
    out += `<text x="0" y="${y + 19}" font-size="12.5" fill="#0f172a">${ESC(r.label)}</text>`;
    out += `<rect x="${labelW}" y="${y + 4}" width="${Math.max(barW, 3).toFixed(1)}" height="22" rx="5" fill="${r.color || color}"/>`;
    out += `<text x="${labelW + barW + 10}" y="${y + 20}" font-size="13" font-weight="700" fill="#0f172a">${ESC(valueLabel(r.value))}</text>`;
  });
  return out + '</svg>';
}

// Donut: segments [{label, value, color}]. Centre text is the headline.
export function donut(segments, centre, { size = 240 } = {}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = 84, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  let offset = 0;
  let out = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Diagram lingkaran">`;
  out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="34"/>`;
  segments.forEach((s) => {
    const len = (s.value / total) * circ;
    out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="34" stroke-dasharray="${len.toFixed(1)} ${(circ - len).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += len;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="#0f172a">${ESC(centre)}</text>`;
  out += `<text x="${cx}" y="${cy + 20}" text-anchor="middle" font-size="12" fill="#475569">dari total</text></svg>`;
  const legend = segments.map((s) => `<li><span class="dot" style="background:${s.color}"></span>${ESC(s.label)} — <strong>${fmt(s.value, 1)}%</strong></li>`).join('');
  return `<div class="donut-wrap">${out}<ul class="legend">${legend}</ul></div>`;
}
