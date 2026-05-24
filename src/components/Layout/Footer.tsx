import { Layout } from 'antd';

const { Footer } = Layout;

/**
 * 全局页脚组件
 */
export function AppFooter() {
  return (
    <Footer className="
      bg-gray-900
      dark:bg-ink-700
      text-white
      text-center
      py-6
      transition-colors
    ">
      <div className="space-y-2">
        {/* <p className="m-0">© 2024 Chan. 版权所有</p> */}
        <p className="m-0 text-gray-400 text-sm">
          联系我们：2292703336@qq.com
        </p>
      </div>
    </Footer>
  );
}

export default AppFooter;
