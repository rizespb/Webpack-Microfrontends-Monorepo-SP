export interface BuildPaths {
  // путь до index.tsx
  entry: string;

  //путь до index.html
  html: string;

  // путь до папки со сборкой
  output: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
