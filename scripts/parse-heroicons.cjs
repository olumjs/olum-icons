const path = require("path");
const fs = require("fs");

const srcDir = path.resolve(__dirname, "../svgs/heroicons");
const outDir = path.resolve(__dirname, "../svgs_out/heroicons");
const metaFile = path.resolve(__dirname, "../dist/heroicons.json");

if (!fs.existsSync(srcDir)) {
  console.error(srcDir + " doesn't exist, run `npm run extract` first!");
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });

const meta = {};

// one dir per variant, currently outline & solid
fs.readdirSync(srcDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .forEach(({ name: variant }) => {
    fs.mkdirSync(path.join(outDir, variant), { recursive: true });

    const svgFiles = fs
      .readdirSync(path.join(srcDir, variant))
      .filter((file) => path.extname(file) == ".svg");

    svgFiles.forEach((file) => {
      fs.copyFileSync(
        path.join(srcDir, variant, file),
        path.join(outDir, variant, file)
      );
    });

    meta[variant] = svgFiles.length;
  });

meta.total = Object.values(meta).reduce((sum, count) => sum + count, 0);
console.log("handled " + meta.total + " heroicons svg files!");

fs.mkdirSync(path.dirname(metaFile), { recursive: true });
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
