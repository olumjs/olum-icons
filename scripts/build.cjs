const path = require("path");
const fs = require("fs");
const { toPascalCase } = require("./helpers.cjs");

const srcRoot = path.resolve(__dirname, "../svgs_out");
const distRoot = path.resolve(__dirname, "../dist");

if (!fs.existsSync(srcRoot)) {
  console.error(srcRoot + " doesn't exist, run the parse scripts first!");
  process.exit(1);
}

const counter = {};

// js identifiers can't start with a digit, a few font awesome icons do (0-9, 500px, 11ty)
const toModuleName = (file) => {
  const name = toPascalCase(path.basename(file, ".svg"));
  return /^[A-Za-z_$]/.test(name) ? name : "_" + name;
};

const svgsIn = (dir) =>
  fs
    .readdirSync(dir, { recursive: true })
    .filter((file) => path.extname(file) == ".svg");

// one module per icon + the barrel that re-exports them all
const writeModules = (srcDir, files, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });

  const barrel = [];
  const seen = new Set(); // lucide repeats an icon in every category it belongs to

  files.forEach((file) => {
    const name = toModuleName(file);
    if (seen.has(name)) return;
    seen.add(name);

    const svg = fs.readFileSync(path.join(srcDir, file)).toString().trim();
    fs.writeFileSync(
      path.join(destDir, name + ".js"),
      `export const ${name} = \`${svg}\`;\n`
    );
    barrel.push(`export { ${name} } from "./${name}.js";`);
  });

  fs.writeFileSync(path.join(destDir, "index.js"), barrel.join("\n") + "\n");
  return seen.size;
};

const reset = (collection) => {
  const destDir = path.join(distRoot, collection);
  fs.rmSync(destDir, { recursive: true, force: true });
  return destDir;
};

// olum's own icons sit in dist itself, so they import from "olum-icons" directly
const rootLevel = (collection) => {
  fs.mkdirSync(distRoot, { recursive: true });

  // only the generated modules go, the collection dirs and meta json stay put
  fs.readdirSync(distRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) == ".js")
    .forEach((entry) => fs.rmSync(path.join(distRoot, entry.name)));

  const srcDir = path.join(srcRoot, collection);
  counter[collection] = writeModules(srcDir, svgsIn(srcDir), distRoot);
};

// lucide ships flat, its category dirs only exist to build the meta file
const flat = (collection) => {
  const srcDir = path.join(srcRoot, collection);
  counter[collection] = writeModules(srcDir, svgsIn(srcDir), reset(collection));
};

// one entry point per variant, since the same name exists in each of them
const byVariant = (collection) => {
  const srcDir = path.join(srcRoot, collection);
  const destDir = reset(collection);
  counter[collection] = 0;

  fs.readdirSync(srcDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach(({ name: variant }) => {
      const variantDir = path.join(srcDir, variant);
      counter[collection + "/" + variant] = writeModules(
        variantDir,
        svgsIn(variantDir),
        path.join(destDir, variant)
      );
      counter[collection] += counter[collection + "/" + variant];
    });
};

flat("lucide");
byVariant("heroicons");
byVariant("fontawesome");
rootLevel("olum"); // last, so dist only holds our own icons at its root

console.log(counter);
