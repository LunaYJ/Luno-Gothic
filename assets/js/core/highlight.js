/**
 * Highlight.js 代码高亮配置
 * @module core/highlight
 * @description 代码语法高亮初始化
 */

import hljs from 'highlight.js/lib/core';

// 只导入最常用的语言（减小打包体积）
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';

// 注册语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('sass', scss);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('sql', sql);

/**
 * 初始化代码高亮
 */
export function initHighlight() {
  // 高亮所有代码块
  hljs.highlightAll();
}

/**
 * 手动高亮指定元素
 * @param {HTMLElement} element - 要高亮的代码元素
 */
export function highlightElement(element) {
  hljs.highlightElement(element);
}

/**
 * 高亮动态加载的代码块
 * 在 AJAX 加载内容后调用
 */
export function highlightNewBlocks(container = document) {
  const blocks = container.querySelectorAll('pre code:not(.hljs)');
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
}

export default {
  initHighlight,
  highlightElement,
  highlightNewBlocks,
  hljs,
};
