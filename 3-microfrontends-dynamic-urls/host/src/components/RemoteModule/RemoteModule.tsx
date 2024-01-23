/// <reference types="webpack/module" />

import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { IRemoteModuleProps } from './RemoteModule.interfaces';

// Ленивая загрузка МФ-а
// Насколько понял, вначале сохраняем код
export const loadComponent = (scope: string, module: string) => async () => {
  // Инициализация аналог node_modules на объеке window
  await __webpack_init_sharing__('default');

  const container = window[scope];

  await container.init(__webpack_share_scopes__.default);

  // Получаем из контейнера запрашиваемый модуль
  const microfrontFactory = await window[scope].get(module);

  const Module = microfrontFactory();

  console.log('loadComponent');

  return Module;
};

// Динамически добавляем (в рантайме) скрипт <script src="http://localhost:3001/remoteEntry.js" type="text/javascript" id="micro1" async=""></script>
// в <head> html-страницы
// Браузер загружает этот скрипт
export const useDynamicScript = (url: string, scriptId: string) => {
  const scriptExists = document.getElementById(scriptId);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url || scriptExists) {
      return;
    }

    console.log('FROM useEffect');

    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.id = scriptId;
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log('LOADED');
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);
  }, [url]);

  return Boolean(scriptExists) || (ready && !failed);
};

export const RemoteModule = (props: IRemoteModuleProps) => {
  const { remoteConfig, componentProps } = props;
  const { remoteName, remoteUrl, exposeName } = remoteConfig;

  const mfLoaded = useDynamicScript(remoteUrl, remoteName);

  const Component = useMemo(() => lazy(loadComponent(remoteName, exposeName)), [remoteName, exposeName]);

  return <Suspense fallback="loading...">{mfLoaded && <Component {...componentProps} />}</Suspense>;
};
