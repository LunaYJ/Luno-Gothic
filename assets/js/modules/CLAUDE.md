[根目录](../../../CLAUDE.md) > [assets](../../) > [js](../) > **modules**

# modules 模块

> **职责**: 功能模块，实现具体的交互功能

---

## 模块清单

| 模块 | 文件 | 职责 | 依赖 |
|------|------|------|------|
| Navigation | `navigation.js` | 导航状态管理 | constants, utils |
| Animation | `animation.js` | 页面动效 | constants, utils |
| Search | `search.js` | 搜索功能 | constants, utils |
| Form | `form.js` | 表单处理 | constants, utils |
| MobileMenu | `mobile-menu.js` | 移动端菜单 | constants, utils |

---

## 通用模块模式

所有模块遵循相同的类模式：

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
    console.log('[Gothic ModuleName] Initialized');
  }

  cacheElements() {
    this.elements.trigger = $(SELECTORS.XXX_TRIGGER);
    // ...
  }

  bindEvents() {
    this.elements.trigger?.addEventListener('click', this.handleClick.bind(this));
    // ...
  }

  destroy() {
    // 清理事件监听
    this.initialized = false;
  }
}

export default ModuleName;
```

---

## navigation.js

**职责**: 导航链接的 hover/active 状态管理

**功能**:
- 鼠标悬停状态切换
- 键盘焦点状态
- 当前页面高亮
- SPA 路由变化监听

**关键方法**:
```javascript
setActiveLink()      // 根据当前 URL 设置激活链接
observeUrlChanges()  // 监听 hashchange 和 DOM 变化
setActive(link)      // 设置单个链接为激活状态
```

**事件处理**:
- `mouseenter` / `mouseleave` - hover 效果
- `focus` / `blur` - 键盘导航
- `click` - 点击反馈
- `hashchange` - URL 变化

---

## animation.js

**职责**: 页面动效系统

**功能**:
1. **页面加载动画**: Hero 区域淡入 (320ms)
2. **卡片交错动画**: Intersection Observer + 60ms stagger
3. **阅读进度条**: 滚动时实时更新

**关键方法**:
```javascript
initPageLoad()       // 页面加载动画
initCardAnimation()  // 卡片进入动画
initReadingProgress() // 阅读进度条
updateProgress()     // 更新进度条
reinit()             // SPA 导航后重新初始化
destroy()            // 清理 observer 和事件
```

**动画配置**:
```javascript
CONFIG.ANIMATION = {
  PAGE_FADE_DURATION: 320,  // ms
  CARD_STAGGER: 60,         // ms
  HERO_STAGGER: 100         // ms
}
```

**数据属性**:
- `data-animate="card"` - 卡片动画
- `data-animate="hero"` - Hero 动画
- `data-animate="fade"` - 淡入动画
- `data-stagger="100"` - 交错延迟

---

## search.js

**职责**: 搜索功能

**功能**:
- 搜索弹窗开关
- 输入防抖 (300ms)
- Ghost API 搜索
- 本地回退搜索

**关键方法**:
```javascript
open()               // 打开搜索面板
close()              // 关闭搜索面板
toggle()             // 切换面板状态
performSearch(query) // 执行搜索
displayResults()     // 显示搜索结果
```

**DOM 元素**:
```javascript
this.trigger = $('#btn-search');
this.panel = $('#search-overlay');
this.input = $('#search-input');
this.results = $('#search-results');
```

**搜索流程**:
1. 用户输入（防抖 300ms）
2. 检查 Ghost 搜索 API 可用性
3. 优先使用 Ghost API
4. 回退到本地搜索（基于页面内容）
5. 显示结果

---

## form.js

**职责**: 表单处理

**功能**:
- 订阅表单验证
- Ghost Portal 集成
- 提交状态管理

**关键方法**:
```javascript
validate()           // 表单验证
handleSubmit()       // 提交处理
showSuccess()        // 显示成功状态
showError()          // 显示错误状态
```

---

## mobile-menu.js

**职责**: 移动端汉堡菜单

**功能**:
- 菜单开关
- 遮罩层
- 动画过渡
- ESC 键关闭

**关键方法**:
```javascript
open()               // 打开菜单
close()              // 关闭菜单
toggle()             // 切换菜单状态
```

---

## 模块间通信

模块之间通过主控制器 (`main.js`) 协调：

```javascript
// main.js
class GothicTheme {
  initModules() {
    this.modules.navigation = new Navigation();
    this.modules.navigation.init();

    this.modules.animation = new Animation();
    this.modules.animation.init();
  }

  reinit() {
    // SPA 导航后重新初始化
    this.modules.animation.reinit();
    this.modules.navigation.setActiveLink();
  }
}
```

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/assets/js/modules/navigation.js` - 导航模块
- `/assets/js/modules/animation.js` - 动画模块
- `/assets/js/modules/search.js` - 搜索模块
- `/assets/js/modules/form.js` - 表单模块
- `/assets/js/modules/mobile-menu.js` - 移动端菜单
- `/assets/js/main.js` - 主控制器
- `/assets/js/core/constants.js` - 依赖的常量
- `/assets/js/core/utils.js` - 依赖的工具函数

---

*文档生成时间: 2026-03-08 14:02:37*
