const path = require("path");
const fs = require("fs");
const { ls } = require("./helpers");

const metaFile = path.resolve(__dirname, "../dist/lucide.json");
const lucidePath = path.resolve(__dirname, "../svg/lucide");
// this object is made manually since it's needed only once
const mainCategories = {
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

const meta = {};

let count = 0;
fs.rmSync("./svg_out/lucide", { recursive: true, force: true });
if (fs.existsSync(lucidePath)) {
  const files = ls(lucidePath);
  const jsonFiles = files.filter((f) => path.extname(f) == ".json");

  jsonFiles.forEach((jsonFile) => {
    const svgFile = jsonFile.replace(/\.json$/, ".svg");
    const { categories, tags } = JSON.parse(
      fs.readFileSync(jsonFile).toString()
    );

    Object.keys(mainCategories).forEach((key) => {
      if (categories.includes(key)) {
        const name = mainCategories[key];
        const obj = { tags, name };
        meta[key] = obj;

        const catDir = `./svg_out/lucide/${key}`;
        fs.mkdirSync(catDir, { recursive: true, force: true });

        if (fs.existsSync(catDir)) {
          const fileName = path.basename(svgFile);
          const destFile = path.join(catDir, fileName);
          fs.copyFileSync(svgFile, destFile);
          count++;
        }
      }
    });
  });
}

console.log("handled " + count + " lucide svg files!");
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
