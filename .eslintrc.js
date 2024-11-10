// .eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
  ],
  rules: {
    // Disallow unused variables, but ignore those starting with "_"
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    // Turn off explicit "any" type usage
    "@typescript-eslint/no-explicit-any": "off",

    // Allow @ts-ignore but require a description
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      { "ts-ignore": "allow-with-description" },
    ],

    // Disable `require()` imports, prefer ES6 import syntax
    "@typescript-eslint/no-require-imports": "error",

    // Turn off enforcement of dependency array for React Hooks
    "react-hooks/exhaustive-deps": "off",

    // Allow empty interfaces (useful for props or extending types)
    "@typescript-eslint/no-empty-interface": "off",

    // Disable various unsafe TypeScript rules if specific types aren't feasible
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/await-thenable": "off",
    "no-useless-escape": "off",
    "no-case-declarations": "off",

    // Allow unused expressions (e.g., for assert functions in testing)
    "@typescript-eslint/no-unused-expressions": "off",

    // Disable `require-await` since you may use async functions without awaits
    "@typescript-eslint/require-await": "off",

    // Disable React PropTypes validation for TypeScript projects
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
