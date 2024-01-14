import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
// Этот импорт нужен, чтобы TS подхватил типы из dev-server и в объекте конфигов webpack появились типы для свойства devServer
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvCariables {
  mode: Mode;
  port: number;
}

export default (env: EnvCariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    // Режимы production и development отличаются оптимизациями, минимизацией кода, скоростью сборки и пр.
    mode: env.mode ?? 'development',

    // Путь к точке входа в приложение
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // Если точек входа несколько, то:
    // entry: {
    //   helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //   helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // },

    // Куда и как будет происходить сборка
    output: {
      path: path.resolve(__dirname, 'build'),
      // filename: 'bundle.js',
      // Браузер будет кешировать бандлы
      // Чтобы добавить хэш в имя файла при сборке, можно использовать шаблоны
      // Например, contenthash - добавить хэш на основе содержимого файлов (если содержимое файлов не менялось, то при сборке этот хеш меняться не будет)
      filename: '[name].[contenthash].js',
      // Удалять содержимое папки со сборкой перед каждой сборки
      clean: true,
    },

    // Плагины предоставляют дополнительную функциональность. При этом есть ряд встроенных плагинов, например, webpack.ProgressPlugin
    plugins: [
      // Будет создавать html-файл из указанного шаблона и подключать в него собранные бандлы через <script>
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),

      // Показывает в терминале процент выполнения во время сборки
      // В production не рекомендуют использовать, т.к. он может сильно замедлять сборку
      isDev && new webpack.ProgressPlugin(),

      // Убираем все undefined, null, boolean, которые могли попасть в массив в зависимости от mode (development/production) и т.д.
    ].filter(Boolean),

    // Лоадеры. При указании лоадеров надо учитывать, что каждый следующий лоадер получает код, обработанный предыдущим лоадером
    module: {
      rules: [
        // ts-loader умеет работать с JSX
        // Если бы не использовали TypeScript, нам бы пришлось подключать babel-loader,
        {
          // Регулярка для имени файла, которые надо обрабатывать лоадером
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    // Настройка resolve в Webpack предназначена для определения, каким образом должны быть разрешены и импортированы модули в проекте. Это позволяет указать Webpack, какие расширения файлов следует искать при импорте модулей (модули будт пытаться зарезолвится именно в том порядке, в котором они идут в массиве)
    // То есть мы можем не указывать расширения при импорте:
    // import { calc } from 'test' - webpack вначале проверит наличие файла test.tsx, если не найдет, то проверит наличие test.ts и т.д.
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    // Настройка для формирования source map
    devtool: isDev && 'inline-source-map',

    // Настройки дев сервера для webpack-dev-server (автоматическое обновление страницы при изменении кода)
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          open: true,
        }
      : undefined,
  };

  return config;
};
