const path = require("path");
const fs = require("fs");
const { ls } = require("./helpers");

const heroiconsPath = path.resolve(__dirname, "../svg/heroicons");
const outDir = path.resolve(__dirname, "../svg_out/heroicons");

const meta = { solid: 0, outline: 0, total: 0 };
let count = 0;

// rm dir
fs.rmSync(path.join(outDir, "solid"), { recursive: true, force: true });
fs.rmSync(path.join(outDir, "outline"), { recursive: true, force: true });
// mkdir
fs.mkdirSync(path.join(outDir, "solid"), { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, "outline"), { recursive: true, force: true });

if (fs.existsSync(heroiconsPath)) {
  const files = ls(heroiconsPath);
  files.forEach((svgFile) => {
    if (fs.existsSync(svgFile) && fs.lstatSync(svgFile).isFile()) {
      const fileName = path.basename(svgFile);
      const dirName = path.dirname(svgFile).split("/").pop();
      const destFile = path.join(outDir, dirName, fileName);
      fs.copyFileSync(svgFile, destFile);
      if (dirName == "solid") meta.solid += 1;
      else if (dirName == "outline") meta.outline += 1;
      count++;
    }
  });
}
meta.total = count;
console.log("handled " + count + " heroicons svg files!");

const destDir = path.resolve(__dirname, "../dist");
fs.mkdirSync(destDir, { recursive: true, force: true }); // create dist dir if doesn't exist

const metaFile = path.resolve(destDir, "./heroicons.json");
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
