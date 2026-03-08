[根目录](../../../CLAUDE.md) > [assets](../) > **css**

# CSS 模块

> **职责**: 主题样式系统，采用分层 CSS 架构

---

## 模块结构

```
css/
├── base/                    # 基础层
│   ├── reset.css           # CSS 重置
│   ├── variables.css       # CSS 变量（设计系统）
│   ├── typography.css      # 字体设置
│   └── utility.css         # 工具类
├── layout/                  # 布局层
│   ├── container.css       # 容器
│   ├── grid.css            # 网格系统
│   └── responsive.css      # 响应式断点
├── components/              # 组件层
│   ├── nav.css             # 导航
│   ├── card.css            # 卡片
│   ├── button.css          # 按钮
│   ├── form.css            # 表单
│   ├── footer.css          # 页脚
│   ├── hero.css            # 首屏
│   └── post.css            # 文章
├── ghost-overrides.css      # Ghost 样式覆盖
└── main.css                 # 主入口
```

---

## 入口与导入顺序

### main.css

```css
/* ============================================
   1. 基础样式
   ============================================ */
@import 'base/reset.css';
@import 'base/variables.css';
@import 'base/typography.css';
@import 'base/utility.css';

/* ============================================
   2. 布局样式
   ============================================ */
@import 'layout/container.css';
@import 'layout/grid.css';
@import 'layout/responsive.css';

/* ============================================
   3. 组件样式
   ============================================ */
@import 'components/nav.css';
@import 'components/card.css';
@import 'components/button.css';
@import 'components/form.css';
@import 'components/footer.css';
@import 'components/hero.css';
@import 'components/post.css';

/* ============================================
   4. Ghost 覆盖
   ============================================ */
@import 'ghost-overrides.css';
```

---

## 设计系统 (base/variables.css)

### 颜色系统

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
  --color-accent-active: #6a0d14;

  /* 文字色 - 米色系 */
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #F2EBDC;
  --color-text-muted: #A99FC2;
  --color-text-tertiary: #8E82A7;

  /* 边框/分割线 */
  --color-border: #1a1a1a;
  --color-divider: #8B0000;

  /* 功能色 */
  --color-success: #4a7c59;
  --color-warning: #8B7355;
  --color-error: #8B0000;
}
```

### 字体系统

```css
:root {
  --font-display: 'Cinzel', serif;
  --font-body: 'Cormorant Garamond', serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  /* 字号 */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 间距系统

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* 语义化间距 */
  --space-section: var(--space-16);
  --space-card-padding: var(--space-6);
  --space-container: var(--space-8);
}
```

### 响应式断点

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  --container-max: 1200px;
}
```

### 动画过渡

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 组件样式映射

| 组件 | 文件 | 类名前缀 |
|------|------|----------|
| 导航 | `components/nav.css` | `.site-header`, `.site-nav` |
| 卡片 | `components/card.css` | `.post-card`, `.author-card` |
| 按钮 | `components/button.css` | `.btn-*` |
| 表单 | `components/form.css` | `.form-*`, `.input-*` |
| 页脚 | `components/footer.css` | `.site-footer` |
| 首屏 | `components/hero.css` | `.hero-*` |
| 文章 | `components/post.css` | `.post-*` |

---

## 动画关键帧 (main.css)

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

---

## 可访问性

### 减少动画

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 高对比度

```css
@media (prefers-contrast: high) {
  :root {
    --color-border: #333333;
    --color-text-muted: #cccccc;
    --color-accent-primary: #cc0000;
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

- `/assets/css/main.css` - 主入口
- `/assets/css/base/variables.css` - 设计系统变量
- `/assets/css/base/reset.css` - CSS 重置
- `/assets/css/base/typography.css` - 字体设置
- `/assets/css/components/nav.css` - 导航样式
- `/assets/css/components/card.css` - 卡片样式
- `/assets/css/components/hero.css` - 首屏样式
- `/assets/css/components/post.css` - 文章样式
- `/assets/css/ghost-overrides.css` - Ghost 覆盖

---

*文档生成时间: 2026-03-08 14:02:37*
