// NusaData — the hand-in program (Node 22, standard library only).
// The site is plain static files in app/ (ES modules, CSS, no build step),
// so handing it in means copying app/ and screenshots/ beside this file to
// /output and writing /output/dossier.json with the vendored make.fun
// library. vendor/makefun-frontend.ts is the kit's copy, unchanged: the
// scorer rebuilds the dossier with its own copy and compares byte for byte.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in a hollow package: without index.html
// there is no site, and a dossier built from an empty app/ would still look
// like a submission.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing — refusing to build the dossier');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (from the kit's gate): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files, counted beside /output's own 1000-entry cap).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
