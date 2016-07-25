module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  }, 
  "globals": { 
  }, 
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2 ],
    "no-unused-vars": [1, {"vars": "local", "args": "none"}],
    "linebreak-style": 'off',
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}; 