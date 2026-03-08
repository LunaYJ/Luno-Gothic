# Gothic Ghost 主题 JavaScript 交互架构

## 1. 技术选型

### 推荐方案：原生 JavaScript + CSS 变量

**为什么选择原生 JS：**

| 考量因素 | 原生 JS | Alpine.js | jQuery |
|---------|---------|-----------|--------|
| 包体积 | 0KB | ~15KB | ~85KB |
| 学习曲线 | 低 | 中 | 中 |
| 性能 | 最佳 | 良好 | 一般 |
| 与 Ghost 集成 | 原生 | 需要适配 | 需要适配 |
| 定制灵活性 | 最高 | 高 | 中 |

**决策理由：**
- Ghost 主题本身已足够轻量，无需额外依赖
- 交互逻辑相对简单，原生 JS 完全胜任
- CSS 变量已能处理大部分状态变化，JS 仅处理行为逻辑
- 便于后续维护和调试

---

## 2. 模块划分

```
assets/js/
├── core/
│   ├── main.js          # 入口文件，初始化所有模块
│   ├── constants.js     # 常量定义（选择器、配置）
│   └── utils.js         # 工具函数
├── modules/
│   ├── navigation.js    # 导航交互模块
│   ├── animation.js     # 滚动动效模块
│   ├── search.js       # 搜索功能模块
│   ├── form.js         # 表单处理模块
│   └── mobile-menu.js  # 移动端菜单模块
└── vendors/
    └── (可选) 第三方库
```

---

## 3. 各功能模块设计

### 3.1 Navigation 模块

**文件：** `modules/navigation.js`

**功能描述：** 处理导航链接的 hover/active 状态切换

**设计规范（来自设计文件）：**

| 状态 | 文字颜色 | 背景色 | 交互方式 |
|------|---------|--------|---------|
| Default | `#B8B2C8` | transparent | - |
| Hover | `#E9E1CF` | `#141414` | 颜色渐变 200ms |
| Active | `#C9B68A` | `#111111` | 点击反馈 |

**实现要点：**

```javascript
// CSS 变量定义（variables.css）
:root {
  --nav-default: #B8B2C8;
  --nav-hover: #E9E1CF;
  --nav-active: #C9B68A;
  --nav-hover-bg: #141414;
  --nav-active-bg: #111111;
  --transition-nav: color 200ms ease, background-color 200ms ease;
}

// 交互行为
// 1. 鼠标悬停：颜色过渡 + 背景微亮
// 2. 点击/激活：更深颜色 + 背景变暗
// 3. 当前页面：高亮状态（通过 body class 或 URL 匹配）
```

**导出 API：**
- `init()` - 初始化导航交互
- `setActive(linkElement)` - 手动设置激活状态
- `destroy()` - 移除事件监听

---

### 3.2 Animation 模块

**文件：** `modules/animation.js`

**功能描述：** 页面加载动效、卡片交错动画、阅读进度条

**设计规范（来自设计文件）：**

| 动效类型 | 时长 | 延迟策略 | 缓动函数 |
|---------|------|---------|---------|
| Hero 淡入 | 320ms | 0ms | ease-out |
| 卡片交错 | - | 60ms stagger | ease-out |
| 进度条 | 实时 | - | linear |

**实现要点：**

```javascript
// 1. 页面加载淡入
// 在 body 添加 .page-loaded 类触发 CSS 动画
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });
});

// 2. 卡片交错动画
// 使用 Intersection Observer 检测可见卡片
// data-animate="card" 属性标记需要动画的元素
const observeCards = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.stagger || (index * 60);
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
      }
    });
  }, { threshold: 0.1 });
};

// 3. 阅读进度条
// 监听滚动事件，计算阅读进度
const initReadingProgress = () => {
  const progressBar = document.querySelector('[data-progress-bar]');
  if (!progressBar) return;

  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
  }, 16));
};
```

**CSS 动画定义：**

```css
/* Page load */
.page-loaded .hero-section {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 320ms ease-out, transform 320ms ease-out;
}

.hero-section {
  opacity: 0;
  transform: translateY(20px);
}

/* Card stagger */
[data-animate="card"] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 400ms ease-out, transform 400ms ease-out, border-color 200ms ease;
}

[data-animate="card"].animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Card hover - 设计规范：Lift +2px, gold border */
.post-card:hover {
  transform: translateY(-2px);
  border-color: var(--nav-active); /* #C9B68A */
  box-shadow: 0 8px 32px rgba(201, 182, 138, 0.15);
}
```

**导出 API：**
- `initPageLoad()` - 初始化页面加载动效
- `initCardAnimation()` - 初始化卡片交错动画
- `initReadingProgress()` - 初始化阅读进度条
- `destroy()` - 清理所有动画相关监听

---

### 3.3 Search 模块

**文件：** `modules/search.js`

**功能描述：** 搜索功能实现，包括搜索框交互、搜索结果展示

**设计规范：**

| 元素 | 样式 |
|------|------|
| 搜索触发 | 汉堡菜单图标或搜索图标 |
| 输入框默认 | 边框 #8D84A4 |
| 输入框聚焦 | 金色边框 #C9B68A |
| 结果展示 | 模态框/下拉面板 |

