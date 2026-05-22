import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';

// 懒加载页面组件 - 支持按需加载，优化初始加载性能
const HomePage = lazy(() => import('../pages/Home'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// 加载状态组件
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="mt-4 text-gray-600">加载中...</p>
      </div>
    </div>
  );
}

// 路由懒加载包装器 - 为所有路由添加 Suspense 边界
function withSuspense(Component: React.ComponentType) {
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
