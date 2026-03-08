/**
 * Gothic Theme - Navigation Module
 * 导航交互处理：hover/active 状态切换
 */

import { SELECTORS, CLASSES, ATTRIBUTES, CONFIG } from '../core/constants.js';

class Navigation {
  constructor() {
    this.navLinks = [];
    this.currentPath = window.location.pathname;
    this.initialized = false;
  }

  /**
   * 初始化导航模块
   */
  init() {
    if (this.initialized) return;

    this.navLinks = this.getNavLinks();

    if (this.navLinks.length === 0) {
      console.log('[Gothic Nav] No navigation links found');
      return;
    }

    this.bindEvents();
    this.setActiveLink();
    this.initialized = true;

    console.log('[Gothic Nav] Navigation initialized');
  }

  /**
   * 获取所有导航链接
   * @returns {Element[]} 导航链接元素数组
   */
  getNavLinks() {
    // 查找主要导航区域
    const navWrappers = document.querySelectorAll(SELECTORS.NAV_WRAPPER);

    if (navWrappers.length === 0) {
      // 回退：查找所有导航链接
      return Array.from(document.querySelectorAll(SELECTORS.NAV_LINK));
    }

    const links = [];
    navWrappers.forEach(wrapper => {
      const wrapperLinks = wrapper.querySelectorAll('a');
      links.push(...Array.from(wrapperLinks));
    });

    return links;
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    this.navLinks.forEach(link => {
      // 鼠标悬停
      link.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      link.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

      // 焦点状态 (键盘导航)
      link.addEventListener('focus', this.handleFocus.bind(this));
      link.addEventListener('blur', this.handleBlur.bind(this));

      // 点击状态
      link.addEventListener('click', this.handleClick.bind(this));
    });

    // 监听 URL 变化 (SPA 支持)
    if (typeof MutationObserver !== 'undefined') {
      this.observeUrlChanges();
    }
  }

  /**
   * 鼠标进入处理
   * @param {MouseEvent} event
   */
  handleMouseEnter(event) {
    const link = event.currentTarget;

    // 不对当前激活的链接添加 hover
    if (link.classList.contains(CLASSES.NAV_CURRENT)) return;

    link.classList.add(CLASSES.HOVER);
  }

  /**
   * 鼠标离开处理
   * @param {MouseEvent} event
   */
  handleMouseLeave(event) {
    const link = event.currentTarget;
    link.classList.remove(CLASSES.HOVER);
  }

  /**
   * 焦点处理 (键盘导航)
   * @param {FocusEvent} event
   */
  handleFocus(event) {
    const link = event.currentTarget;
    link.classList.add(CLASSES.HOVER);
  }

  /**
   * 焦点离开处理
   * @param {FocusEvent} event
   */
  handleBlur(event) {
    const link = event.currentTarget;
    if (!link.classList.contains(CLASSES.NAV_CURRENT)) {
      link.classList.remove(CLASSES.HOVER);
    }
  }

  /**
   * 点击处理
   * @param {MouseEvent} event
   */
  handleClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');

    // 添加短暂点击效果
    link.classList.add(CLASSES.ACTIVE);
    setTimeout(() => link.classList.remove(CLASSES.ACTIVE), CONFIG.TRANSITION.FAST);
  }

  /**
   * 设置当前激活的导航链接
   */
  setActiveLink() {
    const currentFullPath = window.location.href;

    this.navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkPath = link.getAttribute('data-nav-path') || linkHref;

      if (!linkHref || linkHref === '#') return;

      // 检查是否是当前页面
      const isCurrentPage = (
        linkHref === this.currentPath ||
        linkHref === currentFullPath ||
        (linkHref !== '/' && this.currentPath.startsWith(linkHref)) ||
        (linkPath && this.currentPath.includes(linkPath))
      );

      if (isCurrentPage) {
        this.setActive(link);
      }
    });
  }

  /**
   * 设置链接为激活状态
   * @param {Element} link
   */
  setActive(link) {
    // 移除其他链接的激活状态
    this.navLinks.forEach(l => {
      l.classList.remove(CLASSES.NAV_CURRENT);
      l.removeAttribute(ATTRIBUTES.ARIA_CURRENT);
    });

    // 设置当前链接为激活
    link.classList.add(CLASSES.NAV_CURRENT);
    link.setAttribute(ATTRIBUTES.ARIA_CURRENT, 'page');
  }

  /**
   * 观察 URL 变化 (SPA 支持)
   */
  observeUrlChanges() {
    let lastUrl = window.location.href;

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        this.currentPath = window.location.pathname;
        this.setActiveLink();
      }
    });

    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.pathname;
      this.setActiveLink();
    });
  }

  /**
   * 销毁模块
   */
  destroy() {
    if (!this.initialized) return;

    this.navLinks.forEach(link => {
      link.classList.remove(CLASSES.HOVER, CLASSES.ACTIVE, CLASSES.NAV_CURRENT);
    });

    this.initialized = false;
    console.log('[Gothic Nav] Navigation destroyed');
  }
}

export default Navigation;