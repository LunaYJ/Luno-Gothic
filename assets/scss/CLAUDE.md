[根目录](../../../CLAUDE.md) > [assets](../) > **scss**

# SCSS 模块

> **职责**: 主题主样式源文件，使用 SCSS 编写，编译为 `assets/built/screen.css`

---

## 模块结构

```
assets/scss/
└── main.scss              # SCSS 主入口文件
```

---

## 入口与构建流程

### 主文件: main.scss

这是主题样式的核心文件，包含所有 CSS 规则。

**构建流程**:
```
main.scss --[Vite + Sass]--> assets/built/screen.css
```

**Vite 配置** (vite.config.js):
```javascript
assetFileNames: (assetInfo) => {
  if (assetInfo.name && assetInfo.name.endsWith('.css')) {
    return 'screen.css';  // Ghost 主题约定的主样式文件名
  }
  return 'assets/[name][extname]';
}
```

---

## 文件结构

### main.scss 内容概览

```scss
// 1. CSS 变量定义
:root {
  --bg-page: #0a0a0a;
  --bg-panel: #0d0d0d;
  --bg-panel-alt: #080808;
  --accent: #8b0000;
  --text-title: #f5f0e8;
  --text-body: #d2c8e4;
  --text-muted: #a99fc2;
  --font-display: 'Cormorant Garamond', serif;
  --font-ui: 'Manrope', sans-serif;
  // ...
}

// 2. 基础重置
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }

// 3. 布局系统
.gothic-layout { ... }
.profile-rail { ... }
.content-rail { ... }

// 4. 组件样式
.site-header { ... }
.post-card { ... }
.hero-section { ... }
// ...

// 5. 响应式媒体查询
@media (max-width: 1100px) { ... }
@media (max-width: 980px) { ... }
```

---

## 设计系统

### 颜色变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--bg-page` | #0a0a0a | 页面背景 |
| `--bg-panel` | #0d0d0d | 面板背景 |
| `--bg-panel-alt` | #080808 | 交替面板背景 |
| `--accent` | #8b0000 | 强调色（暗红） |
| `--text-title` | #f5f0e8 | 标题文字 |
| `--text-body` | #d2c8e4 | 正文文字 |
| `--text-muted` | #a99fc2 | 次要文字 |
| `--text-warm` | #c9b68a | 暖色强调 |
| `--line` | #1a1a1a | 边框/分割线 |

### 字体系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--font-display` | 'Cormorant Garamond', serif | 标题/展示文字 |
| `--font-ui` | 'Manrope', sans-serif | UI/正文文字 |

### 布局常量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--side-width` | 360px | 侧边栏宽度 |
| `--radius` | 2px | 默认圆角 |

---

## 布局架构

### 双栏布局 (桌面端)

```
┌─────────────────────────────────────────┐
│  ┌──────────┐  ┌─────────────────────┐  │
│  │          │  │   .site-header      │  │
│  │ .profile │  ├─────────────────────┤  │
│  │  -rail   │  │                     │  │
│  │  360px   │  │    .page-main       │  │
│  │          │  │                     │  │
│  │  sticky  │  │                     │  │
│  │          │  ├─────────────────────┤  │
│  │          │  │   .site-footer      │  │
│  └──────────┘  └─────────────────────┘  │
└─────────────────────────────────────────┘
```

**CSS 实现**:
```scss
.gothic-layout {
  display: grid;
  grid-template-columns: var(--side-width) minmax(0, 1fr);
  min-height: 100vh;
}

.profile-rail {
  position: sticky;
  top: 0;
  height: 100vh;
}
```

---

## 响应式设计

### 断点

| 断点 | 宽度 | 行为 |
|------|------|------|
| 桌面 | > 980px | 双栏布局，完整侧边栏 |
| 平板 | 768px - 980px | 部分组件调整 |
| 移动端 | < 980px | 单栏布局，隐藏侧边栏，显示移动端菜单 |

### 移动端适配

```scss
@media (max-width: 980px) {
  // 隐藏传统布局
  .profile-rail,
  .site-header { display: none; }

  // 显示移动端元素
  .mobile-topbar { display: flex; }
  .mobile-nav { display: block; }

  // 单栏布局
  .gothic-layout { display: block; }

  // 调整内边距
  .hero-section,
  .section-block { padding-left: 28px; padding-right: 28px; }
}
```

---

## 组件样式映射

| 组件 | 类名 | 说明 |
|------|------|------|
| 头部 | `.site-header`, `.header-main`, `.header-line` | 粘性头部，暗红装饰线 |
| 侧边栏 | `.profile-rail`, `.profile-name`, `.profile-avatar` | 左侧固定栏 |
| 文章卡片 | `.post-card`, `.post-card-image`, `.post-card-title` | 文章列表卡片 |
| 首屏 | `.hero-section`, `.hero-copy`, `.hero-visual` | 首页首屏区域 |
| 文章页 | `.post-hero`, `.post-cover`, `.post-content` | 文章详情页 |
| 按钮 | `.btn`, `.btn-primary`, `.btn-secondary` | 按钮变体 |
| 分页 | `.pagination`, `.page-link`, `.page-number` | 分页导航 |

---

## Ghost 内容覆盖

### Koenig 编辑器样式

```scss
// 宽图/全宽图
.kg-width-wide,
.kg-width-full {
  margin-left: 0;
  margin-right: 0;
}

// 引用块
.post-content blockquote {
  margin: 1.5em 0;
  padding: 24px 28px;
  background: #111;
  border-left: 2px solid var(--accent);
}
```

---

## 性能优化

### 字体加载

```scss
// Google Fonts 预连接
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 图片懒加载

```scss
.post-card-image,
.hero-visual img {
  loading: lazy;  // HTML 属性
}
```

---

## 常见问题 (FAQ)

### Q: 如何修改主题颜色？

编辑 `main.scss` 中的 `:root` 变量:

```scss
:root {
  --accent: #ff0000;  // 修改强调色
  --bg-page: #000000; // 修改背景色
}
```

### Q: 如何添加新的组件样式？

在 `main.scss` 中添加新的类定义:

```scss
.my-new-component {
  background: var(--bg-panel);
  padding: var(--space-4);
}
```

### Q: 如何修改响应式断点？

修改媒体查询中的宽度值:

```scss
@media (max-width: 1200px) {  // 修改断点
  // 响应式规则
}
```

---

## 相关文件清单

### 源文件
- `/assets/scss/main.scss` - SCSS 主入口

### 构建输出
- `/assets/built/screen.css` - 编译后的 CSS（Ghost 使用）

### 构建配置
- `/vite.config.js` - Vite 构建配置
- `/package.json` - npm 脚本和依赖

### 使用样式的模板
- `/default.hbs` - 引用 `{{asset 'built/screen.css'}}`

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

*文档生成时间: 2026-03-08 16:48:37*
