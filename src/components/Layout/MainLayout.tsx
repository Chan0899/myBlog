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
          flex-1
          flex
          flex-col
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
