const fs = require("fs");
const path = require("path");

function init() {
  fs.readdir(path.resolve(__dirname, "../svg"), (err, files) => {
    const exportsArr = [];
    const svgArr = [];
    files.forEach((file, index, array) => {
      fs.readFile(path.resolve(__dirname, "../svg/" + file), "utf8", (err, data) => {
        if (err) return console.error(err);

        let fileName = file.replace(/\-/g, "_");
        fileName = fileName.split(".");
        fileName.pop();
        fileName = fileName.join("").trim();
        fileName = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+fileName[0]) ? "_" + fileName : fileName; // add underscore before any name starts with number
        data = data.replace(/\<\!\-\-(.|\s)*?\-\-\>/gi, ""); // remove html comments
        const icon = "export const " + fileName + " = `" + data + "`;";

        svgArr.push({ svg: data, name: fileName });
        exportsArr.push(icon);

        if (index === array.length - 1) {
          makeModuleFile(exportsArr);
          makeUI(svgArr);
        }
      });
    });
  });
}

function makeModuleFile(exportsArr) {
  exportsArr = exportsArr.join("\n");
  const newPath = path.resolve(__dirname, "../dist/fa.js");
  fs.writeFile(newPath, exportsArr, err => {
    if (err) return console.error(err);
    console.log("done Module");
  });
}

function makeUI(svgArr) {
  const cards = svgArr.map(obj => {
      return `
      <div class="card" data-name="${obj.name}">
        <section>${obj.svg}</section>
        <section>
          <ul>
            <li><a href="javascript:void(0)" class="nameBtn" data-name="${obj.name}">Copy Name</a></li>
            <li><a href="javascript:void(0)" class="svgBtn">Copy SVG</a></li>
          </ul>
        </section>
        <div class="layer">Copied!</div>
      </div>
    `;
  }).join("\n");

  let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Olum Icons</title>
    <link rel="stylesheet" href="./src/app.css"/>
  </head>
  <body>
  
    <nav>
      <input type="text" placeholder="Search icons..." />
    </nav>
  
    <main>
      ${cards}
    </main>

    <script defer src="./src/app.js"></script>
  </body>
</html>`;

  const newPath = path.resolve(__dirname, "../index.html");
  fs.writeFile(newPath, html, err => {
    if (err) return console.error(err);
    console.log("done UI");
  });
}

init();
