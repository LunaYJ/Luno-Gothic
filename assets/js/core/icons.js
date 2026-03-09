/**
 * Font Awesome 图标库配置
 * @module core/icons
 * @description 集中管理所有 Font Awesome 图标的导入和注册
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core';

// Free Solid Icons (fas)
import {
  faSearch,
  faBars,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faChevronUp,
  faChevronDown,
  faUser,
  faTag,
  faCalendar,
  faClock,
  faEnvelope,
  faRss,
  faMoon,
  faSun,
  faHeart,
  faShare,
  faLink,
  faCopy,
  faCheck,
  faExclamationCircle,
  faInfoCircle,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

// Free Regular Icons (far)
import {
  faHeart as faHeartRegular,
  faEnvelope as faEnvelopeRegular,
  faUser as faUserRegular,
  faCalendar as faCalendarRegular,
} from '@fortawesome/free-regular-svg-icons';

// Free Brands Icons (fab)
import {
  faGithub,
  faTwitter,
  faXTwitter,
  faBluesky,
  faMastodon,
  faDiscord,
  faTelegram,
  faWeixin,
  faWeibo,
  faBilibili,
  faZhihu,
  faInstagram,
  faYoutube,
  faTiktok,
  faLinkedin,
  faFacebook,
  faReddit,
  faPinterest,
  faDribbble,
  faBehance,
  faFigma,
  faSpotify,
  faApple,
  faGoogle,
  // 注意：RSS 在 free-brands 中没有，使用 solid 版本
} from '@fortawesome/free-brands-svg-icons';

/**
 * 注册图标到库中
 * 在这里添加需要的图标，会自动进行 tree-shaking
 */
library.add(
  // Solid icons
  faSearch,
  faBars,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faChevronUp,
  faChevronDown,
  faUser,
  faTag,
  faCalendar,
  faClock,
  faEnvelope,
  faRss,
  faMoon,
  faSun,
  faHeart,
  faShare,
  faLink,
  faCopy,
  faCheck,
  faExclamationCircle,
  faInfoCircle,
  faWarning,

  // Regular icons
  faHeartRegular,
  faEnvelopeRegular,
  faUserRegular,
  faCalendarRegular,

  // Brand icons
  faGithub,
  faTwitter,
  faXTwitter,
  faBluesky,
  faMastodon,
  faDiscord,
  faTelegram,
  faWeixin,
  faWeibo,
  faBilibili,
  faZhihu,
  faInstagram,
  faYoutube,
  faTiktok,
  faLinkedin,
  faFacebook,
  faReddit,
  faPinterest,
  faDribbble,
  faBehance,
  faFigma,
  faSpotify,
  faApple,
  faGoogle,
);

/**
 * 初始化 Font Awesome
 * 将 HTML 中的 <i> 标签替换为 SVG
 */
export function initIcons() {
  // 自动替换所有带有 data-fa-i2svg 属性的元素
  dom.watch({
    autoReplaceSvgRoot: document.body,
    observeMutations: true,
  });
}

/**
 * 手动刷新图标（在动态内容加载后调用）
 */
export function refreshIcons() {
  dom.i2svg();
}

/**
 * 导出常用图标名称映射，方便模板使用
 */
export const ICONS = {
  // 导航相关
  MENU: 'bars',
  CLOSE: 'times',
  SEARCH: 'search',
  ARROW_LEFT: 'arrow-left',
  ARROW_RIGHT: 'arrow-right',
  CHEVRON_UP: 'chevron-up',
  CHEVRON_DOWN: 'chevron-down',

  // 用户相关
  USER: 'user',
  USER_SOLID: 'user',
  USER_REGULAR: ['far', 'user'],

  // 内容相关
  TAG: 'tag',
  CALENDAR: 'calendar',
  CALENDAR_REGULAR: ['far', 'calendar'],
  CLOCK: 'clock',
  ENVELOPE: 'envelope',
  ENVELOPE_REGULAR: ['far', 'envelope'],
  RSS: 'rss',

  // 主题相关
  MOON: 'moon',
  SUN: 'sun',

  // 互动相关
  HEART: 'heart',
  HEART_REGULAR: ['far', 'heart'],
  SHARE: 'share',
  LINK: 'link',
  COPY: 'copy',
  CHECK: 'check',

  // 状态相关
  ERROR: 'exclamation-circle',
  INFO: 'info-circle',
  WARNING: 'warning',
};

/**
 * 社交媒体品牌图标映射
 */
export const BRAND_ICONS = {
  GITHUB: ['fab', 'github'],
  TWITTER: ['fab', 'twitter'],
  XTWITTER: ['fab', 'x-twitter'],
  BLUESKY: ['fab', 'bluesky'],
  MASTODON: ['fab', 'mastodon'],
  DISCORD: ['fab', 'discord'],
  TELEGRAM: ['fab', 'telegram'],
  WEIXIN: ['fab', 'weixin'],
  WEIBO: ['fab', 'weibo'],
  BILIBILI: ['fab', 'bilibili'],
  ZHIHU: ['fab', 'zhihu'],
  INSTAGRAM: ['fab', 'instagram'],
  YOUTUBE: ['fab', 'youtube'],
  TIKTOK: ['fab', 'tiktok'],
  LINKEDIN: ['fab', 'linkedin'],
  FACEBOOK: ['fab', 'facebook'],
  REDDIT: ['fab', 'reddit'],
  PINTEREST: ['fab', 'pinterest'],
  DRIBBBLE: ['fab', 'dribbble'],
  BEHANCE: ['fab', 'behance'],
  FIGMA: ['fab', 'figma'],
  SPOTIFY: ['fab', 'spotify'],
  APPLE: ['fab', 'apple'],
  GOOGLE: ['fab', 'google'],
  // RSS 使用 solid 版本
  RSS: 'rss',
};

export default {
  initIcons,
  refreshIcons,
  ICONS,
  BRAND_ICONS,
};
