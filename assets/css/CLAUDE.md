[根目录](../../../CLAUDE.md) > [assets](../) > **css**

# CSS 模块

> **职责**: 主题样式系统，采用分层 CSS 架构

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新文档，说明当前使用 SCSS 替代 CSS 分层架构 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 重要说明

**当前状态**: 当前主题实际使用 **SCSS** (`assets/scss/main.scss`) 作为样式源文件，而非此 `css/` 目录下的分层 CSS 架构。

**构建流程**:
```
main.scss --[Vite + Sass]--> assets/built/screen.css
```

**css/ 目录状态**:
- `base/`, `layout/`, `components/` 目录存在但**未被主构建流程使用**
- 这些文件可能是：
  1. 遗留文件（早期版本的样式系统）
  2. 备用方案（供不使用 SCSS 的场景）
  3. 传统 Ghost 主题结构保留

---

## 目录结构

```
css/
├── base/                    # 基础层（未被使用）
│   ├── reset.css
│   ├── variables.css
│   ├── typography.css
│   └── utility.css
├── layout/                  # 布局层（未被使用）
│   ├── container.css
│   ├── grid.css
│   └── responsive.css
├── components/              # 组件层（未被使用）
│   ├── nav.css
│   ├── card.css
│   ├── button.css
│   ├── form.css
│   ├── footer.css
│   ├── hero.css
│   └── post.css
├── ghost-overrides.css      # Ghost 样式覆盖（未被使用）
└── main.css                 # 主入口（未被使用）
```

---

## 实际使用的样式系统

当前主题使用 **`/assets/scss/main.scss`** 作为唯一样式源文件：

```scss
// main.scss 结构
:root { /* CSS 变量 */ }
* { box-sizing: border-box; }

// 布局
.gothic-layout { ... }
.profile-rail { ... }
.content-rail { ... }

// 组件
.site-header { ... }
.post-card { ... }
.hero-section { ... }
// ...

// 响应式
@media (max-width: 1100px) { ... }
@media (max-width: 980px) { ... }
```

详见: [`/assets/scss/CLAUDE.md`](../scss/CLAUDE.md)

---

## 设计系统参考

虽然 `css/base/variables.css` 未被直接使用，但其中的设计规范被移植到 `main.scss`：

| 原 CSS 变量 | SCSS 等效 |
|-------------|-----------|
| `--color-bg-primary: #0a0a0a` | `--bg-page: #0a0a0a` |
| `--color-accent-primary: #8B0000` | `--accent: #8b0000` |
| `--font-display: 'Cinzel'` | `--font-display: 'Cormorant Garamond'` |

---

## 未来可能的用途

这些 CSS 文件可能用于：

1. **回退方案**: 如果弃用 SCSS，可以直接使用这些 CSS 文件
2. **模块化导入**: 在 SCSS 中 `@import` 这些 CSS 文件
3. **特定页面**: 某些页面可能需要独立的 CSS

---

## 相关文件

### 实际使用的样式
- `/assets/scss/main.scss` - 实际样式源文件
- `/assets/built/screen.css` - 编译输出

### 遗留/备用 CSS
- `/assets/css/base/variables.css` - 设计系统变量
- `/assets/css/layout/container.css` - 容器布局
- `/assets/css/components/nav.css` - 导航样式
- `/assets/css/main.css` - 原主入口

---

*文档生成时间: 2026-03-08 16:48:37*
