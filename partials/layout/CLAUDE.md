[根目录](../../../CLAUDE.md) > [partials](../) > **layout**

# layout 模块

> **职责**: 页面布局骨架组件，定义站点的整体结构

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新面包屑，说明当前主题实际使用 site/ 而非 layout/ |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 目录状态说明

**重要**: 当前主题 (Gothic 2.0) 实际使用的是 `partials/site/` 目录下的组件，而非此 `layout/` 目录。

这些 `layout/` partials 是：
1. **遗留文件** - 来自早期版本或模板
2. **备用方案** - 可能用于未来扩展
3. **传统 Ghost 主题结构保留**

**当前实际使用**:
- `/partials/site/header.hbs` 替代 `layout/header.hbs`
- `/partials/site/sidebar.hbs` - 新增的侧边栏组件
- `/partials/site/footer.hbs` 替代 `layout/footer.hbs`
- Head 部分直接在 `default.hbs` 中内联

---

## 组件清单

| 组件 | 文件 | 职责 | 当前状态 |
|------|------|------|----------|
| Head | `head.hbs` | HTML Head 内容 | 可能为遗留 |
| Header | `header.hbs` | 站点顶部导航 | 被 site/header.hbs 替代 |
| Footer | `footer.hbs` | 站点底部信息 | 被 site/footer.hbs 替代 |

---

## 传统架构关系

如果使用了这些 partials，结构将是：

```
default.hbs
├── {{> layout/head }}
<body>
    {{> layout/header }}
    <main>{{{body}}}</main>
    {{> layout/footer }}
</body>
```

**实际架构** (Gothic 2.0):

```
default.hbs
├── <head> (内联)
<body>
    {{> site/sidebar }}
    <div class="content-rail">
        {{> site/header }}
        <main>{{{body}}}</main>
        {{> site/footer }}
    </div>
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

**注意**: 当前主题在 `default.hbs` 中直接内联了 head 内容。

---

## header.hbs

**职责**: 站点顶部导航栏（传统版本）

**当前替代**: `/partials/site/header.hbs`

---

## footer.hbs

**职责**: 站点底部信息（传统版本）

**当前替代**: `/partials/site/footer.hbs`

---

## 样式映射

| 组件 | 对应 CSS 文件 | 备注 |
|------|--------------|------|
| head | - | 样式在 ghost_head 和 screen.css 中 |
| header | `assets/scss/main.scss` | 实际使用 site/header |
| footer | `assets/scss/main.scss` | 实际使用 site/footer |

---

## 相关文件

### 本目录 (可能为遗留)
- `/partials/layout/head.hbs`
- `/partials/layout/header.hbs`
- `/partials/layout/footer.hbs`

### 实际使用的替代组件
- `/partials/site/header.hbs` - 实际使用的头部
- `/partials/site/sidebar.hbs` - 新增的侧边栏
- `/partials/site/footer.hbs` - 实际使用的底部
- `/default.hbs` - 内联 head 内容

---

*文档生成时间: 2026-03-08 16:48:37*
