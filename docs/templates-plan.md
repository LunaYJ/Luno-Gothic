# Gothic 主题模板系统规划

## 概述

本文档定义了 Ghost 哥特博客主题的 Handlebars 模板系统架构，基于 `gothic_ui.pen` 设计文件。

---

## 1. 模板文件结构

```
gothic/
├── default.hbs          # 基础布局模板
├── index.hbs            # 首页
├── post.hbs             # 文章详情页
├── page.hbs             # 独立页面
├── tag.hbs              # 标签归档页
├── author.hbs           # 作者页
├── error.hbs            # 错误页面 (404/500)
├── archive.hbs          # 归档页 (综合)
├── labs.hbs             # Ghost Labs 页面
└── partials/
    ├── layout/
    │   ├── head.hbs
    │   ├── header.hbs
    │   ├── footer.hbs
    │   └── scroll-indicator.hbs
    ├── components/
    │   ├── nav-link.hbs
    │   ├── post-card.hbs
    │   ├── featured-post-card.hbs
    │   ├── post-list.hbs
    │   ├── author-card.hbs
    │   ├── tag-chip.hbs
    │   ├── related-posts.hbs
    │   ├── newsletter-form.hbs
    │   ├── search-overlay.hbs
    │   ├── progress-bar.hbs
    │   └── social-links.hbs
    └── content/
        ├── post-content.hbs
        └── page-content.hbs
```

---

## 2. 模板详细说明

### 2.1 default.hbs - 基础布局模板

**用途**：所有页面的父模板，定义整体页面结构

**结构**：
```handlebars
<!DOCTYPE html>
<html>
<head>
    {{> layout/head }}
</head>
<body class="{{body_class}}">
    {{> layout/scroll-indicator }}

    <div class="page-wrapper">
        {{> layout/header }}

        <main class="main-content">
            {{{body}}}
        </main>

        {{> layout/footer }}
    </div>

    {{> components/search-overlay }}
    {{ghost_foot}}
</body>
</html>
```

**使用的 Ghost Helpers**：
- `{{body_class}}` - 动态 body 类名
- `{{ghost_foot}}` - Ghost 脚部注入
- `{{> partial}}` - Partials 引用

---

### 2.2 index.hbs - 首页

**用途**：展示精选文章和最新文章列表

**对应设计**：`bi8Au` - 哥特博客主题-首页

**结构**：
```handlebars
{{!< default}}

{{#get "posts" include="tags,authors" limit="featured_limit" filter="featured:true" as |featured|}}
    {{#if featured}}
        <section class="featured-section">
            <div class="featured-label">FEATURED POSTS</div>
            <h2 class="featured-title">Selected essays from my journal</h2>
            <div class="featured-grid">
                {{#foreach featured}}
                    {{> components/featured-post-card}}
                {{/foreach}}
            </div>
        </section>
    {{/if}}
{{/get}}

<section class="recent-section">
    <div class="recent-label">RECENT POSTS</div>
    <div class="post-list">
        {{#foreach posts}}
            {{> components/post-card}}
        {{/foreach}}
    </div>
    {{pagination}}
</section>

{{> components/newsletter-form}}
```

**使用的 Ghost Helpers**：
- `{{#get}}` - 获取文章/标签/作者数据
- `{{#foreach}}` - 循环遍历数据
- `{{pagination}}` - 分页导航
- `{{#if}}` / `{{else}}` - 条件渲染
- `{{feature_image}}` - 特色图像
- `{{excerpt}}` / `{{content}}` - 文章内容

---

### 2.3 post.hbs - 文章详情页

**对应设计**：`JcWpj` - 哥特博客主题-文章详情页

**结构**：
```handlebars
{{!< default}}

<article class="post-article">
    <header class="post-header">
        <div class="post-meta">
            {{primary_tag.name}} &middot; {{published_at}} &middot; {{reading_time}}
        </div>
        <h1 class="post-title">{{title}}</h1>
        <p class="post-lead">{{custom_excerpt}}</p>
        {{> components/author-card}}
    </header>

    {{#if feature_image}}
        <div class="post-cover">
            <img src="{{feature_image}}" alt="{{title}}">
        </div>
    {{/if}}

    <div class="post-body">
        <div class="post-content">
            {{> content/post-content}}
        </div>
        <aside class="post-sidebar">
            {{> components/author-card}}
            {{> components/tag-chip}}
        </aside>
    </div>

    {{> components/related-posts}}
</article>

{{> components/newsletter-form}}
```

**使用的 Ghost Helpers**：
- `{{title}}` - 文章标题
- `{{published_at}}` - 发布时间
- `{{reading_time}}` - 阅读时间
- `{{primary_tag}}` - 主标签
- `{{custom_excerpt}}` - 自定义摘要
- `{{authors}}` - 作者列表
- `{{tags}}` - 标签列表
- `{{#has}}` - 条件判断（标签/作者数量等）

