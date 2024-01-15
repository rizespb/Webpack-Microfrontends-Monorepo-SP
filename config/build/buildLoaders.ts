import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      // modules: true или объект с настройками - позволяет организовать CSS modules изоляцию стилей
      modules: {
        // В dev-режиме классы будут состоять из пути, имени файла и названия класса
        // В prod-режиме - хэш на основе контента из 8 символов
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    // Именно тут порядок важен. Лоадеры будут вызываться с конца: вначале отработает sass-loader, он передаст код css-loader-у, потом код будет передан style-loader
    // Без использования mini-css-extract-plugin стили будут помещены в js-код в сборке (это сделает style-loader). mini-css-extract-plugin позволяет собирать стили в отдельные css-файлы
    // use: ['style-loader', 'css-loader', 'sass-loader'],
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoaderWithModules, 'sass-loader'],
  };

  const tsLoader = {
    // Регулярка для имени файла, которые надо обрабатывать лоадером
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    scssLoader,

    // ts-loader умеет работать с JSX
    // Если бы не использовали TypeScript, нам бы пришлось подключать babel-loader,
    tsLoader,
  ];
}
