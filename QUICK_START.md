# 🚀 快速开始指南

## 第一步：安装依赖

在项目目录运行以下命令：

```bash
npm install
```

这将安装所有必要的依赖，包括：
- React 18
- Vite
- Ant Design 5
- Tailwind CSS
- React Router v6
- TypeScript
- ESLint

**预计时间**: 2-5 分钟（取决于网络速度）

## 第二步：启动开发服务器

```bash
npm run dev
```

输出应该显示：
```
VITE v5.x.x

➜  Local:   http://localhost:5173/
```

**浏览器会自动打开**，如未打开请手动访问 `http://localhost:5173`

## 第三步：开始开发

### 项目已包含以下示例页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 展示项目特性、组件演示 |
| 仪表板 | `/dashboard` | 数据统计示例 |
| 404页面 | 其他 | 自动捕获不存在的路由 |

### 实时热更新

- 修改任何 `.tsx` 或 `.css` 文件
- 代码会**立即**更新到浏览器（无需刷新）
- 组件状态保持不变

## 第四步：代码规范检查

```bash
npm run lint
```

检查代码是否符合 ESLint 规范

## 第五步：生产环境打包

```bash
npm run build
```

输出：
```
✓ 123 modules transformed
dist/index.html           0.50 kB
dist/assets/index-xxx.js  45.20 kB / gzip: 14.50 kB
dist/assets/index-xxx.css 12.80 kB / gzip: 3.20 kB
```

生成的文件在 `dist/` 目录，可直接部署

## 第六步：本地预览生产构建

```bash
npm run preview
```

预览打包后的结果，确保生产环境无问题

---

## 📂 核心文件速查

### 需要添加新页面？
**文件**: `src/pages/MyPage.tsx`  
**配置**: `src/router/index.tsx` (添加路由)

### 需要添加新组件？
**位置**: `src/components/MyComponent/`  
**结构**: 
- MyComponent.tsx (组件代码)
- MyComponent.module.css (可选，私有样式)

### 需要修改布局？
**文件**: `src/components/Layout/MainLayout.tsx`

### 需要修改全局样式？
**文件**: `src/styles/globals.css`

### 需要添加工具函数？
**文件**: `src/utils/index.ts`

---

## 🔍 项目结构速览

```
myPage/
├── src/
│   ├── pages/              # 页面（路由对应）
│   ├── components/         # 可复用组件
│   ├── router/             # 路由配置
│   ├── styles/             # 全局样式
│   ├── utils/              # 工具函数
│   ├── App.tsx             # 主应用
│   └── main.tsx            # 入口
├── public/                 # 静态文件
├── package.json            # 依赖配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.ts      # Tailwind配置
└── index.html              # HTML入口
```

---

## ⚠️ 常见问题

### Q: 启动后出现端口占用错误？
A: 修改 `vite.config.ts` 中的 `port` 配置

### Q: TypeScript 报错？
A: 运行 `npm install` 确保依赖完整安装

### Q: 样式不生效？
A: 确保已导入 `src/styles/globals.css` 到 `App.tsx`

### Q: 路由不工作？
A: 检查 `src/router/index.tsx` 配置是否正确

---

## 💡 最佳实践

1. ✅ 组件放在 `components` 目录
2. ✅ 页面放在 `pages` 目录
3. ✅ 使用 CSS Modules 隔离组件样式
4. ✅ 使用 Tailwind CSS 全局样式
5. ✅ 所有公共函数放在 `utils` 目录
6. ✅ 避免在组件内写复杂业务逻辑
7. ✅ 使用 TypeScript 类型注解
8. ✅ 定期运行 `npm run lint` 检查代码

---

## 🎯 下一步建议

1. **浏览首页** → 了解项目结构和组件示例
2. **修改 Home.tsx** → 练习修改页面
3. **创建新组件** → 在 `src/components` 创建
4. **添加新页面** → 在 `src/pages` 创建
5. **集成 API** → 在 `src/utils` 添加请求函数
6. **部署上线** → `npm run build` 后部署 `dist` 目录

---

**祝你开发愉快！🎉**

如有问题，参考 README.md 或查看项目中的代码注释。
