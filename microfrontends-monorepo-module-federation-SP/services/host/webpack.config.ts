import webpack from 'webpack';
import path from 'path';
import { buildWebpack, BuildMode, BuildPaths, BuildOptions, BuildPlatform } from '@packages/build-config';

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
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
