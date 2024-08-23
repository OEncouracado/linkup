const path = require('path');

module.exports = function override(config, env) {
  // Adiciona polyfills para módulos Node.js
  config.resolve.fallback = {
    "fs": false,
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/")  // Adiciona polyfill para buffer
  };

  // Adiciona o polyfill para Buffer
  config.plugins = (config.plugins || []).concat([
    new (require('node-polyfill-webpack-plugin'))()
  ]);

   // Adiciona um alias para o axios
   config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'axios': path.resolve(__dirname, 'node_modules/axios')
  };

  return config;
};