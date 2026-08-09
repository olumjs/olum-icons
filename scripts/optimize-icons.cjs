const path = require("path");
const fs = require("fs");
const { optimize } = require("svgo");

const srcDir = path.resolve(__dirname, "../svgs_out");

// removeViewBox is NOT part of preset-default in svgo v4, so icons stay scalable.
// preservePatterns:false also drops the "<!--!" legal comments font awesome ships,
// their attribution lives in attribution.md instead
const config = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: { overrides: { removeComments: { preservePatterns: false } } },
    },
  ],
};

const toKb = (bytes) => (bytes / 1024).toFixed(1) + "kb";

if (!fs.existsSync(srcDir)) {
  console.error(srcDir + " doesn't exist, run the parse scripts first!");
  process.exit(1);
}

const stats = {};

fs.readdirSync(srcDir, { recursive: true })
  .filter((file) => path.extname(file) == ".svg")
  .forEach((file) => {
    const svgFile = path.join(srcDir, file);
    const svg = fs.readFileSync(svgFile).toString();
    const { data } = optimize(svg, { path: svgFile, ...config });
    fs.writeFileSync(svgFile, data);

    const collection = file.split(path.sep)[0];
    if (!stats[collection]) stats[collection] = { files: 0, before: 0, after: 0 };
    stats[collection].files += 1;
    stats[collection].before += Buffer.byteLength(svg);
    stats[collection].after += Buffer.byteLength(data);
  });

const total = { files: 0, before: 0, after: 0 };

Object.entries(stats).forEach(([collection, stat]) => {
  const saved = ((1 - stat.after / stat.before) * 100).toFixed(1);
  console.log(
    `optimized ${stat.files} ${collection} svg files, ` +
      `${toKb(stat.before)} -> ${toKb(stat.after)} (-${saved}%)`
  );
  total.files += stat.files;
  total.before += stat.before;
  total.after += stat.after;
});

const saved = ((1 - total.after / total.before) * 100).toFixed(1);
console.log(
  `optimized ${total.files} svg files in total, ` +
    `${toKb(total.before)} -> ${toKb(total.after)} (-${saved}%)`
);
