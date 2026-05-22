import { lazy, Suspense, ComponentType } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { LoadingFallback } from '../components';

const LandingPage = lazy(() => import('../pages/Landing'));
const KnowledgeTreePage = lazy(() => import('../pages/Home'));
const ProjectSharePage = lazy(() => import('../pages/Dashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

function withSuspense(Component: ComponentType) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: withSuspense(LandingPage),
      },
      {
        path: '/knowledge',
        element: withSuspense(KnowledgeTreePage),
      },
      {
        path: '/projects',
        element: withSuspense(ProjectSharePage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
];

export const router = createBrowserRouter(routes);

export default router;
