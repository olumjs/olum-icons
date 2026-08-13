// Real per-source icon groups. Counts are derived from icon-names.js so they
// never drift out of sync with the actual generated data (see
// scripts/build-icons.mjs). License text confirmed against
// node_modules/olum-icons/attribution.md and LICENSE.md.
import names from "./icon-names.js";

// modulePath matches olum-icons' real entry points (see its README) so the
// "Copy import statement" action produces something that actually resolves.
// Named modulePath rather than importPath -- the compiler's dependency
// scanner matches "import" as a bare substring, even inside an identifier
// name, and treats "importPath" itself as the start of a fake import to
// resolve, which crashes the build.
export const SOURCES = [
  { id: "lucide", label: "Lucide", license: "ISC", count: names.lucide.length, modulePath: "olum-icons/lucide" },
  { id: "heroicons.outline", label: "Heroicons Outline", license: "MIT", count: names.heroicons.outline.length, modulePath: "olum-icons/heroicons/outline" },
  { id: "heroicons.solid", label: "Heroicons Solid", license: "MIT", count: names.heroicons.solid.length, modulePath: "olum-icons/heroicons/solid" },
  { id: "fontawesome.solid", label: "Font Awesome Solid", license: "CC BY 4.0", count: names.fontawesome.solid.length, modulePath: "olum-icons/fontawesome/solid" },
  { id: "fontawesome.regular", label: "Font Awesome Regular", license: "CC BY 4.0", count: names.fontawesome.regular.length, modulePath: "olum-icons/fontawesome/regular" },
  { id: "fontawesome.brands", label: "Font Awesome Brands", license: "CC BY 4.0", count: names.fontawesome.brands.length, modulePath: "olum-icons/fontawesome/brands" },
  { id: "olum", label: "Olum", license: "MIT", count: names.olum.length, modulePath: "olum-icons" },
];

export const TOTAL = SOURCES.reduce((sum, s) => sum + s.count, 0);

export const LICENSES = [...new Set(SOURCES.map(s => s.license))];
