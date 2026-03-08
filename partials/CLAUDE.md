[根目录](../../CLAUDE.md) > **partials**

# partials 模块

> **职责**: Ghost Handlebars 可复用组件模板，包含布局组件和功能组件

---

## 模块结构

```
partials/
├── layout/                    # 布局组件
│   ├── head.hbs              # HTML Head 模板
│   ├── header.hbs            # 站点头部
│   └── footer.hbs            # 站点页脚
└── components/               # 功能组件
    ├── post-card.hbs         # 文章卡片
    ├── featured-post-card.hbs # 精选文章卡片
    ├── author-card.hbs       # 作者卡片
    ├── related-posts.hbs     # 相关文章
    ├── tag-chip.hbs          # 标签芯片
    ├── pagination.hbs        # 分页组件
    ├── search-overlay.hbs    # 搜索覆盖层
    ├── newsletter-form.hbs   # 订阅表单
    ├── social-links.hbs      # 社交链接
    └── scroll-progress.hbs   # 滚动进度条
```

---

## 入口与使用方式

### 在模板中引用 partials

```handlebars
{{! 引用布局组件 }}
{{> layout/head }}
{{> layout/header }}
{{> layout/footer }}

{{! 引用功能组件 }}
{{> components/post-card }}
{{> components/search-overlay }}
{{> components/newsletter-form }}
```

---

## 布局组件 (layout/)

### head.hbs

**职责**: 定义 HTML `<head>` 部分的内容

**包含内容**:
- 字符编码和 viewport 设置
- Ghost 头部注入 (`{{ghost_head}}`)
- Google Fonts 加载 (Cinzel, Cormorant Garamond)
- 主样式表引用

**使用位置**: `default.hbs`

```handlebars
<head>
    {{> layout/head }}
</head>
```

### header.hbs

**职责**: 站点顶部导航栏

**结构**:
- 顶部装饰线
- Logo / 站点名称
- 主导航菜单 (`{{navigation}}`)
- 搜索按钮
- 订阅按钮 (Ghost Portal)
- 移动端菜单按钮

**关键元素**:
```handlebars
<header class="site-header" id="site-header">
    <div class="header-inner">
        <div class="site-brand">...</div>
        <nav class="site-nav" id="site-nav">{{navigation}}</nav>
        <div class="header-actions">
            <button class="btn-search" id="btn-search">...</button>
            <button class="btn-subscribe" data-portal="signup">...</button>
        </div>
        <button class="btn-menu-toggle" id="btn-menu-toggle">...</button>
    </div>
</header>
```

### footer.hbs

**职责**: 站点底部信息

**结构**:
- 装饰分割线
- 品牌信息
- 导航链接 (secondary navigation)
- 社交链接
- 版权信息

---

## 功能组件 (components/)

### post-card.hbs

**职责**: 文章列表中的卡片展示

**参数**:
- `class` - 额外 CSS 类
- `featured` - 是否为精选文章

**数据绑定**:
```handlebars
<article class="post-card{{#if class}} {{class}}{{/if}}"{{#if featured}} data-featured="true"{{/if}}>
    {{#if feature_image}}
        <img src="{{img_url feature_image size="m"}}" ...>
    {{/if}}
    <div class="post-card__content">
        {{#if primary_tag}}<span class="post-card__tag">{{primary_tag.name}}</span>{{/if}}
        <h3 class="post-card__title"><a href="{{url}}">{{title}}</a></h3>
        {{#if excerpt}}<p class="post-card__excerpt">{{excerpt words="20"}}</p>{{/if}}
        <div class="post-card__meta">
            <time datetime="{{published_at}}">{{date published_at format="MMM D, YYYY"}}</time>
            <span>{{reading_time}}</span>
        </div>
    </div>
</article>
```

### search-overlay.hbs

**职责**: 全屏搜索弹窗

**功能**:
- 搜索输入框
- 实时搜索结果
- ESC 键关闭
- 点击遮罩关闭

### newsletter-form.hbs

**职责**: 邮件订阅表单

**功能**:
- 邮箱输入
- Ghost Portal 集成
- 表单验证

### author-card.hbs

**职责**: 作者信息展示

**变体**:
- `author-card--inline` - 行内显示（文章头部）
- `author-card--sidebar` - 侧边栏显示
- `author-card--page` - 独立页面显示

---

## 关键依赖与配置

### Ghost 助手函数

| 助手 | 用途 | 示例 |
|------|------|------|
| `{{navigation}}` | 渲染导航菜单 | `{{navigation type="secondary"}}` |
| `{{ghost_head}}` | 注入 SEO/meta | `<head>{{ghost_head}}</head>` |
| `{{img_url}}` | 处理图片 URL | `{{img_url feature_image size="m"}}` |
| `{{date}}` | 格式化日期 | `{{date published_at format="MMM D, YYYY"}}` |
| `{{excerpt}}` | 文章摘要 | `{{excerpt words="20"}}` |
| `{{reading_time}}` | 阅读时间 | `{{reading_time}}` |
| `{{t}}` | 国际化翻译 | `{{t "Subscribe"}}` |

### 条件渲染

```handlebars
{{#if feature_image}}...{{/if}}
{{#unless feature_image}}...{{/unless}}
{{#if @site.members_enabled}}...{{/if}}
{{#if @custom.hero_title}}...{{/if}}
```

---

## 测试与质量

### Handlebars 验证

- 确保所有变量使用正确
- 检查条件渲染的闭合标签
- 验证 `{{#foreach}}` 循环的正确使用

### 可访问性

- 图片必须有 `alt` 属性
- 按钮必须有 `aria-label`
- 表单元素必须有 `label`

---

## 常见问题 (FAQ)

### Q: 如何添加新的 partial？

1. 在 `partials/components/` 创建新文件
2. 使用小写字母和连字符命名
3. 在模板中引用: `{{> components/new-component}}`

### Q: partial 可以接收参数吗？

可以，通过哈希参数传递：

```handlebars
{{! 调用 }}
{{> components/post-card class="featured" show_excerpt=true}}

{{! 定义 }}
<article class="post-card {{class}}">
    {{#if show_excerpt}}<p>{{excerpt}}</p>{{/if}}
</article>
```

### Q: 如何在 partial 中访问父级上下文？

使用 `../` 访问父级：

```handlebars
{{#foreach posts}}
    {{> components/post-card author_name=../author.name}}
{{/foreach}}
```

---

## 相关文件清单

### Layout Partials
- `/partials/layout/head.hbs` - HTML Head
- `/partials/layout/header.hbs` - 站点头部
- `/partials/layout/footer.hbs` - 站点页脚

### Component Partials
- `/partials/components/post-card.hbs` - 文章卡片
- `/partials/components/featured-post-card.hbs` - 精选卡片
- `/partials/components/author-card.hbs` - 作者卡片
- `/partials/components/related-posts.hbs` - 相关文章
- `/partials/components/tag-chip.hbs` - 标签芯片
- `/partials/components/pagination.hbs` - 分页
- `/partials/components/search-overlay.hbs` - 搜索弹窗
- `/partials/components/newsletter-form.hbs` - 订阅表单
- `/partials/components/social-links.hbs` - 社交链接
- `/partials/components/scroll-progress.hbs` - 进度条

### 使用这些 partials 的模板
- `/default.hbs` - 使用 layout/head, layout/header, layout/footer
- `/index.hbs` - 使用 components/post-card, components/featured-post-card
- `/post.hbs` - 使用 components/author-card, components/related-posts
- `/tag.hbs` - 使用 components/tag-chip

---

*文档生成时间: 2026-03-08 14:02:37*
