import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import router from './router';
import './styles/globals.css';

/**
 * 应用主组件
 * - 配置路由系统
 * - 配置 Ant Design 主题和语言
 * - 集成全局样式
 */
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
