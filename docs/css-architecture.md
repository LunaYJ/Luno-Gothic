# Gothic Theme CSS 架构规范

> Ghost 博客哥特主题样式系统设计文档

## 1. CSS 方案选择

### 推荐方案：原生 CSS 变量 + 模块化 CSS

**选择理由：**

| 方案 | 优点 | 缺点 |
|------|------|------|
| 原生 CSS 变量 | 无需构建、运行时可修改、浏览器原生支持 | 无 |
| Tailwind CSS | 开发效率高、一致性好 | 需构建配置、类名冗长、违背"HTML纯净" |
| SCSS/Sass | 嵌套语法、混入、继承 | 需构建、变量无法在运行时修改 |
| CSS-in-JS | 组件作用域、动态样式 | 运行时开销、破坏CSS原则 |

**结论：**
选择 **原生 CSS 变量 + 模块化 CSS** 方案，原因如下：

1. **Ghost 主题限制**：作为 Ghost 主题，需要轻量级、无需复杂构建流程
2. **运行时主题切换**：支持用户通过 CSS 变量自定义主题（未来可扩展）
3. **性能最优**：浏览器原生支持，无额外运行时开销
4. **维护性**：变量集中管理，颜色/间距修改一处全局生效
5. **幽灵主题友好**：便于覆盖 Ghost 默认样式

---

## 2. 设计系统变量

### 2.1 颜色系统

```css
:root {
  /* ============================================
     主色板 - 哥特暗黑主题
     ============================================ */

  /* 背景色 - 层层递进的黑暗 */
  --color-bg-primary: #0a0a0a;      /* 最深：页面主体背景 */
  --color-bg-secondary: #0d0d0d;    /* 次深：卡片、容器背景 */
  --color-bg-tertiary: #080808;     /* 较浅：悬停状态、分割线 */
  --color-bg-elevated: #111111;    /* 悬浮：下拉菜单、模态框 */

  /* 强调色 - 哥特暗红 */
  --color-accent-primary: #8B0000; /* 主强调：按钮、链接、装饰 */
  --color-accent-hover: #a1121f;   /* 悬停：更亮的暗红 */
  --color-accent-active: #6a0d14;  /* 激活：深红压低 */

  /* 文字色 - 米色系 */
  --color-text-primary: #F5F0E8;   /* 主文字：高对比度米白 */
  --color-text-secondary: #F2EBDC;/* 次文字：柔和米色 */
  --color-text-muted: #A99FC2;     /* 弱化：紫色调灰 */
  --color-text-tertiary: #8E82A7;  /* 辅助：更淡的紫色 */

  /* 边框/分割线 */
  --color-border: #1a1a1a;         /* 默认边框 */
  --color-divider: #8B0000;        /* 装饰分割线（暗红色） */

  /* 功能色 */
  --color-success: #4a7c59;        /* 成功：暗绿 */
  --color-warning: #8B7355;         /* 警告：暗金 */
  --color-error: #8B0000;          /* 错误：复用强调色 */

  /* ============================================
     语义化颜色映射
     ============================================ */
  --color-header-bg: var(--color-bg-secondary);
  --color-footer-bg: var(--color-bg-primary);
  --color-card-bg: var(--color-bg-secondary);
  --color-card-border: var(--color-border);

  --color-link: var(--color-accent-primary);
  --color-link-hover: var(--color-accent-hover);

  --color-button-primary-bg: var(--color-accent-primary);
  --color-button-primary-text: var(--color-text-primary);
}
```

### 2.2 字体排版系统