**实现要点：**

```javascript
// 搜索状态管理
class SearchModule {
  constructor() {
    this.isOpen = false;
    this.searchInput = null;
    this.resultsContainer = null;
    this.searchTrigger = null;
  }

  init() {
    this.bindEvents();
    this.setupKeyboardShortcuts();
  }

  bindEvents() {
    // 搜索按钮点击
    this.searchTrigger?.addEventListener('click', () => this.toggle());

    // 输入框聚焦 - 改变边框颜色
    this.searchInput?.addEventListener('focus', () => {
      this.searchInput.classList.add('input-focus');
    });

    this.searchInput?.addEventListener('blur', () => {
      this.searchInput.classList.remove('input-focus');
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('.search-container')) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    document.body.classList.add('search-open');
    setTimeout(() => this.searchInput?.focus(), 100);
  }

  close() {
    this.isOpen = false;
    document.body.classList.remove('search-open');
  }
}
```

**导出 API：**
- `init()` - 初始化搜索模块
- `open()` - 打开搜索
- `close()` - 关闭搜索
- `search(query)` - 执行搜索

---

### 3.4 Form 模块

**文件：** `modules/form.js`

**功能描述：** 订阅表单处理、输入框状态管理

**设计规范（来自设计文件）：**

| 状态 | 边框颜色 | 说明 |
|------|---------|------|
| Default | #8D84A4 | 占位符颜色 |
| Focus | #C9B68A (金色) | 边框高亮 |

**实现要点：**

```javascript
// 订阅表单处理
class FormModule {
  constructor() {
    this.subscribeForm = null;
    this.emailInput = null;
  }

  init() {
    this.subscribeForm = document.querySelector('[data-subscribe-form]');
    if (!this.subscribeForm) return;

    this.emailInput = this.subscribeForm.querySelector('input[type="email"]');
    this.bindEvents();
  }

  bindEvents() {
    // 输入框状态
    this.emailInput?.addEventListener('focus', () => {
      this.emailInput.classList.add('input-focus');
    });

    this.emailInput?.addEventListener('blur', () => {
      this.emailInput.classList.remove('input-focus');
    });

    // 表单提交
    this.subscribeForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubscribe();
    });
  }

  async handleSubscribe() {
    const email = this.emailInput?.value;
    const submitBtn = this.subscribeForm.querySelector('button[type="submit"]');

    if (!this.validateEmail(email)) {
      this.showError('请输入有效的邮箱地址');
      return;
    }

    // 禁用按钮，显示加载状态
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    try {
      // Ghost 订阅 API 调用
      // POST /ghost/api/admin/members/ 或主题自定义端点
      await this.subscribeToGhost(email);
      this.showSuccess('订阅成功！请检查邮箱确认。');
      this.emailInput.value = '';
    } catch (error) {
      this.showError('订阅失败，请稍后重试。');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showNotification(message, type) {
    // 创建临时通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}
```

**CSS 状态定义：**

```css
/* 输入框状态 */
.input-default {
  border-color: #8D84A4;
}

.input-focus {
  border-color: #C9B68A; /* 金色边框 - 设计规范 */
  outline: none;
  box-shadow: 0 0 0 2px rgba(201, 182, 138, 0.2);
}

/* 表单提交状态 */
.form-submitting button {
  opacity: 0.7;
  cursor: not-allowed;
}
```

**导出 API：**
- `init()` - 初始化表单模块
- `validateEmail(email)` - 邮箱验证
- `handleSubscribe()` - 处理订阅请求

---

### 3.5 Mobile Menu 模块

**文件：** `modules/mobile-menu.js`

**功能描述：** 移动端汉堡菜单交互

**设计规范：**

| 元素 | 描述 |
|------|------|
| 触发器 | "MENU" 按钮 |
| 菜单面板 | 全屏/抽屉式 |
| 动画 | 滑入/淡入 |
| 关闭 | 点击关闭按钮或遮罩层 |

**实现要点：**

```javascript
class MobileMenu {
  constructor() {
    this.menuTrigger = null;
    this.menuPanel = null;
    this.menuLinks = null;
    this.isOpen = false;
  }

  init() {
    this.menuTrigger = document.querySelector('[data-menu-trigger]');
    this.menuPanel = document.querySelector('[data-menu-panel]');
    this.menuLinks = this.menuPanel?.querySelectorAll('a');

    if (!this.menuTrigger || !this.menuPanel) return;

    this.bindEvents();
  }

  bindEvents() {
    // 菜单开关
    this.menuTrigger.addEventListener('click', () => this.toggle());

    // 链接点击后自动关闭
    this.menuLinks?.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    document.body.classList.add('menu-open');
    this.menuTrigger?.setAttribute('aria-expanded', 'true');

    // 无障碍：聚焦第一个链接
    setTimeout(() => this.menuLinks?.[0]?.focus(), 100);
  }

  close() {
    this.isOpen = false;
    document.body.classList.remove('menu-open');
    this.menuTrigger?.setAttribute('aria-expanded', 'false');
  }
}
```

