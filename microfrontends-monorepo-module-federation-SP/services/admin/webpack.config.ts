import webpack from 'webpack';
import path from 'path';
import { buildWebpack, BuildMode, BuildPaths, BuildOptions, BuildPlatform } from '@packages/build-config';
import packageJson from './package.json';

interface EnvCariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvCariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  // Настройка микрофронтов
  // Для хост-приложения и микрофронтов немного отличаются
  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      // Название МФ-а
      name: 'admin',

      // Название файла, который будет загружаться и подключаться в хост-контейнер. По умолчанию, remoteEntry
      filename: 'remoteEntry.js',

      // Что именно мы хотим предоставить приложению-контейнеру
      exposes: {
        './Router': './src/router/Router.tsx',
      },

      // Какие библиотеки у нас общие и должны шариться
      shared: {
        ...packageJson.dependencies,
        react: {
          // Загружать зависимость сразу (не отложено, не лениво)
          eager: true,
          // Требуемая версия
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  );

  return config;
};
