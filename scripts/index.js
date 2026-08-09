const path = require("path");
const fs = require("fs");
const { ls, toPascalCase } = require("./helpers");

const counter = {
  lucide: 0,
  heroicons: 0,
};

const indexFile = path.resolve(__dirname, "../dist/index.js");
if (fs.existsSync(indexFile)) fs.unlinkSync(indexFile);

const barrelIndexFile = (name, dir) => {
  if (!fs.existsSync(indexFile)) fs.writeFileSync(indexFile, "");
  fs.appendFileSync(
    indexFile,
    `export { ${name} } from "./${dir}/${name}.js";\n`
  );
};

const lucide = () => {
  const lucidePath = path.resolve(__dirname, "../svg_out/lucide");
  const destDir = path.resolve(__dirname, "../dist/lucide");
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true, force: true });

  const seen = new Set();
  if (fs.existsSync(lucidePath)) {
    const files = ls(lucidePath);
    const uniquePaths = files.filter((filePath) => {
      const basename = path.basename(filePath);
      if (seen.has(basename)) return false;
      seen.add(basename);
      return true;
    });

    uniquePaths.forEach((file) => {
      if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        const svgName = toPascalCase(path.basename(file).replace(/\.svg$/, ""));
        if (svgName) {
          counter.lucide += 1;
          const svgContent = fs.readFileSync(file).toString();
          const svgModule = `export const ${svgName} = \`${svgContent}\`;`;
          const svgFilePath = path.resolve(destDir, svgName + ".js");
          fs.writeFileSync(svgFilePath, svgModule);
          barrelIndexFile(svgName, "lucide");
        }
      }
    });
  }
};

const heroicons = () => {
  const heroiconsPath = path.resolve(__dirname, "../svg_out/heroicons");
  const destDir = path.resolve(__dirname, "../dist/heroicons");
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(destDir, "solid"), { recursive: true, force: true });
  fs.mkdirSync(path.join(destDir, "outline"), { recursive: true, force: true });

  if (fs.existsSync(heroiconsPath)) {
    const files = ls(heroiconsPath);
    files.forEach((file) => {
      if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        const svgName = toPascalCase(path.basename(file).replace(/\.svg$/, ""));
        if (svgName) {
          counter.heroicons += 1;
          const svgContent = fs.readFileSync(file).toString();
          const svgModule = `export const ${svgName} = \`${svgContent}\`;`;
          const dir = path.dirname(file).split("/").pop();
          const svgFilePath = path.resolve(destDir, dir, svgName + ".js"); // include outline/solid dirs
          fs.writeFileSync(svgFilePath, svgModule);
          barrelIndexFile(svgName, "heroicons/" + dir);
        }
      }
    });
  }
};

lucide();
heroicons();
console.log(counter);
