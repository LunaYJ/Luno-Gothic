# Gothic Ghost 主题 - 技术规范文档

## 1. Ghost 主题规范遵循

### 1.1 主题配置文件 (package.json)

每个 Ghost 主题必须在根目录包含 `package.json` 文件：

```json
{
  "name": "gothic",
  "description": "暗黑哥特风格 Ghost 博客主题",
  "demo": "https://demo.ghost.org",
  "version": "1.0.0",
  "engines": {
    "ghost": ">=5.0.0"
  },
  "license": "MIT",
  "author": {
    "name": "Theme Author",
    "email": "author@example.com",
    "url": "https://example.com"
  },
  "keywords": [
    "ghost",
    "theme",
    "dark",
    "gothic"
  ],
  "config": {
    "posts_per_page": 9,
    "image_sizes": {
      "xxs": { "width": 30 },
      "xs": { "width": 100 },
      "s": { "width": 300 },
      "m": { "width": 600 },
      "l": { "width": 1000 },
      "xl": { "width": 2000 }
    }
  }
}
```

### 1.2 必需文件清单

Ghost 主题必须包含以下文件：

| 文件 | 必需 | 描述 |
|------|------|------|
| `default.hbs` | ✅ | 默认布局模板 |
| `index.hbs` | ✅ | 首页模板 |
| `post.hbs` | ✅ | 文章详情模板 |
| `package.json` | ✅ | 主题配置 |
| `screen.css` | ✅ | 主样式文件 |
| `page.hbs` | 建议 | 独立页面模板 |
| `error.hbs` | 建议 | 错误页面模板 |
| `tag.hbs` | 建议 | 标签页模板 |
| `author.hbs` | 建议 | 作者页模板 |

### 1.3 Ghost API 版本支持

- **最低支持**：Ghost 4.0+
- **推荐版本**：Ghost 5.0+
- **API 兼容**：Handlebars 助手兼容 Ghost 3.x 和 4.x

---

## 2. Handlebars 模板规范

### 2.1 模板语法

```handlebars
{{!-- 变量输出 --}}
{{title}}

{{!-- 条件判断 --}}
{{#if featured}}
  <span class="featured-badge">Featured</span>
{{/if}}

{{!-- 循环遍历 --}}
{{#foreach posts}}
  <article class="post-card">
    <h2>{{title}}</h2>
  </article>
{{/foreach}}

{{!-- 组件/Partials --}}
{{> post-card}}

{{!-- 助手函数 --}}
{{formatDate published_at "MMMM DD, YYYY"}}
```

### 2.2 全局上下文变量

| 变量 | 描述 |
|------|------|
| `@blog` | 博客全局信息 |
| `@blog.title` | 博客标题 |
| `@blog.description` | 博客描述 |
| `@blog.url` | 博客 URL |
| `@blog.logo` | 博客 Logo |
| `@config` | 主题配置 |
| `@site` | 同 @blog |
| `@pagination` | 分页信息 |

### 2.3 Post 对象属性

| 属性 | 描述 |
|------|------|
| `title` | 文章标题 |
| `slug` | 文章别名 |
| `url` | 文章 URL |
| `featured` | 是否为特色文章 |
| `featured_image` | 特色图片 URL |
| `excerpt` | 文章摘要 |
| `content` | 文章正文 HTML |
| `plaintext` | 文章纯文本 |
| `published_at` | 发布日期 |
| `updated_at` | 更新日期 |
| `author` | 作者对象 |
| `tags` | 标签数组 |
| `primary_tag` | 主标签 |
| `primary_author` | 主作者 |
| `reading_time` | 预计阅读时间 |
| `comment_id` | 评论系统 ID |

### 2.4 自定义助手函数注册

在 `index.js` 中注册自定义助手：

```javascript
const ghost = require('ghost');

// 注册自定义助手
module.exports = function(gho) {
  const hbs = gho.handlebars;

  // 日期格式化助手
  hbs.registerHelper('formatDate', function(date, format, options) {
    // 实现日期格式化逻辑
    return moment(date).format(format);
  });

  // 读取时间助手
  hbs.registerHelper('readingTime', function(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes + ' min read';
  });
};
```

---

## 3. CSS 架构方案

### 3.1 目录结构

