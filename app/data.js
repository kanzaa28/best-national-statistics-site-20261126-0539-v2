// NusaData — all the numbers the site shows, in one place.
// Every figure carries its source and year where the page displays it.
// Populations are BPS mid-2024 estimates in millions; areas are land area
// in square kilometres (BPS, 2024), both rounded. Figures are rounded for
// reading; the sources page explains the rounding and the method notes.

export const NATION = {
  name: 'Indonesia',
  populationMillions: 283.5,
  populationSource: 'Bank Dunia, 2024',
  provinces: 38,
  islands: 17508,
  landAreaKm2: 1904569,
  coastlineKm: 99093,
  gdpUsdTrillion: 1.4,
  gdpGrowth2024: 5.03,
  gdpPerCapitaUsd: 4925,
  medianAge: 30.5,
  densityPerKm2: 148,
  urbanSharePct: 59.4,
  fertilityRate: 2.1,
};

// Population in millions, 2019-2024 (BPS, mid-year estimates).
export const POPULATION_SERIES = [
  { year: 2019, millions: 266.9 },
  { year: 2020, millions: 270.2 },
  { year: 2021, millions: 272.2 },
  { year: 2022, millions: 275.8 },
  { year: 2023, millions: 278.7 },
  { year: 2024, millions: 281.6 },
];

// Share of the population by age group (BPS, 2024).
export const AGE_GROUPS = [
  { label: '0–14 tahun', pct: 24.0 },
  { label: '15–64 tahun', pct: 68.5 },
  { label: '65 tahun ke atas', pct: 7.5 },
];

// Real GDP growth, % per year (BPS).
export const GDP_GROWTH_SERIES = [
  { year: 2019, pct: 5.02 },
  { year: 2020, pct: -2.07 },
  { year: 2021, pct: 3.7 },
  { year: 2022, pct: 5.31 },
  { year: 2023, pct: 5.05 },
  { year: 2024, pct: 5.03 },
];

// Nominal GDP in trillion US dollars (Bank Dunia).
export const GDP_NOMINAL_SERIES = [
  { year: 2019, trillions: 1.12 },
  { year: 2020, trillions: 1.06 },
  { year: 2021, trillions: 1.19 },
  { year: 2022, trillions: 1.32 },
  { year: 2023, trillions: 1.37 },
  { year: 2024, trillions: 1.4 },
];

// Share of GDP by sector, 2024 (BPS).
export const GDP_SECTORS = [
  { label: 'Industri pengolahan', pct: 18.7 },
  { label: 'Perdagangan', pct: 13.0 },
  { label: 'Pertanian, kehutanan, perikanan', pct: 11.9 },
  { label: 'Konstruksi', pct: 10.1 },
  { label: 'Pertambangan dan penggalian', pct: 8.3 },
  { label: 'Transportasi dan pergudangan', pct: 5.9 },
  { label: 'Informasi dan komunikasi', pct: 4.1 },
  { label: 'Sektor lainnya', pct: 28.0 },
];

// Stunting prevalence among children under five, % (SSGI, Kemenkes).
export const STUNTING_SERIES = [
  { year: 2018, pct: 30.8 },
  { year: 2019, pct: 27.7 },
  { year: 2021, pct: 24.4 },
  { year: 2022, pct: 21.6 },
  { year: 2023, pct: 21.5 },
];

// Net deforestation, thousand hectares per year (KLHK).
export const DEFORESTATION_SERIES = [
  { year: 2019, thousandHa: 462.5 },
  { year: 2020, thousandHa: 115.5 },
  { year: 2021, thousandHa: 113.4 },
  { year: 2022, thousandHa: 104.0 },
  { year: 2023, thousandHa: 175.5 },
];

// Primary energy mix, % (ESDM, 2023).
export const ENERGY_MIX = [
  { label: 'Batu bara', pct: 39.0 },
  { label: 'Minyak bumi', pct: 30.5 },
  { label: 'Gas bumi', pct: 16.9 },
  { label: 'Energi terbarukan', pct: 13.6 },
];

