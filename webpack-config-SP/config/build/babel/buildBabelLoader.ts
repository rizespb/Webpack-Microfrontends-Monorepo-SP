import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  //
  const plugins = [];

  if (isProd) {
    plugins.push([
      // Плагин для удаления передаваемых пропсов
      removeDataTestIdBabelPlugin,
      {
        // Название пропсов, которые надо удалить
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      // Настройки для babel можно хранить и в options, и в отдельном файле babel.config (например, если эти же конфиги используются в jest)
      options: {
        presets: [
          '@babel/preset-env',
          // Пресет, чтобы babel мог работать с TS
          '@babel/preset-typescript',
          // Пресет, чтобы babel мог работать с React
          [
            '@babel/preset-react',
            // Опции для пресета @babel/preset-react, без них не работает dev-сервер
            {
              runtime: isDev ? 'automatic' : 'classic',
            },
          ],
        ],

        // Добавляем плагины именно для babelLoader-а
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
