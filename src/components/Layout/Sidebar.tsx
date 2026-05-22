import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

// 侧边栏菜单项配置
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

/**
 * 全局侧边栏组件
 */
export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 处理菜单点击事件
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      width={200}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
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
        }}
      />
    </Sider>
  );
}

export default AppSidebar;