```css
:root {
  /* ============================================
     字体家族
     ============================================ */
  --font-display: 'Cinzel', serif;           /* 标题：古典大写衬线 */
  --font-body: 'Cormorant Garamond', serif;  /* 正文：优雅易读衬线 */
  --font-mono: 'Fira Code', 'Courier New', monospace; /* 代码块 */

  /* ============================================
     字号系统（基于黄金比例）
     ============================================ */
  --text-xs: 0.75rem;    /* 12px - 极小：版权信息、标签 */
  --text-sm: 0.875rem;   /* 14px - 小：辅助说明、次要信息 */
  --text-base: 1rem;     /* 16px - 基线：正文默认 */
  --text-lg: 1.125rem;   /* 18px - 大：强调正文、导航 */
  --text-xl: 1.25rem;    /* 20px - 特大：小标题 */
  --text-2xl: 1.5rem;    /* 24px - 2倍：章节标题 */
  --text-3xl: 1.875rem;  /* 30px - 3倍：页面标题 */
  --text-4xl: 2.25rem;   /* 36px - 4倍：Hero 大标题 */
  --text-5xl: 3rem;      /* 48px - 5倍：巨型展示 */
  --text-6xl: 3.75rem;   /* 60px - 6倍：极限展示 */

  /* ============================================
     字重
     ============================================ */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* ============================================
     行高
     ============================================ */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* ============================================
     字间距
     ============================================ */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* ============================================
     段落间距
     ============================================ */
  --space-para: 1.5em;   /* 段落间距 */
}
```

### 2.3 间距系统

```css
:root {
  /* ============================================
     基础间距（基于 4px 网格）
     ============================================ */
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  */
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

  /* ============================================
     语义化间距
     ============================================ */
  --space-section: var(--space-16);     /* 章节间距 */
  --space-card-padding: var(--space-6); /* 卡片内边距 */
  --space-container: var(--space-8);    /* 容器边距 */
  --space-nav-gap: var(--space-8);       /* 导航项间距 */

  /* ============================================
     圆角
     ============================================ */
  --radius-none: 0;
  --radius-sm: 2px;      /* 小圆角：按钮、小元素 */
  --radius-md: 4px;     /* 中等：输入框、卡片 */
  --radius-lg: 8px;     /* 大圆角：大型容器 */
  --radius-full: 9999px; /* 全圆角：圆形元素 */
}
```

---

## 3. 组件样式规范

### 3.1 导航 (Navigation)

```css
/* ============================================
   导航栏结构
   ============================================ */
.gothic-nav {
  background-color: var(--color-header-bg);
  padding: var(--space-6) var(--space-container);
  border-bottom: 1px solid var(--color-divider);
}

.gothic-nav__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: var(--space-nav-gap);
}

.gothic-nav__brand {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.gothic-nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-nav-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}

.gothic-nav__link {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
  position: relative;
}

.gothic-nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent-primary);
  transition: width var(--transition-normal);
}

.gothic-nav__link:hover {
  color: var(--color-text-primary);
}

.gothic-nav__link:hover::after {
  width: 100%;
}

.gothic-nav__link--active {
  color: var(--color-accent-primary);
}

@media (max-width: 768px) {
  .gothic-nav__links {
    display: none; /* 移动端使用汉堡菜单 */
  }
}
```

### 3.2 文章卡片 (Post Card)

```css
/* ============================================
   文章卡片
   ============================================ */
.gothic-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  padding: var(--space-card-padding);
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal),
              border-color var(--transition-fast);
}

.gothic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 0, 0, 0.15);
  border-color: var(--color-accent-primary);
}

.gothic-card__image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-4);
  filter: grayscale(30%);
  transition: filter var(--transition-normal);
}

.gothic-card:hover .gothic-card__image {
  filter: grayscale(0%);
}

.gothic-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.gothic-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-2);
}

.gothic-card__excerpt {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gothic-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.gothic-card__tag {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background-color: var(--color-bg-tertiary);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background-color var(--transition-fast),
              color var(--transition-fast);
}

.gothic-card__tag:hover {
  background-color: var(--color-accent-primary);
  color: var(--color-text-primary);
}
```

### 3.3 按钮 (Button)

```css
/* ============================================
   按钮组件
   ============================================ */
.gothic-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: none;
  padding: var(--space-3) var(--space-6);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

/* 主按钮 */
.gothic-btn--primary {
  background-color: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
  border-color: var(--color-accent-primary);
}

.gothic-btn--primary:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
}

.gothic-btn--primary:active {
  background-color: var(--color-accent-active);
  transform: translateY(1px);
}

/* 次按钮 */
.gothic-btn--secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.gothic-btn--secondary:hover {
  border-color: var(--color-accent-primary);
  color: var(--color-accent-primary);
}

/* 幽灵按钮 */
.gothic-btn--ghost {
  background-color: transparent;
  color: var(--color-text-muted);
  border-color: transparent;
}

.gothic-btn--ghost:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-tertiary);
}

/* 按钮尺寸 */
.gothic-btn--sm {
  font-size: var(--text-xs);
  padding: var(--space-2) var(--space-4);
}

.gothic-btn--lg {
  font-size: var(--text-base);
  padding: var(--space-4) var(--space-8);
}

/* 按钮禁用状态 */
.gothic-btn:disabled,
.gothic-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 3.4 表单/输入框 (Form Elements)

```css
/* ============================================
   表单组件
   ============================================ */
