[根目录](../../../CLAUDE.md) > [assets](../../) > [js](../) > **modules**

# modules 模块

> **职责**: 功能模块，实现具体的交互功能

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新面包屑，说明模块待完善 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块清单

| 模块 | 文件 | 职责 | 当前状态 |
|------|------|------|----------|
| Navigation | `navigation.js` | 导航状态管理 | 存在，待集成 |
| Animation | `animation.js` | 页面动效 | 存在，待集成 |
| Search | `search.js` | 搜索功能 | 存在，待集成 |
| Form | `form.js` | 表单处理 | 存在，待集成 |
| MobileMenu | `mobile-menu.js` | 移动端菜单 | **已集成到 main.js** |

---

## 当前状态

**移动端菜单功能**已在 `main.js` 中直接实现:

```javascript
const html = document.documentElement;
const menuToggle = document.querySelector('[data-menu-toggle]');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = html.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}
```

**其他模块** (`navigation.js`, `animation.js`, `search.js`, `form.js`) 文件存在但尚未在 `main.js` 中导入使用。

---

## 通用模块模式 (预期)

所有模块预期遵循的类模式：

```javascript
import { SELECTORS, CLASSES, CONFIG } from '../core/constants.js';
import { $, $$, debounce, throttle } from '../core/utils.js';

class ModuleName {
  constructor() {
    this.elements = {};
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.cacheElements();
    this.bindEvents();
    this.initialized = true;
  }

  cacheElements() {
    this.elements.trigger = $(SELECTORS.XXX_TRIGGER);
  }

  bindEvents() {
    this.elements.trigger?.addEventListener('click', this.handleClick.bind(this));
  }

  destroy() {
    this.initialized = false;
  }
}

export default ModuleName;
```

---

## 模块详解

### navigation.js

**职责**: 导航链接的 hover/active 状态管理

**预期功能**:
- 鼠标悬停状态切换
- 键盘焦点状态
- 当前页面高亮 (`nav-current`)

### animation.js

**职责**: 页面动效系统

**预期功能**:
1. **页面加载动画**: Hero 区域淡入
2. **卡片交错动画**: Intersection Observer
3. **阅读进度条**: 滚动时实时更新

**配置**:
```javascript
CONFIG.ANIMATION = {
  PAGE_FADE_DURATION: 320,
  CARD_STAGGER: 60,
  HERO_STAGGER: 100
}
```

### search.js

**职责**: 搜索功能

**预期功能**:
- 搜索弹窗开关
- 输入防抖 (300ms)
- Ghost API 搜索

**DOM 元素**:
```javascript
this.trigger = $('#btn-search');
this.panel = $('#search-overlay');
this.input = $('#search-input');
this.results = $('#search-results');
```

### form.js

**职责**: 表单处理

**预期功能**:
- 订阅表单验证
- Ghost Portal 集成
- 提交状态管理

### mobile-menu.js

**职责**: 移动端汉堡菜单

**状态**: 功能已集成到 `main.js`

---

## 未来集成计划

建议在 `main.js` 中实现 GothicTheme 类来统一管理这些模块：

```javascript
import { Navigation } from './modules/navigation.js';
import { Animation } from './modules/animation.js';
import { Search } from './modules/search.js';

class GothicTheme {
  init() {
    this.modules.navigation = new Navigation();
    this.modules.navigation.init();

    this.modules.animation = new Animation();
    this.modules.animation.init();

    if (document.querySelector(SELECTORS.SEARCH_TRIGGER)) {
      this.modules.search = new Search();
      this.modules.search.init();
    }
  }
}
```

---

## 相关文件

- `/assets/js/modules/navigation.js`
- `/assets/js/modules/animation.js`
- `/assets/js/modules/search.js`
- `/assets/js/modules/form.js`
- `/assets/js/modules/mobile-menu.js`
- `/assets/js/main.js` - 当前主入口
- `/assets/js/core/constants.js` - 依赖的常量
- `/assets/js/core/utils.js` - 依赖的工具函数
- `/docs/js-architecture.md` - 完整架构设计

---

*文档生成时间: 2026-03-08 16:48:37*
