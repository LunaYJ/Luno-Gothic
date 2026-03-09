[根目录](../../../CLAUDE.md) > [assets](../../) > [js](../) > **core**

# core 模块

> **职责**: JavaScript 核心基础设施，提供常量和工具函数

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新面包屑，确认文件存在待完善 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块结构

```
core/
├── constants.js    # 常量定义（选择器、配置、颜色）
└── utils.js        # 工具函数（DOM、防抖节流、设备检测）
```

---

## 文件状态

**constants.js** 和 **utils.js** 文件存在，但当前 `main.js` 为简化实现，未完全使用这些模块。

**预期用途**:
- 为 GothicTheme 类提供基础设施
- 集中管理选择器和配置
- 提供通用工具函数

---

## constants.js

**预期导出内容**:

### SELECTORS (选择器)

```javascript
export const SELECTORS = {
  NAV_WRAPPER: '.site-header',
  NAV_LINK: '.site-nav a, .main-navigation a',
  SEARCH_TRIGGER: '#btn-search',
  MENU_TRIGGER: '#btn-menu-toggle',
  POST_CARD: '.post-card',
  FORM_SUBSCRIBE: '.newsletter-form',
  SEARCH_PANEL: '#search-overlay',
  MENU_PANEL: '#mobile-menu',
  PROGRESS_BAR: '#scroll-progress-bar',
};
```

### CLASSES (CSS 类名)

```javascript
export const CLASSES = {
  ACTIVE: 'active',
  MENU_OPEN: 'menu-open',
  SEARCH_OPEN: 'search-open',
  ANIMATE_IN: 'animate-in',
  LOADED: 'page-loaded',
};
```

### CONFIG (配置)

```javascript
export const CONFIG = {
  ANIMATION: {
    PAGE_FADE_DURATION: 320,
    CARD_STAGGER: 60,
    HERO_STAGGER: 100
  },
  THROTTLE: {
    SCROLL: 16,
    RESIZE: 100,
    INPUT: 150
  }
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

---

## utils.js

**预期工具函数**:

### DOM 选择器

```javascript
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
```

### 防抖节流

```javascript
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

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
export const isMobile = () => window.innerWidth < 768;
export const isTouchDevice = () => 'ontouchstart' in window;
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

## 相关文件

- `/assets/js/core/constants.js` - 常量定义
- `/assets/js/core/utils.js` - 工具函数
- `/assets/js/main.js` - 主入口（待使用这些模块）

---

*文档生成时间: 2026-03-08 16:48:37*