.gothic-form__group {
  margin-bottom: var(--space-6);
}

.gothic-form__label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.gothic-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

.gothic-input::placeholder {
  color: var(--color-text-tertiary);
}

.gothic-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.15);
}

.gothic-input:disabled {
  background-color: var(--color-bg-tertiary);
  opacity: 0.6;
  cursor: not-allowed;
}

/* 文本域 */
.gothic-textarea {
  min-height: 120px;
  resize: vertical;
}

/* 选择框 */
.gothic-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A99FC2' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
}

/* 复选框和单选框 */
.gothic-checkbox,
.gothic-radio {
  accent-color: var(--color-accent-primary);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 表单错误状态 */
.gothic-input--error {
  border-color: var(--color-error);
}

.gothic-input--error:focus {
  box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.25);
}

.gothic-form__error {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-error);
  margin-top: var(--space-2);
}
```

### 3.5 页脚 (Footer)

```css
/* ============================================
   页脚组件
   ============================================ */
.gothic-footer {
  background-color: var(--color-footer-bg);
  border-top: 1px solid var(--color-divider);
  padding: var(--space-12) var(--space-container);
  margin-top: var(--space-section);
}

.gothic-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-8);
}

.gothic-footer__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.gothic-footer__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.gothic-footer__text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.gothic-footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.gothic-footer__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.gothic-footer__link:hover {
  color: var(--color-accent-primary);
}

