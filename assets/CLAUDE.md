[根目录](../../CLAUDE.md) > **assets**

# assets 模块

> **职责**: 存放主题的所有静态资源，包括 CSS 样式、JavaScript 脚本、图片和字体文件

---

## 模块结构

```
assets/
├── css/                    # 样式文件
│   ├── base/              # 基础样式层
│   │   ├── reset.css      # CSS 重置
│   │   ├── variables.css  # CSS 变量定义
│   │   ├── typography.css # 字体设置
│   │   └── utility.css    # 工具类
│   ├── layout/            # 布局样式层
│   │   ├── container.css  # 容器布局
│   │   ├── grid.css       # 网格系统
│   │   └── responsive.css # 响应式断点
│   ├── components/        # 组件样式层
│   │   ├── nav.css        # 导航组件
│   │   ├── card.css       # 卡片组件
│   │   ├── button.css     # 按钮组件
│   │   ├── form.css       # 表单组件
│   │   ├── footer.css     # 页脚组件
│   │   ├── hero.css       # 首屏组件
│   │   └── post.css       # 文章组件
│   ├── main.css           # 主入口（导入所有模块）
│   └── ghost-overrides.css # Ghost 样式覆盖
└── js/                    # JavaScript 文件
    ├── core/              # 核心层
    │   ├── constants.js   # 常量定义
    │   └── utils.js       # 工具函数
    ├── modules/           # 功能模块层
    │   ├── navigation.js  # 导航模块
    │   ├── animation.js   # 动画模块
    │   ├── search.js      # 搜索模块
    │   ├── form.js        # 表单模块
    │   └── mobile-menu.js # 移动端菜单
    └── main.js            # 主入口（GothicTheme 类）
```

---

## 入口与启动

### CSS 入口: `main.css`

```css
/* 1. 基础样式 */
@import 'base/reset.css';
@import 'base/variables.css';
@import 'base/typography.css';
@import 'base/utility.css';

/* 2. 布局样式 */
@import 'layout/container.css';
@import 'layout/grid.css';
@import 'layout/responsive.css';

/* 3. 组件样式 */
@import 'components/nav.css';
@import 'components/card.css';
@import 'components/button.css';
@import 'components/form.css';
@import 'components/footer.css';
@import 'components/hero.css';
@import 'components/post.css';

/* 4. Ghost 覆盖 */
@import 'ghost-overrides.css';
```

### JS 入口: `main.js`

```javascript
// 导入核心模块
import { SELECTORS, CLASSES, CONFIG } from './core/constants.js';
import { isMobile, isTouchDevice } from './core/utils.js';

// 导入功能模块
import Navigation from './modules/navigation.js';
import Animation from './modules/animation.js';
import Search from './modules/search.js';
import Form from './modules/form.js';
import MobileMenu from './modules/mobile-menu.js';

// 主类: GothicTheme
class GothicTheme {
  constructor() {
    this.modules = {};
    this.initialized = false;
  }

  init() {
    this.initModules();
    this.setGlobalState();
    this.bindGlobalEvents();
  }

  initModules() {
    this.modules.navigation = new Navigation();
    this.modules.navigation.init();

    this.modules.animation = new Animation();
    this.modules.animation.init();

    // 条件加载：搜索模块
    if (document.querySelector(SELECTORS.SEARCH_TRIGGER)) {
      this.modules.search = new Search();
      this.modules.search.init();
    }

    // 条件加载：表单模块
    if (document.querySelector(SELECTORS.FORM_SUBSCRIBE)) {
      this.modules.form = new Form();
      this.modules.form.init();
    }

    // 条件加载：移动端菜单
    if (isMobile() && document.querySelector(SELECTORS.MENU_TRIGGER)) {
      this.modules.mobileMenu = new MobileMenu();
      this.modules.mobileMenu.init();
    }
  }
}

// DOM 加载完成后初始化
const gothicTheme = new GothicTheme();
gothicTheme.init();
window.gothicTheme = gothicTheme; // 全局访问
```

---

## 关键依赖与配置

### CSS 变量系统 (`base/variables.css`)

