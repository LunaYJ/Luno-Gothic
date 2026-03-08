[根目录](../../../CLAUDE.md) > [partials](../) > **layout**

# layout 模块

> **职责**: 页面布局骨架组件，定义站点的整体结构

---

## 组件清单

| 组件 | 文件 | 职责 | 使用位置 |
|------|------|------|----------|
| Head | `head.hbs` | HTML Head 内容 | `default.hbs` |
| Header | `header.hbs` | 站点顶部导航 | `default.hbs` |
| Footer | `footer.hbs` | 站点底部信息 | `default.hbs` |

---

## 架构关系

```
default.hbs
├── {{> layout/head }}
<body>
    {{> layout/header }}
    <main>{{{body}}}</main>
    {{> layout/footer }}
</body>
```

---

## head.hbs

**职责**: 定义 HTML `<head>` 的内容

**包含**:
1. Meta 标签（charset, viewport, X-UA-Compatible）
2. Ghost 头部注入 (`{{ghost_head}}`)
3. Google Fonts 预连接和加载
4. 主样式表引用

**关键代码**:
```handlebars
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

{{ghost_head}}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">

<link rel="stylesheet" href="{{asset "css/main.css"}}" />
```

---

## header.hbs

**职责**: 站点顶部导航栏

**结构**:
```
header.site-header
├── .header-line--top (装饰线)
├── .header-inner
│   ├── .site-brand (Logo/站点名)
│   ├── .site-nav (主导航)
│   ├── .header-actions
│   │   ├── .btn-search (搜索按钮)
│   │   └── .btn-subscribe (订阅按钮)
│   └── .btn-menu-toggle (移动端菜单)
└── .header-line--bottom (装饰线)
```

**JavaScript 集成**:
- 搜索按钮: `#btn-search` -> `modules/search.js`
- 菜单按钮: `#btn-menu-toggle` -> `modules/mobile-menu.js`
- 导航链接: `.site-nav a` -> `modules/navigation.js`

---

## footer.hbs

**职责**: 站点底部信息

**结构**:
```
footer.site-footer
├── .footer-line (装饰分割线)
└── .footer-inner
    ├── .footer-main
    │   ├── .footer-brand (Logo/描述)
    │   └── .footer-nav
    │       ├── Navigation (二级导航)
    │       └── Connect (社交链接)
    └── .footer-bottom
        └── .footer-copyright (版权信息)
```

**Ghost 功能**:
- `{{navigation type="secondary"}}` - 二级导航
- `{{date format="YYYY"}}` - 当前年份

---

## 样式映射

| 组件 | 对应 CSS 文件 |
|------|--------------|
| head | - (内联样式在 `ghost_head` 中) |
| header | `assets/css/components/nav.css` |
| footer | `assets/css/components/footer.css` |

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 相关文件

- `/partials/layout/head.hbs`
- `/partials/layout/header.hbs`
- `/partials/layout/footer.hbs`
- `/default.hbs` (使用这些 partials 的主模板)
- `/assets/css/components/nav.css` (Header 样式)
- `/assets/css/components/footer.css` (Footer 样式)

---

*文档生成时间: 2026-03-08 14:02:37*
