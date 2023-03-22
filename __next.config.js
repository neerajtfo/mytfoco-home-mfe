const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'home',
  remotes: {
    app1: `app1@http://localhost:3001/_next/static/chunks/remoteEntry_app1.js`,
    app2: `app2@http://localhost:3002/_next/static/chunks/remoteEntry_app2.js`
  },
  filename: 'static/chunks/remoteEntry_home.js',
  exposes: {
    './navbar': './components/Navbar'
  },
  shared: ['react', 'react-dom']
};

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.infrastructureLogging = {
      level: 'log'
    };
    config.plugins.push(
      new FederatedTypesPlugin({
        federationConfig: {
          ...federationConfig
        }
      })
    );
    return config;
  }
};
