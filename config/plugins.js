const { resolve } = require('path');
const ExtensionsPlugin = require('@redhat-cloud-services/frontend-components-config-utilities/extensions-plugin');

module.exports = [
  new ExtensionsPlugin(
    {
      extensions: [
        {
          type: 'console.page/route',
          properties: {
            path: '/example',
            component: {
              $codeRef: 'RecommendedServices',
            },
          },
        },
      ],
    },
    {
      exposes: {
        RecommendedServices: resolve(__dirname, '../src/index.js'),
      },
    }
  )
];
