/**
 * Gothic Theme - Constants
 * 选择器常量和配置项定义
 */

export const SELECTORS = {
  // 导航
  NAV_WRAPPER: '.site-header',
  NAV_LINK: '.site-nav a, .main-navigation a',
  NAV_CURRENT: 'nav-current',

  // 按钮
  BTN_PRIMARY: '.btn-primary, button[type="submit"]',
  BTN_SECONDARY: '.btn-secondary',
  SEARCH_TRIGGER: '#btn-search',
  MENU_TRIGGER: '#btn-menu-toggle',

  // 卡片
  POST_CARD: '.post-card, .article-card, [data-animate="card"]',
  POST_CARD_WRAPPER: '.posts-grid, .articles-list, .post-list',

  // 表单
  FORM_SUBSCRIBE: '.newsletter-form',
  INPUT_EMAIL: '#newsletter-email, input[type="email"], input[name="email"]',
  FORM_ERROR: '.form-error',
  FORM_SUCCESS: '.form-success',

  // 搜索
  SEARCH_PANEL: '#search-overlay',
  SEARCH_INPUT: '#search-input',
  SEARCH_CLOSE: '#search-close',
  SEARCH_RESULTS: '#search-results',
  SEARCH_BACKDROP: '#search-backdrop',

  // 移动端菜单
  MENU_PANEL: '#mobile-menu, .mobile-menu-panel',
  MENU_OVERLAY: '.menu-overlay',
  MENU_LINK: '.mobile-menu a, .site-nav a',

  // 进度条
  PROGRESS_BAR: '#scroll-progress-bar',
  PROGRESS_CONTAINER: '#scroll-progress',

  // 动画元素
  ANIMATE_CONTAINER: '[data-animate-container]',
  ANIMATE_HERO: '[data-animate="hero"], .hero-section',

  // 页面
  BODY: 'body',
  MAIN_CONTENT: 'main, .content-wrapper',
  ARTICLE_CONTENT: '.article-content, .post-content'
};

export const CLASSES = {
  // 状态
  ACTIVE: 'active',
  HOVER: 'hover',
  FOCUS: 'focus',
  DISABLED: 'disabled',
  LOADED: 'page-loaded',
  MENU_OPEN: 'menu-open',
  SEARCH_OPEN: 'search-open',

  // 动画
  ANIMATE_IN: 'animate-in',
  ANIMATE_HERO_DONE: 'hero-animated',

  // 表单
  INPUT_FOCUS: 'input-focus',
  FORM_SUBMITTING: 'form-submitting',
  FORM_ERROR: 'has-error',
  FORM_SUCCESS: 'has-success',

  // 无障碍
  SR_ONLY: 'sr-only'
};

export const CONFIG = {
  // 动画配置
  ANIMATION: {
    PAGE_LOAD_DELAY: 0,
    PAGE_FADE_DURATION: 320,
    CARD_STAGGER: 60,
    CARD_FADE_DURATION: 400,
    HERO_STAGGER: 100
  },

  // 过渡配置
  TRANSITION: {
    DEFAULT: 200,
    FAST: 150,
    SLOW: 300
  },

  // 节流配置
  THROTTLE: {
    SCROLL: 16,
    RESIZE: 100,
    INPUT: 150
  },

  // 观察器配置
  OBSERVER: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -50px 0px'
  }
};

export const ATTRIBUTES = {
  // 数据属性
  ANIMATE: 'data-animate',
  STAGGER: 'data-stagger',
  PROGRESS_BAR: 'data-progress-bar',
  SUBSCRIBE_FORM: 'data-portal',
  SEARCH_TRIGGER: 'data-search-trigger',
  SEARCH_PANEL: 'data-search-panel',
  SEARCH_INPUT: 'data-search-input',
  SEARCH_CLOSE: 'data-search-close',
  MENU_TRIGGER: 'data-menu-trigger',
  MENU_PANEL: 'data-menu-panel',

  // ARIA 属性
  ARIA_CURRENT: 'aria-current',
  ARIA_EXPANDED: 'aria-expanded',
  ARIA_CONTROLS: 'aria-controls',
  ARIA_LABEL: 'aria-label',
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_LIVE: 'aria-live',
  ARIA_DESCRIBEDBY: 'aria-describedby'
};

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
};

export const GOTHIC_COLORS = {
  // 导航状态
  NAV_DEFAULT: '#B8B2C8',
  NAV_HOVER: '#E9E1CF',
  NAV_ACTIVE: '#C9B68A',

  // 按钮状态
  BTN_DEFAULT: '#8B0000',
  BTN_HOVER: '#A1121F',
  BTN_PRESSED: '#6A0D14',

  // 卡片
  CARD_BORDER: '#C9B68A',
  CARD_BG_DEFAULT: '#0d0d0d',
  CARD_BG_HOVER: '#141414',

  // 输入框
  INPUT_BORDER_DEFAULT: '#8D84A4',
  INPUT_BORDER_FOCUS: '#C9B68A',

  // 背景
  BG_DARK: '#0a0a0a',
  BG_DARKER: '#080808',
  BG_CARD: '#0d0d0d'
};

export default {
  SELECTORS,
  CLASSES,
  CONFIG,
  ATTRIBUTES,
  BREAKPOINTS,
  GOTHIC_COLORS
};