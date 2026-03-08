# Gothic Ghost 主题 - 架构设计文档

## 1. 项目概述

### 1.1 项目背景

Gothic 是一个为 Ghost 博客平台设计的暗黑哥特风格主题，融合了中世纪美学与现代Web设计规范。主题以深色系为主调，搭配暗红色强调色与米色文字，营造出神秘、优雅的阅读氛围。

### 1.2 设计规范

| 元素 | 规范值 |
|------|--------|
| 主要背景色 | #0a0a0a, #0d0d0d, #080808 |
| 强调色 | #8B0000 (暗红色) |
| 主文字色 | #F5F0E8, #F2EBDC (米色) |
| 次要色 | #8E82A7, #A99FC2, #C6C0D5 (紫色系) |
| 标题字体 | Cinzel |
| 正文字体 | Cormorant Garamond |

### 1.3 目标页面

根据设计稿 `gothic_ui.pen`，本主题包含以下页面：

1. **首页** (`bi8Au`) - 哥特博客主题首页
2. **文章详情页** (`JcWpj`) - 哥特博客主题文章详情页
3. **归档与分类页** (`7BR3T`) - 哥特博客主题归档与分类页
4. **移动端首页** (`c0dXX`) - 哥特博客主题移动端首页 (375×2)
5. **交互状态规范** (`Ga13M`) - 哥特博客主题交互状态规范

---

## 2. 文件结构规划

### 2.1 Ghost 主题标准结构

```
gothic/
├── assets/
│   ├── css/
│   │   ├── screen.css          # 主屏幕样式
│   │   ├── dark.css            # 暗色模式样式
│   │   └── custom.css          # 用户自定义样式
│   ├── js/
│   │   ├── index.js            # 主入口文件
│   │   └── utils.js            # 工具函数
│   ├── fonts/                  # 自定义字体文件
│   └── images/                 # 图片资源
├── partials/
│   ├── header.hbs              # 头部导航
│   ├── footer.hbs              # 页脚
│   ├── post-card.hbs           # 文章卡片
│   ├── pagination.hbs         # 分页组件
│   ├── sidebar.hbs             # 侧边栏
│   ├── author.hbs              # 作者信息
│   └── category.hbs            # 分类标签
├── default.hbs                 # 默认布局模板
├── index.hbs                   # 首页模板
├── post.hbs                    # 文章详情页模板
├── page.hbs                    # 独立页面模板
├── archive.hbs                  # 归档页模板
├── tag.hbs                     # 标签页模板
├── author.hbs                  # 作者页模板
├── error.hbs                   # 404错误页
├── package.json                # 主题配置文件
└── README.md                   # 主题说明文档
```

### 2.2 目录设计原则

- **遵循 Ghost 规范**：严格遵循 Ghost 官方主题目录结构
- **模块化**：使用 partials 实现组件复用
- **SCSS 架构**：使用 SCSS 进行样式管理，便于维护和扩展
- **按需加载**：JavaScript 采用模块化设计，支持按需加载

---

## 3. Handlebars 模板清单

### 3.1 核心模板文件

| 模板文件 | 用途 | 优先级 |
|----------|------|--------|
| `default.hbs` | 基础布局模板，所有页面继承 | 高 |
| `index.hbs` | 首页，展示文章列表 | 高 |
| `post.hbs` | 文章详情页 | 高 |
| `page.hbs` | 独立页面（如关于页） | 高 |
| `archive.hbs` | 归档页面 | 中 |
| `tag.hbs` | 标签聚合页面 | 中 |
| `author.hbs` | 作者详情页面 | 中 |
| `error.hbs` | 404/500 错误页面 | 中 |

### 3.2 Partial 组件

