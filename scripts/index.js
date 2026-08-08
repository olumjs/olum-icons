const path = require("path");
const fs = require("fs");
const { ls, toPascalCase } = require("./helpers");

const indexFile = path.resolve(__dirname, "../dist/index.js");
if (fs.existsSync(indexFile)) fs.unlinkSync(indexFile);

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

const barrelIndexFile = (name, dir) => {
  if (!fs.existsSync(indexFile)) fs.writeFileSync(indexFile, "");
  fs.appendFileSync(
    indexFile,
    `export { ${name} } from "./${dir}/${name}.js";\n`
  );
};

lucide();
