[根目录](../../../CLAUDE.md) > [partials](../) > **components**

# components 模块

> **职责**: 可复用的 UI 组件模板，用于构建页面内容

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新面包屑导航，确认当前主题使用 site/ 替代部分 components |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 组件清单

| 组件 | 文件 | 用途 | 关键数据 |
|------|------|------|----------|
| Post Card | `post-card.hbs` | 文章列表项 | title, excerpt, feature_image, primary_tag |
| Featured Post Card | `featured-post-card.hbs` | 精选文章卡片 | 同 post-card |
| Author Card | `author-card.hbs` | 作者信息展示 | name, bio, profile_image, website |
| Related Posts | `related-posts.hbs` | 相关文章推荐 | posts 列表 |
| Tag Chip | `tag-chip.hbs` | 标签展示 | name, slug, url |
| Pagination | `pagination.hbs` | 分页导航 | @pagination |
| Search Overlay | `search-overlay.hbs` | 搜索弹窗 | - |
| Newsletter Form | `newsletter-form.hbs` | 订阅表单 | - |
| Social Links | `social-links.hbs` | 社交链接 | @custom.social_* |
| Scroll Progress | `scroll-progress.hbs` | 阅读进度条 | - |

---

## 与 site/ partials 的区别

当前主题采用以下分工：

| 目录 | 用途 | 当前状态 |
|------|------|----------|
| `partials/site/` | 站点级结构组件 | ** actively used** |
| `partials/components/` | 通用UI组件 | 部分使用 |
| `partials/layout/` | 传统布局组件 | 可能为遗留 |

**当前主题主要使用**:
- `/partials/site/post-card.hbs` 替代 `/partials/components/post-card.hbs`
- `/partials/site/subscribe-section.hbs` 替代 `/partials/components/newsletter-form.hbs`

---

## 组件详解

### post-card.hbs

**使用示例**:
```handlebars
{{#foreach posts}}
    {{> components/post-card}}
{{/foreach}}
```

**参数**:
- `class` - 额外 CSS 类（如 `featured`）

---

### author-card.hbs

**使用示例**:
```handlebars
{{! 行内显示 }}
{{> components/author-card class="author-card--inline"}}

{{! 侧边栏显示 }}
{{> components/author-card class="author-card--sidebar"}}
```

---

### tag-chip.hbs

**使用示例**:
```handlebars
{{#foreach tags}}
    {{> components/tag-chip}}
{{/foreach}}
```

---

### pagination.hbs

**使用方式**:
```handlebars
{{pagination}}
```

Ghost 会自动渲染分页组件。

---

### search-overlay.hbs

**使用方式**:
```handlebars
{{> components/search-overlay}}
```

**JavaScript 集成**:
- 触发器: `#btn-search`
- 面板: `#search-overlay`
- 模块: `assets/js/modules/search.js`

---

### newsletter-form.hbs

**使用方式**:
```handlebars
{{> components/newsletter-form}}
```

**Ghost Portal 集成**:
```handlebars
<button data-portal="signup">Subscribe</button>
```

---

## 样式映射

| 组件 | 对应 CSS 文件 |
|------|--------------|
| post-card | `assets/scss/main.scss` (实际使用 site/post-card) |
| author-card | `assets/css/components/card.css` |
| tag-chip | `assets/css/components/card.css` |
| search-overlay | `assets/css/components/form.css` |
| newsletter-form | `assets/css/components/form.css` |
| pagination | `assets/scss/main.scss` |
| scroll-progress | `assets/css/components/nav.css` |

---

## 相关文件

- `/partials/components/post-card.hbs`
- `/partials/components/featured-post-card.hbs`
- `/partials/components/author-card.hbs`
- `/partials/components/related-posts.hbs`
- `/partials/components/tag-chip.hbs`
- `/partials/components/pagination.hbs`
- `/partials/components/search-overlay.hbs`
- `/partials/components/newsletter-form.hbs`
- `/partials/components/social-links.hbs`
- `/partials/components/scroll-progress.hbs`

---

*文档生成时间: 2026-03-08 16:48:37*
