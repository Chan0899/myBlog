import { Button, Card } from '../components';

/**
 * 首页 - 展示项目特性和组件示例
 */
export function Home() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          欢迎使用 MyApp
        </h1>
        <p className="text-gray-600">
          现代化、高可扩展的企业级前端项目框架
        </p>
      </div>

      {/* 特性展示 - 使用 Card + Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="⚛️ React 18">
          <p className="text-gray-700">
            使用最新的 React 18 及 Hooks 编程范式，提供更好的性能和开发体验
          </p>
        </Card>

        <Card title="⚡ Vite 构建">
          <p className="text-gray-700">
            基于 Vite 的超快速构建工具，支持热模块更新（HMR）和按需编译
          </p>
        </Card>

        <Card title="🎨 Tailwind CSS">
          <p className="text-gray-700">
            实用优先的 CSS 框架，快速构建现代化 UI，提供完整的响应式支持
          </p>
        </Card>

        <Card title="📦 Ant Design">
          <p className="text-gray-700">
            企业级 UI 设计体系，提供丰富的高质量组件，开箱即用
          </p>
        </Card>

        <Card title="🛣️ React Router v6">
          <p className="text-gray-700">
            完整的路由解决方案，支持嵌套路由、懒加载、动态路由等高级特性
          </p>
        </Card>

        <Card title="🔧 工程化">
          <p className="text-gray-700">
            完整的项目规范、ESLint 代码检查、分层清晰的项目结构
          </p>
        </Card>
      </div>

      {/* 组件演示区域 */}
      <Card title="组件演示">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">按钮组件示例</h4>

          {/* 主按钮 */}
          <div className="flex gap-2 flex-wrap">
            <Button variant="primary">
              主按钮
            </Button>
            <Button variant="secondary">
              次按钮
            </Button>
            <Button variant="danger">
              危险按钮
            </Button>
          </div>

          {/* 按钮尺寸 */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2">
              按钮尺寸
            </h5>
            <div className="flex gap-2">
              <Button size="small" variant="primary">
                小按钮
              </Button>
              <Button size="default" variant="primary">
                默认按钮
              </Button>
              <Button size="large" variant="primary">
                大按钮
              </Button>
            </div>
          </div>

          {/* 禁用状态 */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2">
              禁用状态
            </h5>
            <Button disabled variant="primary">
              禁用按钮
            </Button>
          </div>
        </div>
      </Card>

      {/* 快速开始 */}
      <Card title="🚀 快速开始">
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>开发模式：</strong>
            <code className="
              bg-gray-100
              px-2
              py-1
              rounded
              text-sm
              font-mono
              ml-2
            ">
              npm run dev
            </code>
          </p>
          <p className="text-gray-700">
            <strong>生产构建：</strong>
            <code className="
              bg-gray-100
              px-2
              py-1
              rounded
              text-sm
              font-mono
              ml-2
            ">
              npm run build
            </code>
          </p>
          <p className="text-gray-700">
            <strong>预览构建：</strong>
            <code className="
              bg-gray-100
              px-2
              py-1
              rounded
              text-sm
              font-mono
              ml-2
            ">
              npm run preview
            </code>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Home;
