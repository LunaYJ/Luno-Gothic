[根目录](../../../CLAUDE.md) > [assets](../../) > [css](../) > **base**

# base 模块

> **职责**: CSS 基础层，定义设计系统的核心变量和重置样式

---

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-03-08 | 1.0.1 | 更新说明：当前主题使用 SCSS 替代此分层架构 |
| 2026-03-08 | 1.0.0 | 初始文档生成 |

---

## 模块状态

**当前状态**: 本目录下的文件 **未被当前构建流程使用**。

当前主题使用 `/assets/scss/main.scss` 作为样式源文件，其中的设计系统已被移植到 SCSS 中。

---

## 模块结构

```
base/
├── reset.css        # CSS 重置（未使用）
├── variables.css    # CSS 变量（未使用，但规范被移植）
├── typography.css   # 字体设置（未使用）
└── utility.css      # 工具类（未使用）
```

---

## variables.css 设计规范（参考）

虽然文件未被直接使用，但其中的设计规范被移植到 `main.scss`：

### 颜色系统

```css
:root {
  /* 背景色 - 层层递进的黑暗 */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #0d0d0d;
  --color-bg-tertiary: #080808;

  /* 强调色 - 哥特暗红 */
  --color-accent-primary: #8B0000;
  --color-accent-hover: #a1121f;

  /* 文字色 - 米色系 */
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #F2EBDC;
  --color-text-muted: #A99FC2;
}
```

**SCSS 等效**:
```scss
:root {
  --bg-page: #0a0a0a;
  --bg-panel: #0d0d0d;
  --accent: #8b0000;
  --text-title: #f5f0e8;
  --text-body: #d2c8e4;
}
```

---

## 相关文件

### 实际使用
- `/assets/scss/main.scss` - 实际样式源文件

### 本目录（备用/遗留）
- `/assets/css/base/variables.css`
- `/assets/css/base/reset.css`
- `/assets/css/base/typography.css`
- `/assets/css/base/utility.css`

---

*文档生成时间: 2026-03-08 16:48:37*
