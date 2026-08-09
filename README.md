# Olum Icons

<p align="center">
  <img width="100" src="https://github.com/olumjs.png" alt="Olum logo">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/olum-icons" target="_blank">
    <img src="https://img.shields.io/npm/v/olum-icons" alt="npm">
  </a>
  <img src="https://img.shields.io/npm/dm/olum-icons" alt="npm">
  <img src="https://img.shields.io/npm/l/olum-icons" alt="license">
</p>

The Olum icon set, plus a framework-agnostic wrapper around **Lucide, Heroicons and
Font Awesome**. Every icon is exported as a plain SVG string, so it works with any
framework or with vanilla JavaScript.

## Installation

```bash
npm install olum-icons
```

## Usage

The package root holds Olum's own icons:

```js
import { Olum, OlumCircle } from "olum-icons";

console.log(Olum); // "<svg xmlns=... />"
```

Every other collection has its own entry point, because the same icon name exists in
more than one of them (`User` is in both Heroicons variants, `Heart` is in two Font
Awesome styles, and 381 names are shared between Font Awesome and Lucide):

```js
import { Search } from "olum-icons/lucide";
import { User } from "olum-icons/heroicons/outline";
import { User as UserSolid } from "olum-icons/heroicons/solid";
import { Heart } from "olum-icons/fontawesome/regular";
import { Github } from "olum-icons/fontawesome/brands";
```

### Entry points

| Import path                     | Icons | Source              |
| ------------------------------- | ----: | ------------------- |
| `olum-icons`                    |     2 | Olum                |
| `olum-icons/lucide`             |  1766 | Lucide              |
| `olum-icons/heroicons/outline`  |   324 | Heroicons           |
| `olum-icons/heroicons/solid`    |   324 | Heroicons           |
| `olum-icons/fontawesome/solid`  |  2001 | Font Awesome Free   |
| `olum-icons/fontawesome/regular`|   273 | Font Awesome Free   |
| `olum-icons/fontawesome/brands` |   609 | Font Awesome Free   |

### Naming

Icon names are PascalCase versions of their original file names, so `arrow-up-right.svg`
becomes `ArrowUpRight`.

A few Font Awesome icons start with a digit, which isn't a valid JavaScript identifier,
so they carry a leading underscore: `_0` through `_9`, `_11ty`, `_42Group` and `_500px`.

### Styling

Every icon uses `fill="currentColor"` or `stroke="currentColor"`, so colour is inherited
from the surrounding text:

```html
<span style="color: #25C97E">
  <!-- icon renders in brand green -->
</span>
```

Sizing differs by collection, because each upstream ships its icons differently. Olum and
Lucide icons declare `width="24" height="24"`; Heroicons and Font Awesome declare only a
`viewBox` and therefore expand to fill their container. To get consistent sizing, set it
in CSS:

```css
svg {
  width: 1.5rem;
  height: 1.5rem;
}
```

### OlumJS

```html
<Icon icon="{Search}" />
```

## Development

The icons are generated from upstream repositories rather than committed. The whole
pipeline runs with a single command:

```bash
npm start
```

That runs each stage in order, and can also be run individually:

| Script           | Does                                                        |
| ---------------- | ----------------------------------------------------------- |
| `npm run clean`  | removes `svgs`, `svgs_out` and `dist`                        |
| `npm run clone`  | clones the upstream repos listed in `downloader.sh`          |
| `npm run extract`| copies icons out of the clones into `svgs` using `map.json`  |
| `npm run parse`  | sorts each collection into `svgs_out` and writes its meta    |
| `npm run optimize`| runs SVGO over everything in `svgs_out`                     |
| `npm run build`  | writes the ES modules and barrel files into `dist`           |

Cloning is skipped when `repos/` already exists, since it is a large download. Force a
fresh clone with `npm start -- --clone`.

Olum's own icons live in `src/icons` and are the only hand-authored ones; drop a new
`.svg` in there and it flows through the pipeline automatically.

## License

The wrapper is MIT licensed, see [LICENSE.md](./LICENSE.md).

The icons themselves stay under their original licenses — Font Awesome Free icons are
CC BY 4.0, Heroicons is MIT, and Lucide is ISC with a subset under MIT. Full notices,
including the required attribution and notice of modification, are in
[attribution.md](./attribution.md).
