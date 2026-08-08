const path = require("path");
const fs = require("fs");

const isDir = (item) => fs.statSync(item).isDirectory();
const isWin = () => !["linux", "darwin"].includes(process.platform);
const hasForwardSlash = (paths) => paths.find((item) => /\//g.test(item));
const hasSlash = (paths) =>
  paths.find((item) => /\//g.test(item) || /\\/g.test(item));

function ls(src, opt) {
  let paths = [];

  if (!fs.existsSync(src)) {
    console.error(colors("red", src + " doesn't exist!"));
    return paths;
  }

  if (!fs.statSync(src).isDirectory()) {
    console.error(colors("red", src + " is NOT a directory!"));
    return paths;
  }

  let items = fs.readdirSync(src);
  items = items.map((item) => path.join(src, item));
  recursive(items);

  function recursive(arr) {
    if (!arr.length) return paths;
    arr.forEach(function (item) {
      paths.push(item);
      if (isDir(item)) {
        let newItems = fs.readdirSync(item);
        newItems = newItems.map((newItem) => path.join(item, newItem));
        recursive(newItems);
      }
    });
  }

  if (opt && opt.hasOwnProperty("absolute") && opt.absolute === false)
    paths = paths.map((item) => item.replace(src + "/", ""));

  if (hasSlash(paths)) {
    const hasForward = hasForwardSlash(paths);
    const win = isWin();
    if (win && hasForward) {
      paths = paths.map((item) => item.replace(/\//g, "\\"));
    } else if (!win && !hasForward) {
      paths = paths.map((item) => item.replace(/\\/g, "/"));
    }
  }

  return paths;
}

function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

module.exports.ls = ls;
module.exports.toPascalCase = toPascalCase;
