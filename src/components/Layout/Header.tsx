import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '../../context/ThemeContext';

const { Header } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/blogs',
    label: '文章博客',
  },
  {
    key: '/knowledge',
    label: '知识树',
  },
  {
    key: '/projects',
    label: '项目案例',
  },
];

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Header className="
      bg-white
      dark:bg-ink-800
      shadow-sm
      dark:shadow-ink-700
      flex
      items-center
      justify-between
      px-6
      sticky
      top-0
      z-50
      transition-colors
    ">
      <Link to="/" className="
        text-xl
        font-bold
        text-[#8BFFC6]
        no-underline
        hover:text-[#6EEFB0]
        shrink-0
      ">
        Chan
      </Link>

      <Menu
        mode="horizontal"
        items={menuItems}
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          marginLeft: '40px',
          border: 'none',
          background: 'transparent',
        }}
      />

      <Switch
        checked={theme === 'dark'}
        onChange={toggleTheme}
        checkedChildren={<BulbOutlined />}
        unCheckedChildren={<BulbOutlined />}
      />
    </Header>
  );
}

export default AppHeader;
