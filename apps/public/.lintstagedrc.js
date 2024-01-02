const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint ./apps/public --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "*.{ts,tsx}":
    "bash -c 'npx tsc --noemit --project apps/public/tsconfig.json'",
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
