module.exports = {
  extends: ['@tiket-com'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['jsdoc', 'react', 'jest', 'import'],
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.jsx', '.json'],
            symlinks: false
          },
        }
      }
    }
  },
  globals: {
    i18n: true,
    gapi: true,
    isMobile: true,
    CONFIG: true,
    client: true,
    hasPopup: true,
    setPopup: true,
    toggleNotify: true,
    ActiveXObject: true,
    supportClipboard: true
  },
  rules: {
    'no-extra-boolean-cast': 0
  }
};