```css
:root {
  /* 背景色 - 层层递进的黑暗 */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #0d0d0d;
  --color-bg-tertiary: #080808;
  --color-bg-elevated: #111111;

  /* 强调色 - 哥特暗红 */
  --color-accent-primary: #8B0000;
  --color-accent-hover: #a1121f;

  /* 文字色 - 米色系 */
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #F2EBDC;
  --color-text-muted: #A99FC2;

  /* 字体家族 */
  --font-display: 'Cinzel', serif;
  --font-body: 'Cormorant Garamond', serif;
  --font-mono: 'Fira Code', monospace;

  /* 响应式断点 */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* 动画过渡 */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
}
```

### JS 常量系统 (`core/constants.js`)

```javascript
export const SELECTORS = {
  NAV_WRAPPER: '.site-header',
  NAV_LINK: '.site-nav a',
  SEARCH_TRIGGER: '#btn-search',
  MENU_TRIGGER: '#btn-menu-toggle',
  POST_CARD: '.post-card',
  FORM_SUBSCRIBE: '.newsletter-form',
  // ...
};

export const CONFIG = {
  ANIMATION: {
    PAGE_FADE_DURATION: 320,
    CARD_STAGGER: 60,
    HERO_STAGGER: 100
  },
  THROTTLE: {
    SCROLL: 16,
    RESIZE: 100
  }
};
```

---

## 功能模块详解

### Navigation (导航模块)

- **文件**: `modules/navigation.js`
- **职责**: 处理导航链接的 hover/active 状态，SPA 路由变化监听
- **关键方法**:
  - `setActiveLink()` - 根据当前 URL 设置激活状态
  - `observeUrlChanges()` - 监听 URL 变化（SPA 支持）

### Animation (动画模块)

- **文件**: `modules/animation.js`
- **职责**: 页面加载动效、卡片交错动画、阅读进度条
- **关键功能**:
  - Intersection Observer 触发卡片动画
  - 阅读进度条实时更新（throttle 优化）
  - 支持 `data-animate` 属性触发动画

### Search (搜索模块)

- **文件**: `modules/search.js`
- **职责**: 搜索弹窗、输入防抖、结果显示
- **关键功能**:
  - Ghost API 搜索集成
  - 本地回退搜索（基于页面内容）
  - ESC 键关闭、点击遮罩关闭

### Form (表单模块)

- **文件**: `modules/form.js`
- **职责**: 订阅表单处理、验证、提交

### MobileMenu (移动端菜单)

- **文件**: `modules/mobile-menu.js`
- **职责**: 移动端汉堡菜单、滑动面板

---

## 测试与质量

### CSS 质量工具

| 工具 | 用途 | 配置位置 |
|------|------|----------|
| PostCSS | 处理 CSS | package.json (可添加) |
| Autoprefixer | 自动添加前缀 | 构建配置 |
| CSSNano | 压缩 CSS | 生产构建 |

### JS 测试策略

- **单元测试**: 工具函数测试 (`utils.js`)
- **集成测试**: 模块初始化流程
- **E2E 测试**: Ghost 主题功能测试

---

## 常见问题 (FAQ)

### Q: 如何修改主题颜色？

编辑 `assets/css/base/variables.css` 中的 CSS 变量：

```css
--color-accent-primary: #8B0000;  /* 修改为主色调 */
--color-bg-primary: #0a0a0a;       /* 修改背景色 */
```

### Q: 如何添加新的动画效果？

1. 在 `main.css` 中添加关键帧动画
2. 在 `modules/animation.js` 中添加触发逻辑
3. 使用 `data-animate="xxx"` 属性标记需要动画的元素

### Q: 如何禁用某个模块？

在 `main.js` 的 `initModules()` 中注释掉对应模块的初始化代码。

---

## 相关文件清单

### CSS 文件
- `/assets/css/main.css` - 主入口
- `/assets/css/base/variables.css` - 设计系统变量
- `/assets/css/components/nav.css` - 导航样式
- `/assets/css/components/card.css` - 卡片样式
- `/assets/css/components/hero.css` - 首屏样式

### JS 文件
- `/assets/js/main.js` - 主入口
- `/assets/js/core/constants.js` - 常量定义
- `/assets/js/core/utils.js` - 工具函数
- `/assets/js/modules/navigation.js` - 导航模块
- `/assets/js/modules/animation.js` - 动画模块
- `/assets/js/modules/search.js` - 搜索模块

---

*文档生成时间: 2026-03-08 14:02:37*
