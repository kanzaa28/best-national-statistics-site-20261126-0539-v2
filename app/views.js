// HTML for each page, built from the data in data.js and the charts in
// charts.js. Every value is escaped before it goes into the page, and every
// figure is shown with its source and year. Pages are plain functions of
// (data, ui) where ui carries the interactive state main.js owns: the
// province search text, island filter, sort order, selected province, and
// the two chart toggles.

import { barChart, donutChart, lineChart, shareBar } from './charts.js';
import {
  AGE_GROUPS,
  DEFORESTATION_SERIES,
  ENERGY_MIX,
  GDP_GROWTH_SERIES,
  GDP_NOMINAL_SERIES,
  GDP_SECTORS,
  ISLANDS,
  NATION,
  PAGES,
  POPULATION_SERIES,
  PROVINCES,
  SOURCES,
  STUNTING_SERIES,
} from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Indonesian number formatting: 283,5 — comma decimals, dot thousands.
const num = (n, digits = 1) =>
  Number(n).toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const src = (text) => `<p class="source">Sumber: ${esc(text)}</p>`;

// One headline figure: big number, label, source line.
function stat(value, label, source) {
  return `<div class="stat"><div class="stat-value">${esc(value)}</div><div class="stat-label">${esc(label)}</div><div class="stat-source">${esc(source)}</div></div>`;
}

// The site-wide nav, with the current page marked.
export function nav(current) {
  const links = PAGES.map(
    (p) =>
      `<a href="#/${p.route}"${p.route === current ? ' aria-current="page" class="active"' : ''}>${esc(p.label)}</a>`,
  ).join('');
  return `<nav class="site-nav" aria-label="Navigasi utama">${links}</nav>`;
}

function pageHead(title, intro) {
  return `<h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p>`;
}

// ---- Beranda ---------------------------------------------------------------

export function home(ui) {
  const popPoints = POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.millions }));
  const growthPoints = POPULATION_SERIES.slice(1).map((p, i) => ({
    label: String(p.year),
    value: ((p.millions - POPULATION_SERIES[i].millions) / POPULATION_SERIES[i].millions) * 100,
  }));
  const popChart =
    ui.homeChart === 'growth'
      ? lineChart(growthPoints, { valueLabel: (v) => `${num(v, 2)}%`, unit: 'pertumbuhan penduduk' })
      : lineChart(popPoints, { valueLabel: (v) => num(v, 1), unit: 'jumlah penduduk' });
  const gdpChart = barChart(
    GDP_GROWTH_SERIES.map((g) => ({ label: String(g.year), value: g.pct })),
    { valueLabel: (v) => `${num(v, 2)}%`, highlightIndex: 1, unit: 'pertumbuhan PDB' },
  );
  const cards = PAGES.filter((p) => p.route !== '')
    .map(
      (p) =>
        `<a class="card" href="#/${p.route}"><span class="card-title">${esc(p.title)}</span><span class="card-go">Lihat angka &rarr;</span></a>`,
    )
    .join('');
  return `${pageHead(
    'Indonesia dalam Angka',
    'Satu laman untuk angka-angka penting Indonesia: penduduk, ekonomi, provinsi, kesehatan, pendidikan, lingkungan, dan energi — setiap angka bernama sumber dan tahunnya.',
  )}
<section class="stats">
  ${stat('283,5 jt', 'Penduduk', 'Bank Dunia, 2024')}
  ${stat('38', 'Provinsi', 'BPS, 2024')}
  ${stat('17.508', 'Pulau', 'BPS, 2024')}
  ${stat('US$ 1,40 T', 'PDB', 'Bank Dunia, 2024')}
  ${stat('+5,03%', 'Pertumbuhan ekonomi', 'BPS, 2024')}
  ${stat('8,57%', 'Penduduk miskin', 'BPS, Sep 2024')}
</section>
<section class="panel">
  <h2>Penduduk 2019–2024</h2>
  <div class="toggle" role="group" aria-label="Tampilan grafik penduduk">
    <button data-home-chart="total" class="${ui.homeChart === 'total' ? 'on' : ''}">Jumlah penduduk</button>
    <button data-home-chart="growth" class="${ui.homeChart === 'growth' ? 'on' : ''}">Pertumbuhan per tahun</button>
  </div>
  ${popChart}
  ${src('BPS, estimasi pertengahan tahun. Angka nasional 2024 menurut Bank Dunia: 283,5 juta.')}
</section>
<section class="panel">
  <h2>Pertumbuhan ekonomi 2019–2024</h2>
  ${gdpChart}
  <p>Kontraksi 2020 adalah tahun pandemi COVID-19; sejak 2022 ekonomi tumbuh stabil di atas 5% per tahun.</p>
  ${src('BPS, pertumbuhan PDB riil.')}
</section>
<section>
  <h2>Jelajahi datanya</h2>
  <div class="cards">${cards}</div>
</section>
<section class="panel">
  <h2>Sekilas: lima hal yang perlu diketahui</h2>
  <ol class="highlights">
    <li><strong>Jawa dihuni 157,4 juta jiwa</strong> — 56% penduduk Indonesia tinggal di pulau seluas 7% wilayah daratan. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>DKI Jakarta adalah provinsi terpadat</strong>: 15.964 jiwa per km², lebih dari 100 kali rata-rata nasional. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>Stunting turun dari 30,8% ke 21,5%</strong> antara 2018 dan 2023, tapi masih satu dari lima balita. <span class="muted">(SSGI Kemenkes, 2023)</span></li>
    <li><strong>Deforestasi neto 2023 naik lagi</strong> ke 175,5 ribu hektare setelah tiga tahun di bawah 120 ribu hektare. <span class="muted">(KLHK, 2023)</span></li>
    <li><strong>Ekspor 2024 mencapai US$ 264,7 miliar</strong> dengan surplus perdagangan US$ 31,0 miliar. <span class="muted">(BPS, 2024)</span></li>
  </ol>
</section>`;
}

