import { Link } from 'react-router-dom';
import { Button } from '../components';

/**
 * 404 错误页面 - 页面不存在时显示
 */
export function NotFound() {
  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
    ">
      <div className="text-center">
        {/* 404 标题 */}
        <h1 className="text-8xl font-bold text-gray-900 mb-4">
          404
        </h1>

        {/* 错误描述 */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          抱歉，页面未找到
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回主页。
        </p>

        {/* 返回首页按钮 */}
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="large">
              返回首页
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              px-6
              py-2
              text-lg
              font-semibold
              border-2
              border-gray-300
              text-gray-700
              rounded-lg
              hover:bg-gray-100
              transition-colors
            "
          >
            返回上一页
          </button>
        </div>

        {/* 装饰元素 */}
        <div className="mt-12 text-6xl opacity-50">
          🔍
        </div>
      </div>
    </div>
  );
}

export default NotFound;
