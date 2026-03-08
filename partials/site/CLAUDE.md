[根目录](../../../CLAUDE.md) > [partials](../) > **site**

# site Partials 模块

> **职责**: 站点级可复用组件模板，包含头部、侧边栏、页脚、文章卡片等核心UI组件

---

## 模块结构

```
partials/site/
├── header.hbs              # 站点头部导航
├── sidebar.hbs             # 侧边栏（作者信息）
├── footer.hbs              # 站点页脚
├── post-card.hbs           # 文章卡片
└── subscribe-section.hbs   # 订阅区块
```

---

## 入口与使用方式

### 在模板中引用

```handlebars
{{! default.hbs 中使用 }}
{{> "site/sidebar"}}
{{> "site/header"}}
{{> "site/footer"}}

{{! index.hbs 中使用 }}
{{#foreach posts}}
  {{> "site/post-card"}}
{{/foreach}}

{{> "site/subscribe-section"}}
```

---

## 组件详解

### header.hbs

**职责**: 站点顶部导航栏，包含品牌、导航菜单和订阅按钮

**结构**:
- 顶部装饰线 (`.header-line`)
- 品牌 Logo (`.site-brand`)
- 主导航菜单 (`.site-nav`)
- 订阅按钮 (`.subscribe-btn`)

**使用的 Ghost 助手**:
- `{{@site.url}}` - 站点 URL
- `{{@site.title}}` - 站点标题
- `{{navigation}}` - 导航菜单

---

### sidebar.hbs

**职责**: 左侧固定侧边栏，展示作者/站点信息

**结构**:
- 徽章标签 (`.profile-badge`)
- 站点名称 (`.profile-name`)
- 角色描述 (`.profile-role`)
- 头像 (`.profile-avatar`)
- 简介 (`.profile-bio`)
- 社交链接 (`.profile-meta`)

**使用的 Ghost 助手**:
- `{{@custom.profile_badge}}` - 自定义徽章
- `{{@custom.profile_role}}` - 自定义角色
- `{{@custom.profile_bio}}` - 自定义简介
- `{{@site.logo}}` / `{{@site.icon}}` - 站点 Logo
- `{{@site.facebook}}` / `{{@site.twitter}}` - 社交链接

**自定义配置项** (package.json config.custom):
```json
{
  "profile_badge": { "type": "text", "default": "Dark notes" },
  "profile_role": { "type": "text", "default": "Writer / Curator" },
  "profile_bio": { "type": "text", "default": "记录设计、阅读与深夜思考。" }
}
```

---

### footer.hbs

**职责**: 站点底部版权信息

**结构**:
- 装饰线 (`.footer-line`)
- 品牌名称 (`.footer-brand`)
- 版权信息 (`.footer-copy`)

---

### post-card.hbs

**职责**: 文章列表中的卡片展示

**结构**:
- 特色图片 (`.post-card-image`)
- 元信息 (`.post-card-meta`) - 日期、阅读时间
- 标题 (`.post-card-title`)

**使用的 Ghost 助手**:
- `{{img_url feature_image size='m'}}` - 图片 URL
- `{{date published_at format="YYYY / MM / DD"}}` - 格式化日期
- `{{reading_time}}` - 阅读时间
- `{{url}}` - 文章链接
- `{{title}}` - 文章标题

---

### subscribe-section.hbs

**职责**: Newsletter 订阅区块

**结构**:
- 区块标签 (`.section-kicker`)
- 标题 (`.section-title`)
- 分隔线 (`.section-rule`)
- 描述 (`.subscribe-desc`)
- CTA 按钮 (`.subscribe-cta`)

**功能**: 链接到 Ghost Portal 订阅页面 (`#/portal/signup`)

---

## 样式对应

| Partial | CSS 类名 | 样式文件 |
|---------|----------|----------|
| header.hbs | `.site-header`, `.header-line`, `.site-brand`, `.site-nav` | `main.scss` |
| sidebar.hbs | `.profile-rail`, `.profile-badge`, `.profile-name`, `.profile-avatar` | `main.scss` |
| footer.hbs | `.site-footer`, `.footer-line`, `.footer-brand` | `main.scss` |
| post-card.hbs | `.post-card`, `.post-card-image`, `.post-card-meta`, `.post-card-title` | `main.scss` |
| subscribe-section.hbs | `.subscribe-section`, `.subscribe-desc`, `.subscribe-cta` | `main.scss` |

---

## 响应式行为

在 `main.scss` 中定义的响应式规则:

- **桌面端 (>=980px)**: 显示侧边栏和完整头部
- **移动端 (<980px)**: 隐藏侧边栏和传统头部，显示移动端顶部栏和菜单

```scss
@media (max-width: 980px) {
  .profile-rail,
  .site-header {
    display: none;
  }

  .mobile-topbar,
  .mobile-nav {
    display: flex/block;
  }
}
```

---

## 常见问题 (FAQ)

### Q: 如何修改侧边栏的默认内容？

编辑 `package.json` 中的 `config.custom` 部分:

```json
{
  "custom": {
    "profile_badge": { "type": "text", "default": "你的徽章" },
    "profile_role": { "type": "text", "default": "你的角色" },
    "profile_bio": { "type": "text", "default": "你的简介" },
    "hero_title": { "type": "text", "default": "首页标题" },
    "hero_desc": { "type": "text", "default": "首页描述" }
  }
}
```

### Q: 如何在其他页面复用这些 partials？

使用 Ghost 的 partial 引用语法:

```handlebars
{{> "site/header"}}
{{> "site/post-card"}}
```

### Q: 如何添加新的站点级组件？

1. 在 `partials/site/` 目录创建新的 `.hbs` 文件
2. 使用小写字母和连字符命名（如 `my-component.hbs`）
3. 在模板中引用: `{{> "site/my-component"}}`

---

## 相关文件清单

### Partials
- `/partials/site/header.hbs` - 站点头部
- `/partials/site/sidebar.hbs` - 侧边栏
- `/partials/site/footer.hbs` - 站点底部
- `/partials/site/post-card.hbs` - 文章卡片
- `/partials/site/subscribe-section.hbs` - 订阅区块

### 样式
- `/assets/scss/main.scss` - 包含所有组件样式

### 使用这些 partials 的模板
- `/default.hbs` - 使用 sidebar, header, footer
- `/index.hbs` - 使用 post-card, subscribe-section
- `/tag.hbs` - 使用 post-card
- `/author.hbs` - 使用 post-card
- `/post.hbs` - 使用 subscribe-section

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

*文档生成时间: 2026-03-08 16:48:37*
