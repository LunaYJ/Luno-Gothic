/**
 * Gothic Theme - Utilities
 * 工具函数集合
 */

import { CONFIG } from './constants.js';

/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, delay = CONFIG.THROTTLE.SCROLL) {
  let lastTime = 0;
  let timerId = null;

  const throttled = function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);

    if (remaining <= 0 || remaining > delay) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timerId) {
      timerId = setTimeout(() => {
        lastTime = Date.now();
        timerId = null;
        fn.apply(this, args);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return throttled;
}

/**
 * 防抖函数 - 延迟执行，等待停止触发
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = CONFIG.THROTTLE.INPUT) {
  let timerId = null;

  const debounced = function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}

/**
 * 一次性函数 - 只执行一次
 * @param {Function} fn - 要执行的函数
 * @returns {Function} 只执行一次的函数
 */
export function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

/**
 * 深度查询选择器
 * @param {string} selector - CSS 选择器
 * @param {Element|Document} context - 查找上下文
 * @returns {Element|null} 找到的元素或 null
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * 查询所有匹配的元素
 * @param {string} selector - CSS 选择器
 * @param {Element|Document} context - 查找上下文
 * @returns {Element[]} 找到的元素数组
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * 检查元素是否在视口内
 * @param {Element} element - 要检查的元素
 * @param {number} threshold - 触发阈值 (0-1)
 * @returns {boolean} 是否在视口内
 */
export function isInViewport(element, threshold = 0) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.bottom > windowHeight * threshold &&
    rect.top < windowHeight * (1 - threshold) &&
    rect.right > windowWidth * threshold &&
    rect.left < windowWidth * (1 - threshold)
  );
}

/**
 * 获取滚动进度 (0-100)
 * @returns {number} 滚动进度百分比
 */
export function getScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) return 0;

  const progress = (scrollTop / docHeight) * 100;
  return Math.min(100, Math.max(0, progress));
}

/**
 * 检查是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * 检查是否为触屏设备
 * @returns {boolean} 是否为触屏设备
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 添加事件监听器，支持 passive 选项
 * @param {Element} element - 目标元素
 * @param {string} event - 事件名称
 * @param {Function} handler - 事件处理函数
 * @param {Object} options - 选项
 */
export function addEvent(element, event, handler, options = {}) {
  const passive = options.passive !== undefined ? options.passive : false;
  const capture = options.capture || false;

  element.addEventListener(event, handler, { passive, capture });
}

/**
 * 移除事件监听器
 * @param {Element} element - 目标元素
 * @param {string} event - 事件名称
 * @param {Function} handler - 事件处理函数
 * @param {Object} options - 选项
 */
export function removeEvent(element, event, handler, options = {}) {
  element.removeEventListener(event, handler, options);
}

/**
 * 创建并显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success/error/info)
 * @param {number} duration - 显示时长(ms)
 */
export function showNotification(message, type = 'info', duration = 4000) {
  // 移除已存在的通知
  const existing = document.querySelector('.gothic-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `gothic-notification notification-${type}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.textContent = message;

  // 添加样式
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '16px 24px',
    background: type === 'error' ? '#8B0000' : type === 'success' ? '#1a3d1a' : '#2a2a2a',
    color: '#F4EFE3',
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '18px',
    borderRadius: '4px',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'opacity 300ms ease, transform 300ms ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
  });

  document.body.appendChild(notification);

  // 触发动画
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  });

  // 自动移除
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * 等待指定时间
 * @param {number} ms - 毫秒
 * @returns {Promise} Promise
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 查找最近的可滚动父元素
 * @param {Element} element - 起始元素
 * @returns {Element|null} 可滚动父元素或 null
 */
export function getScrollableParent(element) {
  let parent = element.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);
    const overflowY = style.overflowY;
    const overflowX = style.overflowX;

    if (overflowY === 'auto' || overflowY === 'scroll' || overflowX === 'auto' || overflowX === 'scroll') {
      return parent;
    }

    parent = parent.parentElement;
  }

  return document.documentElement;
}

/**
 * 平滑滚动到元素
 * @param {Element|string} target - 目标元素或选择器
 * @param {Object} options - 滚动选项
 */
export function smoothScrollTo(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) return;

  const offset = options.offset || 0;
  const duration = options.duration || 300;
  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + startPosition - offset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animationStep(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animationStep);
}

export default {
  throttle,
  debounce,
  once,
  $,
  $$,
  isInViewport,
  getScrollProgress,
  isMobile,
  isTouchDevice,
  addEvent,
  removeEvent,
  showNotification,
  wait,
  getScrollableParent,
  smoothScrollTo
};