---

### 2.4 page.hbs - 独立页面

**对应设计**：类似 post.hbs 但无 meta 信息

**结构**：
```handlebars
{{!< default}}

<article class="page-article">
    <header class="page-header">
        <h1 class="page-title">{{title}}</h1>
    </header>

    {{#if feature_image}}
        <div class="page-cover">
            <img src="{{feature_image}}" alt="{{title}}">
        </div>
    {{/if}}

    <div class="page-content">
        {{> content/page-content}}
    </div>
</article>
```

---

### 2.5 tag.hbs - 标签归档页

**对应设计**：`7BR3T` - 哥特博客主题-归档与分类页

**结构**：
```handlebars
{{!< default}}

<section class="archive-hero">
    <div class="archive-label">{{t "ARCHIVE"}}</div>
    <h1 class="archive-title">{{tag.name}}</h1>
    <p class="archive-description">{{tag.description}}</p>

    <div class="tag-chips">
        {{#get "tags" limit="20"}}
            {{#foreach tags}}
                {{> components/tag-chip}}
            {{/foreach}}
        {{/get}}
    </div>
</section>

<section class="archive-content">
    <div class="post-list">
        {{#foreach posts}}
            {{> components/post-card}}
        {{/foreach}}
    </div>

    <aside class="archive-sidebar">
        {{> components/tag-chip}}
    </aside>
</section>

{{pagination}}
```

---

### 2.6 author.hbs - 作者页

**结构**：
```handlebars
{{!< default}}

<section class="author-hero">
    <div class="author-profile">
        <img src="{{author.profile_image}}" alt="{{author.name}}">
        <h1>{{author.name}}</h1>
        <p>{{author.bio}}</p>
    </div>
</section>

<section class="author-posts">
    {{#foreach posts}}
        {{> components/post-card}}
    {{/foreach}}
</section>

{{pagination}}
```

---

### 2.7 error.hbs - 错误页面

**结构**：
```handlebars
{{!< default}}

<div class="error-page">
    <div class="error-content">
        <h1 class="error-code">{{status}}</h1>
        <p class="error-message">{{message}}</p>

        {{#is 404}}
            <p>The page you're looking for has been lost to the darkness.</p>
            <a href="{{@site.url}}" class="btn-primary">Return Home</a>
        {{/is}}
    </div>
</div>
```

---

### 2.8 archive.hbs - 综合归档页

**用途**：展示所有文章归档，支持按年月分组

**结构**：
```handlebars
{{!< default}}

<section class="archive-hero">
    <h1>Essays, notes, and categories</h1>
    <p>Browse by topic, year, and reading mood.</p>
    {{> components/tag-chip}}
</section>

<section class="archive-content">
    {{#get "posts" filter="featured:false"}}
        {{#foreach posts}}
            {{> components/post-card}}
        {{/foreach}}
    {{/get}}
</section>
```

---

## 3. Partials 组件清单

### 3.1 layout/ 布局组件

| 组件 | 用途 | 关键变量 |
|------|------|----------|
| `head.hbs` | SEO 头部、Meta 标签 | `{{ghost_head}}`, `{{meta_title}}` |
| `header.hbs` | 导航栏、Logo、搜索按钮 | `{{@site}}`, navigation |
| `footer.hbs` | 版权、社交链接、主题切换 | `{{@site}}`, `{{t "..."}}` |
| `scroll-indicator.hbs` | 阅读进度条 | - |

### 3.2 components/ 业务组件

| 组件 | 用途 | 依赖 |
|------|------|------|
| `nav-link.hbs` | 导航链接（支持 hover 状态） | navigation 数据 |
| `post-card.hbs` | 文章卡片（列表项） | post 对象 |
| `featured-post-card.hbs` | 精选文章卡片（大图） | post 对象 |
| `post-list.hbs` | 文章列表容器 | posts 数据 |
| `author-card.hbs` | 作者信息卡片 | author 对象 |
| `tag-chip.hbs` | 标签小片（分类筛选） | tag 对象 |
| `related-posts.hbs` | 相关文章推荐 | current_post, tags |
| `newsletter-form.hbs` | 订阅表单 | `{{@site}}`, Ghost Portal |
| `search-overlay.hbs` | 搜索弹窗 | `{{@site}}`, `search` |
| `progress-bar.hbs` | 页面滚动进度条 | - |
| `social-links.hbs` | 社交媒体链接 | `{{@site.social_urls}}` |

### 3.3 content/ 内容组件

| 组件 | 用途 |
|------|------|
| `post-content.hbs` | 文章内容处理（包含代码高亮、图片优化） |
| `page-content.hbs` | 页面内容处理 |

