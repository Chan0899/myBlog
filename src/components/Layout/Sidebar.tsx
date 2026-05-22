import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const sidebarItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表板',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: '设置',
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      width={200}
      className="
        bg-white
        dark:bg-ink-800
        border-r
        border-gray-100
        dark:border-ink-700
        transition-colors
      "
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={sidebarItems}
        style={{
          height: '100vh',
          borderRight: 'none',
          paddingTop: '20px',
          background: 'transparent',
        }}
      />
    </Sider>
  );
}

export default AppSidebar;