// ---- Penduduk ---------------------------------------------------------------

export function population() {
  const total2024 = POPULATION_SERIES[POPULATION_SERIES.length - 1].millions;
  const total2019 = POPULATION_SERIES[0].millions;
  const added = total2024 - total2019;
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  const topRows = top5
    .map(
      (p, i) =>
        `<tr><td>${i + 1}</td><td><a href="#/regions/${p.slug}">${esc(p.name)}</a></td><td class="num">${num(p.pop)} jt</td><td class="num">${num((p.pop / NATION.populationMillions) * 100, 1)}%</td></tr>`,
    )
    .join('');
  return `${pageHead(
    'Penduduk',
    '283,5 juta jiwa di 38 provinsi dan 17.508 pulau — negara berpenduduk terbesar keempat di dunia, dengan usia median 30,5 tahun.',
  )}
<section class="stats">
  ${stat('283,5 jt', 'Penduduk', 'Bank Dunia, 2024')}
  ${stat('30,5 thn', 'Usia median', 'Bank Dunia, 2024')}
  ${stat('148 /km²', 'Kepadatan', 'BPS, 2024')}
  ${stat('59,4%', 'Tinggal di perkotaan', 'Bank Dunia, 2024')}
  ${stat('2,1', 'Angka kelahiran (TFR)', 'BPS, 2024')}
  ${stat(`+${num(added, 1)} jt`, 'Tambahan 2019–2024', 'BPS')}
</section>
<section class="panel">
  <h2>Jumlah penduduk 2019–2024 (juta jiwa)</h2>
  ${lineChart(POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.millions })), {
    valueLabel: (v) => num(v, 1),
    unit: 'jumlah penduduk',
  })}
  ${src('BPS, estimasi pertengahan tahun. Bank Dunia mencatat 283,5 juta pada 2024; selisihnya dari metode dan definisi.')}
</section>
<section class="panel">
  <h2>Kelompok usia, 2024</h2>
  ${donutChart(AGE_GROUPS, { centerLabel: 'usia produktif', centerValue: '68,5%' })}
  <p>Dua dari tiga penduduk Indonesia berada di usia produktif (15–64 tahun). Bonus demografi ini mencapai puncaknya pada 2030-an.</p>
  ${src('BPS, 2024.')}
</section>
<section class="panel">
  <h2>Lima provinsi terpadat</h2>
  <table class="table">
    <thead><tr><th>#</th><th>Provinsi</th><th class="num">Penduduk</th><th class="num">Pangsa nasional</th></tr></thead>
    <tbody>${topRows}</tbody>
  </table>
  ${src('BPS, estimasi pertengahan 2024. Klik nama provinsi untuk rincian lengkapnya.')}
  <p><a href="#/regions">Lihat semua 38 provinsi &rarr;</a></p>
</section>`;
}

