[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **components**

# components 模块

> **职责**: CSS 组件层，定义 UI 组件的样式

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新说明：当前主题使用 SCSS 替代此分层架构 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块状态

**当前状态**: 本目录下的文件 **未被当前构建流程使用**。

当前主题的组件样式已集成在 `/assets/scss/main.scss` 中。

---

## 模块结构

```
components/
├── nav.css          # 导航组件（未使用）
├── card.css         # 卡片组件（未使用）
├── button.css       # 按钮组件（未使用）
├── form.css         # 表单组件（未使用）
├── footer.css       # 页脚组件（未使用）
├── hero.css         # 首屏组件（未使用）
└── post.css         # 文章组件（未使用）
```

---

## 实际组件实现（SCSS）

当前主题使用以下组件样式（在 `main.scss` 中）：

```scss
// 导航
.site-header { ... }
.site-nav { ... }

// 卡片
.post-card { ... }
.post-card-image { ... }
.post-card-title { ... }

// 按钮
.btn { ... }
.btn-primary { ... }
.btn-secondary { ... }
.subscribe-btn { ... }

// Hero
.hero-section { ... }
.hero-title { ... }

// 文章
.post-hero { ... }
.post-content { ... }
```

---

## 相关文件

### 实际使用
- `/assets/scss/main.scss` - 包含组件样式

### 本目录（备用/遗留）
- `/assets/css/components/nav.css`
- `/assets/css/components/card.css`
- `/assets/css/components/button.css`
- `/assets/css/components/form.css`
- `/assets/css/components/footer.css`
- `/assets/css/components/hero.css`
- `/assets/css/components/post.css`

---

*文档生成时间: 2026-03-08 16:48:37*
