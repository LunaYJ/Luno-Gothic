# Font Awesome 图标使用指南

本文档说明如何在 Gothic 主题中使用 Font Awesome 图标。

---

## 基本用法

### 1. 基础图标

在 HTML 中使用 `<i>` 标签，添加 `class="fas fa-图标名"`：

```html
<!-- 搜索图标 -->
<i class="fas fa-search"></i>

<!-- 用户图标 -->
<i class="fas fa-user"></i>

<!-- 心形图标 -->
<i class="fas fa-heart"></i>
```

### 2. 图标样式前缀

Font Awesome 提供三种免费图标集：

| 前缀 | 说明 | 示例 |
|------|------|------|
| `fas` | Solid（实心） | `<i class="fas fa-heart"></i>` |
| `far` | Regular（常规） | `<i class="far fa-heart"></i>` |
| `fab` | Brands（品牌） | `<i class="fab fa-github"></i>` |

### 3. 常用图标类

结合主题的 CSS 类使用：

```html
<!-- 图标按钮 -->
<button class="icon-btn">
  <i class="fas fa-search"></i>
</button>

<!-- 带文字的图标 -->
<span class="icon-text">
  <i class="fas fa-calendar"></i>
  2024年1月1日
</span>

<!-- 社交图标 -->
<a href="#" class="social-icon">
  <i class="fab fa-github"></i>
</a>

<!-- 元信息图标 -->
<span class="meta-icon">
  <i class="fas fa-clock"></i>
  5分钟阅读
</span>
```

---

## 主题内置 CSS 类

### 图标尺寸

```html
<i class="fas fa-search icon-xs"></i>    <!-- 0.75em -->
<i class="fas fa-search icon-sm"></i>    <!-- 0.875em -->
<i class="fas fa-search icon-lg"></i>    <!-- 1.25em -->
<i class="fas fa-search icon-xl"></i>    <!-- 1.5em -->
<i class="fas fa-search icon-2x"></i>    <!-- 2em -->
<i class="fas fa-search icon-3x"></i>    <!-- 3em -->
```

### 固定宽度

用于列表对齐：

```html
<ul class="icon-list">
  <li><i class="fas fa-check fa-fw"></i> 第一项</li>
  <li><i class="fas fa-check fa-fw"></i> 第二项</li>
  <li><i class="fas fa-check fa-fw"></i> 第三项</li>
</ul>
```

### 图标按钮

```html
<!-- 方形图标按钮 -->
<button class="icon-btn">
  <i class="fas fa-bars"></i>
</button>

<!-- 圆形图标按钮 -->
<button class="icon-btn icon-btn-circle">
  <i class="fas fa-arrow-up"></i>
</button>
```

### 图标与文字

```html
<!-- 图标在左侧 -->
<span class="icon-text">
  <i class="fas fa-user"></i>
  用户名
</span>

<!-- 图标在右侧 -->
<span class="icon-text icon-text-right">
  <i class="fas fa-arrow-right"></i>
  查看更多
</span>
```

### 社交媒体图标

```html
<a href="#" class="social-icon"><i class="fab fa-github"></i></a>
<a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
<a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
```

### 导航图标

```html
<a href="#" class="nav-icon">
  <i class="fas fa-home"></i>
  首页
</a>
```

### 元信息图标

```html
<span class="meta-icon">
  <i class="fas fa-calendar"></i>
  2024-01-01
</span>
<span class="meta-icon">
  <i class="fas fa-tag"></i>
  技术
</span>
<span class="meta-icon">
  <i class="fas fa-clock"></i>
  5分钟阅读
</span>
```

---

## 动画效果

```html
<!-- 旋转动画 -->
<i class="fas fa-spinner icon-spin"></i>

<!-- 脉冲动画 -->
<i class="fas fa-circle icon-pulse"></i>
```

---

## 常用图标速查

### 导航相关

