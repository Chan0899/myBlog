import { lazy, Suspense, ComponentType } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { LoadingFallback } from '../components';

// 懒加载页面组件 - 支持按需加载，优化初始加载性能
const HomePage = lazy(() => import('../pages/Home'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const SettingsPage = lazy(() => import('../pages/Settings'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// 路由懒加载包装器 - 为所有路由添加 Suspense 边界
function withSuspense(Component: ComponentType) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

// 路由配置 - 支持嵌套路由和灵活扩展
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: withSuspense(HomePage),
      },
      {
        path: '/dashboard',
        element: withSuspense(DashboardPage),
      },
      {
        path: '/settings',
        element: withSuspense(SettingsPage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
];

// 创建并导出路由实例
export const router = createBrowserRouter(routes);

export default router;
