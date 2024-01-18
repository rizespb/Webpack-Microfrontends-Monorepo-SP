import { App } from '@/components/App/App';
import { Shop } from '@/pages/Shop';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/shop',
        element: (
          <Suspense fallback={'Loading...'}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

// Дефолтный экспорт будем использовать для подключения роутов в host-контейнер
export default routes;
