import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './Header';
import { AppFooter } from './Footer';

const { Content } = Layout;

export function MainLayout() {
  return (
    <Layout className="min-h-screen">
      <AppHeader />

      <Layout className="flex flex-col">
        <Content className="
          bg-gray-50
          dark:bg-black
          p-6
          flex-1
          transition-colors
        ">
          <Outlet />
        </Content>

        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
