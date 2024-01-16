import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,

    // Для использования клиентского роутинга (с помощью react-router)
    // если раздавать статику на сервере через nginx, то надо делать проксирование на Index.html
    historyApiFallback: true,
  };
}
