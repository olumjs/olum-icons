const path = require("path");
const fs = require("fs");

// unlike the other collections these are hand authored, not cloned
const srcDir = path.resolve(__dirname, "../src/icons");
const outDir = path.resolve(__dirname, "../svgs_out/olum");
const metaFile = path.resolve(__dirname, "../dist/olum.json");

if (!fs.existsSync(srcDir)) {
  console.error(srcDir + " doesn't exist!");
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const svgFiles = fs
  .readdirSync(srcDir)
  .filter((file) => path.extname(file) == ".svg");

svgFiles.forEach((file) => {
  fs.copyFileSync(path.join(srcDir, file), path.join(outDir, file));
});

const meta = { total: svgFiles.length };
console.log("handled " + meta.total + " olum svg files!");

fs.mkdirSync(path.dirname(metaFile), { recursive: true });
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
