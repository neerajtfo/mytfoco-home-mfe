const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const ExternalRemotesPlugin = require('external-remotes-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new ExternalRemotesPlugin(),
      new NextFederationPlugin({
        name: 'home',
        remotes: {
          app1: `app1@http://localhost:3001/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry_app1.js`,
          app2: `app2@http://localhost:3002/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry_app2.js`
        },
        filename: 'static/chunks/remoteEntry_home.js',
        exposes: {},
        shared: {
          // whatever else
        }
      })
    );

    return config;
  }
};

module.exports = nextConfig;
