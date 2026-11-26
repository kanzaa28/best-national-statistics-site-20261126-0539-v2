// NusaData — router and interaction wiring.
//
// Hash routes (each reached by a link in the nav):
//   #/                 Beranda
//   #/population       Penduduk
//   #/economy          Ekonomi
//   #/regions          Provinsi (table + search / filter / sort)
//   #/regions/<slug>   Provinsi, with one province's detail open
//   #/health           Kesehatan & Pendidikan
//   #/environment      Lingkungan & Energi
//   #/sources          Sumber data
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PAGES, PROVINCES } from './data.js';
import { economy, environment, health, home, missing, nav, population, regions, sources } from './views.js';

const app = document.getElementById('app');
const headerNav = document.getElementById('site-nav');

// Interactive state, kept here so a control keeps its value while the user
// moves between pages. The region controls live only on the Provinces page,
// the chart toggles on Beranda and Ekonomi.
const ui = {
  homeChart: 'total',
  economyChart: 'growth',
  search: '',
  island: 'Semua',
  sort: 'name',
  detailSlug: null,
};

function pageFor(route) {
  const [base, slug] = route.split('/');
  if (base === 'population') return { name: 'population', render: () => population() };
  if (base === 'economy') return { name: 'economy', render: () => economy(ui) };
  if (base === 'regions') {
    ui.detailSlug = slug && PROVINCES.some((p) => p.slug === slug) ? slug : null;
    return { name: 'regions', render: () => regions(ui) };
  }
  if (base === 'health') return { name: 'health', render: () => health() };
  if (base === 'environment') return { name: 'environment', render: () => environment() };
  if (base === 'sources') return { name: 'sources', render: () => sources() };
  if (base === '') return { name: '', render: () => home(ui) };
  return { name: null, render: () => missing() };
}

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#\/?/, '');
  const page = pageFor(route);
  const title = PAGES.find((p) => p.route === page.name);
  document.title = title ? `${title.title} | NusaData — Indonesia dalam Angka` : 'NusaData — Indonesia dalam Angka';
  headerNav.innerHTML = nav(page.name ?? '');
  app.innerHTML = page.render();
  wireControls(page.name);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Hook the controls on the page that was just rendered. Controls re-render
// in place: typing in the province search re-renders the table but keeps the
// caret in the box by restoring focus and the caret position afterwards.
function wireControls(pageName) {
  const homeButtons = app.querySelectorAll('[data-home-chart]');
  homeButtons.forEach((b) => {
    b.addEventListener('click', () => {
      ui.homeChart = b.dataset.homeChart;
      render();
    });
  });
  const economyButtons = app.querySelectorAll('[data-economy-chart]');
  economyButtons.forEach((b) => {
    b.addEventListener('click', () => {
      ui.economyChart = b.dataset.economyChart;
      render();
    });
  });
  if (pageName !== 'regions') return;
  const search = document.getElementById('province-search');
  const island = document.getElementById('island-filter');
  const sort = document.getElementById('sort-order');
  if (!search || !island || !sort) return;
  search.addEventListener('input', () => {
    ui.search = search.value;
    const caret = search.selectionStart;
    render();
    const again = document.getElementById('province-search');
    again.focus();
    again.setSelectionRange(caret, caret);
  });
  island.addEventListener('change', () => {
    ui.island = island.value;
    render();
  });
  sort.addEventListener('change', () => {
    ui.sort = sort.value;
    render();
  });
}

window.addEventListener('hashchange', render);
render();
