# Olum Icons — Website

<p align="center">
  <img width="100" src="https://github.com/olumjs.png" alt="Olum logo">
</p>

<p align="center">
  <a href="https://icons.olumjs.top" target="_blank">icons.olumjs.top</a>
</p>

Source of the **olum-icons** website: a gallery for browsing every icon in the
[`olum-icons`](https://www.npmjs.com/package/olum-icons) package and copying its export name.

> This branch (`main`) holds the website only. The icon library itself lives on the
> version branches (`v0.1.2` … `v0.4.0`); publish and packaging work happens there, not here.

## Stack

- [OlumJS](https://olumjs.top) + `olum-router` / `olum-store` / `olum-transition`
- `olum-compiler` for dev server and build
- Tailwind CSS (compiled from `src/main.css` into `public/main.css`)
- Geist / Geist Mono, self-hosted from `public/fonts`

## Development

```bash
npm install
npm run dev
```

`dev` runs the Tailwind watcher and the OlumJS dev server together.

Other scripts:

| Script          | What it does                                                       |
| --------------- | ------------------------------------------------------------------ |
| `npm run css`   | One-off Tailwind build (`src/main.css` → `public/main.css`)         |
| `npm run build` | Builds into `docs/` and writes the `CNAME` for GitHub Pages         |
| `npm start`     | Serves the production build                                        |
| `npm run fonts` | Copies the Geist woff2 files from `node_modules` into `public/fonts`|

## Structure

```
public/       static assets, index.html, compiled main.css
src/
  page.html   landing page
  main.css    Tailwind entry and theme tokens
  components/ shared UI used by the site
  elements/   file-based routes (one folder per page)
  utils/      shared data, icon set, and page metadata
docs/         build output, served by GitHub Pages
```

Routing is file-based: a folder under `src/elements/` with a `page.html` becomes a route.

## Deployment

`npm run build` regenerates `docs/` (including `docs/CNAME` → `icons.olumjs.top`).
GitHub Pages serves that folder from `main`, so deploying is committing the rebuilt `docs/`.

## License

MIT — see [LICENSE.md](LICENSE.md). Icon artwork keeps the license of its upstream project
(Lucide, Heroicons, Font Awesome) — see the attribution shipped with the package.
