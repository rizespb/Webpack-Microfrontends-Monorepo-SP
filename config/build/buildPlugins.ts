import { BuildOptions } from './types/types';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    // Будет создавать html-файл из указанного шаблона и подключать в него собранные бандлы через <script>
    new HtmlWebpackPlugin({ template: paths.html }),

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
  }

  if (analyzer) {
    // Для анализа размера бандлов
    // Есть смысл подключать только для prod-сборки, т.к. в dev-сборке код ни минимизирован и поэтому там особо нечего анализировать
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
