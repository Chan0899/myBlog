# MyApp - 企业级 React 前端项目框架

现代化、高可扩展、工程化的企业级前端项目，严格遵循当前企业级前端开发规范。

## 📋 完整项目目录结构

```
myPage/
├── src/
│   ├── pages/                      # 页面组件层 - 路由对应的完整页面
│   │   ├── Home.tsx               # 首页 - 展示项目特性和组件
│   │   ├── Dashboard.tsx          # 仪表板 - 数据统计示例
│   │   └── NotFound.tsx           # 404 页面
│   │
│   ├── components/                 # 公共组件层 - 可复用的UI组件
│   │   ├── Layout/                # 布局组件
│   │   │   ├── MainLayout.tsx     # 主布局 - 头部+侧边栏+内容+页脚
│   │   │   ├── Header.tsx         # 顶部导航栏
│   │   │   ├── Sidebar.tsx        # 侧边栏导航
│   │   │   └── Footer.tsx         # 页脚
│   │   ├── Button/                # 按钮组件 - 演示CSS Modules样式隔离
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   ├── Card/                  # 卡片组件 - 演示Tailwind CSS用法
│   │   │   └── Card.tsx
│   │   └── index.ts               # 组件导出统一入口
│   │
│   ├── router/                     # 路由配置层
│   │   └── index.tsx              # React Router v6 路由配置，支持懒加载
│   │
│   ├── styles/                     # 样式层
│   │   └── globals.css            # Tailwind CSS + 全局样式
│   │
│   ├── utils/                      # 工具函数层
│   │   └── index.ts               # 防抖、节流、本地存储等通用工具
│   │
│   ├── assets/                     # 静态资源层
│   │   └── logo.svg               # 项目logo
│   │
│   ├── App.tsx                     # 应用主组件 - 配置路由和Ant Design
│   └── main.tsx                    # 应用入口 - React挂载点
│
├── public/                         # 静态文件
│   └── favicon.ico
│
├── 配置文件（构建工具和代码规范）
│   ├── vite.config.ts             # Vite 构建配置
│   ├── tsconfig.json              # TypeScript 配置
│   ├── tsconfig.node.json         # Node.js TypeScript 配置
│   ├── tailwind.config.ts         # Tailwind CSS 配置
│   ├── postcss.config.cjs         # PostCSS 配置
│   ├── eslint.config.js           # ESLint 代码规范检查
│   ├── package.json               # 项目依赖和脚本
│   ├── index.html                 # HTML 入口文件
│   └── .gitignore                 # Git 忽略配置
```

## 🎯 核心特性

### 技术栈
- **框架**: React 18 + Hooks（全程函数组件）
- **构建工具**: Vite（超快速热更新）
- **样式方案**: Tailwind CSS + CSS Modules（两种风格演示）
- **UI 组件库**: Ant Design 5（企业级组件）
- **路由**: React Router v6（现代路由）
- **代码规范**: ESLint + TypeScript

### 工程化亮点
- ✅ **模块化分层**: pages/components/router/utils/styles 完全拆分
- ✅ **高可扩展**: 预留页面、组件、路由新增空间
- ✅ **代码复用**: 统一的组件导出、工具函数库
- ✅ **样式隔离**: CSS Modules 防止样式冲突
- ✅ **路由懒加载**: 按需加载页面，优化首屏性能
- ✅ **环境区分**: 支持 dev/build 命令区分开发生产环境
- ✅ **完整注释**: 所有核心代码都有中文注释

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，自动打开浏览器访问 `http://localhost:5173`

**特性**：
- 自动热更新（HMR）
- 快速模块刷新
- Vite 超快编译

### 3. 生产环境构建

```bash
npm run build
```

生成优化后的构建文件到 `dist/` 目录

**特性**：
- 代码压缩优化
- 文件分割
- 资源优化

### 4. 预览生产构建

```bash
npm run preview
```

本地预览生产构建效果

