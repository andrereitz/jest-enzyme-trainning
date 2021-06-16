const { override, addBabelPlugins } = require('customize-cra')

module.exports = override(
  addBabelPlugins(
    ['react-remove-properties', {"properties": ["data-test"]}]
  )
)