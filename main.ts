// NusaData — hand-in program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files, no build step,
// nothing loaded over the network. This program copies app/ and screenshots/
// into the output directory and writes dossier.json there, using the vendored
// make.fun library (vendor/makefun-frontend.ts, copied from the kit unchanged).
// The dossier is the summary the judge reads: the screenshots, the first-load
// files and bytes, and the site's own source.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), shotsDir, { recursive: true });
}

// Caps from the competition's gate: at most 4 screenshots, each at most
// 256 KiB; app/ at most 993 files and directories and 16 MiB in all.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
