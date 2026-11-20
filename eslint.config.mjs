import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * Flat ESLint config. eslint-config-next 15 still ships the old format, so it is
 * loaded through FlatCompat.
 */
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".taste-skill/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The pictures are pre-sized WebP in public/ with explicit dimensions; no image optimizer is used.
      "@next/next/no-img-element": "off",
      // The wordmark links to "/" on a one-page site: a plain anchor keeps the page free of router code.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
