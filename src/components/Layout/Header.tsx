import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header } = Layout;

// 顶部菜单项配置
const menuItems: MenuProps['items'] = [
  {
    key: '/',
    label: '首页',
  },
  {
    key: '/dashboard',
    label: '仪表板',
  },
];

/**
 * 全局顶部导航栏组件
 */
export function AppHeader() {
  return (
    <Header className="
      bg-white
      shadow-sm
      flex
      items-center
      justify-between
      px-6
      sticky
      top-0
      z-50
    ">
      {/* 应用标题 */}
      <Link to="/" className="
        text-xl
        font-bold
        text-blue-600
        no-underline
        hover:text-blue-700
      ">
        MyApp
      </Link>

      {/* 顶部菜单 */}
      <Menu
        mode="horizontal"
        items={menuItems}
        style={{
          flex: 1,
          marginLeft: '40px',
          border: 'none'
        }}
      />
    </Header>
  );
}

export default AppHeader;
