/**
 * Gothic Theme - Form Module
 * 表单处理：Newsletter 订阅
 */

import { SELECTORS, CLASSES, ATTRIBUTES, CONFIG } from '../core/constants.js';
import { showNotification, debounce } from '../core/utils.js';

class Form {
  constructor() {
    this.forms = [];
    this.initialized = false;
  }

  /**
   * 初始化表单模块
   */
  init() {
    if (this.initialized) return;

    // 查找所有订阅表单
    const subscribeForms = document.querySelectorAll(SELECTORS.FORM_SUBSCRIBE);

    if (subscribeForms.length === 0) {
      console.log('[Gothic Form] No subscribe forms found');
      return;
    }

    subscribeForms.forEach(form => {
      this.initForm(form);
    });

    this.initialized = true;
    console.log('[Gothic Form] Form module initialized');
  }

  /**
   * 初始化单个表单
   * @param {Element} form
   */
  initForm(form) {
    const emailInput = form.querySelector(SELECTORS.INPUT_EMAIL);
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!emailInput || !submitBtn) return;

    // 绑定事件
    this.bindFormEvents(form, emailInput, submitBtn);

    // 添加唯一标识
    form.dataset.formId = `form-${Date.now()}`;
  }

  /**
   * 绑定表单事件
   * @param {Element} form
   * @param {Element} emailInput
   * @param {Element} submitBtn
   */
  bindFormEvents(form, emailInput, submitBtn) {
    // 输入框焦点状态
    emailInput.addEventListener('focus', () => {
      emailInput.classList.add(CLASSES.INPUT_FOCUS);
    });

    emailInput.addEventListener('blur', () => {
      emailInput.classList.remove(CLASSES.INPUT_FOCUS);
    });

    // 实时验证
    const handleInput = debounce(() => {
      this.validateField(emailInput);
    }, 200);

    emailInput.addEventListener('input', handleInput);

    // 表单提交
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit(form, emailInput, submitBtn);
    });

    // 回车提交
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    });
  }

  /**
   * 验证单个字段
   * @param {Element} input
   * @returns {boolean}
   */
  validateField(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    // 清空之前的错误
    this.clearFieldError(input);

    // 必填验证
    if (isRequired && !value) {
      isValid = false;
      errorMessage = '此字段为必填项';
    }

    // 邮箱格式验证
    if (value && type === 'email' && !this.validateEmail(value)) {
      isValid = false;
      errorMessage = '请输入有效的邮箱地址';
    }

    // 显示错误
    if (!isValid) {
      this.showFieldError(input, errorMessage);
    }

    return isValid;
  }

  /**
   * 验证邮箱格式
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * 显示字段错误
   * @param {Element} input
   * @param {string} message
   */
  showFieldError(input, message) {
    input.classList.add(CLASSES.FORM_ERROR);

    // 创建错误提示元素
    let errorEl = input.parentElement.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.setAttribute('role', 'alert');
      input.parentElement.appendChild(errorEl);
    }

    errorEl.textContent = message;
  }

  /**
   * 清除字段错误
   * @param {Element} input
   */
  clearFieldError(input) {
    input.classList.remove(CLASSES.FORM_ERROR);
    const errorEl = input.parentElement?.querySelector('.field-error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  /**
   * 处理表单提交
   * @param {Element} form
   * @param {Element} emailInput
   * @param {Element} submitBtn
   */
  async handleSubmit(form, emailInput, submitBtn) {
    const email = emailInput.value.trim();

    // 验证
    if (!this.validateField(emailInput)) {
      emailInput.focus();
      return;
    }

    // 禁用提交按钮
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    form.classList.add(CLASSES.FORM_SUBMITTING);

    try {
      // 发送到 Ghost 订阅 API
      await this.subscribeToGhost(email, form);

      // 显示成功
      this.showSuccess(form, '订阅成功！请检查邮箱确认。');

      // 清空输入
      emailInput.value = '';

    } catch (error) {
      console.error('[Gothic Form] Subscribe error:', error);

      // 显示错误
      this.showFormError(form, error.message || '订阅失败，请稍后重试。');
    } finally {
      // 恢复按钮
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.classList.remove(CLASSES.FORM_SUBMITTING);
    }
  }

  /**
   * 订阅到 Ghost
   * @param {string} email
   * @param {Element} form
   */
  async subscribeToGhost(email, form) {
    // 获取 Ghost API 端点
    const endpoint = form.dataset.endpoint || '/ghost/api/admin/members/';

    // 获取 API Key (通常在 theme settings 中配置)
    const apiKey = form.dataset.apiKey || this.getGhostApiKey();

    if (!apiKey) {
      // 使用前端订阅端点（如果有的话）
      return this.subscribeFrontend(email, form);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Ghost ${apiKey}`
      },
      body: JSON.stringify({
        members: [{ email }]
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.errors?.[0]?.message || '订阅失败');
    }

    return response.json();
  }

  /**
   * 前端订阅（无 API Key 时使用）
   * @param {string} email
   * @param {Element} form
   */
  async subscribeFrontend(email, form) {
    const actionUrl = form.action || window.location.href;

    // 使用表单提交方式
    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch(actionUrl, {
      method: 'POST',
      body: formData
    });

    // 如果不是成功响应，尝试获取错误信息
    if (!response.ok) {
      // Ghost 会员订阅成功返回 200 或 201
      // 如果是重定向，也视为成功
      if (response.redirected) return;

      const errorText = await response.text().catch(() => '');

      // 解析错误
      if (errorText.includes('already subscribed')) {
        throw new Error('此邮箱已订阅');
      }

      throw new Error('订阅失败，请稍后重试');
    }

    return true;
  }

  /**
   * 获取 Ghost API Key
   * @returns {string|null}
   */
  getGhostApiKey() {
    // 从 data 属性获取
    const form = document.querySelector(SELECTORS.FORM_SUBSCRIBE);
    if (form?.dataset.apiKey) {
      return form.dataset.apiKey;
    }

    // 从全局配置获取
    if (window.GothicConfig?.ghostApiKey) {
      return window.GhostConfig.ghostApiKey;
    }

    return null;
  }

  /**
   * 显示表单错误
   * @param {Element} form
   * @param {string} message
   */
  showFormError(form, message) {
    // 移除旧错误
    const oldError = form.querySelector(SELECTORS.FORM_ERROR);
    if (oldError) oldError.remove();

    // 创建新错误
    const errorEl = document.createElement('div');
    errorEl.className = 'form-notification form-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;

    form.insertBefore(errorEl, form.firstChild);

    // 显示通知
    showNotification(message, 'error');
  }

  /**
   * 显示成功消息
   * @param {Element} form
   * @param {string} message
   */
  showSuccess(form, message) {
    // 移除旧消息
    const oldSuccess = form.querySelector(SELECTORS.FORM_SUCCESS);
    if (oldSuccess) oldSuccess.remove();

    // 创建新消息
    const successEl = document.createElement('div');
    successEl.className = 'form-notification form-success';
    successEl.setAttribute('role', 'status');
    successEl.textContent = message;

    form.insertBefore(successEl, form.firstChild);

    // 显示通知
    showNotification(message, 'success');

    // 3 秒后移除
    setTimeout(() => {
      successEl.remove();
    }, 5000);
  }

  /**
   * 销毁模块
   */
  destroy() {
    this.forms = [];
    this.initialized = false;
    console.log('[Gothic Form] Form module destroyed');
  }
}

export default Form;