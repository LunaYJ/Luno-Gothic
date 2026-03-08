/**
 * Gothic Theme - Animation Module
 * 页面动效：加载淡入、卡片交错、阅读进度条
 *
 * 设计规范：
 * - Hero 淡入: 320ms, ease-out
 * - 卡片交错: 60ms stagger
 * - 阅读进度条: 实时更新
 */

import { SELECTORS, CLASSES, ATTRIBUTES, CONFIG } from '../core/constants.js';
import { throttle, $ } from '../core/utils.js';

class Animation {
  constructor() {
    this.observer = null;
    this.progressBar = null;
    this.progressContainer = null;
    this.animatedElements = new Set();
    this.initialized = false;
    this._scrollHandler = null;
  }

  /**
   * 初始化动画模块
   */
  init() {
    if (this.initialized) {
      console.warn('[Gothic Animation] Already initialized');
      return;
    }

    try {
      this.initPageLoad();
      this.initCardAnimation();
      this.initReadingProgress();

      this.initialized = true;
      console.log('[Gothic Animation] Animation module initialized');
    } catch (error) {
      console.error('[Gothic Animation] Initialization error:', error);
      // 优雅降级：即使出错也允许页面正常工作
      this.initialized = true;
    }
  }

  /**
   * 页面加载动效
   * 设计规范：Hero 淡入 320ms, ease-out
   */
  initPageLoad() {
    const body = document.body;

    // 确保初始状态
    body.classList.remove(CLASSES.LOADED);

    // 使用 requestAnimationFrame 确保 DOM 完全就绪
    if (document.readyState === 'complete') {
      this.triggerPageLoad();
    } else {
      window.addEventListener('load', () => this.triggerPageLoad());
    }

    // Hero 元素动画
    this.animateHeroElements();
  }

