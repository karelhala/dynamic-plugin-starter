const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const commonPlugins = require('./plugins');

const environment = process.env.ENVIRONMENT || 'stage';
const betaOrStable = process.env.BETA ? 'beta' : 'stable';
// for accessing prod-beta change this to 'prod-beta'
const env = `${environment}-${betaOrStable}`;

const webpackProxy = {
  deployment: process.env.BETA ? 'beta/api/plugins' : 'api/plugins',
  useProxy: true,
  env,
  appUrl: process.env.BETA ? '/beta/api/plugins' : '/api/plugins',
  routes: {
    // Enable if you want to run hac-core locally
    // '/apps/hac': { host: 'http://localhost:8003' },
    // '/beta/apps/hac': { host: 'http://localhost:8003' },
    // '/beta/hac': { host: 'http://localhost:8003' },
    // '/hac': { host: 'http://localhost:8003' },
    ...(process.env.API_PORT && {
      '/api/example': { host: `http://localhost:${process.env.API_PORT}` },
    }),
    ...(process.env.CONFIG_PORT && {
      [`${process.env.BETA ? '/beta' : ''}/config`]: {
        host: `http://localhost:${process.env.CONFIG_PORT}`,
      },
    }),
  },
};

const { config: webpackConfig, plugins } = config({
  appEntry: resolve(__dirname, '../src/index.js'),
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  useFileHash: false,
  ...webpackProxy,
});

plugins.push(...commonPlugins);

module.exports = {
  ...webpackConfig,
  plugins: plugins.filter((plugin) => plugin.constructor.name !== 'HtmlWebpackPlugin'),
};