.gothic-footer__bottom {
  max-width: 1200px;
  margin: var(--space-8) auto 0;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.gothic-footer__copyright {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.gothic-footer__social {
  display: flex;
  gap: var(--space-4);
}

.gothic-footer__social-link {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.gothic-footer__social-link:hover {
  color: var(--color-accent-primary);
}
```

---

## 4. 响应式断点设计

```css
:root {
  /* ============================================
     响应式断点
     ============================================ */
  --breakpoint-sm: 640px;   /* 手机横屏 */
  --breakpoint-md: 768px;   /* 平板 */
  --breakpoint-lg: 1024px;  /* 小笔记本 */
  --breakpoint-xl: 1280px;  /* 桌面 */
  --breakpoint-2xl: 1536px; /* 大屏桌面 */
}

/* ============================================
   响应式工具类
   ============================================ */

/* 移动优先：默认样式（手机） */

/* 平板及以上 (>= 768px) */
@media (min-width: 768px) {
  :root {
    --space-container: var(--space-8);
  }

  .gothic-nav__links {
    display: flex; /* 显示导航链接 */
  }
}

/* 小笔记本及以上 (>= 1024px) */
@media (min-width: 1024px) {
  :root {
    --space-container: var(--space-12);
    --text-4xl: 2.5rem;
  }

  .gothic-hero__title {
    font-size: var(--text-5xl);
  }
}

/* 桌面及以上 (>= 1280px) */
@media (min-width: 1280px) {
  :root {
    --space-container: var(--space-16);
    --text-4xl: 3rem;
  }
}

/* ============================================
   响应式布局容器
   ============================================ */
.gothic-container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .gothic-container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .gothic-container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

/* ============================================
   响应式网格
   ============================================ */
.gothic-grid {
  display: grid;
  gap: var(--space-6);
}

.gothic-grid--2cols {
  grid-template-columns: 1fr;
}

.gothic-grid--3cols {
  grid-template-columns: 1fr;
}

.gothic-grid--4cols {
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .gothic-grid--2cols,
  .gothic-grid--3cols,
  .gothic-grid--4cols {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gothic-grid--3cols {
    grid-template-columns: repeat(3, 1fr);
  }

  .gothic-grid--4cols {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ============================================
   响应式隐藏/显示
   ============================================ */
@media (max-width: 767px) {
  .hide-mobile {
    display: none !important;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hide-tablet {
    display: none !important;
  }
}

@media (min-width: 1024px) {
  .hide-desktop {
    display: none !important;
  }
}
```

---

## 5. 动画/过渡效果规范

```css
:root {
  /* ============================================
     过渡时间
     ============================================ */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;

  /* ============================================
     缓动函数
     ============================================ */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* 弹性缓动 */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ============================================
   基础过渡类
   ============================================ */
.transition-fast {
  transition: all var(--transition-fast);
}

.transition-normal {
  transition: all var(--transition-normal);
}

.transition-slow {
  transition: all var(--transition-slow);
}

/* ============================================
   颜色过渡
   ============================================ */
.transition-color {
  transition-property: color, background-color, border-color;
  transition-duration: var(--transition-fast);
  transition-timing-function: var(--ease-default);
}

/* ============================================
   变换过渡
   ============================================ */
.transition-transform {
  transition-property: transform;
  transition-duration: var(--transition-normal);
  transition-timing-function: var(--ease-default);
}

/* ============================================
   淡入淡出动画
   ============================================ */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   渐显动画类
   ============================================ */
.animate-fadeIn {
  animation: fadeIn var(--transition-normal) var(--ease-default) forwards;
}

.animate-fadeInUp {
  animation: fadeInUp var(--transition-slow) var(--ease-out) forwards;
}

.animate-fadeInDown {
  animation: fadeInDown var(--transition-slow) var(--ease-out) forwards;
}

/* ============================================
   交错动画延迟
   ============================================ */
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-400 { animation-delay: 400ms; }
.animate-delay-500 { animation-delay: 500ms; }

/* ============================================
   悬停发光效果
   ============================================ */
.gothic-glow {
  position: relative;
}

.gothic-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg,
    var(--color-accent-primary),
    transparent,
    var(--color-accent-primary));
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--transition-normal);
  z-index: -1;
  filter: blur(8px);
}

.gothic-glow:hover::before {
  opacity: 0.5;
}

/* ============================================
   文字发光
   ============================================ */
.gothic-text-glow {
  text-shadow: 0 0 10px rgba(139, 0, 0, 0.5),
               0 0 20px rgba(139, 0, 0, 0.3),
               0 0 30px rgba(139, 0, 0, 0.1);
  transition: text-shadow var(--transition-normal);
}

.gothic-text-glow:hover {
  text-shadow: 0 0 15px rgba(139, 0, 0, 0.7),
               0 0 30px rgba(139, 0, 0, 0.5),
               0 0 45px rgba(139, 0, 0, 0.3);
}

/* ============================================
   页面加载动画
   ============================================ */
.page-enter {
  opacity: 0;
  transform: translateY(10px);
  animation: pageEnter var(--transition-slow) var(--ease-out) forwards;
}

@keyframes pageEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 6. 文件组织建议

```
ghost-gothic/
├── assets/
│   ├── css/
│   │   ├── main.css                    # 主入口文件
│   │   ├── base/
│   │   │   ├── reset.css               # CSS 重置
│   │   │   ├── variables.css           # CSS 变量定义
│   │   │   ├── typography.css          # 字体排版
│   │   │   └── utility.css             # 工具类
│   │   ├── components/
│   │   │   ├── nav.css                 # 导航组件
│   │   │   ├── card.css                # 文章卡片
│   │   │   ├── button.css              # 按钮组件
│   │   │   ├── form.css                # 表单组件
│   │   │   ├── footer.css              # 页脚组件
│   │   │   ├── hero.css                # 首屏区域
│   │   │   └── post.css                # 文章详情
│   │   └── layout/
│   │       ├── container.css            # 容器布局
│   │       ├── grid.css                 # 网格系统
│   │       └── responsive.css           # 响应式样式
│   └── js/
│       └── main.js                     # 交互脚本
├── partials/
│   ├── header.hbs                       # 头部模板
│   ├── footer.hbs                       # 底部模板
│   ├── post-card.hbs                    # 文章卡片模板
│   └── navigation.hbs                  # 导航模板
├── default.hbs                         # 默认布局
├── index.hbs                          # 首页
├── post.hbs                           # 文章页
├── page.hbs                           # 页面
├── tag.hbs                            # 标签页
├── author.hbs                         # 作者页
├── error.hbs                         # 错误页
├── package.json
└── README.md
```

### 文件说明

| 文件 | 用途 |
|------|------|
| `main.css` | 主入口，按顺序导入所有 CSS 模块 |
| `variables.css` | 全局 CSS 变量（颜色、字体、间距等） |
| `reset.css` | 浏览器样式重置 |
| `typography.css` | 标题、正文、列表等基础排版样式 |
| `utility.css` | 常用工具类（.text-center, .flex 等） |
| `component/*.css` | 各组件的独立样式文件 |
| `layout/*.css` | 布局相关样式（容器、网格、响应式） |

### CSS 导入顺序

```css
/* main.css */
@import 'base/reset.css';
@import 'base/variables.css';
@import 'base/typography.css';
@import 'base/utility.css';
@import 'layout/container.css';
@import 'layout/grid.css';
@import 'layout/responsive.css';
@import 'components/button.css';
@import 'components/card.css';
@import 'components/form.css';
@import 'components/nav.css';
@import 'components/footer.css';
@import 'components/hero.css';
@import 'components/post.css';
```

---

## 7. Ghost 主题特定考虑

### 7.1 Ghost 默认样式覆盖

```css
/* Ghost 内容区域样式 */
.gh-content {
  font-family: var(--font-body);
  color: var(--color-text-secondary);
}

.gh-content p {
  margin-bottom: var(--space-para);
  line-height: var(--leading-relaxed);
}

.gh-content h1,
.gh-content h2,
.gh-content h3,
.gh-content h4,
.gh-content h5,
.gh-content h6 {
  font-family: var(--font-display);
  color: var(--color-text-primary);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

.gh-content a {
  color: var(--color-accent-primary);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color var(--transition-fast);
}

.gh-content a:hover {
  text-decoration-color: var(--color-accent-primary);
}

.gh-content blockquote {
  border-left: 3px solid var(--color-accent-primary);
  padding-left: var(--space-4);
  margin-left: 0;
  font-style: italic;
  color: var(--color-text-muted);
}

.gh-content pre,
.gh-content code {
  font-family: var(--font-mono);
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.gh-content pre {
  padding: var(--space-4);
  overflow-x: auto;
}

.gh-content code {
  padding: 2px 6px;
  font-size: 0.9em;
}

.gh-content img {
  border-radius: var(--radius-md);
  max-width: 100%;
  height: auto;
}
```

### 7.2 Ghost 会员功能样式

```css
/* 会员订阅区域 */
.gh-member-subscribe {
  background: linear-gradient(180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-primary) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
}

.gh-member-subscribe__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.gh-member-subscribe__description {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}
```

---

## 附录：快速参考卡

### 颜色速查

| 用途 | 变量 | 值 |
|------|------|-----|
| 页面背景 | `--color-bg-primary` | `#0a0a0a` |
| 卡片背景 | `--color-bg-secondary` | `#0d0d0d` |
| 强调色 | `--color-accent-primary` | `#8B0000` |
| 主文字 | `--color-text-primary` | `#F5F0E8` |
| 次文字 | `--color-text-secondary` | `#F2EBDC` |
| 弱化文字 | `--color-text-muted` | `#A99FC2` |

### 字号速查

| 用途 | 变量 | 值 |
|------|------|-----|
| Hero 标题 | `--text-4xl` | `2.25rem` (36px) |
| 页面标题 | `--text-3xl` | `1.875rem` (30px) |
| 章节标题 | `--text-2xl` | `1.5rem` (24px) |
| 正文 | `--text-base` | `1rem` (16px) |
| 辅助文字 | `--text-sm` | `0.875rem` (14px) |

### 过渡速查

| 名称 | 变量 | 值 |
|------|------|-----|
| 快速 | `--transition-fast` | `150ms ease` |
| 正常 | `--transition-normal` | `250ms ease` |
| 慢速 | `--transition-slow` | `400ms ease` |

---

*文档版本：1.0*
*最后更新：2026-03-07*