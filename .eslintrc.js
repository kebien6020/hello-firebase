module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "semi": ["error", "never"],
    "no-console": ["error", {
      "allow": ["warn", "error"]
    }],
    "eqeqeq": ["error"],
    "no-implicit-coercion": ["error"],
    "prefer-const": ["error"],
    "quotes": ["error", "single"],
    "react/prop-types": ["warn", {
      "skipUndeclared": true
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "indent": ["error", 2]
  }
}
