[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **layout**

# layout 模块

> **职责**: CSS 布局层，定义页面整体结构和响应式布局

---

## 模块结构

```
layout/
├── container.css    # 容器布局
├── grid.css         # 网格系统
└── responsive.css   # 响应式断点
```

---

## container.css

**职责**: 定义页面容器的宽度和内边距

### 容器类

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-container);
  padding-right: var(--space-container);
}

.container--narrow {
  max-width: 800px;
}

.container--wide {
  max-width: 1400px;
}

.container--full {
  max-width: none;
}
```

---

## grid.css

**职责**: 定义网格系统和页面布局结构

### 网格类

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

/* 响应式网格 */
@media (max-width: 768px) {
  .grid--2,
  .grid--3,
  .grid--4 {
    grid-template-columns: 1fr;
  }
}
```

### Flex 布局

```css
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}
```

---

## responsive.css

**职责**: 定义响应式断点和媒体查询

### 断点定义

```css
/* 移动优先的媒体查询 */

/* sm: 640px */
@media (min-width: 640px) {
  .sm\:block { display: block; }
  .sm\:hidden { display: none; }
}

/* md: 768px */
@media (min-width: 768px) {
  .md\:block { display: block; }
  .md\:hidden { display: none; }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

/* lg: 1024px */
@media (min-width: 1024px) {
  .lg\:block { display: block; }
  .lg\:hidden { display: none; }
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

/* xl: 1280px */
@media (min-width: 1280px) {
  .xl\:block { display: block; }
  .xl\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
```

### 移动端优先覆盖

```css
/* 隐藏移动端菜单在桌面端 */
.mobile-menu {
  display: block;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

/* 显示桌面菜单在移动端 */
.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
}
```

---

## 页面布局模式

### 首页布局

```
┌─────────────────────────────────────┐
│            HEADER                   │
├─────────────────────────────────────┤
│              HERO                   │
├─────────────────────────────────────┤
│         FEATURED POSTS              │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Post │ │Post │ │Post │           │
│  └─────┘ └─────┘ └─────┘           │
├─────────────────────────────────────┤
│           RECENT POSTS              │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Post │ │Post │ │Post │           │
│  └─────┘ └─────┘ └─────┘           │
├─────────────────────────────────────┤
│           NEWSLETTER                │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

### 文章详情页布局

```
┌─────────────────────────────────────┐
│            HEADER                   │
├─────────────────────────────────────┤
│         POST HEADER                 │
│  [Tag] [Title]                      │
│  [Author] [Date] [Reading Time]     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      POST CONTENT           │   │
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│        RELATED POSTS                │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/assets/css/layout/container.css` - 容器布局
- `/assets/css/layout/grid.css` - 网格系统
- `/assets/css/layout/responsive.css` - 响应式断点
- `/assets/css/main.css` - 导入这些布局样式

---

*文档生成时间: 2026-03-08 14:02:37*
