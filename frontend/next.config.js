const path = require('path')
const withPlugins = require('next-compose-plugins')

const defaultConfig = {
  target: 'serverless',
  cssLoaderOptions: {
    url: false,
  },
  pageExtensions: ['ts', 'tsx'],

  webpack: (config) => {
    // config.resolve.extensions.push('.scss')
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    config.resolve.alias['#'] = path.join(__dirname)
    return config
  },
  env: {},
}

module.exports = withPlugins([], defaultConfig)
