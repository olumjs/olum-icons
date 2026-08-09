const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "svgs");
const map = JSON.parse(fs.readFileSync(path.resolve(root, "map.json")));

fs.rmSync(outDir, { recursive: true, force: true });

Object.entries(map).forEach(([name, src]) => {
  fs.cpSync(path.resolve(root, src), path.join(outDir, name), {
    recursive: true,
  });
  console.log("extracted " + name + " icons!");
});
