import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

// Настройка resolve в Webpack предназначена для определения, каким образом должны быть разрешены и импортированы модули в проекте. Это позволяет указать Webpack, какие расширения файлов следует искать при импорте модулей (модули будт пытаться зарезолвится именно в том порядке, в котором они идут в массиве)

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    // То есть мы можем не указывать расширения при импорте:
    // import { calc } from 'test' - webpack вначале проверит наличие файла test.tsx, если не найдет, то проверит наличие test.ts и т.д.
    extensions: ['.tsx', '.ts', '.js'],

    alias: {
      '@': options.paths.src,
    },
  };
}