- `fa-bars` - 菜单/汉堡图标
- `fa-times` / `fa-close` - 关闭
- `fa-search` - 搜索
- `fa-arrow-left` - 左箭头
- `fa-arrow-right` - 右箭头
- `fa-chevron-up` - 上箭头
- `fa-chevron-down` - 下箭头
- `fa-home` - 首页

### 用户相关

- `fa-user` - 用户
- `fa-envelope` - 邮件
- `fa-heart` - 心形（实心）
- `fa-heart` (far) - 心形（空心）

### 内容相关

- `fa-tag` - 标签
- `fa-tags` - 多个标签
- `fa-calendar` - 日历
- `fa-clock` - 时钟
- `fa-rss` - RSS
- `fa-link` - 链接
- `fa-copy` - 复制
- `fa-share` - 分享

### 操作相关

- `fa-check` - 勾选
- `fa-info-circle` - 信息
- `fa-exclamation-circle` - 错误/警告
- `fa-warning` - 警告

### 品牌图标

- `fa-github`
- `fa-twitter` / `fa-x-twitter`
- `fa-bluesky`
- `fa-mastodon`
- `fa-discord`
- `fa-telegram`
- `fa-weixin`
- `fa-weibo`
- `fa-bilibili`
- `fa-zhihu`
- `fa-instagram`
- `fa-youtube`
- `fa-tiktok`
- `fa-linkedin`
- `fa-facebook`
- `fa-reddit`
- `fa-pinterest`
- `fa-dribbble`
- `fa-behance`
- `fa-figma`
- `fa-spotify`

---

## 在 Handlebars 模板中使用示例

### 搜索按钮

```handlebars
<button class="icon-btn" data-search-toggle>
  <i class="fas fa-search"></i>
</button>
```

### 文章元信息

```handlebars
<div class="post-meta">
  <span class="meta-icon">
    <i class="fas fa-calendar"></i>
    {{date format="YYYY-MM-DD"}}
  </span>
  <span class="meta-icon">
    <i class="fas fa-clock"></i>
    {{reading_time}}
  </span>
</div>
```

### 社交链接

```handlebars
<div class="social-links">
  {{#if @site.twitter}}
    <a href="{{twitter_url}}" class="social-icon" target="_blank" rel="noopener">
      <i class="fab fa-twitter"></i>
    </a>
  {{/if}}
  {{#if @site.facebook}}
    <a href="{{facebook_url}}" class="social-icon" target="_blank" rel="noopener">
      <i class="fab fa-facebook"></i>
    </a>
  {{/if}}
  <a href="https://github.com/username" class="social-icon" target="_blank" rel="noopener">
    <i class="fab fa-github"></i>
  </a>
</div>
```

### 导航菜单

```handlebars
<nav class="site-nav">
  <ul class="nav">
    <li class="nav-current">
      <a href="/" class="nav-icon">
        <i class="fas fa-home"></i>
        首页
      </a>
    </li>
    <li>
      <a href="/about/" class="nav-icon">
        <i class="fas fa-user"></i>
        关于
      </a>
    </li>
  </ul>
</nav>
```

### 标签列表

```handlebars
<div class="tag-list">
  {{#foreach tags}}
    <a href="{{url}}" class="icon-text">
      <i class="fas fa-tag"></i>
      {{name}}
    </a>
  {{/foreach}}
</div>
```

---

## 添加新图标

如需添加未内置的图标，编辑 `assets/js/core/icons.js`：

```javascript
// 1. 导入新图标
import { faNewIcon } from '@fortawesome/free-solid-svg-icons';

// 2. 添加到 library
library.add(
  // ... 现有图标
  faNewIcon,
);

// 3. 在 ICONS 映射中添加（可选）
export const ICONS = {
  // ... 现有映射
  NEW_ICON: 'new-icon',
};
```

---

## 完整图标列表

访问 [Font Awesome 图标库](https://fontawesome.com/icons) 查看所有可用图标。

**注意**: 本项目使用的是 Font Awesome Free 版本，部分图标可能不可用。
