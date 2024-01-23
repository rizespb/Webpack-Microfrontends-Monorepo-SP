import webpack from 'webpack';

// Этот импорт нужен, чтобы TS подхватил типы из dev-server и в объекте конфигов webpack появились типы для свойства devServer
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;

  const isDev = options.mode === 'development';

  return {
    // Режимы production и development отличаются оптимизациями, минимизацией кода, скоростью сборки и пр.
    mode: mode ?? 'development',

    // Путь к точке входа в приложение
    entry: paths.entry,
    // Если точек входа несколько, то:
    // entry: {
    //   helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //   helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // },

    // Куда и как будет происходить сборка
    output: {
      path: paths.output,
      // filename: 'bundle.js',
      // Браузер будет кешировать бандлы
      // Чтобы добавить хэш в имя файла при сборке, можно использовать шаблоны
      // Например, contenthash - добавить хэш на основе содержимого файлов (если содержимое файлов не менялось, то при сборке этот хеш меняться не будет)
      filename: '[name].[contenthash].js',
      // Удалять содержимое папки со сборкой перед каждой сборки
      clean: true,
    },

    // Плагины предоставляют дополнительную функциональность. При этом есть ряд встроенных плагинов, например, webpack.ProgressPlugin
    plugins: buildPlugins(options),

    // Лоадеры. При указании лоадеров надо учитывать, что каждый следующий лоадер получает код, обработанный предыдущим лоадером
    module: {
      rules: buildLoaders(options),
    },

    // Настройка resolve в Webpack предназначена для определения, каким образом должны быть разрешены и импортированы модули в проекте. Это позволяет указать Webpack, какие расширения файлов следует искать при импорте модулей (модули будт пытаться зарезолвится именно в том порядке, в котором они идут в массиве)
    resolve: buildResolvers(options),

    // Настройка для формирования source map
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',

    // Настройки дев сервера для webpack-dev-server (автоматическое обновление страницы при изменении кода)
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
