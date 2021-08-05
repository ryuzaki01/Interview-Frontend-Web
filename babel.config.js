module.exports = (api) => {
  const isJest = api.caller(({name}) => name === 'babel-jest');

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules:  isJest ? 'auto' : false,
          useBuiltIns: 'entry',
          corejs: 3
        }
      ],
      [
        "@babel/preset-react",
        {
          development: false,
          throwIfNamespace: false
        }
      ]
    ],
    plugins: [
      [
        "transform-imports",
        {
          "react-bootstrap": {
            transform: "react-bootstrap/lib/${member}",
            preventFullImport: true
          },
          "rmc-picker": {
            transform: "rmc-picker/lib/${member}",
            preventFullImport: true
          },
          "lodash": {
            transform: "lodash/${member}",
            preventFullImport: true
          },
          "reactstrap": {
            transform: "reactstrap/lib/${member}",
            preventFullImport: true
          },
          "@material-ui/core": {
            transform: "@material-ui/core/${member}",
            preventFullImport: true
          },
          "@material-ui/icons": {
            transform: "@material-ui/icons/${member}",
            preventFullImport: true
          },
          "@tiket-com/react-ui": {
            transform: "@tiket-com/react-ui/lib/${member}",
            preventFullImport: true
          }
        }
      ],
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-export-default-from",
      [
        "@babel/plugin-proposal-optional-chaining",
        {
          loose: false
        }
      ],
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-syntax-dynamic-import",
      ...(isJest ? ['babel-plugin-dynamic-import-node'] : []),
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true
        }
      ],
      "@babel/plugin-proposal-json-strings",
      "@loadable/babel-plugin"
    ]
  };
}