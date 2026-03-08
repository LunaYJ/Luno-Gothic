[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **base**

# base 模块

> **职责**: CSS 基础层，定义设计系统的核心变量和重置样式

---

## 模块结构

```
base/
├── reset.css        # CSS 重置
├── variables.css    # CSS 变量（设计系统）
├── typography.css   # 字体设置
└── utility.css      # 工具类
```

---

## variables.css - 设计系统

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

  /* 语义化映射 */
  --color-header-bg: var(--color-bg-secondary);
  --color-footer-bg: var(--color-bg-primary);
  --color-card-bg: var(--color-bg-secondary);
  --color-card-border: var(--color-border);
  --color-link: var(--color-accent-primary);
  --color-link-hover: var(--color-accent-hover);
}
```

### 字体系统

```css
:root {
  /* 字体家族 */
  --font-display: 'Cinzel', serif;           /* 标题字体 */
  --font-body: 'Cormorant Garamond', serif;   /* 正文字体 */
  --font-mono: 'Fira Code', 'Courier New', monospace;  /* 代码字体 */

  /* 字号 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */

  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* 行高 */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* 字间距 */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### 间距系统

```css
:root {
  /* 基础间距（4px 网格） */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* 语义化间距 */
  --space-section: var(--space-16);
  --space-card-padding: var(--space-6);
  --space-container: var(--space-8);
  --space-nav-gap: var(--space-8);
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

### 圆角

```css
:root {
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-full: 9999px;
}
```

### 过渡与缓动

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

## reset.css

**职责**: 重置浏览器默认样式

**包含**:
- Box-sizing 重置
- Margin/Padding 清零
- 列表样式重置
- 链接样式重置
- 表单元素重置
- 图片重置

---

## typography.css

**职责**: 字体排版设置

**内容**:
- 基础字体设置
- 标题样式 (h1-h6)
- 段落样式
- 链接样式
- 代码样式
- 引用样式

---

## utility.css

**职责**: 工具类

**内容**:
- 显示工具类 (`.hidden`, `.block`, `.flex`)
- 间距工具类 (`.m-4`, `.p-4`)
- 文字工具类 (`.text-center`, `.font-bold`)
- 视觉工具类 (`.sr-only` - 屏幕阅读器专用)

---

## 使用示例

```css
/* 使用颜色变量 */
.post-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
}

/* 使用间距变量 */
.section {
  padding: var(--space-section) 0;
}

/* 使用字体变量 */
.heading {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
}

/* 使用过渡变量 */
.button {
  transition: background var(--transition-fast);
}
```

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/assets/css/base/variables.css` - 设计系统变量
- `/assets/css/base/reset.css` - CSS 重置
- `/assets/css/base/typography.css` - 字体设置
- `/assets/css/base/utility.css` - 工具类
- `/assets/css/main.css` - 导入这些基础样式

---

*文档生成时间: 2026-03-08 14:02:37*