| 组件名称 | 描述 |
|----------|------|
| `header.hbs` | 站点头部，包含 Logo 和导航菜单 |
| `footer.hbs` | 站点底部，包含版权和社交链接 |
| `post-card.hbs` | 文章卡片组件，用于列表展示 |
| `post-full.hbs` | 完整文章内容组件 |
| `pagination.hbs` | 分页导航组件 |
| `sidebar.hbs` | 侧边栏容器 |
| `author-box.hbs` | 作者信息卡片 |
| `category-tag.hbs` | 分类/标签徽章 |
| `search-box.hbs` | 搜索框组件 |
| `newsletter.hbs` | 邮件订阅组件 |
| `comment.hbs` | 评论区域（集成第三方评论系统）|
| `related-posts.hbs` | 相关文章推荐 |
| `reading-progress.hbs` | 阅读进度条 |
| `toc.hbs` | 文章目录导航 |
| `social-share.hbs` | 社交分享按钮 |

### 3.3 模板继承关系

```
default.hbs (基础布局)
├── index.hbs (首页)
│   └── partials/post-card.hbs
├── post.hbs (文章详情)
│   ├── partials/post-full.hbs
│   ├── partials/author-box.hbs
│   ├── partials/related-posts.hbs
│   └── partials/comment.hbs
├── page.hbs (独立页面)
├── archive.hbs (归档页)
│   └── partials/post-card.hbs
├── tag.hbs (标签页)
├── author.hbs (作者页)
└── error.hbs (错误页)
```

---

## 4. 技术选型建议

### 4.1 样式架构

| 技术 | 选择 | 理由 |
|------|------|------|
| CSS 预处理器 | SCSS | 成熟的模块化 CSS 方案，便于组织变量和混合宏 |
| CSS 架构 | BEM + ITCSS | 清晰的命名规范和层级结构 |
| 响应式 | CSS Grid + Flexbox | 现代布局方案，减少媒体查询依赖 |
| 动画 | CSS Transitions + Keyframes | 性能优异，原生支持 |

### 4.2 字体方案

| 用途 | 字体 | 加载方式 |
|------|------|----------|
| 标题 | Cinzel | Google Fonts / 本地托管 |
| 正文 | Cormorant Garamond | Google Fonts / 本地托管 |
| 代码 | Fira Code | Google Fonts |

**字体加载优化建议**：
- 使用 `font-display: swap` 防止字体阻塞渲染
- 考虑本地托管字体以提高加载速度
- 仅加载所需的字重（Regular, Bold, Italic）

### 4.3 JavaScript 方案

| 需求 | 方案 | 说明 |
|------|------|------|
| 核心框架 | 原生 JavaScript | 保持轻量，避免 jQuery 依赖 |
| 动画库 | GSAP (可选) | 复杂的滚动动效 |
| 图片懒加载 | Intersection Observer | 原生 API，高性能 |
| 代码分割 | ES Modules | 现代模块化方案 |

### 4.4 第三方服务集成

| 功能 | 推荐方案 | 说明 |
|------|----------|------|
| 评论系统 | Giscus / Disqus | GitHub Discussions 或 Disqus |
| 搜索 | Ghost 内置搜索 | Ghost 4.0+ 内置 |
| 分析 | Google Analytics / Plausible | 隐私友好可选 Plausible |
| 社交分享 | AddThis / ShareThis | 或自定义实现 |

---

## 5. Ghost 功能集成规划

### 5.1 必须支持的功能

- [x] 响应式设计（移动端优先）
- [x] 文章列表与分页
- [x] 文章详情页（标题、作者、日期、标签）
- [x] 特色图片（Featured Image）
- [x] 作者页面
- [x] 标签/分类页面
- [x] RSS 订阅
- [x] AMP 支持（可选）
- [x] 暗黑模式支持
- [x] SEO 优化（元标签、Schema）
- [x] 会员功能（Ghost 3.0+）
- [x] Newsletter 订阅
- [x] 代码高亮（Prism.js）

### 5.2 Ghost Handlebars 助手函数

需要实现的自定义助手函数：

```javascript
// 日期格式化
{{formatDate date format="MMMM DD, YYYY"}}

// 读取时间估算
{{readingTime}} {{t "min read"}}

// 文章摘要
{{excerpt words=50}}

// 社交链接
{{twitter_url}}
{{facebook_url}}
{{github_url}}

// 相关文章
{{related_posts limit=3}}

// 分类处理
{{category_list}}
```

### 5.3 Ghost API 集成

