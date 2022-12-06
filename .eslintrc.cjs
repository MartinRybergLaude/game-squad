// eslint-disable-next-line
const fs = require("fs");

const foldersUnderSrc = fs
  .readdirSync("src", { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  overrides: [
    {
      files: ["*.tsx", "*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ["^react", "^@?\\w"],
              // Absolute imports and Relative imports.
              [`^(${foldersUnderSrc.join("|")})(/.*|$)`],
              // For css imports.
              ["^[^.]"],
              ["^\\."],
            ],
          },
        ],
      },
    },
  ],
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "react/react-in-jsx-scope": "off",
    "comma-dangle": ["error", "always-multiline"],
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": ["error"],
    "simple-import-sort/imports": "error",
    "no-redeclare": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};