---

## 4. 模板继承关系

```
default.hbs (根布局)
    ├── index.hbs
    │   ├── post-card.hbs (循环)
    │   ├── featured-post-card.hbs (循环)
    │   └── newsletter-form.hbs
    │
    ├── post.hbs
    │   ├── author-card.hbs
    │   ├── tag-chip.hbs
    │   ├── post-content.hbs
    │   ├── related-posts.hbs
    │   └── newsletter-form.hbs
    │
    ├── page.hbs
    │   ├── page-content.hbs
    │   └── (可复用 author-card)
    │
    ├── tag.hbs
    │   ├── tag-chip.hbs (循环)
    │   ├── post-card.hbs (循环)
    │   └── post-list.hbs
    │
    ├── author.hbs
    │   ├── author-card.hbs
    │   ├── post-card.hbs (循环)
    │   └── social-links.hbs
    │
    ├── archive.hbs
    │   ├── tag-chip.hbs
    │   └── post-card.hbs
    │
    └── error.hbs
```

---

## 5. Ghost Helpers 使用总结

### 5.1 数据获取
- `{{#get "posts"}}` / `{{#get "tags"}}` / `{{#get "authors"}}`
- 支持 `include`, `filter`, `limit`, `order`, `page` 参数

### 5.2 条件渲染
- `{{#if}}` / `{{else}}` / `{{/if}}`
- `{{#unless}}` - 反向条件
- `{{#has}}` - 特定属性检查

### 5.3 循环遍历
- `{{#foreach}}` - 支持 `@first`, `@last`, `@index`, `@odd`, `@even`
- 支持 `limit` 和 `from` 参数

### 5.4 日期与国际化
- `{{date format="MMMM D, YYYY"}}`
- `{{t "translation_key"}}` - i18n 翻译

### 5.5 内容处理
- `{{excerpt}}` / `{{content}}` - 文章内容
- `{{reading_time}}` - 阅读时间计算
- `{{feature_image}}` / `{{feature_image alt="..."}}`

### 5.6 SEO 与 Meta
- `{{meta_title}}` / `{{meta_description}}`
- `{{og_image}}` / `{{twitter_image}}`
- `{{canonical_url}}`
- `{{ghost_head}}` / `{{ghost_foot}}`

---

## 6. 功能支持清单

### 6.1 Ghost Portal 订阅功能
- Newsletter 订阅表单 (通过 `{{> components/newsletter-form}}`)
- 集成 Ghost 官方会员系统
- 支持免费/付费订阅

### 6.2 搜索功能
- 搜索弹窗组件 (`search-overlay.hbs`)
- Ghost 官方搜索 API 集成
- 键盘快捷键 (Ctrl/Cmd + K)

### 6.3 响应式布局
- 移动端适配 (375px)
- 平板适配 (768px)
- 桌面适配 (1440px)
- 断点变量通过 CSS 定制

### 6.4 SEO 优化
- 完整的 Meta 标签
- Open Graph / Twitter Card
- 结构化数据 (JSON-LD)
- 规范的 Canonical URL
- 语义化 HTML5 标签

### 6.5 主题功能
- Dark Mode (默认哥特深色)
- 代码高亮 (Prism.js / highlight.js)
- 图片懒加载
- 社交分享按钮
- 评论系统 (支持 Ghost Comments / Disqus)

---

## 7. 设计规范映射

根据 `gothic_ui.pen` 设计文件：

### 7.1 色彩系统
```css
:root {
    --color-bg-primary: #0a0a0a;
    --color-bg-secondary: #0d0d0d;
    --color-bg-footer: #080808;
    --color-accent: #8B0000;      /* 哥特红 */
    --color-text-primary: #F5F0E8;
    --color-text-secondary: #C6C0D5;
    --color-text-muted: #7A7291;
    --color-gold: #C2B8D7;        /* 淡紫金 */
}
```

### 7.2 字体系统
- **标题**: Cinzel (哥特衬线)
- **正文**: Cormorant Garamond (优雅衬线)
- **UI**: System UI (导航、按钮)

### 7.3 动效规范
- Hero 淡入: 320ms ease-out
- 卡片交错: 60ms 延迟
- 滚动进度条: 实时追踪
- 链接下划线: 从中心展开

---

## 8. 后续步骤

1. **审批此规划文档** - 等待架构设计批准
2. **创建 partials 组件** - 从基础到复杂
3. **实现 default.hbs** - 基础布局
4. **实现各页面模板** - 按优先级
5. **添加 CSS 样式** - 匹配设计规范
6. **测试与调试** - 响应式、功能验证

---

*本文档基于 gothic_ui.pen 设计文件生成，版本 v1.0*