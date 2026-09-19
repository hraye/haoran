# LINE — 个人作品与资源站

个人作品集网站，暗黑/简约/科技风，线条勾画动态设计感。

## 功能

- **首页**：Canvas 色键抠像的 3D 悬浮人像，鼠标注视跟随转向 + 上下浮动；支持白天/暗夜主题背景
- **作品区**：图片区 + 视频区 + 编程作品
- **资源区**：多个备用资源分类（按序号命名，可自行填充）
- **联系页**：单页联系方式
- **中英双语切换** + **白天/暗夜模式切换**

## 技术栈

- React 18（浏览器端 CDN，无构建步骤）
- Babel Standalone 浏览器端转译 JSX
- Tailwind CSS（本地副本）
- 原生 JS 极简 Hash 路由（无需 react-router）
- 纯 JavaScript，无 TypeScript，无第三方 UI 库

## 本地运行

项目是纯静态文件，无需安装依赖，任意静态服务器即可：

```bash
# 任选其一
python -m http.server 8123
# 或
npx serve .
# 或
npx http-server .
```

然后浏览器打开 http://localhost:8123/

## 目录结构

```
├── index.html            # 入口页（CDN React + Babel + Tailwind + 主题变量）
├── assets/
│   └── tailwindcss.js    # Tailwind 本地副本
├── src/
│   ├── App.jsx           # 全部页面逻辑（首页/作品/资源/联系）
│   ├── i18n.js           # 中英切换
│   ├── simple-router.js  # Hash 路由
│   └── theme.js          # 白天/暗夜主题
└── videos/
    └── eye.mp4           # 首页人像视频素材
```

## 部署到 GitHub Pages

1. 推送到 GitHub 仓库（main 分支）
2. 仓库 Settings → Pages → Source 选择 `Deploy from a branch` → 分支选 `main`、目录选 `/ (root)`
3. 访问 `https://<用户名>.github.io/<仓库名>/`

站点使用 hash 路由与相对路径，在子路径下可直接运行，无需额外配置。