```
assets/css/
├── 01-settings/
│   ├── _variables.scss      # CSS 变量定义
│   ├── _reset.scss          # CSS 重置
│   └── _typography.scss     # 字体设置
├── 02-tools/
│   ├── _mixins.scss         # 混合宏
│   ├── _functions.scss      # 函数
│   └── _animations.scss     # 动画定义
├── 03-base/
│   ├── _base.scss           # 基础样式
│   ├── _links.scss          # 链接样式
│   └── _buttons.scss        # 按钮样式
├── 04-components/
│   ├── _header.scss         # 头部组件
│   ├── _footer.scss         # 底部组件
│   ├── _post-card.scss      # 文章卡片
│   ├── _sidebar.scss        # 侧边栏
│   ├── _pagination.scss     # 分页组件
│   └── _author.scss         # 作者组件
├── 05-layout/
│   ├── _grid.scss           # 网格系统
│   ├── _header.scss         # 头部布局
│   ├── _main.scss           # 主内容区
│   └── _footer.scss         # 底部布局
├── 06-pages/
│   ├── _home.scss           # 首页样式
│   ├── _post.scss           # 文章页样式
│   ├── _archive.scss        # 归档页样式
│   └── _error.scss          # 错误页样式
├── 07-utilities/
│   ├── _utilities.scss      # 工具类
│   └── _accessibility.scss # 辅助功能
└── screen.scss              # 主入口文件
```

### 3.2 颜色变量定义

```scss
// ============================
// 1. 色彩系统 - Gothic Theme
// ============================

// 主要背景色
$color-bg-primary: #0a0a0a;
$color-bg-secondary: #0d0d0d;
$color-bg-tertiary: #080808;
$color-bg-card: #111111;
$color-bg-input: #1a1a1a;

// 强调色 - 暗红
$color-accent: #8B0000;
$color-accent-light: #a50000;
$color-accent-dark: #600000;

// 文字色 - 米色
$color-text-primary: #F5F0E8;
$color-text-secondary: #F2EBDC;
$color-text-muted: #A99FC2;
$color-text-inverse: #0a0a0a;

// 次要色 - 紫色系
$color-secondary: #8E82A7;
$color-secondary-light: #A99FC2;
$color-secondary-lighter: #C6C0D5;

// 功能色
$color-success: #4a7c59;
$color-error: #8B0000;
$color-warning: #c9a227;
$color-info: #4a6fa5;

// 边框色
$color-border: #2a2a2a;
$color-border-light: #333333;

// 阴影
$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
$shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
$shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
$shadow-glow: 0 0 20px rgba(139, 0, 0, 0.3);
```

### 3.3 字体变量定义

```scss
// ============================
// 2. 字体系统
// ============================

// 标题字体 - Cinzel
$font-heading: 'Cinzel', serif;
$font-heading-display: 'Cinzel Decorative', serif;

// 正文字体 - Cormorant Garamond
$font-body: 'Cormorant Garamond', serif;
$font-body-light: 'Cormorant Garamond Light', serif;

// 代码字体
$font-code: 'Fira Code', monospace;

// 字体大小
$font-size-base: 1.125rem;      // 18px
$font-size-sm: 0.875rem;        // 14px
$font-size-lg: 1.25rem;         // 20px
$font-size-xl: 1.5rem;          // 24px
$font-size-2xl: 1.875rem;       // 30px
$font-size-3xl: 2.25rem;        // 36px
$font-size-4xl: 3rem;           // 48px
$font-size-5xl: 3.75rem;       // 60px

// 行高
$line-height-tight: 1.2;
$line-height-base: 1.6;
$line-height-relaxed: 1.8;

// 字重
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;
```

### 3.4 响应式断点

```scss
// ============================
// 3. 响应式断点
// ============================

$breakpoint-sm: 576px;   // 手机横屏
$breakpoint-md: 768px;   // 平板
$breakpoint-lg: 992px;   // 桌面
$breakpoint-xl: 1200px;  // 大桌面
$breakpoint-2xl: 1400px; // 超大桌面

// 断点混合宏
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: $breakpoint-sm) { @content; }
  }
  @else if $breakpoint == 'md' {
    @media (min-width: $breakpoint-md) { @content; }
  }
  @else if $breakpoint == 'lg' {
    @media (min-width: $breakpoint-lg) { @content; }
  }
  @else if $breakpoint == 'xl' {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}
```

