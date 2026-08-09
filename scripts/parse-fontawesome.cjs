const path = require("path");
const fs = require("fs");

const srcDir = path.resolve(__dirname, "../svgs/fontawesome");
const outDir = path.resolve(__dirname, "../svgs_out/fontawesome");
const metaFile = path.resolve(__dirname, "../dist/fontawesome.json");

if (!fs.existsSync(srcDir)) {
  console.error(srcDir + " doesn't exist, run `npm run extract` first!");
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });

const meta = {};

// one dir per style, currently brands, regular & solid
fs.readdirSync(srcDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .forEach(({ name: style }) => {
    fs.mkdirSync(path.join(outDir, style), { recursive: true });

    const svgFiles = fs
      .readdirSync(path.join(srcDir, style))
      .filter((file) => path.extname(file) == ".svg");

    svgFiles.forEach((file) => {
      fs.copyFileSync(
        path.join(srcDir, style, file),
        path.join(outDir, style, file)
      );
    });

    meta[style] = svgFiles.length;
  });

meta.total = Object.values(meta).reduce((sum, count) => sum + count, 0);
console.log("handled " + meta.total + " fontawesome svg files!");

fs.mkdirSync(path.dirname(metaFile), { recursive: true });
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
