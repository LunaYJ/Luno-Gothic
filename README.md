# Luno Gothic

[![Ghost version](https://img.shields.io/badge/Ghost-%3E%3D5.0.0-333)](https://ghost.org/)
[![Node version](https://img.shields.io/badge/Node-%3E%3D18.0.0-333)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

一款专为 Ghost CMS 设计的暗黑哥特风格主题，融合中世纪美学与现代 Web 设计规范。

![Theme Preview](https://via.placeholder.com/800x400/0a0a0a/8B0000?text=Gothic+Theme+Preview)

---

## 主题特性

- **暗黑哥特风格** - 深色系配色方案，暗红色强调色，米色文字
- **响应式设计** - 完美适配移动端、平板和桌面设备
- **现代构建工具** - 使用 Vite + SCSS + BrowserSync 构建链
- **完整页面支持** - 首页、文章页、标签页、作者页、独立页面、错误页
- **会员系统支持** - 兼容 Ghost 会员订阅功能
- **搜索功能** - 内置搜索覆盖层
- **评论集成** - 支持 Disqus 评论系统
- **滚动进度条** - 阅读进度可视化
- **社交链接** - 社交媒体链接展示

---

## 设计规范

| 元素 | 规范值 |
|------|--------|
| 主背景色 | `#0a0a0a`, `#0d0d0d` |
| 强调色 | `#8B0000` (暗红色) |
| 主文字色 | `#F5F0E8`, `#F2EBDC` (米色) |
| 次要色 | `#8E82A7`, `#A99FC2` (紫色系) |
| 标题字体 | Cormorant Garamond, Cinzel |
| 正文字体 | Manrope, Cormorant Garamond |

---

## 如何使用

### 安装主题

#### 方法一：通过 Ghost 后台安装（推荐）

1. 下载主题 ZIP 包：
   ```bash
   npm install
   npm run zip
   ```
2. 登录 Ghost 后台 → Settings → Design → Upload theme
3. 上传生成的 `luno-gothic.zip` 文件

#### 方法二：直接复制

将主题文件夹复制到 Ghost 安装目录的 `content/themes/` 下，然后在后台激活。

### Ghost 后台配置

主题支持以下自定义配置（Settings → Design → Site wide）:

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `profile_badge` | 个人徽章/标签 | 空 |
| `profile_role` | 角色/职位 | 空 |
| `profile_bio` | 个人简介 | 记录设计、阅读与深夜思考。 |
| `hero_title` | 首页 Hero 标题 | INTO THE VELVET NIGHT |
| `hero_desc` | 首页 Hero 描述 | 在暗色中书写故事，在静默中雕刻观点。 |
| `hero_bg` | 首页背景图片 | 无 |
| `disqus_shortname` | Disqus 短域名 | 空 |
| `footer_icp` | 页脚 ICP 备案号 | 空 |

### 必需 Ghost 设置

确保 Ghost 后台已配置：

- **Publication info** - 站点标题、描述、语言
- **Publication logo** - 站点 Logo
- **Publication cover** - 站点封面图（推荐深色图片配合主题）
- **Social accounts** - 社交账号链接
- **Navigation** - 主导航菜单

---

## 如何开发

### 环境要求

- Node.js >= 18.0.0
- Ghost >= 5.0.0

### 安装依赖

```bash
npm install
```

### 开发命令

```bash
# 启动完整开发环境（构建 + 热重载）
npm run dev

# 仅启动构建监听
npm run dev:build

# 仅启动 BrowserSync 服务器
npm run dev:serve
```

开发环境将同时启动：
- **Vite 构建监听** - 监听 SCSS/JS 变化并自动编译
- **BrowserSync** - 提供本地预览和热重载

### 生产构建

```bash
# 构建生产版本
npm run build
```

输出文件位于 `assets/built/`：
- `screen.css` - 编译后的样式
- `main.js` - 编译后的脚本

### 打包主题

```bash
# 构建并生成可安装的 ZIP 包
npm run zip
```

### 清理构建文件

```bash
npm run clean
```

---

## 项目结构

```
gothic/
├── assets/
│   ├── scss/              # SCSS 源文件
│   ├── css/               # 基础 CSS 文件
│   │   ├── base/          # 基础样式（变量、重置）
│   │   ├── layout/        # 布局样式
│   │   └── components/    # 组件样式
│   ├── js/                # JavaScript 源文件
│   │   ├── main.js        # 主入口
│   │   ├── core/          # 核心工具
│   │   └── modules/       # 功能模块
│   └── built/             # 构建输出（由 Vite 生成）
│       ├── screen.css
│       └── main.js
├── partials/              # Handlebars 片段
│   ├── components/        # UI 组件
│   ├── layout/            # 布局组件
│   └── site/              # 站点组件
├── *.hbs                  # 页面模板
├── package.json           # 主题配置和依赖
├── vite.config.js         # Vite 构建配置
└── bs-config.js           # BrowserSync 配置
```

### 模板文件

| 文件 | 用途 |
|------|------|
| `default.hbs` | 基础布局模板 |
| `index.hbs` | 首页（文章列表） |
| `post.hbs` | 文章详情页 |
| `page.hbs` | 独立页面 |
| `tag.hbs` | 标签归档页 |
| `author.hbs` | 作者页 |
| `error.hbs` | 错误页 |

---

## 技术栈

- **模板引擎** - Handlebars
- **样式预处理器** - SCSS (Sass)
- **构建工具** - Vite
- **开发服务器** - BrowserSync
- **包管理** - npm/pnpm

---

## 开发注意事项

1. **SCSS 变更** - 修改 `assets/scss/` 或 `assets/css/` 后，Vite 会自动编译到 `assets/built/screen.css`
2. **JS 变更** - 修改 `assets/js/` 后，Vite 会自动打包到 `assets/built/main.js`
3. **Handlebars 变更** - 修改 `.hbs` 文件需要刷新页面才能看到效果
4. **图片资源** - 建议使用 `assets/images/` 目录存放图片
5. **Ghost 辅助函数** - 可使用 Ghost 提供的所有 Handlebars 辅助函数

---

## 兼容性

- Ghost >= 5.0.0
- 现代浏览器（Chrome、Firefox、Safari、Edge 最新版本）
- 响应式设计支持移动端设备

---

## 授权协议

[MIT](LICENSE) © Luna YJ

---

## 致谢

- [Ghost](https://ghost.org/) - 优秀的开源博客平台
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [BrowserSync](https://browsersync.io/) - 开发服务器和同步工具
