import fs from 'fs';

const tsFilePath = 'src/lib/vehicles.ts';
let tsContent = fs.readFileSync(tsFilePath, 'utf8');

const imageMapping = {
  "lexus-lm350h-2025": "/armada/Lexus-LM350H-2025.webp",
  "alphard-hybrid-2025": "/armada/alphard-hybrid-2025.webp",
  "toyota-alphard": "/armada/Toyota-Alphard-G-2018-2020.webp",
  "alphard-g-facelift": "/armada/Alphard-G-Facelift-2022-2023.webp",
  "toyota-alphard-g": "/armada/Toyota-Alphard-G-2018-2020.webp",
  "mercedes-c300": "/armada/Mercedes-C300.webp",
  "new-accord-turbo": "/armada/New-Accord-Turbo-2024.webp",
  "toyota-land-cruiser": "/armada/Land-Cruiser-2020.png",
  "mercedes-glc300": "/armada/Mercedes-GLC300.webp",
  "palisade-signature": "/armada/Palisade-Signature-2023.webp",
  "pajero-sport-dakar": "/armada/Pajero-Sport-Dakkar-2022-2023.webp",
  "fortuner-gr-sport": "/armada/Fortuner-2.8-GR-2022-2023.webp",
  "cr-v-turbo-prestige": "/armada/CRV-Turbo-Prestige-2020.webp",
  "mazda-cx-5-gt-kuro": "/armada/Mazda-CX5-GT-Kuro-2023.webp",
  "hyundai-ioniq-5-signature": "/armada/Hyundai-Ioniq-5-Signature-2024.webp",
  "honda-hr-v-se": "/armada/All-new-HRV-SE-2023.webp",
  "mitsubishi-xforce": "/armada/Mitsubishi-XForce-2024.webp",
  "city-hatchback-rs": "/armada/City-Hatchback-RS-2023.webp",
  "toyota-innova-zenix": "/armada/Zenix-Q-Hev-2024.webp",
  "toyota-voxy": "/armada/Voxy-2018-2019-(2-Sunroof).webp",
  "nissan-serena-highway-star": "/armada/Nissan-Serena-Highway-Star-2020.webp",
  "innova-venturer": "/armada/Innova-Venturer-2020-Diesel.webp",
  "toyota-innova-reborn": "/armada/innova-reborn-G-diesel-2024-2025.webp",
  "xpander-ultimate": "/armada/Xpander-Ultimate-2024.webp",
  "xpander-cross": "/armada/Xpander-Cross-2023.webp",
  "toyota-veloz-q": "/armada/Veloz-Q-2022.webp",
  "stargazer-x-prime": "/armada/Stargazer-X-Prime-2024.webp",
  "br-v-prestige": "/armada/BRV-Prestige-2022.webp"
};

const exceptions = ["toyota-hiace-premio", "avanza", "toyota-innova-reborn", "toyota-innova-zenix", "hiace", "innova-reborn", "innova-zenix", "innova-venturer"];

let lines = tsContent.split('\n');

let newLines = [];
let insideVehicle = false;
let currentVehicleLines = [];
let currentSlug = null;
let keepVehicle = true;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.trim() === '{' && lines[i+1] && lines[i+1].includes('slug:')) {
    insideVehicle = true;
    currentVehicleLines = [line];
    keepVehicle = true;
    currentSlug = null;
    continue;
  }

  if (insideVehicle) {
    currentVehicleLines.push(line);

    if (line.includes('slug:')) {
      const match = line.match(/slug:\s*"([^"]+)"/);
      if (match) {
        currentSlug = match[1];
        let mappedImage = imageMapping[currentSlug];
        
        let isException = exceptions.some(e => currentSlug.includes(e));
        
        if (!mappedImage && !isException) {
          keepVehicle = false;
          console.log("Removing:", currentSlug);
        } else if (mappedImage) {
          console.log("Updating image for:", currentSlug);
        } else {
          console.log("Keeping exception without image:", currentSlug);
        }
      }
    }

    if (line.includes('image:') && keepVehicle) {
      if (imageMapping[currentSlug]) {
        currentVehicleLines[currentVehicleLines.length - 1] = line.replace(/image:\s*"[^"]+"/, `image: "${imageMapping[currentSlug]}"`);
      }
    }

    // Check if it's the end of a vehicle object.
    // The format is `  },`
    if (line.startsWith('  },') || (line.startsWith('  }') && !lines[i+1].trim().startsWith('//'))) {
      // Need to be careful because `interior: [ { ... } ]` contains `}`.
      // We know `  },` at 2 spaces indentation is the end of the vehicle object.
      if (line === '  },' || line === '  }') {
         insideVehicle = false;
         if (keepVehicle) {
           newLines.push(...currentVehicleLines);
         }
      }
    }
  } else {
    newLines.push(line);
  }
}

fs.writeFileSync(tsFilePath, newLines.join('\n'));
console.log("Done");