// All 38 provinces. pop = population in millions (BPS mid-2024 estimate,
// rounded to one decimal); areaKm2 = land area (BPS, 2024, rounded).
// island groups the provinces for the filter on the Provinces page.
export const PROVINCES = [
  { slug: 'aceh', name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatera', pop: 5.5, areaKm2: 57956 },
  { slug: 'sumatera-utara', name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatera', pop: 15.7, areaKm2: 72981 },
  { slug: 'sumatera-barat', name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatera', pop: 5.8, areaKm2: 42013 },
  { slug: 'riau', name: 'Riau', capital: 'Pekanbaru', island: 'Sumatera', pop: 6.7, areaKm2: 87024 },
  { slug: 'jambi', name: 'Jambi', capital: 'Jambi', island: 'Sumatera', pop: 3.7, areaKm2: 50058 },
  { slug: 'sumatera-selatan', name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatera', pop: 8.9, areaKm2: 91592 },
  { slug: 'kepulauan-bangka-belitung', name: 'Kepulauan Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatera', pop: 1.5, areaKm2: 16424 },
  { slug: 'bengkulu', name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatera', pop: 2.1, areaKm2: 19919 },
  { slug: 'lampung', name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatera', pop: 9.3, areaKm2: 34624 },
  { slug: 'kepulauan-riau', name: 'Kepulauan Riau', capital: 'Tanjung Pinang', island: 'Sumatera', pop: 2.2, areaKm2: 8202 },
  { slug: 'dki-jakarta', name: 'DKI Jakarta', capital: 'Jakarta', island: 'Jawa', pop: 10.6, areaKm2: 664 },
  { slug: 'jawa-barat', name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', pop: 50.4, areaKm2: 35378 },
  { slug: 'jawa-tengah', name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', pop: 38.1, areaKm2: 32801 },
  { slug: 'di-yogyakarta', name: 'DI Yogyakarta', capital: 'Yogyakarta', island: 'Jawa', pop: 3.8, areaKm2: 3133 },
  { slug: 'jawa-timur', name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', pop: 42.0, areaKm2: 47803 },
  { slug: 'banten', name: 'Banten', capital: 'Serang', island: 'Jawa', pop: 12.5, areaKm2: 9662 },
  { slug: 'bali', name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', pop: 4.4, areaKm2: 5780 },
  { slug: 'nusa-tenggara-barat', name: 'Nusa Tenggara Barat', capital: 'Mataram', island: 'Bali & Nusa Tenggara', pop: 5.7, areaKm2: 18572 },
  { slug: 'nusa-tenggara-timur', name: 'Nusa Tenggara Timur', capital: 'Kupang', island: 'Bali & Nusa Tenggara', pop: 5.7, areaKm2: 47931 },
  { slug: 'kalimantan-barat', name: 'Kalimantan Barat', capital: 'Pontianak', island: 'Kalimantan', pop: 5.9, areaKm2: 147307 },
  { slug: 'kalimantan-tengah', name: 'Kalimantan Tengah', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.8, areaKm2: 153564 },
  { slug: 'kalimantan-selatan', name: 'Kalimantan Selatan', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.2, areaKm2: 38744 },
  { slug: 'kalimantan-timur', name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan', pop: 4.0, areaKm2: 129066 },
  { slug: 'kalimantan-utara', name: 'Kalimantan Utara', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.7, areaKm2: 75467 },
  { slug: 'sulawesi-utara', name: 'Sulawesi Utara', capital: 'Manado', island: 'Sulawesi', pop: 2.7, areaKm2: 13892 },
  { slug: 'sulawesi-tengah', name: 'Sulawesi Tengah', capital: 'Palu', island: 'Sulawesi', pop: 3.1, areaKm2: 61841 },
  { slug: 'sulawesi-selatan', name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', pop: 9.4, areaKm2: 46717 },
  { slug: 'sulawesi-tenggara', name: 'Sulawesi Tenggara', capital: 'Kendari', island: 'Sulawesi', pop: 2.8, areaKm2: 38140 },
  { slug: 'gorontalo', name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.2, areaKm2: 11257 },
  { slug: 'sulawesi-barat', name: 'Sulawesi Barat', capital: 'Mamuju', island: 'Sulawesi', pop: 1.6, areaKm2: 16787 },
  { slug: 'maluku', name: 'Maluku', capital: 'Ambon', island: 'Maluku', pop: 2.0, areaKm2: 46914 },
  { slug: 'maluku-utara', name: 'Maluku Utara', capital: 'Sofifi', island: 'Maluku', pop: 1.4, areaKm2: 31983 },
  { slug: 'papua', name: 'Papua', capital: 'Jayapura', island: 'Papua', pop: 1.1, areaKm2: 82680 },
  { slug: 'papua-barat', name: 'Papua Barat', capital: 'Manokwari', island: 'Papua', pop: 1.2, areaKm2: 64125 },
  { slug: 'papua-selatan', name: 'Papua Selatan', capital: 'Merauke', island: 'Papua', pop: 0.5, areaKm2: 117849 },
  { slug: 'papua-tengah', name: 'Papua Tengah', capital: 'Nabire', island: 'Papua', pop: 1.3, areaKm2: 61073 },
  { slug: 'papua-pegunungan', name: 'Papua Pegunungan', capital: 'Wamena', island: 'Papua', pop: 1.4, areaKm2: 51213 },
  { slug: 'papua-barat-daya', name: 'Papua Barat Daya', capital: 'Sorong', island: 'Papua', pop: 0.6, areaKm2: 38348 },
];

// Distinct island groups in display order.
export const ISLANDS = [
  'Sumatera',
  'Jawa',
  'Bali & Nusa Tenggara',
  'Kalimantan',
  'Sulawesi',
  'Maluku',
  'Papua',
];

// The site's pages, in nav order. route is the hash path.
export const PAGES = [
  { route: '', title: 'Beranda', label: 'Beranda' },
  { route: 'population', title: 'Penduduk', label: 'Penduduk' },
  { route: 'economy', title: 'Ekonomi', label: 'Ekonomi' },
  { route: 'regions', title: 'Provinsi', label: 'Provinsi' },
  { route: 'health', title: 'Kesehatan & Pendidikan', label: 'Kesehatan & Pendidikan' },
  { route: 'environment', title: 'Lingkungan & Energi', label: 'Lingkungan & Energi' },
  { route: 'sources', title: 'Sumber data', label: 'Sumber data' },
];

// Where each headline figure comes from, for the Sources page.
export const SOURCES = [
  {
    publisher: 'Badan Pusat Statistik (BPS)',
    what: 'Jumlah dan pertumbuhan penduduk, PDB dan pertumbuhan ekonomi, inflasi, pengangguran, kemiskinan, koefisien Gini, Indeks Pembangunan Manusia, harapan hidup, lama sekolah, luas wilayah dan penduduk tiap provinsi.',
    note: 'Statistik resmi Indonesia; angka tahunan, estimasi pertengahan tahun untuk penduduk.',
  },
  {
    publisher: 'Bank Dunia (World Bank)',
    what: 'Jumlah penduduk 2024 (283,5 juta), PDB nominal 2024 (US$ 1,40 triliun), PDB per kapita (US$ 4.925), pangsa penduduk perkotaan, usia median.',
    note: 'World Development Indicators, edisi 2024; definisi dan tahun rujukannya sedikit berbeda dari BPS.',
  },
  {
    publisher: 'Kementerian Kesehatan (Kemenkes)',
    what: 'Prevalensi stunting balita 2018–2023 dari Survei Status Gizi Indonesia (SSGI).',
    note: 'SSGI tidak dilakukan pada 2020, sehingga deretnya melompat dari 2019 ke 2021.',
  },
  {
    publisher: 'Kementerian Lingkungan Hidup dan Kehutanan (KLHK)',
    what: 'Luas kawasan hutan, deforestasi neto tahunan, emisi gas rumah kaca.',
    note: 'Deforestasi dihitung dari citra satelit; angka 2023 adalah deforestasi neto (bruto dikurangi rehabilitasi).',
  },
  {
    publisher: 'Kementerian ESDM',
    what: 'Bauran energi primer, produksi batu bara dan minyak bumi.',
    note: 'Handbook of Energy and Economic Statistics of Indonesia; angka produksi adalah realisasi tahunan.',
  },
  {
    publisher: 'SKK Migas',
    what: 'Lifting minyak bumi 2024 (602 ribu barel per hari).',
    note: 'Lifting adalah minyak yang diserahkan ke negara, bukan produksi kotor lapangan.',
  },
];
