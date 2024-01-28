// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (config, { env, paths }) => {
    

      // Add a new rule to handle image files using asset/resource
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash:8].[ext]',
        },
      });

      return config;
    },
  },
};