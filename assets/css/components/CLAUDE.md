[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **components**

# components 模块

> **职责**: CSS 组件层，定义 UI 组件的样式

---

## 模块结构

```
components/
├── nav.css          # 导航组件
├── card.css         # 卡片组件
├── button.css       # 按钮组件
├── form.css         # 表单组件
├── footer.css       # 页脚组件
├── hero.css         # 首屏组件
└── post.css         # 文章组件
```

---

## 组件清单

| 组件 | 文件 | 主要类名 | 用途 |
|------|------|----------|------|
| 导航 | `nav.css` | `.site-header`, `.site-nav` | 顶部导航栏 |
| 卡片 | `card.css` | `.post-card`, `.author-card` | 文章和作者卡片 |
| 按钮 | `button.css` | `.btn-*` | 各种按钮样式 |
| 表单 | `form.css` | `.form-*`, `.input-*` | 表单和输入框 |
| 页脚 | `footer.css` | `.site-footer` | 页面底部 |
| 首屏 | `hero.css` | `.hero-*` | 首页首屏区域 |
| 文章 | `post.css` | `.post-*` | 文章详情页 |

---

## nav.css - 导航组件

### 结构

```css
.site-header {
  /* 头部容器 */
}

.header-inner {
  /* 内部布局 */
}

.site-brand {
  /* Logo/站点名 */
}

.site-nav {
  /* 导航菜单 */
}

.site-nav a {
  /* 导航链接 */
}

.site-nav a:hover {
  /* 悬停状态 */
}

.site-nav a.active,
.site-nav a.nav-current {
  /* 当前页面 */
}

/* 移动端菜单按钮 */
.btn-menu-toggle {
  /* 汉堡菜单 */
}

/* 搜索按钮 */
.btn-search {
  /* 搜索触发 */
}
```

---

## card.css - 卡片组件

### Post Card

```css
.post-card {
  /* 卡片容器 */
}

.post-card__image {
  /* 卡片图片 */
}

.post-card__content {
  /* 卡片内容 */
}

.post-card__tag {
  /* 标签 */
}

.post-card__title {
  /* 标题 */
}

.post-card__excerpt {
  /* 摘要 */
}

.post-card__meta {
  /* 元信息（日期、阅读时间） */
}

/* Featured 变体 */
.post-card[data-featured="true"] {
  /* 精选文章样式 */
}
```

### Author Card

```css
.author-card {
  /* 作者卡片 */
}

.author-card--inline {
  /* 行内显示 */
}

.author-card--sidebar {
  /* 侧边栏显示 */
}

.author-card__avatar {
  /* 头像 */
}

.author-card__name {
  /* 名字 */
}

.author-card__bio {
  /* 简介 */
}
```

---

## button.css - 按钮组件

### 按钮变体

```css
/* 基础按钮 */
.btn {
  /* 基础样式 */
}

/* 主按钮 */
.btn-primary {
  background: var(--color-accent-primary);
  color: var(--color-text-primary);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

/* 次按钮 */
.btn-secondary {
  /* 次要样式 */
}

/* 幽灵按钮 */
.btn-ghost {
  /* 透明背景 */
}

/* Hero 按钮 */
.btn-hero {
  /* 首屏专用 */
}

.btn-hero--secondary {
  /* Hero 次按钮 */
}
```

---

## form.css - 表单组件

### 表单元素

```css
/* 表单容器 */
.form-group {
  /* 表单组 */
}

/* 输入框 */
.input {
  /* 基础输入框 */
}

.input:focus {
  /* 聚焦状态 */
}

.input--error {
  /* 错误状态 */
}

/* 搜索框 */
.search-input {
  /* 搜索专用 */
}

/* 搜索覆盖层 */
.search-overlay {
  /* 全屏搜索 */
}
```

---

## footer.css - 页脚组件

### 结构

```css
.site-footer {
  /* 页脚容器 */
}

.footer-line {
  /* 装饰线 */
}

.footer-inner {
  /* 内部布局 */
}

.footer-brand {
  /* 品牌区域 */
}

.footer-nav {
  /* 导航区域 */
}

.footer-copyright {
  /* 版权信息 */
}
```

---

## hero.css - 首屏组件

### 结构

```css
.hero-section {
  /* 首屏容器 */
}

.hero-container {
  /* 内容容器 */
}

.hero-content {
  /* 文字内容 */
}

.hero-kicker {
  /* 小标题 */
}

.hero-title {
  /* 主标题 */
}

.hero-description {
  /* 描述 */
}

.hero-actions {
  /* 按钮组 */
}

.hero-visual {
  /* 视觉元素（图片） */
}
```

---

## post.css - 文章组件

### 结构

```css
/* 文章容器 */
.post-article {
  /* 文章外层 */
}

/* 文章头部 */
.post-header {
  /* 头部区域 */
}

.post-header-inner {
  /* 内部布局 */
}

.post-meta {
  /* 元信息 */
}

.post-meta__tag {
  /* 标签 */
}

.post-meta__date {
  /* 日期 */
}

.post-meta__reading-time {
  /* 阅读时间 */
}

.post-title {
  /* 标题 */
}

.post-title-underline {
  /* 标题下划线 */
}

.post-lead {
  /* 导语 */
}

/* 封面图 */
.post-cover {
  /* 封面容器 */
}

.post-cover__image {
  /* 封面图片 */
}

/* 文章内容 */
.post-body {
  /* 双栏布局 */
}

.post-content {
  /* 正文 */
}

.post-sidebar {
  /* 侧边栏 */
}

.sidebar-widget {
  /* 侧边栏小部件 */
}

/* 相关文章 */
.related-posts {
  /* 相关文章区域 */
}
```

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/assets/css/components/nav.css` - 导航样式
- `/assets/css/components/card.css` - 卡片样式
- `/assets/css/components/button.css` - 按钮样式
- `/assets/css/components/form.css` - 表单样式
- `/assets/css/components/footer.css` - 页脚样式
- `/assets/css/components/hero.css` - 首屏样式
- `/assets/css/components/post.css` - 文章样式
- `/assets/css/main.css` - 导入这些组件样式

---

*文档生成时间: 2026-03-08 14:02:37*
