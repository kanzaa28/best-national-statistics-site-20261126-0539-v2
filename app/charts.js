// Hand-drawn SVG charts. No libraries, no network: each function takes plain
// numbers and returns an SVG string the page drops into the document.
// Palette: deep teal for the main series, amber for highlights, a soft grey
// grid. All charts scale to their container (viewBox + width 100%).

const TEAL = '#0f766e';
const TEAL_SOFT = '#99d6cf';
const AMBER = '#d97706';
const INK = '#1d2b28';
const GRID = '#e2ddd2';
const MUTED = '#6b7280';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function fmt(n, digits = 1) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// A vertical bar chart. points: [{label, value}]. valueLabel formats the
// number shown above each bar. highlightIndex paints one bar amber.
export function barChart(points, { height = 240, valueLabel = (v) => fmt(v), highlightIndex = -1, unit = '' } = {}) {
  const w = 640;
  const h = height;
  const padL = 44;
  const padB = 34;
  const padT = 26;
  const max = Math.max(...points.map((p) => p.value), 0.0001);
  const min = Math.min(0, ...points.map((p) => p.value));
  const span = max - min;
  const plotH = h - padT - padB;
  const plotW = w - padL - 12;
  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.58);
  const y = (v) => padT + ((max - v) / span) * plotH;
  const zeroY = y(0);
  const gridVals = [0.25, 0.5, 0.75, 1].map((f) => min + span * f);
  const grid = gridVals
    .map(
      (v) =>
        `<line x1="${padL}" y1="${y(v)}" x2="${w - 12}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(v, 0)}</text>`,
    )
    .join('');
  const bars = points
    .map((p, i) => {
      const x = padL + i * slot + (slot - barW) / 2;
      // A bar runs from the zero line to its value: above it when positive,
      // below it when negative (the 2020 pandemic contraction).
      const yTop = y(Math.max(p.value, 0));
      const yBottom = y(Math.min(p.value, 0));
      const bh = Math.max(2, yBottom - yTop);
      const fill = i === highlightIndex ? AMBER : TEAL;
      const labelY = p.value < 0 ? yBottom + 14 : yTop - 6;
      return `<rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"/><text x="${(x + barW / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${esc(valueLabel(p.value))}</text><text x="${(x + barW / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(p.label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Diagram batang ${esc(unit)}">${grid}<line x1="${padL}" y1="${zeroY}" x2="${w - 12}" y2="${zeroY}" stroke="${INK}" stroke-width="1"/>${bars}</svg>`;
}

// A line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, { height = 240, valueLabel = (v) => fmt(v), unit = '' } = {}) {
  const w = 640;
  const h = height;
  const padL = 48;
  const padB = 34;
  const padT = 28;
  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value));
  const pad = (max - min) * 0.15 || 1;
  const top = max + pad;
  const bottom = min - pad;
  const plotH = h - padT - padB;
  const plotW = w - padL - 12;
  const x = (i) => padL + (i / (points.length - 1)) * plotW;
  const y = (v) => padT + ((top - v) / (top - bottom)) * plotH;
  const gridVals = [0.25, 0.5, 0.75].map((f) => bottom + (top - bottom) * f);
  const grid = gridVals
    .map(
      (v) =>
        `<line x1="${padL}" y1="${y(v)}" x2="${w - 12}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(v, 0)}</text>`,
    )
    .join('');
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  // End labels anchor inward so the first and last values are never clipped
  // by the edge of the SVG.
  const anchor = (i) => (i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle');
  const dots = points
    .map(
      (p, i) =>
        `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${TEAL}" stroke-width="2.5"/><text x="${x(i).toFixed(1)}" y="${(y(p.value) - 11).toFixed(1)}" text-anchor="${anchor(i)}" font-size="12" font-weight="600" fill="${INK}">${esc(valueLabel(p.value))}</text><text x="${x(i).toFixed(1)}" y="${h - 12}" text-anchor="${anchor(i)}" font-size="12" fill="${MUTED}">${esc(p.label)}</text>`,
    )
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Grafik garis ${esc(unit)}">${grid}<path d="${path}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// A donut chart with a legend. slices: [{label, pct}].
export function donutChart(slices, { size = 260, centerLabel = '', centerValue = '' } = {}) {
  const w = size;
  const cx = w / 2;
  const cy = w / 2;
  const r = w / 2 - 14;
  const inner = r * 0.62;
  const colors = [TEAL, AMBER, '#b45309', '#2dd4bf', '#f59e0b', '#64748b', '#a8a29e', '#0d9488'];
  let angle = -Math.PI / 2;
  const arcs = slices
    .map((s, i) => {
      const frac = s.pct / 100;
      const a0 = angle;
      const a1 = angle + frac * Math.PI * 2;
      angle = a1;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      if (frac >= 0.999) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${colors[i % colors.length]}"/><circle cx="${cx}" cy="${cy}" r="${inner}" fill="#fff"/>`;
      return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    })
    .join('');
  const legend = slices
    .map(
      (s, i) =>
        `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span><span class="legend-label">${esc(s.label)}</span><span class="legend-value">${fmt(s.pct)}%</span></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${w} ${w}" width="${w}" height="${w}" role="img" aria-label="Diagram donat"><title>${esc(centerLabel)}</title>${arcs}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">${esc(centerValue)}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(centerLabel)}</text></svg><ul class="legend">${legend}</ul></div>`;
}

// A single horizontal bar for one value against a 0-100 scale, used in the
// province detail panel to show a province's share of the national total.
// The label sits on its own line above the bar with the value at the right,
// so a long province name can never run into the number.
export function shareBar(pct, { label = '' } = {}) {
  const w = 320;
  const h = 46;
  const filled = Math.max(2, Math.min(w, (pct / 100) * w));
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(label)} ${fmt(pct, 2)} persen"><text x="0" y="12" font-size="12" fill="${MUTED}">${esc(label)}</text><text x="${w}" y="12" text-anchor="end" font-size="12" font-weight="600" fill="${INK}">${fmt(pct, 2)}%</text><rect x="0" y="20" width="${w}" height="12" rx="6" fill="${TEAL_SOFT}"/><rect x="0" y="20" width="${filled.toFixed(1)}" height="12" rx="6" fill="${TEAL}"/></svg>`;
}
