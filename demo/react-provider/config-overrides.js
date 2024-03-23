const path = require('path');

const DYNAMIC_CONFIG = {
  entry: {
    c1: path.join(process.cwd(), 'src/dynamic-components/c1/index.js'),
    c2: path.join(process.cwd(), 'src/dynamic-components/c2/index.js')
  },
  output: {
    path: path.join(process.cwd(), 'dynamic-build'),
    library: {
      type: 'window',
      name: ['uuid_DynamicCpns', '[name]'],
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};

const configDynamicBuild = function(config) {
  const mergedConfig = {
    ...config,
  };

  mergedConfig.entry = DYNAMIC_CONFIG.entry;
  mergedConfig.output = {
    ...mergedConfig.output,
    ...DYNAMIC_CONFIG.output,
  };
  mergedConfig.externals = DYNAMIC_CONFIG.externals;
  mergedConfig.plugins = mergedConfig.plugins.slice(3, 6);

  return mergedConfig;
}

module.exports = function override(config, env) {
  if (process.argv.slice(2)[0] === 'dynamic') {
    return configDynamicBuild(config);
  }
  return config;
}