// ---- Ekonomi ----------------------------------------------------------------

export function economy(ui) {
  const chart =
    ui.economyChart === 'nominal'
      ? barChart(
          GDP_NOMINAL_SERIES.map((g) => ({ label: String(g.year), value: g.trillions })),
          { valueLabel: (v) => `US$ ${num(v, 2)} T`, unit: 'PDB nominal' },
        )
      : barChart(
          GDP_GROWTH_SERIES.map((g) => ({ label: String(g.year), value: g.pct })),
          { valueLabel: (v) => `${num(v, 2)}%`, highlightIndex: 1, unit: 'pertumbuhan PDB' },
        );
  return `${pageHead(
    'Ekonomi',
    'Ekonomi terbesar di Asia Tenggara: PDB US$ 1,40 triliun yang tumbuh 5,03% pada 2024, dengan inflasi yang terjaga di 1,57%.',
  )}
<section class="stats">
  ${stat('US$ 1,40 T', 'PDB 2024', 'Bank Dunia, 2024')}
  ${stat('US$ 4.925', 'PDB per kapita', 'Bank Dunia, 2024')}
  ${stat('+5,03%', 'Pertumbuhan 2024', 'BPS, 2024')}
  ${stat('1,57%', 'Inflasi 2024', 'BPS, 2024')}
  ${stat('4,76%', 'Pengangguran', 'BPS, Agu 2024')}
  ${stat('8,57%', 'Kemiskinan', 'BPS, Sep 2024')}
</section>
<section class="panel">
  <h2>Pertumbuhan PDB 2019–2024</h2>
  <div class="toggle" role="group" aria-label="Tampilan grafik ekonomi">
    <button data-economy-chart="growth" class="${ui.economyChart === 'growth' ? 'on' : ''}">Pertumbuhan (%)</button>
    <button data-economy-chart="nominal" class="${ui.economyChart === 'nominal' ? 'on' : ''}">PDB nominal (US$ T)</button>
  </div>
  ${chart}
  ${src(ui.economyChart === 'nominal' ? 'Bank Dunia, PDB nominal.' : 'BPS, pertumbuhan PDB riil. Batang 2020 berwarna kuning: kontraksi pandemi.')}
</section>
<section class="panel">
  <h2>Struktur PDB menurut sektor, 2024</h2>
  ${donutChart(GDP_SECTORS, { centerLabel: 'industri pengolahan', centerValue: '18,7%' })}
  <p>Industri pengolahan tetap penyumbang terbesar, diikuti perdagangan dan pertanian. “Sektor lainnya” mencakup keuangan, jasa perusahaan, kesehatan, pendidikan, dan pemerintahan.</p>
  ${src('BPS, 2024.')}
</section>
<section class="panel">
  <h2>Perdagangan luar negeri, 2024</h2>
  <div class="stats">
    ${stat('US$ 264,7 M', 'Ekspor', 'BPS, 2024')}
    ${stat('US$ 233,7 M', 'Impor', 'BPS, 2024')}
    ${stat('US$ 31,0 M', 'Surplus dagang', 'BPS, 2024')}
    ${stat('0,379', 'Koefisien Gini', 'BPS, Mar 2024')}
  </div>
  <p>Ekspor terbesar: batu bara, minyak sawit mentah, besi dan baja, serta nikel olahan. Mitra dagang utama: Tiongkok, Amerika Serikat, dan Jepang.</p>
  ${src('BPS, 2024. Gini 0,379 berarti ketimpangan pengeluaran berada di tingkat sedang.')}
</section>`;
}

// ---- Provinsi ----------------------------------------------------------------

function density(p) {
  return (p.pop * 1e6) / p.areaKm2;
}

function provinceRows(list) {
  return list
    .map(
      (p) =>
        `<tr>
          <td><a href="#/regions/${p.slug}">${esc(p.name)}</a></td>
          <td>${esc(p.capital)}</td>
          <td>${esc(p.island)}</td>
          <td class="num">${num(p.pop)} jt</td>
          <td class="num">${num(p.areaKm2, 0)} km²</td>
          <td class="num">${num(density(p), 0)} /km²</td>
        </tr>`,
    )
    .join('');
}

