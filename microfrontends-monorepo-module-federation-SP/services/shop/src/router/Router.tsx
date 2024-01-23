import { App } from '@/components/App/App';
import { Shop } from '@/pages/Shop';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { UserCard } from '@packages/shared/src/components/UserCard';

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop/main',
        element: (
          <Suspense fallback={'Loading...'}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: '/shop/second',
        element: (
          <Suspense fallback={'Loading...'}>
            <div style={{ color: 'red' }}>
              <h1>Second SHOP page with UserCard</h1>

              <UserCard username={'USER from SHOP'} />
            </div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

// Дефолтный экспорт будем использовать для подключения роутов в host-контейнер
export default routes;