### 3.5 BEM 命名规范

```scss
// Block
.post-card {
  // ...

  // Element
  &__image {
    // ...
  }

  &__content {
    // ...
  }

  &__title {
    // ...
  }

  &__excerpt {
    // ...
  }

  &__meta {
    // ...
  }

  // Modifier
  &--featured {
    // ...
  }

  &--horizontal {
    // ...
  }
}
```

---

## 4. JavaScript 架构方案

### 4.1 文件结构

```
assets/js/
├── index.js              # 主入口
├── utils/
│   ├── dom.js            # DOM 操作工具
│   ├── animation.js       # 动画工具
│   └── lazyload.js       # 懒加载实现
├── components/
│   ├── header.js         # 头部交互
│   ├── search.js         # 搜索功能
│   ├── reading-progress.js # 阅读进度
│   ├── share.js          # 分享功能
│   └── newsletter.js    # 订阅功能
└── plugins/
    ├── Prism.js         # 代码高亮
    └── gsap.js          # 动画库（可选）
```

### 4.2 模块化设计

```javascript
// assets/js/index.js
import { initHeader } from './components/header.js';
import { initSearch } from './components/search.js';
import { initReadingProgress } from './components/reading-progress.js';
import { initLazyLoad } from './utils/lazyload.js';
import { initAnimations } from './utils/animation.js';

class GothicTheme {
  constructor() {
    this.init();
  }

  init() {
    this.initLazyLoad();
    this.initAnimations();
    this.initHeader();
    this.initSearch();
    this.initReadingProgress();

    console.log('Gothic Theme initialized');
  }

  initLazyLoad() {
    // 懒加载初始化
  }

  initAnimations() {
    // 页面加载动画
  }

  initHeader() {
    // 头部交互
  }

  initSearch() {
    // 搜索功能
  }

  initReadingProgress() {
    // 阅读进度
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new GothicTheme();
});
```

### 4.3 关键功能实现

#### 4.3.1 懒加载 (Intersection Observer)

```javascript
// assets/js/utils/lazyload.js
export function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1
  });

  images.forEach(img => observer.observe(img));
}
```

#### 4.3.2 阅读进度条

```javascript
// assets/js/components/reading-progress.js
export function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
  });
}
```

#### 4.3.3 移动端菜单

```javascript
// assets/js/components/header.js
export function initHeader() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active');
  });

  // 点击外部关闭菜单
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
    }
  });
}
```

---

## 5. 性能优化策略

### 5.1 CSS 优化

| 策略 | 实现方法 |
|------|----------|
| 压缩 | 使用 postcss-cssnano 构建时压缩 |
| 关键 CSS | 内联首屏关键 CSS |
| 合并 | 合并所有 CSS 为单个文件 |
| tree-shaking | 移除未使用的 CSS |

### 5.2 JavaScript 优化

| 策略 | 实现方法 |
|------|----------|
| 延迟加载 | `<script defer>` 加载非关键 JS |
| 代码分割 | 按需加载功能模块 |
| 事件委托 | 减少事件监听器数量 |
| 防抖/节流 | 滚动事件优化 |

### 5.3 图片优化

```html
<!-- Ghost 自动生成多种尺寸 -->
<img
  srcset="{{img_url feature_image size="s"}}
         {{img_url feature_image size="m"}} 600w,
         {{img_url feature_image size="l"}} 1000w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="{{img_url feature_image size="m"}}"
  alt="{{title}}"
  loading="lazy"
>
```

### 5.4 字体优化

```scss
// 字体加载优化
@font-face {
  font-family: 'Cinzel';
  font-display: swap; // 防止字体阻塞渲染
  src: url('/assets/fonts/Cinzel-Regular.woff2') format('woff2');
}
```

### 5.5 性能指标目标

| 指标 | 目标值 |
|------|--------|
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3.8s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Page Size | < 500KB |

---

## 6. 开发工作流程

### 6.1 开发环境设置

```bash
# 安装 Ghost CLI
npm install -g ghost-cli

# 启动本地开发
ghost local start

# 开发模式运行
cd content/themes/gothic
npm run dev
```

