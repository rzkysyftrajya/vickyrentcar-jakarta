import fs from 'fs';

// ── 1. vehicles.ts ─────────────────────────────────────────────────
const tsPath = 'src/lib/vehicles.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

// Remove all interior image imports (lines 2-17)
ts = ts.replace(/^import \w+Int\d from "@\/assets\/interior-[^"]+";[\r\n]*/gm, '');

// Remove the blank first line that might be left
ts = ts.replace(/^\n+/, '');

// Remove "interior?: GalleryImage[];" from the type
ts = ts.replace(/^\s*interior\??: GalleryImage\[\];[\r\n]*/m, '');

// Remove all interior: [ ... ], blocks (multi-line)
// They look like:
//     interior: [
//       { src: ..., label: "..." },
//       ...
//     ],
ts = ts.replace(/\n    interior: \[[\s\S]*?\n    \],/g, '');

fs.writeFileSync(tsPath, ts);
console.log('✓ vehicles.ts cleaned');

// ── 2. InteriorSlider.tsx ──────────────────────────────────────────
const sliderPath = 'src/components/InteriorSlider.tsx';
if (fs.existsSync(sliderPath)) {
  fs.unlinkSync(sliderPath);
  console.log('✓ InteriorSlider.tsx deleted');
}

console.log('All done.');
