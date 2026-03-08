# 🦇 Gothic 主题开发指南

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
# 方式一：Vite 开发服务器（推荐用于纯前端开发）
pnpm run dev

# 方式二：Ghost + BrowserSync（推荐用于主题开发）
# 先确保 Ghost 运行在 localhost:2368
pnpm run watch
```

### 3. 构建生产版本

```bash
pnpm run build
```

### 4. 打包主题

```bash
pnpm run zip
```

---

## 脚本说明

| 脚本 | 用途 |
|------|------|
| `pnpm run dev` | 启动 Vite 开发服务器，热更新 CSS/JS |
| `pnpm run build` | 构建生产版本，压缩 CSS/JS |
| `pnpm run build:css` | 仅构建 CSS |
| `pnpm run build:js` | 仅构建 JS |
| `pnpm run watch` | 同时启动 CSS/JS 监听 |
| `pnpm run zip` | 打包主题为 zip 文件 |
| `pnpm run ghost:install` | 安装 Ghost 到 .ghost 目录 |
| `pnpm run ghost:start` | 启动 Ghost |
| `pnpm run ghost:stop` | 停止 Ghost |
| `pnpm run ghost:dev` | 以开发模式运行 Ghost |

---

## Ghost 本地开发

Ghost CLI 已作为项目依赖安装，无需全局安装。

### 初始化 Ghost

```bash
# 首次安装 Ghost（安装到 .ghost 目录）
pnpm run ghost:install
```

### 启动 Ghost

```bash
# 启动 Ghost
pnpm run ghost:start

# 或开发模式（带日志输出）
pnpm run ghost:dev
```

### 关联主题

```bash
# 创建符号链接，将主题链接到 Ghost
ln -s $(pwd) .ghost/content/themes/gothic

# 重启 Ghost
pnpm run ghost:stop
pnpm run ghost:start
```

### 停止 Ghost

```bash
pnpm run ghost:stop
```

---

## 目录结构

```
gothic/
├── assets/
│   ├── css/              # 源码 CSS
│   │   ├── base/
│   │   ├── layout/
│   │   ├── components/
│   │   └── main.css      # CSS 入口
│   ├── js/               # 源码 JS（ES6 模块）
│   │   ├── core/
│   │   ├── modules/
│   │   └── main.js       # JS 入口
│   └── built/            # 构建输出（自动生成）
│       ├── css/
│       └── js/
├── .ghost/               # Ghost 安装目录（自动生成）
│   └── content/
│       └── themes/
│           └── gothic -> ../../../  # 主题符号链接
├── partials/             # Handlebars partials
├── *.hbs                 # 模板文件
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
├── postcss.config.js     # PostCSS 配置
└── bs-config.js          # BrowserSync 配置
```

---

## 开发工作流

### 场景一：纯样式开发

```bash
pnpm run dev
```

- 修改 `assets/css/**/*.css`
- Vite 自动热更新
- 在浏览器中实时查看效果

### 场景二：集成 Ghost 开发

```bash
# 终端 1：启动 Ghost
pnpm run ghost:dev

# 终端 2：启动主题开发
pnpm run watch
```

- 修改任意 `.hbs`、`.css`、`.js` 文件
- 浏览器自动刷新
- 在 `http://localhost:2368` 查看效果

### 场景三：JS 模块开发

```bash
pnpm run dev
```

- 修改 `assets/js/**/*.js`
- Vite 自动处理 ES6 模块
- 支持 `import/export` 语法
- 自动代码分割和优化

---

## CSS 架构

### 文件组织（ITCSS + BEM）

```
css/
├── base/           # 基础层：变量、重置、排版
├── layout/         # 布局层：容器、网格、响应式
├── components/     # 组件层：导航、卡片、按钮
└── main.css        # 入口：按顺序导入
```

### 编写规范

```css
/* 使用 CSS 变量 */
.element {
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}

/* BEM 命名 */
.card { }
.card__title { }
.card--featured { }

/* 响应式（Mobile First）*/
.element {
  /* 移动端样式 */
}

@media (min-width: 768px) {
  .element {
    /* 桌面端样式 */
  }
}
```

---

## JS 架构

### 模块组织

```
js/
├── core/           # 核心层：常量、工具函数
├── modules/        # 功能层：导航、搜索、动画
└── main.js         # 入口：GothicTheme 类
```

### 添加新模块

```javascript
// 1. 创建文件：assets/js/modules/my-feature.js
export default class MyFeature {
  constructor() {
    this.initialized = false;
  }

  init() {
    // 初始化逻辑
    this.initialized = true;
  }
}

// 2. 在 main.js 中导入并初始化
import MyFeature from './modules/my-feature.js';

initModules() {
  // ... 其他模块
  this.modules.myFeature = new MyFeature();
  this.modules.myFeature.init();
}
```

---

## 部署发布

### 打包主题

```bash
pnpm run zip
```

生成 `gothic.zip`，包含：
- 压缩后的 CSS/JS
- 所有模板文件
- 配置文件

### 上传到 Ghost

1. Ghost Admin → Settings → Design
2. Change theme → Upload theme
3. 选择 `gothic.zip`
4. 激活主题

---

## 常见问题

### Q: 修改后没有生效？

- 确保运行了 `pnpm run dev` 或 `pnpm run watch`
- 清除浏览器缓存
- 检查 Ghost 缓存（重启 Ghost）

### Q: CSS 变量在哪里定义？

`assets/css/base/variables.css`

### Q: 如何修改主题颜色？

编辑 `variables.css` 中的 CSS 变量，重新构建即可。

### Q: JS 报错模块找不到？

- 确保文件路径正确
- 检查 `import` 语法
- 运行 `pnpm run build` 查看详细错误

### Q: Ghost 安装失败？

```bash
# 清除缓存重试
rm -rf .ghost
pnpm run ghost:install
```

---

## 性能优化

- CSS 自动压缩、去除注释
- JS 代码分割、Tree Shaking
- 图片懒加载（已内置）
- 字体 `font-display: swap`

---

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

*通过 Browserslist 和 Autoprefixer 自动处理*