function provinceDetail(p) {
  const share = (p.pop / NATION.populationMillions) * 100;
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === p.slug) + 1;
  return `<section class="panel detail" id="province-detail">
  <h2>${esc(p.name)}</h2>
  <p class="muted">Peringkat penduduk #${rank} dari 38 provinsi · Ibu kota ${esc(p.capital)} · Pulau ${esc(p.island)}</p>
  <div class="stats">
    ${stat(`${num(p.pop)} jt`, 'Penduduk', 'BPS, 2024')}
    ${stat(`${num(p.areaKm2, 0)} km²`, 'Luas daratan', 'BPS, 2024')}
    ${stat(`${num(density(p), 0)} /km²`, 'Kepadatan', 'BPS, 2024')}
    ${stat(`${num(share, 1)}%`, 'Pangsa nasional', 'BPS, 2024')}
  </div>
  ${shareBar(share, { label: `Pangsa penduduk ${p.name} dari total nasional` })}
  <p>${esc(p.name)} berpenduduk ${num(p.pop)} juta jiwa — ${num(share, 1)}% dari penduduk Indonesia — di atas lahan ${num(p.areaKm2, 0)} km². Kepadatannya ${num(density(p), 0)} jiwa per km², dibanding rata-rata nasional 148 jiwa per km².</p>
  <p><a href="#/regions">Tutup rincian &rarr;</a></p>
</section>`;
}

export function regions(ui) {
  const q = ui.search.trim().toLowerCase();
  let list = PROVINCES.filter((p) => {
    if (ui.island !== 'Semua' && p.island !== ui.island) return false;
    if (q && !`${p.name} ${p.capital}`.toLowerCase().includes(q)) return false;
    return true;
  });
  if (ui.sort === 'pop-desc') list = [...list].sort((a, b) => b.pop - a.pop);
  else if (ui.sort === 'pop-asc') list = [...list].sort((a, b) => a.pop - b.pop);
  else if (ui.sort === 'density-desc') list = [...list].sort((a, b) => density(b) - density(a));
  else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'id'));
  const totalShown = list.reduce((s, p) => s + p.pop, 0);
  const selected = ui.detailSlug ? PROVINCES.find((p) => p.slug === ui.detailSlug) : null;
  const islandOptions = ['Semua', ...ISLANDS]
    .map((i) => `<option value="${esc(i)}"${ui.island === i ? ' selected' : ''}>${esc(i)}</option>`)
    .join('');
  return `${pageHead(
    'Provinsi',
    'Semua 38 provinsi: cari berdasarkan nama atau ibu kota, saring menurut pulau, urutkan berdasarkan penduduk atau kepadatan, dan klik nama provinsi untuk rincian.',
  )}
${selected ? provinceDetail(selected) : ''}
<section class="panel">
  <div class="controls">
    <label>Cari provinsi <input id="province-search" type="search" placeholder="Nama atau ibu kota…" value="${esc(ui.search)}" aria-label="Cari provinsi"></label>
    <label>Pulau
      <select id="island-filter" aria-label="Saring menurut pulau">${islandOptions}</select>
    </label>
    <label>Urutkan
      <select id="sort-order" aria-label="Urutkan provinsi">
        <option value="name"${ui.sort === 'name' ? ' selected' : ''}>Nama (A–Z)</option>
        <option value="pop-desc"${ui.sort === 'pop-desc' ? ' selected' : ''}>Penduduk terbanyak</option>
        <option value="pop-asc"${ui.sort === 'pop-asc' ? ' selected' : ''}>Penduduk tersedikit</option>
        <option value="density-desc"${ui.sort === 'density-desc' ? ' selected' : ''}>Terpadat</option>
      </select>
    </label>
  </div>
  <p class="muted" id="region-count">Menampilkan ${list.length} dari 38 provinsi · total ${num(totalShown, 1)} juta jiwa.</p>
  <div class="table-scroll">
  <table class="table">
    <thead><tr><th>Provinsi</th><th>Ibu kota</th><th>Pulau</th><th class="num">Penduduk</th><th class="num">Luas</th><th class="num">Kepadatan</th></tr></thead>
    <tbody>${list.length ? provinceRows(list) : '<tr><td colspan="6">Tidak ada provinsi yang cocok dengan pencarian ini.</td></tr>'}</tbody>
    <tfoot><tr><td colspan="3">Total 38 provinsi</td><td class="num">282,5 jt</td><td class="num">1.909.484 km²</td><td class="num">148 /km²</td></tr></tfoot>
  </table>
  </div>
  ${src('BPS, estimasi pertengahan 2024; luas daratan BPS 2024, dibulatkan. Jumlah provinsi 282,5 juta jiwa; angka nasional Bank Dunia 283,5 juta memakai metode yang sedikit berbeda.')}
</section>`;
}