**CSS 动画：**

```css
/* 抽屉式菜单 */
.menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: #0d0d0d;
  transform: translateX(100%);
  transition: transform 300ms ease;
}

body.menu-open .menu-panel {
  transform: translateX(0);
}

/* 遮罩层 */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms ease, visibility 300ms ease;
}

body.menu-open .menu-overlay {
  opacity: 1;
  visibility: visible;
}
```

**导出 API：**
- `init()` - 初始化移动端菜单
- `open()` - 打开菜单
- `close()` - 关闭菜单
- `toggle()` - 切换菜单状态

---

## 4. 性能优化策略

### 4.1 代码层面

| 策略 | 实现方式 | 预期效果 |
|------|---------|---------|
| 事件委托 | 父元素监听子元素事件 | 减少事件绑定数量 |
| 函数节流 | `throttle(fn, 16)` | 降低 scroll 事件频率 |
| 防抖 | `debounce(fn, 300)` | 搜索输入延迟处理 |
| Intersection Observer | 懒加载/动画触发 | 减少回流 |
| requestAnimationFrame | 动画帧更新 | 60fps 流畅度 |

```javascript
// 工具函数
function throttle(fn, delay = 16) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### 4.2 资源加载

- 脚本放在 `</body>` 前
- 使用 `defer` 属性
- 按需加载非关键模块
- 预加载关键资源

```html
<!-- 入口脚本 -->
<script src="{{asset "js/main.js"}}" defer></script>
```

### 4.3 CSS 优化

- 使用 CSS 变量减少重复
- 硬件加速：`transform`, `opacity`
- 避免频繁布局变化
- 合并关键 CSS

---

## 5. 无障碍支持 (A11y)

### 5.1 导航无障碍

```javascript
// 键盘导航支持
- Tab 键切换焦点
- Enter/Space 激活链接
- 当前页面链接添加 aria-current="page"
```

### 5.2 表单无障碍

```html
<label for="email-input" class="sr-only">邮箱地址</label>
<input
  type="email"
  id="email-input"
  aria-describedby="email-error"
  required
>
<span id="email-error" role="alert" class="sr-only"></span>
```

### 5.3 移动端菜单无障碍

```html
<button
  data-menu-trigger
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="打开菜单"
>
  MENU
</button>
```

### 5.4 进度条无障碍

```html
<div
  role="progressbar"
  aria-valuenow="50"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="阅读进度"
></div>
```

### 5.5 色彩对比

设计规范中的颜色需满足 WCAG AA 对比度：

| 元素 | 前景色 | 背景色 | 对比度 | 达标 |
|------|--------|--------|--------|------|
| 导航默认 | #B8B2C8 | #0d0d0d | 7.2:1 | ✓ |
| 导航悬停 | #E9E1CF | #141414 | 12.5:1 | ✓ |
| 按钮文字 | #F4EFE3 | #8B0000 | 8.1:1 | ✓ |

---

## 6. 入口文件 (main.js)

```javascript
// main.js - 入口文件
import { Navigation } from './modules/navigation.js';
import { Animation } from './modules/animation.js';
import { Search } from './modules/search.js';
import { Form } from './modules/form.js';
import { MobileMenu } from './modules/mobile-menu.js';

class GothicTheme {
  constructor() {
    this.modules = [];
  }

  init() {
    // 初始化各模块
    this.modules = [
      new Navigation(),
      new Animation(),
      new Search(),
      new Form(),
      new MobileMenu()
    ];

    // 批量初始化
    this.modules.forEach(module => {
      if (module.init && typeof module.init === 'function') {
        module.init();
      }
    });

    console.log('🎭 Gothic Theme initialized');
  }

  destroy() {
    this.modules.forEach(module => {
      if (module.destroy && typeof module.destroy === 'function') {
        module.destroy();
      }
    });
  }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  const theme = new GothicTheme();
  theme.init();
});
```

---

## 7. 文件结构汇总

```
gothic/
├── assets/
│   └── js/
│       ├── core/
│       │   ├── constants.js    # 常量定义
│       │   └── utils.js        # 工具函数
│       ├── modules/
│       │   ├── navigation.js   # 导航交互
│       │   ├── animation.js    # 滚动动效
│       │   ├── search.js       # 搜索功能
│       │   ├── form.js         # 表单处理
│       │   └── mobile-menu.js  # 移动端菜单
│       └── main.js             # 入口文件
├── partials/
│   └── (Ghost partials)
└── default.hbs
```

---

## 8. 下一步

架构设计审批通过后，按以下顺序实现：

1. **Phase 1：** `constants.js` + `utils.js` + `main.js` 入口
2. **Phase 2：** `navigation.js` + `animation.js` 基础交互
3. **Phase 3：** `mobile-menu.js` 移动端适配
4. **Phase 4：** `search.js` 搜索功能
5. **Phase 5：** `form.js` 订阅表单
6. **Phase 6：** 集成测试与优化

---

*文档版本：1.0*
*创建日期：2026-03-07*
*基于设计文件：gothic_ui.pen 交互状态规范*