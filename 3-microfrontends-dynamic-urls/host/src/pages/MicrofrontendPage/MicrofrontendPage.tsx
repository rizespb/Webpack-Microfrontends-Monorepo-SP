import { IRemoteConfig, RemoteModule } from '@/components/RemoteModule';

export const MicrofrontendPage = () => {
  const config: IRemoteConfig = {
    remoteName: 'microfrontend',
    remoteUrl: 'http://localhost:3001/remoteEntry.js',
    exposeName: './MicrofrontendApp',
  };

  return (
    <RemoteModule
      remoteConfig={config}
      componentProps={{
        header: 'Header passed from host to microfrontend',
        basePath: '/microfrontend-app',
      }}
    />
  );
};
