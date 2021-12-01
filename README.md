# dynamic-plugin-starter

This repository is for quickstart of new plugins, we don't ship openshift SDK with it or any other dependency, this is just to build and serve dynamic demo.

TODO: deployment to image or build repository

## Enable your plugin

In order to enable your plugin you have to open new PR to https://github.com/openshift/hac-core repository and add your plugin name (with pathPrefix if required) to `hac-core/frontend/src/Utils/constants.ts`.

## Extension properties

This repository is using [@redhat-cloud-services/frontend-components-config-utilities/extensions-plugin](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config-utils#extensions-plugin) to bootstrap the plugin, it wraps the plugin entry with specific function and generates plugin manifest.

There is a bit of example on how to add new route in [config/plugins.js](/config/plugins.js) you can follow the example and add new route, nav sections, nav items etc.

## Local development

Since the plugin is not served directly from console.redhat.com you have to run webpack proxy in order to properly develop locally. You have two options

* With hac-core locally - if you want to add new plugin or change how navigation is treated.
* With hac-core served from CDN - if you want to test your changes just in your plugin

### With hac-core locally

In order to run hac-core and your plugin together, you will have to pull https://github.com/openshift/hac-core repository, install all dependencies and follow [dynamic plugins](https://github.com/openshift/hac-core#dynamic-plugins). Once hac-core is running you'll have to run your plugin in federated mode.

```
npm run start:federated
```

### With hac-core served from CDN

Once your plugin has been enabled in hac-core and promoted to at least stage environment you can start serving hac-core from CDN. You can just run

```
npm start
```

This command runs webpack proxy and starts serving your plugin on specific URL (this URL can be changed in /config/dev.webpack.config.js). It also sets ENVIRONMENT and BETA env variables.

You can then access your application on https://stage.foo.redhat.com:1337/beta/hac (when on ENVIRONMENT=stage and BETA=true - default values)

#### Variables

* BETA - to swtich between stable and beta releases
* ENVIRONMENT
  * ci - **DO NOT USE** this environment will be decomissioned
  * qa - **DO NOT USE** this environment will be decomissioned
  * stage - default environment, it will use stage API
  * prod - production environment, it will use production API
* API_PORT - if you want to run your API locally set this variable to whichever port you need, also please change your API url in /config/dev.webpack.config.js
* CONFIG_PORT - if you want to run navigation config locally you can pass this variable and see your changes
