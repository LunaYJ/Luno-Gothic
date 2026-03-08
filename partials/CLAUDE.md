[根目录](../../CLAUDE.md) > **partials**

# partials 模块

> **职责**: Ghost Handlebars 可复用组件模板，包含布局组件和功能组件

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新文档结构，添加各子模块链接 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块结构

```
partials/
├── site/                    # 站点级组件 [当前主要使用]
│   ├── header.hbs
│   ├── sidebar.hbs
│   ├── footer.hbs
│   ├── post-card.hbs
│   └── subscribe-section.hbs
├── components/              # 通用UI组件
│   ├── post-card.hbs
│   ├── search-overlay.hbs
│   └── ...
└── layout/                  # 传统布局组件 [可能为遗留]
    ├── head.hbs
    ├── header.hbs
    └── footer.hbs
```

---

## 子模块索引

| 子模块 | 路径 | 职责 | 状态 |
|--------|------|------|------|
| **site** | `/partials/site/` | 站点级结构组件 | ** actively used** |
| components | `/partials/components/` | 通用UI组件 | 部分使用 |
| layout | `/partials/layout/` | 传统布局组件 | 可能为遗留 |

---

## 入口与使用方式

### 在模板中引用

```handlebars
{{! 站点级组件（当前主要使用）}}
{{> "site/header"}}
{{> "site/sidebar"}}
{{> "site/footer"}}
{{> "site/post-card"}}
{{> "site/subscribe-section"}}

{{! 功能组件（部分使用）}}
{{> "components/search-overlay"}}
{{> "components/pagination"}}
```

---

## 使用策略

当前主题采用以下策略：

1. **site/**: 主要使用的站点级组件
2. **components/**: 通用UI组件，部分使用
3. **layout/**: 可能为遗留文件

---

## 相关文件

### 子模块文档
- [`/partials/site/CLAUDE.md`](./site/CLAUDE.md) - 站点组件
- [`/partials/components/CLAUDE.md`](./components/CLAUDE.md) - 功能组件
- [`/partials/layout/CLAUDE.md`](./layout/CLAUDE.md) - 布局组件

### 使用这些 partials 的模板
- `/default.hbs` - 使用 site/sidebar, site/header, site/footer
- `/index.hbs` - 使用 site/post-card, site/subscribe-section
- `/post.hbs` - 使用 site/subscribe-section
- `/tag.hbs` - 使用 site/post-card
- `/author.hbs` - 使用 site/post-card

---

*文档生成时间: 2026-03-08 16:48:37*