### 5. 代码规范检查

```bash
npm run lint
```

使用 ESLint 检查代码规范

## 📦 项目核心文件说明

### 入口文件
- `index.html`: HTML 入口，React 挂载到 `id="root"` 元素
- `src/main.tsx`: React 应用入口，注册根组件
- `src/App.tsx`: 应用主组件，配置路由和全局设置

### 路由系统 (`src/router/index.tsx`)
```typescript
// 支持嵌套路由
// 支持路由懒加载（动态导入）
// 支持 404 页面捕获
// 自动添加 Suspense 边界
```

### 组件示例

**Button 组件** (`src/components/Button/`)
- 演示 CSS Modules 样式隔离
- 支持 primary/secondary/danger 三种类型
- 支持 small/default/large 三种尺寸
- 支持 disabled 禁用状态

**Card 组件** (`src/components/Card/`)
- 演示 Tailwind CSS 行内样式写法
- 可选标题 + 内容区域
- 悬停阴影效果

**布局组件** (`src/components/Layout/`)
- MainLayout: 全局页面框架
- Header: 顶部导航栏
- Sidebar: 侧边栏菜单
- Footer: 页脚

### 工具函数 (`src/utils/index.ts`)
- `debounce()`: 防抖函数
- `throttle()`: 节流函数
- `storage`: 本地存储工具集

## 💡 代码规范

### 命名规范
- 文件名：小驼峰（Button.tsx、mainLayout.tsx）
- 组件：大驼峰（Button、Card、MainLayout）
- 变量/函数：小驼峰（handleClick、userName）
- 常量：全大写（MAX_RETRY_COUNT）

### React 规范
- ✅ 只使用函数组件 + Hooks
- ✅ 不使用类组件
- ✅ 不使用已废弃的生命周期
- ✅ 使用 useState、useEffect、useContext 等现代 Hooks
- ✅ 自定义 Hooks 以 `use` 前缀命名

### 样式规范
- **CSS Modules**: 组件私有样式（命名：Component.module.css）
- **Tailwind CSS**: 全局通用样式和工具类
- **避免**: 全局样式污染

### 注释规范
- 在函数/组件上方添加 JSDoc 注释
- 解释 WHY，不解释 WHAT（代码本身说明功能）
- 中文注释清晰易读

## 🔧 扩展指南

### 添加新页面
1. 在 `src/pages/` 创建页面组件
2. 在 `src/router/index.tsx` 添加路由配置
3. 页面会自动支持懒加载和 Suspense

### 添加新组件
1. 在 `src/components/` 创建组件目录
2. 编写 Component.tsx 和 Component.module.css（如需私有样式）
3. 在 `src/components/index.ts` 导出组件

### 添加全局样式
- 修改 `src/styles/globals.css`
- 优先使用 Tailwind CSS 工具类
- 必要时使用 CSS 全局样式

### 添加工具函数
- 在 `src/utils/index.ts` 添加函数
- 编写清晰的 TypeScript 类型注解

## 🎨 样式示例

### Tailwind CSS（行内样式）
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-900">标题</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    按钮
  </button>
</div>
```

### CSS Modules（样式隔离）
```tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary' }) {
  return <button className={`${styles.button} ${styles[variant]}`}>按钮</button>;
}
```

## 📝 生产部署

### 环境配置
```bash
# 开发环境
npm run dev

# 生产构建
npm run build

# 构建文件位置
dist/
├── index.html
├── assets/
│   ├── *.js
│   └── *.css
```

### 部署步骤
1. 执行 `npm run build` 生成构建文件
2. 将 `dist/` 目录部署到服务器
3. 配置服务器支持 SPA 路由（所有请求指向 index.html）

## 🌐 浏览器兼容性

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 📄 许可证

MIT License

---

**项目创建时间**: 2024-05-22  
**技术栈**: React 18 + Vite + Tailwind CSS + Ant Design + React Router v6
