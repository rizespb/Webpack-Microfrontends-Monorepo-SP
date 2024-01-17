import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { BuildOptions } from './types/types';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    // Будет создавать html-файл из указанного шаблона и подключать в него собранные бандлы через <script>
    new HtmlWebpackPlugin({
      // Путь к файлу index.html
      template: paths.html,

      // Путь к favicon
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),

    // Для установки ГЛОБАЛЬНЫХ переменных в проекте
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(
      // Показывает в терминале процент выполнения во время сборки
      // В production не рекомендуют использовать, т.к. он может сильно замедлять сборку
      new webpack.ProgressPlugin()
    );

    plugins.push(
      // Выносит проверку типов в отдельный процесс, не нагружая сборку (распараллеливаем сборку и проверку типов)
      // Особенно полезно использовать для проверки типов "налету", когда мы отключаем проверку типов с помощью transpileOnly: true в ts-loader
      // То есть, с помощью transpileOnly: true мы сказали webpack-у: Транспилируй, но не проверяй ошибки типов
      // А с помощью ForkTsCheckerWebpackPlugin мы все-таки продолжаем проверять ошибки TS, но в отдельном процессе, ускоряя сборку
      // Прим. Мы отключили проверку типов transpileOnly: true только для dev-сборки, поэтому ForkTsCheckerWebpackPlugin используем только в dev-сборке. В prod-сборке проверку типов выполняет ts-loader
      new ForkTsCheckerWebpackPlugin()
    );

    // Плагин для обновления страницы без перезагрузки (используется совместно с опцией hot:true в настройках dev-сервера и опцией getCustomTransformers в ts-loader)
    // @pmmmwh/react-refresh-webpack-plugin + react-refresh+ react-refresh-typescript
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      // Без использования mini-css-extract-plugin стили будут помещены в js-код в сборке (это сделает style-loader). mini-css-extract-plugin позволяет собирать стили в отдельные css-файлы
      new MiniCssExtractPlugin({
        // Сохраним файлы со стилями в папку сss
        // На месте name будет main (дефолтное значение в webpack)\
        // contenthash - хэш по контенту (будет пересчитываться при изменении контента)
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );

    // Копирует файлы из проекта в сборку
    // Для примера копируем файлы с переводами
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.output, 'locales'),
          },
        ],
      })
    );
  }

  if (analyzer) {
    // Для анализа размера бандлов
    // Есть смысл подключать только для prod-сборки, т.к. в dev-сборке код ни минимизирован и поэтому там особо нечего анализировать
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
