import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  // Лоадер для изображений
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  // Лоадер для svg
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          // Говорит о том, что с svg можно работать как с иконкой, передавая размеры
          // Если в svg передать width и height без этой опции, то svg-контейнер будет использовать новые размеры, но сама закрашенная иконка будет иметь оригинальный размер
          // с icon: true сама видимая иконка будет масштабироваться вместе с контейнером
          icon: true,
          // Настройка, которая позволит передавать в иконку цвет с помощью color (стилевое свойство)
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  // CSS-Лоадер для изоляции стилей
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
    assetLoader,
    scssLoader,

    // ts-loader умеет работать с JSX
    // Если бы не использовали TypeScript, нам бы пришлось подключать babel-loader,
    tsLoader,

    svgLoader,
  ];
}
