module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
      "browser": true,
      "jest": true
    },
    "rules": {
      "comma-dangle": [
        2,
        "never"
      ],
      "no-param-reassign": [
        2,
        {
          "props": false
        }
      ],
      "import/no-unresolved": 2,
      "import/no-extraneous-dependencies": 0,
      "import/no-named-as-default": 0,
      "react/jsx-no-bind": 2,
      "react/no-did-mount-set-state": 0,
      "react/prefer-stateless-function": 2,
      "react/no-typos": 0,
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx"
           ]
        }
      ],
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/label-has-for": 0,
      "object-curly-newline": "off",
      "prefer-object-spread/prefer-object-spread": 2,
      "prefer-arrow-callback": 2,
      "babel/no-invalid-this": 2,
      "babel/semi": [
        2,
        "never"
      ],
      "semi": [
        2,
        "never"
      ]
    },
    "plugins": [
      "react",
      "import",
      "prefer-object-spread",
      "babel"
    ],
    "globals": {
      "shallow": false
    }
  }
