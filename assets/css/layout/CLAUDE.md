[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **layout**

# layout 模块

> **职责**: CSS 布局层，定义页面整体结构和响应式布局

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新说明：当前主题使用 SCSS 替代此分层架构 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块状态

**当前状态**: 本目录下的文件 **未被当前构建流程使用**。

当前主题的布局样式已集成在 `/assets/scss/main.scss` 中。

---

## 模块结构

```
layout/
├── container.css    # 容器布局（未使用）
├── grid.css         # 网格系统（未使用）
└── responsive.css   # 响应式断点（未使用）
```

---

## 实际布局实现（SCSS）

当前主题使用以下布局（在 `main.scss` 中）：

```scss
// 双栏布局
.gothic-layout {
  display: grid;
  grid-template-columns: var(--side-width) minmax(0, 1fr);
  min-height: 100vh;
}

// 响应式断点
@media (max-width: 980px) {
  .profile-rail,
  .site-header { display: none; }

  .gothic-layout { display: block; }
}
```

---

## 相关文件

### 实际使用
- `/assets/scss/main.scss` - 包含布局样式

### 本目录（备用/遗留）
- `/assets/css/layout/container.css`
- `/assets/css/layout/grid.css`
- `/assets/css/layout/responsive.css`

---

*文档生成时间: 2026-03-08 16:48:37*
