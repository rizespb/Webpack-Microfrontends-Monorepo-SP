import { App } from '@/components/App/App';
import { createBrowserRouter } from 'react-router-dom';
import { About } from '@/pages/About';
import { Suspense } from 'react';

const routes = [
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: '/admin/about',
        element: (
          <Suspense fallback={'Loading...'}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
