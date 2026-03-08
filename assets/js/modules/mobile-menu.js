/**
 * Gothic Theme - Mobile Menu Module
 * 移动端菜单：汉堡菜单、抽屉式导航
 */

import { SELECTORS, CLASSES, ATTRIBUTES, CONFIG } from '../core/constants.js';
import { isMobile, $ } from '../core/utils.js';

class MobileMenu {
  constructor() {
    this.trigger = null;
    this.panel = null;
    this.overlay = null;
    this.links = [];
    this.isOpen = false;
    this.initialized = false;
    this.firstFocusable = null;
    this.lastFocusable = null;
  }

  /**
   * 初始化移动端菜单
   */
  init() {
    if (this.initialized) return;

    try {
      // 主选择器
      this.trigger = $(SELECTORS.MENU_TRIGGER);
      this.panel = $(SELECTORS.MENU_PANEL);
      this.overlay = $(SELECTORS.MENU_OVERLAY);

      // 回退选择器
      if (!this.trigger) {
        this.trigger = document.querySelector('#btn-menu-toggle, .btn-menu-toggle, .menu-toggle');
      }
      if (!this.panel) {
        this.panel = document.querySelector('#mobile-menu, .mobile-menu, .mobile-nav');
      }

      if (!this.trigger || !this.panel) {
        console.log('[Gothic MobileMenu] Menu elements not found');
        return;
      }

      // 创建遮罩层（如果不存在）
      if (!this.overlay) {
        this.createOverlay();
        this.overlay = document.querySelector('.menu-overlay');
      }

      // 获取所有菜单链接
      this.links = Array.from(this.panel.querySelectorAll('a'));

      // 创建关闭按钮
      this.createCloseButton();

      // 绑定事件
      this.bindEvents();

      // 设置 ARIA
      this.setupAccessibility();

      this.initialized = true;

      console.log('[Gothic MobileMenu] Mobile menu initialized');
    } catch (error) {
      console.error('[Gothic MobileMenu] Init error:', error);
    }
  }

  /**
   * 创建遮罩层
   */
  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'true');
    document.body.appendChild(overlay);
  }

  /**
   * 创建关闭按钮
   */
  createCloseButton() {
    // 检查是否已有关闭按钮
    const existingClose = this.panel.querySelector('[data-menu-close]');
    if (existingClose) return;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'menu-close-btn';
    closeBtn.setAttribute('data-menu-close', '');
    closeBtn.setAttribute(ATTRIBUTES.ARIA_LABEL, '关闭菜单');
    closeBtn.innerHTML = `
      <span class="menu-close-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    `;

    this.panel.insertBefore(closeBtn, this.panel.firstChild);

    closeBtn.addEventListener('click', () => this.close());
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 菜单按钮点击
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // 遮罩层点击
    this.overlay?.addEventListener('click', () => this.close());

    // 链接点击后自动关闭
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        // 延迟关闭，让点击事件完成
        setTimeout(() => this.close(), 100);
      });
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Tab 焦点循环
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && this.isOpen) {
        this.handleTabNavigation(e);
      }
    });
  }

  /**
   * 设置无障碍属性
   */
  setupAccessibility() {
    // 触发按钮
    this.trigger.setAttribute(ATTRIBUTES.ARIA_CONTROLS, this.panel.id || 'mobile-menu');
    this.trigger.setAttribute(ATTRIBUTES.ARIA_EXPANDED, 'false');
    this.trigger.setAttribute(ATTRIBUTES.ARIA_LABEL, '打开菜单');

    // 面板
    this.panel.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'true');

    // 设置第一个和最后一个可聚焦元素
    this.updateFocusableElements();
  }

  /**
   * 更新可聚焦元素列表
   */
  updateFocusableElements() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const focusableElements = this.panel.querySelectorAll(focusableSelectors.join(', '));
    this.firstFocusable = focusableElements[0];
    this.lastFocusable = focusableElements[focusableElements.length - 1];
  }

  /**
   * Tab 焦点循环处理
   * @param {KeyboardEvent} e
   */
  handleTabNavigation(e) {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  }

  /**
   * 切换菜单
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * 打开菜单
   */
  open() {
    this.isOpen = true;
    document.body.classList.add(CLASSES.MENU_OPEN);
    this.trigger?.setAttribute(ATTRIBUTES.ARIA_EXPANDED, 'true');
    this.panel?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'false');
    this.overlay?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'false');

    // 锁定 body 滚动
    document.body.style.overflow = 'hidden';

    // 聚焦到第一个链接
    setTimeout(() => {
      const firstLink = this.panel.querySelector('a');
      firstLink?.focus();
    }, 100);

    // 阻止背景滚动
    this.preventBackgroundScroll();
  }

  /**
   * 关闭菜单
   */
  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    document.body.classList.remove(CLASSES.MENU_OPEN);
    this.trigger?.setAttribute(ATTRIBUTES.ARIA_EXPANDED, 'false');
    this.panel?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'true');
    this.overlay?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'true');

    // 恢复 body 滚动
    document.body.style.overflow = '';

    // 恢复背景滚动
    this.restoreBackgroundScroll();

    // 返回焦点到触发按钮
    this.trigger?.focus();
  }

  /**
   * 阻止背景滚动
   */
  preventBackgroundScroll() {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // 保存滚动位置
    this._scrollY = scrollY;
  }

  /**
   * 恢复背景滚动
   */
  restoreBackgroundScroll() {
    if (this._scrollY !== undefined) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, this._scrollY);
      this._scrollY = undefined;
    }
  }

  /**
   * 销毁模块
   */
  destroy() {
    this.close();

    // 移除遮罩层
    this.overlay?.remove();

    // 移除关闭按钮
    const closeBtn = this.panel?.querySelector('[data-menu-close]');
    closeBtn?.remove();

    this.initialized = false;
    console.log('[Gothic MobileMenu] Mobile menu destroyed');
  }
}

export default MobileMenu;