// ---- Kesehatan & Pendidikan -------------------------------------------------

export function health() {
  return `${pageHead(
    'Kesehatan & Pendidikan',
    'Harapan hidup 74,6 tahun, stunting turun ke 21,5%, dan rata-rata lama sekolah 9,1 tahun — kesehatan dan pendidikan Indonesia dalam lima angka kunci.',
  )}
<section class="stats">
  ${stat('74,6 thn', 'Harapan hidup', 'BPS, 2024')}
  ${stat('75,02', 'Indeks Pembangunan Manusia', 'BPS, 2024')}
  ${stat('21,5%', 'Stunting balita', 'SSGI Kemenkes, 2023')}
  ${stat('9,1 thn', 'Rata-rata lama sekolah', 'BPS, 2024')}
  ${stat('13,2 thn', 'Harapan lama sekolah', 'BPS, 2024')}
  ${stat('96,8%', 'Melek huruf 15+', 'BPS, 2024')}
</section>
<section class="panel">
  <h2>Stunting balita 2018–2023 (%)</h2>
  ${barChart(
    STUNTING_SERIES.map((s) => ({ label: String(s.year), value: s.pct })),
    { valueLabel: (v) => `${num(v, 1)}%`, unit: 'prevalensi stunting' },
  )}
  <p>Prevalensi stunting turun 9,3 poin dalam lima tahun, tapi target pemerintah 14% pada 2024 belum tercapai: masih satu dari lima balita yang tumbuh di bawah standar.</p>
  ${src('SSGI, Kementerian Kesehatan. SSGI tidak dilakukan pada 2020, sehingga deretnya melompat dari 2019 ke 2021.')}
</section>
<section class="panel">
  <h2>Pendidikan: apa yang dicapai dan apa yang kurang</h2>
  <ul class="facts">
    <li><strong>Melek huruf 96,8%</strong> untuk penduduk usia 15 tahun ke atas — hampir seluruh penduduk dewasa bisa membaca dan menulis. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>Rata-rata lama sekolah 9,1 tahun</strong>: penduduk 25 tahun ke atas rata-rata tamat kelas 9, setara SMP. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>Harapan lama sekolah 13,2 tahun</strong>: anak yang mulai sekolah hari ini diperkirakan menempuh pendidikan hingga 13 tahun lebih, setara kelas 1 SMA. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>Ketimpangan antarprovinsi masih lebar</strong>: DKI Jakarta mencatat rata-rata lama sekolah 11,3 tahun, sementara Papua 6,7 tahun. <span class="muted">(BPS, 2024)</span></li>
  </ul>
</section>
<section class="panel">
  <h2>Kesehatan: apa yang dicapai dan apa yang kurang</h2>
  <ul class="facts">
    <li><strong>Harapan hidup 74,6 tahun</strong>, naik dari 71,3 tahun pada 2010. <span class="muted">(BPS, 2024)</span></li>
    <li><strong>Angka kematian ibu sekitar 189 per 100.000 kelahiran hidup</strong> — jauh di atas target pembangunan berkelanjutan 70 per 100.000. <span class="muted">(Kemenkes, 2020)</span></li>
    <li><strong>BPJS Kesehatan menanggung lebih dari 270 juta peserta</strong>, sekitar 95% penduduk, sejak 2024. <span class="muted">(BPJS Kesehatan, 2024)</span></li>
    <li><strong>IPM 75,02</strong> menempatkan Indonesia pada kategori pembangunan manusia “tinggi”. <span class="muted">(BPS, 2024)</span></li>
  </ul>
</section>`;
}

// ---- Lingkungan & Energi -----------------------------------------------------

