const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const force = process.argv.includes("--clone");

// pipelines, each one is an npm script so package.json stays the single source of truth
const steps = ["clean", "clone", "extract", "parse", "optimize", "build"];

const run = (step) => {
  console.log("\n> " + step);
  // one string instead of an args array, node deprecates the latter with shell:true
  const { status, error } = spawnSync("npm run " + step, {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });

  if (error) throw error;
  if (status !== 0) {
    console.error(step + " failed!");
    process.exit(status);
  }
};

const started = Date.now();

steps.forEach((step) => {
  // cloning is a ~375mb download, skip it when the repos are already there
  if (step == "clone" && !force && fs.existsSync(path.join(root, "repos"))) {
    console.log("\n> clone skipped, repos are already cloned (--clone to force)");
    return;
  }
  run(step);
});

console.log("\ndone in " + ((Date.now() - started) / 1000).toFixed(1) + "s");
