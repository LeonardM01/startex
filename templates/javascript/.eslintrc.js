module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier"
  ],
  plugins: ["import"],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  rules: {
    "max-len": ["warn", { code: 120 }],
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error"],
    "object-curly-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "max-classes-per-file": "error",
    "prefer-template": "error",
    "no-unused-vars": "off",
  },
};
