const path = require("path");
const fs = require("fs");

const srcDir = path.resolve(__dirname, "../svgs/lucide");
const outDir = path.resolve(__dirname, "../svgs_out/lucide");
const metaFile = path.resolve(__dirname, "../dist/lucide.json");

// slug -> display name, made manually since it's needed only once
const categoryNames = {
  accessibility: "Accessibility",
  account: "Accounts & access",
  animals: "Animals",
  arrows: "Arrows",
  buildings: "Buildings",
  charts: "Charts",
  communication: "Communication",
  connectivity: "Connectivity",
  cursors: "Cursors",
  design: "Design",
  development: "Coding & development",
  devices: "Devices",
  emoji: "Emoji",
  files: "File icons",
  finance: "Finance",
  "food-beverage": "Food & beverage",
  gaming: "Gaming",
  home: "Home",
  layout: "Layout",
  mail: "Mail",
  math: "Mathematics",
  medical: "Medical",
  multimedia: "Multimedia",
  navigation: "Navigation & Places",
  notifications: "Notification",
  people: "People",
  photography: "Photography",
  science: "Science",
  seasons: "Seasons",
  security: "Security",
  shapes: "Shapes",
  shopping: "Shopping",
  social: "Social",
  sports: "Sports",
  sustainability: "Sustainability",
  text: "Text formatting",
  time: "Time & calendar",
  tools: "Tools",
  transportation: "Transportation",
  travel: "Travel",
  weather: "Weather",
  nature: "Nature",
};

if (!fs.existsSync(srcDir)) {
  console.error(srcDir + " doesn't exist, run `npm run extract` first!");
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });

const meta = {};
const icons = new Set(); // an icon lives in many categories, count it once

fs.readdirSync(srcDir)
  .filter((file) => path.extname(file) == ".json")
  .forEach((jsonFile) => {
    const svgFile = jsonFile.replace(/\.json$/, ".svg");
    const { categories } = JSON.parse(
      fs.readFileSync(path.join(srcDir, jsonFile)).toString()
    );

    categories.forEach((key) => {
      const name = categoryNames[key];
      if (!name) return; // skip categories we don't ship

      if (!meta[key]) {
        meta[key] = { name, total: 0 };
        fs.mkdirSync(path.join(outDir, key), { recursive: true });
      }

      fs.copyFileSync(
        path.join(srcDir, svgFile),
        path.join(outDir, key, svgFile)
      );
      meta[key].total += 1;
      icons.add(svgFile);
    });
  });

meta.total = icons.size;
console.log("handled " + icons.size + " lucide svg files!");

fs.mkdirSync(path.dirname(metaFile), { recursive: true });
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
