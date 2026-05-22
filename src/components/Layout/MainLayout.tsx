import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './Header';
import { AppSidebar } from './Sidebar';
import { AppFooter } from './Footer';

const { Content } = Layout;

/**
 * 主要布局组件 - 包含头部、侧边栏、内容区域、页脚
 * 所有页面通过 Outlet 渲染，支持路由懒加载
 */
export function MainLayout() {
  return (
    <Layout className="min-h-screen">
      {/* 顶部导航栏 */}
      <AppHeader />

      {/* 主容器 - 侧边栏 + 内容区域 */}
      <Layout>
        {/* 侧边栏导航 */}
        <AppSidebar />

        {/* 内容区域 */}
        <Layout className="flex flex-col">
          <Content className="
            bg-gray-50
            p-6
            flex-1
          ">
            {/* 页面内容通过 Outlet 动态渲染 */}
            <Outlet />
          </Content>

          {/* 页脚 */}
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