export function environment() {
  return `${pageHead(
    'Lingkungan & Energi',
    '120,6 juta hektare kawasan hutan, deforestasi neto 175,5 ribu hektare pada 2023, dan bauran energi yang masih didominasi batu bara.',
  )}
<section class="stats">
  ${stat('120,6 jt ha', 'Kawasan hutan', 'KLHK, 2023')}
  ${stat('175,5 rb ha', 'Deforestasi neto 2023', 'KLHK, 2023')}
  ${stat('1,24 Gt CO₂e', 'Emisi GRK 2022', 'KLHK, 2022')}
  ${stat('836 jt ton', 'Produksi batu bara', 'ESDM, 2024')}
  ${stat('602 rb bph', 'Lifting minyak', 'SKK Migas, 2024')}
  ${stat('13,6%', 'Energi terbarukan', 'ESDM, 2023')}
</section>
<section class="panel">
  <h2>Deforestasi neto 2019–2023 (ribu hektare)</h2>
  ${barChart(
    DEFORESTATION_SERIES.map((d) => ({ label: String(d.year), value: d.thousandHa })),
    { valueLabel: (v) => num(v, 1), highlightIndex: 0, unit: 'deforestasi neto' },
  )}
  <p>Deforestasi jatuh tajam setelah 2019 berkat moratorium izin baru dan penegakan hukum, tetapi naik lagi pada 2023 — sebagian karena pembukaan lahan untuk perkebunan dan tambang.</p>
  ${src('KLHK. Deforestasi neto = bruto dikurangi rehabilitasi dan perhutanan kembali.')}
</section>
<section class="panel">
  <h2>Bauran energi primer, 2023</h2>
  ${donutChart(ENERGY_MIX, { centerLabel: 'batu bara', centerValue: '39,0%' })}
  <p>Batu bara masih sumber energi terbesar. Pemerintah menargetkan energi terbarukan 23% dari bauran primer pada 2025 — target yang belum tercapai pada 2023.</p>
  ${src('Kementerian ESDM, 2023.')}
</section>
<section class="panel">
  <h2>Fakta lingkungan lainnya</h2>
  <ul class="facts">
    <li><strong>Emisi gas rumah kaca 1,24 miliar ton CO₂e pada 2022</strong>, sebagian besar dari alih fungsi lahan dan kehutanan serta energi. <span class="muted">(KLHK, 2022)</span></li>
    <li><strong>Luas daratan 1,90 juta km²</strong> dengan garis pantai 99.093 km — salah satu yang terpanjang di dunia. <span class="muted">(BPS)</span></li>
    <li><strong>17.508 pulau</strong>, dan hanya sekitar 6.000 yang berpenghuni. <span class="muted">(BPS)</span></li>
    <li><strong>Produksi batu bara 836 juta ton pada 2024</strong>, menjadikan Indonesia eksportir batu bara termal terbesar di dunia. <span class="muted">(ESDM, 2024)</span></li>
  </ul>
</section>`;
}

// ---- Sumber data --------------------------------------------------------------

export function sources() {
  const rows = SOURCES.map(
    (s) =>
      `<tr><td><strong>${esc(s.publisher)}</strong></td><td>${esc(s.what)}</td><td>${esc(s.note)}</td></tr>`,
  ).join('');
  return `${pageHead(
    'Sumber data',
    'Setiap angka di situs ini berasal dari publikasi resmi. Berikut lembaga di balik angka-angka itu, apa yang mereka sediakan, dan catatan metodenya.',
  )}
<section class="panel">
  <div class="table-scroll">
  <table class="table">
    <thead><tr><th>Lembaga</th><th>Angka yang dipakai</th><th>Catatan metode</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  </div>
</section>
<section class="panel">
  <h2>Catatan tentang angka-angkanya</h2>
  <ul class="facts">
    <li><strong>Pembulatan:</strong> angka ditampilkan dengan satu desimal atau dibulatkan ke ribuan terdekat agar mudah dibaca; jumlah komponen bisa berbeda sedikit dari totalnya.</li>
    <li><strong>Dua angka penduduk:</strong> BPS mencatat 281,6 juta (estimasi pertengahan 2024), Bank Dunia 283,5 juta (2024). Keduanya benar menurut definisi masing-masing; situs ini memakai Bank Dunia untuk angka nasional dan BPS untuk per provinsi.</li>
    <li><strong>Tahun rujukan:</strong> setiap kartu angka dan grafik menyebut sumber dan tahunnya. Jika sebuah angka diperbarui penerbitnya, halaman ini memakai edisi terbaru yang dikutip.</li>
    <li><strong>Tidak ada data langsung:</strong> situs ini statis — semua angka tertulis di berkasnya sendiri dan tidak mengambil apa pun dari internet.</li>
  </ul>
</section>`;
}

// ---- Not found ---------------------------------------------------------------

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
<p>Tidak ada halaman statistik di alamat ini.</p>
<p><a href="#/">Kembali ke Beranda</a></p>`;
}
