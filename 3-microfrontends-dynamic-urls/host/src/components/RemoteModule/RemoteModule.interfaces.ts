export interface IRemoteConfig {
  remoteName: string;
  remoteUrl: string;
  exposeName: string;
}

export interface IRemoteModuleProps {
  remoteConfig: IRemoteConfig;
  componentProps?: Record<string, any>;
}
