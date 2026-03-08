[根目录](../../../CLAUDE.md) > [assets](../../) > [js](../) > **core**

# core 模块

> **职责**: JavaScript 核心基础设施，提供常量和工具函数

---

## 模块结构

```
core/
├── constants.js    # 常量定义（选择器、配置、颜色）
└── utils.js        # 工具函数（DOM、防抖节流、设备检测）
```

---

## constants.js

**职责**: 集中管理所有常量定义

### SELECTORS (选择器)

```javascript
export const SELECTORS = {
  // 导航
  NAV_WRAPPER: '.site-header',
  NAV_LINK: '.site-nav a, .main-navigation a',
  NAV_CURRENT: 'nav-current',

  // 按钮
  BTN_PRIMARY: '.btn-primary, button[type="submit"]',
  BTN_SECONDARY: '.btn-secondary',
  SEARCH_TRIGGER: '#btn-search',
  MENU_TRIGGER: '#btn-menu-toggle',

  // 卡片
  POST_CARD: '.post-card, .article-card, [data-animate="card"]',
  POST_CARD_WRAPPER: '.posts-grid, .articles-list, .post-list',

  // 表单
  FORM_SUBSCRIBE: '.newsletter-form',
  INPUT_EMAIL: '#newsletter-email, input[type="email"]',
  FORM_ERROR: '.form-error',
  FORM_SUCCESS: '.form-success',

  // 搜索
  SEARCH_PANEL: '#search-overlay',
  SEARCH_INPUT: '#search-input',
  SEARCH_CLOSE: '#search-close',
  SEARCH_RESULTS: '#search-results',
  SEARCH_BACKDROP: '#search-backdrop',

  // 移动端菜单
  MENU_PANEL: '#mobile-menu, .mobile-menu-panel',
  MENU_OVERLAY: '.menu-overlay',
  MENU_LINK: '.mobile-menu a, .site-nav a',

  // 进度条
  PROGRESS_BAR: '#scroll-progress-bar',
  PROGRESS_CONTAINER: '#scroll-progress',

  // 动画元素
  ANIMATE_CONTAINER: '[data-animate-container]',
  ANIMATE_HERO: '[data-animate="hero"], .hero-section',

  // 页面
  BODY: 'body',
  MAIN_CONTENT: 'main, .content-wrapper',
  ARTICLE_CONTENT: '.article-content, .post-content'
};
```

### CLASSES (CSS 类名)

```javascript
export const CLASSES = {
  // 状态
  ACTIVE: 'active',
  HOVER: 'hover',
  FOCUS: 'focus',
  DISABLED: 'disabled',
  LOADED: 'page-loaded',
  MENU_OPEN: 'menu-open',
  SEARCH_OPEN: 'search-open',

  // 动画
  ANIMATE_IN: 'animate-in',
  ANIMATE_HERO_DONE: 'hero-animated',

  // 表单
  INPUT_FOCUS: 'input-focus',
  FORM_SUBMITTING: 'form-submitting',
  FORM_ERROR: 'has-error',
  FORM_SUCCESS: 'has-success',

  // 无障碍
  SR_ONLY: 'sr-only'
};
```

### CONFIG (配置)

```javascript
export const CONFIG = {
  // 动画配置
  ANIMATION: {
    PAGE_LOAD_DELAY: 0,
    PAGE_FADE_DURATION: 320,
    CARD_STAGGER: 60,
    CARD_FADE_DURATION: 400,
    HERO_STAGGER: 100
  },

  // 过渡配置
  TRANSITION: {
    DEFAULT: 200,
    FAST: 150,
    SLOW: 300
  },

  // 节流配置
  THROTTLE: {
    SCROLL: 16,      // ~60fps
    RESIZE: 100,
    INPUT: 150
  },

  // 观察器配置
  OBSERVER: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -50px 0px'
  }
};
```

### ATTRIBUTES (HTML 属性)

```javascript
export const ATTRIBUTES = {
  // 数据属性
  ANIMATE: 'data-animate',
  STAGGER: 'data-stagger',
  PROGRESS_BAR: 'data-progress-bar',
  SUBSCRIBE_FORM: 'data-portal',
  SEARCH_TRIGGER: 'data-search-trigger',

  // ARIA 属性
  ARIA_CURRENT: 'aria-current',
  ARIA_EXPANDED: 'aria-expanded',
  ARIA_CONTROLS: 'aria-controls',
  ARIA_LABEL: 'aria-label',
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_LIVE: 'aria-live',
  ARIA_DESCRIBEDBY: 'aria-describedby'
};
```

### BREAKPOINTS (断点)

```javascript
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
};
```

### GOTHIC_COLORS (颜色常量)

```javascript
export const GOTHIC_COLORS = {
  NAV_DEFAULT: '#B8B2C8',
  NAV_HOVER: '#E9E1CF',
  NAV_ACTIVE: '#C9B68A',
  BTN_DEFAULT: '#8B0000',
  BTN_HOVER: '#A1121F',
  BTN_PRESSED: '#6A0D14',
  CARD_BORDER: '#C9B68A',
  CARD_BG_DEFAULT: '#0d0d0d',
  CARD_BG_HOVER: '#141414',
  BG_DARK: '#0a0a0a',
  BG_CARD: '#0d0d0d'
};
```

---

## utils.js

**职责**: 通用工具函数

### DOM 选择器

```javascript
/**
 * 单元素选择器
 * @param {string} selector - CSS 选择器
 * @returns {Element|null}
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * 多元素选择器
 * @param {string} selector - CSS 选择器
 * @returns {NodeList}
 */
export const $$ = (selector) => document.querySelectorAll(selector);
```

### 防抖节流

```javascript
/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function}
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} limit - 时间限制(ms)
 * @returns {Function}
 */
export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
```

### 设备检测

```javascript
/**
 * 检测是否为移动设备
 * @returns {boolean}
 */
export const isMobile = () => window.innerWidth < 768;

/**
 * 检测是否为触屏设备
 * @returns {boolean}
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
};
```

### 通知

```javascript
/**
 * 显示通知
 * @param {string} message - 消息内容
 * @param {string} type - 类型: info, success, error, warning
 * @param {number} duration - 显示时长(ms)
 */
export const showNotification = (message, type = 'info', duration = 3000) => {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('notification--fade-out');
    setTimeout(() => notification.remove(), 300);
  }, duration);
};
```

---

## 使用示例

```javascript
import { SELECTORS, CLASSES, CONFIG } from '../core/constants.js';
import { isMobile, debounce, $ } from '../core/utils.js';

// 使用选择器
const header = $(SELECTORS.NAV_WRAPPER);
const cards = $$(SELECTORS.POST_CARD);

// 使用防抖
window.addEventListener('resize', debounce(() => {
  console.log('Resized!');
}, CONFIG.THROTTLE.RESIZE));

// 检测设备
if (isMobile()) {
  document.body.classList.add('is-mobile');
}
```

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/assets/js/core/constants.js` - 常量定义
- `/assets/js/core/utils.js` - 工具函数
- `/assets/js/main.js` - 使用这些核心的主入口
- `/assets/js/modules/*.js` - 使用这些核心的功能模块

---

*文档生成时间: 2026-03-08 14:02:37*