- 利用 Ghost Content API 获取文章数据
- 使用 Ghost Admin API 进行主题设置
- 集成 Ghost Membership API 实现付费内容

---

## 6. 页面布局规划

### 6.1 首页布局 (index.hbs)

```
┌─────────────────────────────────────┐
│            HEADER                   │
│  [Logo]        [Nav Links]  [Search]│
├─────────────────────────────────────┤
│              HERO                   │
│    [Site Title + Description]       │
│        [Featured Post]              │
├─────────────────────────────────────┤
│         POST GRID (2/3)  │ SIDEBAR  │
│  ┌─────┐ ┌─────┐ ┌─────┐ │ Author  │
│  │Post │ │Post │ │Post │ │ Categories│
│  └─────┘ └─────┘ └─────┘ │ Tags    │
│  ┌─────┐ ┌─────┐ ┌─────┐ │ Newsletter│
│  │Post │ │Post │ │Post │ │          │
│  └─────┘ └─────┘ └─────┘ │          │
├─────────────────────────────────────┤
│           PAGINATION                │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

### 6.2 文章详情页布局 (post.hbs)

```
┌─────────────────────────────────────┐
│            HEADER                   │
├─────────────────────────────────────┤
│         POST HEADER                 │
│  [Category] [Title]                 │
│  [Date] [Author] [Reading Time]     │
│  [Featured Image]                   │
├─────────────────────────────────────┤
│                                      │
│         POST CONTENT                │
│  [Markdown/HTML Content]            │
│                                      │
├─────────────────────────────────────┤
│    [Tags] [Share Buttons]           │
├─────────────────────────────────────┤
│        RELATED POSTS                │
├─────────────────────────────────────┤
│           AUTHOR BOX                │
├─────────────────────────────────────┤
│           COMMENTS                  │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

### 6.3 归档页布局 (archive.hbs)

```
┌─────────────────────────────────────┐
│            HEADER                   │
├─────────────────────────────────────┤
│         ARCHIVE HEADER              │
│  "Archives" / "Categories"         │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ 2024                        │   │
│  │   January (3)               │   │
│  │     └── Article Title       │   │
│  │     └── Article Title       │   │
│  │   December (5)              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Categories                 │   │
│  │   Tech (12)                 │   │
│  │   Life (8)                  │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

### 6.4 移动端布局

- 单列布局，内容宽度 100%
- 隐藏侧边栏，移至底部或折叠菜单
- 汉堡菜单导航
- 优化触摸区域（最小 44px）
- 图片自适应缩放

---

## 7. 交互与动画规范

### 7.1 页面加载动画

- 淡入效果：opacity 0 → 1，300ms ease-out
- 交错出现：每项延迟 100ms
- 背景纹理渐进加载

### 7.2 Hover 状态

| 元素 | 效果 |
|------|------|
| 链接 | 颜色过渡到强调色 #8B0000，下划线展开 |
| 按钮 | 背景色加深，轻微上浮阴影 |
| 卡片 | 轻微上浮（transform: translateY(-4px)），边框发光 |
| 图片 | 亮度提升，略微放大 |

### 7.3 滚动动效

- 元素进入视口时淡入上滑
- 导航栏固定 + 背景模糊效果
- 阅读进度条

### 7.4 过渡时长规范

| 场景 | 时长 |
|------|------|
| 颜色/背景过渡 | 200ms |
| 元素移动/缩放 | 300ms |
| 页面切换 | 400ms |
| 弹窗/模态框 | 250ms |

---

## 8. 开发阶段规划

### Phase 1: 基础架构 (1-2周)
- 项目初始化
- 基础样式变量定义
- 默认模板创建

### Phase 2: 核心页面 (2-3周)
- 首页开发
- 文章详情页开发
- 归档页开发

### Phase 3: 组件与交互 (1-2周)
- Partial 组件开发
- JavaScript 交互实现
- 动画效果添加

### Phase 4: 优化与测试 (1周)
- 性能优化
- 跨浏览器测试
- Ghost 功能集成测试
- 响应式测试

---

*文档版本：1.0*
*创建日期：2024*
*最后更新：2024*