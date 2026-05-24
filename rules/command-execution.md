# 命令执行权限规则

以下命令在执行时无需再次询问确认，可以直接运行。

## 包管理与构建

| 命令 | 说明 |
|------|------|
| `npm install *` | 安装依赖 |
| `npm run *` | 执行 package.json 中的脚本（dev / build / lint / preview） |
| `npm ls *` | 列出已安装的包 |
| `npx tsc *` | TypeScript 类型检查 |
| `npx vite *` | Vite 开发/构建工具 |
| `npx tailwindcss *` | Tailwind CSS 工具 |
| `npx --yes serve -p 3456 .` | 启动临时静态服务预览 dist |

## Git 操作

| 命令 | 说明 |
|------|------|
| `git init *` | 初始化仓库 |
| `git add *` | 暂存文件 |
| `git commit -m ' *` | 提交更改 |
| `git remote *` | 查看/管理远程仓库 |
| `git push *` | 推送到远程仓库 |

## 开发环境

| 命令 | 说明 |
|------|------|
| `start *` | 启动本地服务 |
| `python *` | Python 脚本执行 |
| `curl -s http://localhost:*` | 本地开发服务器请求 |

## 文件读取

| 命令/路径 | 说明 |
|------|------|
| `Read(//c//**)` | 读取 C 盘下任意文件 |
| `Read(//tmp/**)` | 读取临时目录文件 |

## 网络访问

| 域名/服务 | 说明 |
|------|------|
| `WebSearch` | 网络搜索 |
| `WebFetch(domain:localhost)` | 本地开发服务器 |
| `WebFetch(domain:chutes.ai)` | Chutes AI 服务 |
| `WebFetch(domain:docs.qq.com)` | 腾讯文档 |

## 规则说明

- **路径安全**：涉及本地文件路径的操作仅限 `/tmp/`、项目目录及明确指定的路径
- **Git 操作**：允许常规提交和推送，`git push --force` 等破坏性操作需要额外确认
- **依赖安装**：`npm install` 自动允许，但全局安装（`-g`）不在允许范围内
