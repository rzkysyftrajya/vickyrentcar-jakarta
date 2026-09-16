import fs from 'fs';

const tsFilePath = 'src/lib/vehicles.ts';
let tsContent = fs.readFileSync(tsFilePath, 'utf8');

const targetSlugs = [
  'alphard-hybrid-2025',
  'toyota-alphard',
  'alphard-g-facelift',
  'toyota-alphard-g',
  'toyota-innova-zenix',
  'innova-venturer',
  'toyota-innova-reborn',
  'lexus-lm350h-2025' // Just in case since it is related to Alphard
];

let lines = tsContent.split('\n');
let newLines = [];
let insideTargetVehicle = false;
let insideInterior = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('slug:')) {
    const match = line.match(/slug:\s*"([^"]+)"/);
    if (match && targetSlugs.includes(match[1])) {
      insideTargetVehicle = true;
    } else {
      insideTargetVehicle = false;
    }
  }

  if (insideTargetVehicle && line.trim().startsWith('interior: [')) {
    insideInterior = true;
    continue; // Skip the start of interior
  }

  if (insideInterior) {
    if (line.trim() === '],') {
      insideInterior = false;
    }
    continue; // Skip lines inside interior
  }

  newLines.push(line);
}

fs.writeFileSync(tsFilePath, newLines.join('\n'));
console.log('Removed interior for targeted vehicles.');
