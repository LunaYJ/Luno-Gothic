[根目录](../../../CLAUDE.md) > [assets](../) > **js**

# JavaScript 模块

> **职责**: 主题交互逻辑，采用模块化 ES6 架构

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新文档，确认当前简化版 main.js 实现 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块结构

```
js/
├── core/                    # 核心层
│   ├── constants.js        # 常量定义
│   └── utils.js            # 工具函数
├── modules/                # 功能模块层
│   ├── navigation.js       # 导航模块
│   ├── animation.js        # 动画模块
│   ├── search.js           # 搜索模块
│   ├── form.js             # 表单模块
│   └── mobile-menu.js      # 移动端菜单
└── main.js                 # 主入口
```

---

## 重要说明

**当前状态**: 当前主题的 `main.js` 是一个简化实现，仅包含移动端菜单功能。

**预期架构** (已规划设计):
- 完整的 GothicTheme 类架构
- 模块化的 Navigation、Animation、Search 等模块
- 条件加载和全局状态管理

**当前实现** (简化版):
- 仅实现移动端菜单切换
- 点击外部关闭菜单

---

## 当前入口 (main.js)

```javascript
import '../scss/main.scss';

const html = document.documentElement;
const menuToggle = document.querySelector('[data-menu-toggle]');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = html.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.addEventListener('click', (event) => {
  if (!html.classList.contains('menu-open')) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('.mobile-nav') || target.closest('[data-menu-toggle]')) return;
  html.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
});
```

---

## 核心层 (core/)

### constants.js

**导出内容**:
```javascript
export const SELECTORS = {
  NAV_WRAPPER: '.site-header',
  NAV_LINK: '.site-nav a',
  SEARCH_TRIGGER: '#btn-search',
  MENU_TRIGGER: '#btn-menu-toggle',
  POST_CARD: '.post-card',
  FORM_SUBSCRIBE: '.newsletter-form',
};

export const CLASSES = {
  ACTIVE: 'active',
  MENU_OPEN: 'menu-open',
  SEARCH_OPEN: 'search-open',
  ANIMATE_IN: 'animate-in',
};

export const CONFIG = {
  ANIMATION: {
    PAGE_FADE_DURATION: 320,
    CARD_STAGGER: 60,
    HERO_STAGGER: 100
  },
  THROTTLE: {
    SCROLL: 16,
    RESIZE: 100,
  }
};
```

### utils.js

**工具函数**:
```javascript
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const debounce = (fn, delay) => { ... };
export const throttle = (fn, limit) => { ... };
export const isMobile = () => window.innerWidth < 768;
export const isTouchDevice = () => 'ontouchstart' in window;
```

---

## 功能模块 (modules/)

### navigation.js

**职责**: 导航链接状态管理

**关键方法**:
- `setActiveLink()` - 根据当前 URL 高亮导航
- `observeUrlChanges()` - SPA 路由变化监听

### animation.js

**职责**: 页面动效系统

**功能**:
1. **页面加载动画**: Hero 区域淡入
2. **卡片交错动画**: Intersection Observer
3. **阅读进度条**: 滚动时实时更新

### search.js

**职责**: 搜索功能

**功能**:
- 搜索弹窗开关
- 输入防抖
- Ghost API 搜索

### form.js

**职责**: 表单处理（主要是订阅表单）

### mobile-menu.js

**职责**: 移动端汉堡菜单

**当前实现已集成在 main.js 中**

---

## 构建输出

```
main.js --[Vite]--> assets/built/main.js
```

在 `default.hbs` 中引用:
```handlebars
<script type="module" src="{{asset 'built/main.js'}}"></script>
```

---

## 性能优化

### 事件节流

```javascript
// 滚动事件节流 16ms (约 60fps)
this._scrollHandler = throttle(() => this.updateProgress(), 16);
window.addEventListener('scroll', this._scrollHandler, { passive: true });

// 输入防抖 300ms
const handleInput = debounce((e) => this.performSearch(e.target.value), 300);
```

### 懒加载

- 图片使用 `loading="lazy"`
- 模块条件加载（只在需要时初始化）

---

## 未来扩展建议

1. **实现完整 GothicTheme 类**: 参照 `docs/js-architecture.md`
2. **添加 Search 模块**: 实现搜索弹窗功能
3. **添加 Animation 模块**: 实现卡片动画和阅读进度
4. **添加表单验证**: Newsletter 表单处理

---

## 相关文件

- `/assets/js/main.js` - 主入口（当前简化版）
- `/assets/js/core/constants.js` - 常量定义
- `/assets/js/core/utils.js` - 工具函数
- `/assets/js/modules/navigation.js` - 导航模块（待完善）
- `/assets/js/modules/animation.js` - 动画模块（待完善）
- `/assets/js/modules/search.js` - 搜索模块（待完善）
- `/docs/js-architecture.md` - JS 架构设计文档

---

*文档生成时间: 2026-03-08 16:48:37*