  /**
   * 触发页面加载动画
   */
  triggerPageLoad() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add(CLASSES.LOADED);
      });
    });
  }

  /**
   * Hero 元素动画
   */
  animateHeroElements() {
    try {
      let heroElements = document.querySelectorAll(SELECTORS.ANIMATE_HERO);

      if (heroElements.length === 0) {
        // 回退：查找常见 hero 类名
        heroElements = document.querySelectorAll('.hero, .hero-section, .site-hero, .hero-content');
      }

      heroElements.forEach((el, index) => {
        // 跳过已动画的元素
        if (this.animatedElements.has(el)) return;

        const delay = CONFIG.ANIMATION.HERO_STAGGER * index;
        setTimeout(() => {
          el.classList.add('animate-hero');
          this.animatedElements.add(el);
        }, delay);
      });
    } catch (error) {
      console.warn('[Gothic Animation] Hero animation error:', error);
    }
  }

  /**
   * 卡片交错动画
   * 设计规范：卡片 60ms stagger, fade-in + slide-up
   */
  initCardAnimation() {
    try {
      // 查找卡片容器
      let cardContainers = document.querySelectorAll(SELECTORS.POST_CARD_WRAPPER);

      if (cardContainers.length === 0) {
        // 回退：查找其他常见的卡片容器类名
        cardContainers = document.querySelectorAll('.post-list, .articles, .featured-posts, .recent-posts');
      }

      if (cardContainers.length === 0) {
        console.log('[Gothic Animation] No card containers found');
        return;
      }

      // 创建 Intersection Observer
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          threshold: CONFIG.OBSERVER.THRESHOLD,
          rootMargin: CONFIG.OBSERVER.ROOT_MARGIN
        }
      );

      // 观察所有卡片
      cardContainers.forEach(container => {
        const cards = container.querySelectorAll(SELECTORS.POST_CARD);
        cards.forEach((card, index) => {
          // 设置 stagger 延迟
          const existingStagger = card.dataset.stagger;
          if (!existingStagger) {
            card.dataset.stagger = index * CONFIG.ANIMATION.CARD_STAGGER;
          }

          if (!this.animatedElements.has(card)) {
            this.observer.observe(card);
          }
        });
      });

      // 同时观察带有 data-animate 属性的元素
      const animateElements = document.querySelectorAll(`[${ATTRIBUTES.ANIMATE}]`);
      animateElements.forEach(element => {
        if (!this.animatedElements.has(element)) {
          this.observer.observe(element);
        }
      });
    } catch (error) {
      console.warn('[Gothic Animation] Card animation init error:', error);
    }
  }

  /**
   * Intersection Observer 回调
   * @param {IntersectionObserverEntry[]} entries
   */
  handleIntersection(entries) {
    try {
      entries.forEach(entry => {
        const element = entry.target;

        // 跳过已动画的元素
        if (this.animatedElements.has(element)) return;

        if (entry.isIntersecting) {
          this.animateElement(element);
          this.observer.unobserve(element);
          this.animatedElements.add(element);
        }
      });
    } catch (error) {
      console.warn('[Gothic Animation] Intersection observer error:', error);
    }
  }

  /**
   * 动画单个元素
   * @param {Element} element
   */
  animateElement(element) {
    try {
      const animateType = element.dataset.animate;
      const staggerDelay = parseInt(element.dataset.stagger, 10) || 0;

      // 根据类型设置不同的动画
      switch (animateType) {
        case 'card':
          this.animateCard(element, staggerDelay);
          break;
        case 'hero':
          this.animateHero(element, staggerDelay);
          break;
        case 'fade':
          this.animateFade(element, staggerDelay);
          break;
        case 'slide':
          this.animateSlide(element, staggerDelay);
          break;
        default:
          // 默认动画：淡入 + 轻微上移
          this.animateFade(element, staggerDelay);
      }
    } catch (error) {
      console.warn('[Gothic Animation] Element animation error:', error);
    }
  }

  /**
   * 卡片动画
   * @param {Element} element
   * @param {number} delay
   */
  animateCard(element, delay = 0) {
    setTimeout(() => {
      element.classList.add(CLASSES.ANIMATE_IN);
    }, delay);
  }

  /**
   * Hero 区域动画
   * @param {Element} element
   * @param {number} delay
   */
  animateHero(element, delay = 0) {
    setTimeout(() => {
      element.classList.add(CLASSES.ANIMATE_HERO_DONE);
    }, delay);
  }

  /**
   * 淡入动画
   * @param {Element} element
   * @param {number} delay
   */
  animateFade(element, delay = 0) {
    setTimeout(() => {
      element.classList.add(CLASSES.ANIMATE_IN);
    }, delay);
  }

  /**
   * 滑动动画
   * @param {Element} element
   * @param {number} delay
   */
  animateSlide(element, delay = 0) {
    setTimeout(() => {
      element.classList.add(CLASSES.ANIMATE_IN);
    }, delay);
  }

  /**
   * 初始化阅读进度条
   * 设计规范：滚动时实时更新进度
   */
  initReadingProgress() {
    try {
      this.progressContainer = $(SELECTORS.PROGRESS_CONTAINER);
      this.progressBar = $(SELECTORS.PROGRESS_BAR);

      // 如果进度条不存在，尝试查找常见类名
      if (!this.progressBar) {
        this.progressBar = document.querySelector('.scroll-progress__bar');
      }

      if (!this.progressBar) {
        console.log('[Gothic Animation] Progress bar not found');
        return;
      }

      // 设置 ARIA 属性
      this.progressBar.setAttribute('role', 'progressbar');
      this.progressBar.setAttribute('aria-valuemin', '0');
      this.progressBar.setAttribute('aria-valuemax', '100');
      this.progressBar.setAttribute('aria-label', '阅读进度');

      // 绑定滚动事件 (使用节流优化性能)
      this._scrollHandler = throttle(() => {
        this.updateProgress();
      }, CONFIG.THROTTLE.SCROLL);

      window.addEventListener('scroll', this._scrollHandler, { passive: true });

      // 初始更新
      this.updateProgress();

      console.log('[Gothic Animation] Reading progress initialized');
    } catch (error) {
      console.warn('[Gothic Animation] Progress bar init error:', error);
    }
  }

  /**
   * 更新进度条
   */
  updateProgress() {
    if (!this.progressBar) return;

    try {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        this.progressBar.style.width = '0%';
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));

      // 使用 CSS 变量更新，提高性能
      this.progressBar.style.setProperty('--progress', `${progress}%`);
      this.progressBar.style.width = `${progress}%`;

      // 更新 ARIA
      this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
    } catch (error) {
      console.warn('[Gothic Animation] Progress update error:', error);
    }
  }

  /**
   * 重新初始化 (SPA 导航后调用)
   */
  reinit() {
    console.log('[Gothic Animation] Reinitializing...');

    try {
      // 清理旧的 observer
      if (this.observer) {
        this.observer.disconnect();
      }

      // 重置已动画元素集合
      this.animatedElements.clear();

      // 重新初始化
      this.initCardAnimation();
      this.initReadingProgress();

      console.log('[Gothic Animation] Reinitialized');
    } catch (error) {
      console.warn('[Gothic Animation] Reinit error:', error);
    }
  }

  /**
   * 销毁模块
   */
  destroy() {
    try {
      // 移除滚动监听
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler);
        this._scrollHandler = null;
      }

      // 断开 observer
      if (this.observer) {
        this.observer.disconnect();
      }

      this.animatedElements.clear();
      this.initialized = false;

      console.log('[Gothic Animation] Animation module destroyed');
    } catch (error) {
      console.warn('[Gothic Animation] Destroy error:', error);
      this.initialized = false;
    }
  }
}

export default Animation;