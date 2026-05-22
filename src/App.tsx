import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme as antTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import router from './router';
import './styles/globals.css';

function AntdProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: isDark ? {
          colorBgBase: '#000000',
          colorBgContainer: '#080808',
          colorBgElevated: '#0d0d0d',
          colorBgLayout: '#000000',
          colorBgSpotlight: '#1a1a1a',
          colorBorder: '#222222',
          colorBorderSecondary: '#181818',
          colorFill: 'rgba(255,255,255,0.06)',
          colorFillSecondary: 'rgba(255,255,255,0.04)',
          colorFillTertiary: 'rgba(255,255,255,0.02)',
          colorText: '#d4d4d4',
          colorTextSecondary: '#909090',
          colorTextTertiary: '#606060',
          colorTextQuaternary: '#404040',
        } : undefined,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AntdProvider>
        <RouterProvider router={router} />
      </AntdProvider>
    </ThemeProvider>
  );
}

export default App;
