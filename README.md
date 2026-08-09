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

A simple wrapper for **Lucide, Heroicons, and Font Awesome** SVG icons.

## Installation

```bash
npm install olum-icons
```

## Usage

```js
import { Search } from "olum-icons/lucide";

console.log(Search);
```

Icons are exported as SVG strings, so they can be used with any framework or vanilla JavaScript.

Each collection has its own entry point, because the same icon name exists in more
than one of them:

```js
import { Search } from "olum-icons/lucide";
import { User } from "olum-icons/heroicons/solid";
import { User } from "olum-icons/heroicons/outline";
import { Heart } from "olum-icons/fontawesome/solid";
import { Heart } from "olum-icons/fontawesome/regular";
import { Github } from "olum-icons/fontawesome/brands";
```

A handful of Font Awesome icons start with a digit, which isn't a valid JavaScript
name, so they carry a leading underscore: `_0` to `_9`, `_11ty`, `_42Group`, `_500px`.

### OlumJS

```html
<Icon icon="{Search}" />
```
