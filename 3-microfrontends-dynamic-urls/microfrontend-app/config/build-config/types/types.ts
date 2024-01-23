export interface BuildPaths {
  // путь до index.tsx
  entry: string;

  //путь до index.html
  html: string;

  // путь до папки public
  public: string;

  // путь до папки со сборкой
  output: string;

  // путь до папки src
  src: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  // Подключать или нет BundleAnalyzerPlugin
  platform: BuildPlatform;
  analyzer?: boolean;
}
