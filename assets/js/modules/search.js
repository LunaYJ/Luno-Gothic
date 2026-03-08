/**
 * Gothic Theme - Search Module
 * 搜索功能：弹窗、输入、结果显示
 */

import { SELECTORS, CLASSES, ATTRIBUTES, CONFIG } from '../core/constants.js';
import { debounce, throttle, $, $$, showNotification } from '../core/utils.js';

class Search {
  constructor() {
    this.trigger = null;
    this.panel = null;
    this.input = null;
    this.closeBtn = null;
    this.results = null;
    this.isOpen = false;
    this.initialized = false;
  }

  /**
   * 初始化搜索模块
   */
  init() {
    if (this.initialized) return;

    try {
      // 主选择器
      this.trigger = $(SELECTORS.SEARCH_TRIGGER);
      this.panel = $(SELECTORS.SEARCH_PANEL);
      this.input = $(SELECTORS.SEARCH_INPUT);
      this.closeBtn = $(SELECTORS.SEARCH_CLOSE);
      this.results = $(SELECTORS.SEARCH_RESULTS);

      // 回退选择器
      if (!this.trigger) {
        this.trigger = $('#btn-search, .btn-search, [data-search-trigger]');
      }
      if (!this.panel) {
        this.panel = $('#search-overlay, .search-overlay, [data-search-panel]');
      }
      if (!this.input) {
        this.input = $('#search-input, .search-input, [data-search-input]');
      }
      if (!this.closeBtn) {
        this.closeBtn = $('#search-close, .search-close, [data-search-close]');
      }
      if (!this.results) {
        this.results = $('#search-results, .search-results, [data-search-results]');
      }

      // 回退：查找遮罩层
      let backdrop = $(SELECTORS.SEARCH_BACKDROP);
      if (!backdrop) {
        backdrop = document.querySelector('.search-backdrop');
      }

      if (!this.trigger || !this.panel) {
        console.log('[Gothic Search] Search elements not found');
        return;
      }

      this.bindEvents(backdrop);
      this.initialized = true;

      console.log('[Gothic Search] Search module initialized');
    } catch (error) {
      console.error('[Gothic Search] Init error:', error);
    }
  }

  /**
   * 绑定事件
   * @param {Element|null} backdrop
   */
  bindEvents(backdrop) {
    // 打开搜索
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // 关闭搜索
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // 点击遮罩关闭
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    } else if (this.panel) {
      this.panel.addEventListener('click', (e) => {
        if (e.target === this.panel) {
          this.close();
        }
      });
    }

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // 输入搜索 (防抖)
    if (this.input) {
      const handleInput = debounce((e) => {
        this.performSearch(e.target.value);
      }, 300);

      this.input.addEventListener('input', handleInput);
    }

    // 搜索框聚焦
    this.input?.addEventListener('focus', () => {
      this.input.classList.add(CLASSES.INPUT_FOCUS);
    });

    this.input?.addEventListener('blur', () => {
      this.input.classList.remove(CLASSES.INPUT_FOCUS);
    });
  }

  /**
   * 切换搜索面板
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * 打开搜索面板
   */
  open() {
    this.isOpen = true;
    document.body.classList.add(CLASSES.SEARCH_OPEN);
    this.trigger?.setAttribute(ATTRIBUTES.ARIA_EXPANDED, 'true');
    this.panel?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'false');

    // 聚焦输入框
    setTimeout(() => {
      this.input?.focus();
    }, 100);
  }

  /**
   * 关闭搜索面板
   */
  close() {
    this.isOpen = false;
    document.body.classList.remove(CLASSES.SEARCH_OPEN);
    this.trigger?.setAttribute(ATTRIBUTES.ARIA_EXPANDED, 'false');
    this.panel?.setAttribute(ATTRIBUTES.ARIA_HIDDEN, 'true');

    // 清空输入
    if (this.input) {
      this.input.value = '';
    }

    // 清空结果
    this.clearResults();
  }

  /**
   * 执行搜索
   * @param {string} query - 搜索关键词
   */
  async performSearch(query) {
    if (!query || query.trim().length < 2) {
      this.clearResults();
      return;
    }

    // 显示加载状态
    this.showLoading();

    try {
      // Ghost 搜索 API
      const results = await this.searchGhost(query);
      this.displayResults(results, query);
    } catch (error) {
      console.error('[Gothic Search] Search error:', error);
      this.showError('搜索失败，请稍后重试');
    }
  }

  /**
   * Ghost 搜索 API
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchGhost(query) {
    // 检查是否使用 Ghost 官方搜索或自定义搜索
    const ghostSearchEl = document.querySelector('[data-ghost-search]');

    if (ghostSearchEl) {
      // 使用 Ghost 官方搜索
      return this.ghostOfficialSearch(query);
    }

    // 默认：使用本地搜索（模拟）
    return this.localSearch(query);
  }

  /**
   * Ghost 官方搜索
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async ghostOfficialSearch(query) {
    const response = await fetch(`/ghost/api/admin/posts/?include=tags&filter=title:~${encodeURIComponent(query)}&limit=10`);

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    return data.posts || [];
  }

  /**
   * 本地搜索（基于页面内容）
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async localSearch(query) {
    // 获取所有文章链接
    const postLinks = $$('.post-card a, .article-title a');
    const results = [];

    for (const link of postLinks) {
      const title = link.textContent.toLowerCase();
      const href = link.getAttribute('href');

      if (title.includes(query.toLowerCase())) {
        const card = link.closest('.post-card, .article-card');
        const meta = card?.querySelector('.post-meta, .article-meta')?.textContent || '';

        results.push({
          title: link.textContent,
          url: href,
          meta: meta
        });
      }
    }

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    return results;
  }

  /**
   * 显示搜索结果
   * @param {Array} results
   * @param {string} query
   */
  displayResults(results, query) {
    if (!this.results) return;

    if (results.length === 0) {
      this.results.innerHTML = `
        <div class="search-no-results">
          <p>未找到与 "${query}" 相关的内容</p>
        </div>
      `;
      return;
    }

    const html = results.map(result => `
      <a href="${result.url}" class="search-result-item">
        <span class="search-result-title">${result.title}</span>
        ${result.meta ? `<span class="search-result-meta">${result.meta}</span>` : ''}
      </a>
    `).join('');

    this.results.innerHTML = html;
  }

  /**
   * 显示加载状态
   */
  showLoading() {
    if (!this.results) return;
    this.results.innerHTML = `
      <div class="search-loading">
        <span>搜索中...</span>
      </div>
    `;
  }

  /**
   * 显示错误
   * @param {string} message
   */
  showError(message) {
    if (!this.results) return;
    this.results.innerHTML = `
      <div class="search-error">
        <p>${message}</p>
      </div>
    `;
  }

  /**
   * 清空搜索结果
   */
  clearResults() {
    if (this.results) {
      this.results.innerHTML = '';
    }
  }

  /**
   * 销毁模块
   */
  destroy() {
    this.close();
    this.initialized = false;
    console.log('[Gothic Search] Search module destroyed');
  }
}

export default Search;