### 6.2 构建脚本 (package.json)

```json
{
  "scripts": {
    "dev": "node-sass --output-style expanded --source-map true assets/css/screen.scss assets/css/screen.css",
    "build": "node-sass --output-style compressed assets/css/screen.scss assets/css/screen.css",
    "watch": "node-sass --watch --output-style expanded assets/css/screen.scss assets/css/screen.css",
    "prefix": "postcss assets/css/screen.css --use autoprefixer --output assets/css/screen.css"
  },
  "devDependencies": {
    "node-sass": "^7.0.0",
    "postcss": "^8.4.0",
    "postcss-cli": "^10.0.0",
    "autoprefixer": "^10.4.0",
    "cssnano": "^5.0.0"
  }
}
```

### 6.3 代码规范

#### 6.3.1 HTML 规范

```html
<!-- 使用语义化标签 -->
<header class="site-header">
  <nav class="site-nav" aria-label="主导航">
    <!-- 导航内容 -->
  </nav>
</header>

<main class="site-main" id="main-content">
  <!-- 主要内容 -->
</main>

<footer class="site-footer">
  <!-- 底部内容 -->
</footer>
```

#### 6.3.2 SCSS 规范

```scss
// 使用 BEM 命名
.block {
  &__element {
    // ...
  }

  &__element--modifier {
    // ...
  }
}

// 嵌套层级不超过 3 层
.card {
  &__header {
    // 第一层

    & .card__title {
      // 第二层
      // 避免第三层
    }
  }
}

// 注释规范
// ============================
// Block: Card
// ============================

.card {
  // ...
}
```

#### 6.3.3 JavaScript 规范

```javascript
// 使用 ES6+ 语法
const init = () => {
  // 模块化导入
  import { debounce } from './utils/dom.js';

  // 事件委托
  document.querySelector('.posts')
    .addEventListener('click', handlePostClick);
};

// 变量命名
const postCards = document.querySelectorAll('.post-card');
const isLoading = false;

// 函数命名
function initLazyLoad() { }
function handleScrollEvent() { }
function formatDate(date) { }
```

### 6.4 Git 提交规范

```
feat: 添加文章卡片组件
fix: 修复移动端导航点击问题
docs: 更新 README 文档
style: 调整文章详情页样式
refactor: 重构 CSS 变量命名
test: 添加测试用例
chore: 更新依赖版本
```

### 6.5 测试清单

- [ ] 页面加载测试
- [ ] 响应式布局测试 (320px - 2560px)
- [ ] 跨浏览器测试 (Chrome, Firefox, Safari, Edge)
- [ ] 无障碍测试 (键盘导航、屏幕阅读器)
- [ ] 性能测试 (Lighthouse)
- [ ] Ghost 功能测试
  - [ ] 文章列表显示
  - [ ] 文章详情页
  - [ ] 标签/分类页面
  - [ ] 作者页面
  - [ ] 分页功能
  - [ ] 搜索功能
  - [ ] 会员内容
  - [ ] Newsletter

---

## 7. 辅助功能 (Accessibility)

### 7.1 ARIA 标签规范

```html
<!-- 导航 -->
<nav aria-label="主导航">
  <button aria-expanded="false" aria-controls="nav-menu">
    <span class="sr-only">菜单</span>
  </button>
</nav>

<!-- 搜索 -->
<form role="search">
  <label for="search-input" class="sr-only">搜索文章</label>
  <input type="search" id="search-input">
</form>

<!-- 折叠面板 -->
<button aria-expanded="false" aria-controls="collapse-content">
  展开更多
</button>
<div id="collapse-content" hidden>
  <!-- 内容 -->
</div>
```

### 7.2 焦点管理

```scss
// 焦点样式
:focus-visible {
  outline: 2px solid $color-accent;
  outline-offset: 2px;
}

// 跳过链接
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;

  &:focus {
    top: 0;
  }
}
```

### 7.3 对比度要求

| 元素 | 最小对比度 |
|------|-----------|
| 普通文本 | 4.5:1 |
| 大文本 (18px+) | 3:1 |
| UI 组件 | 3:1 |
| 装饰性元素 | 无要求 |

---

*文档版本：1.0*
*创建日期：2024*
*最后更新：2024*