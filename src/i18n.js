// i18n 文案 — 中英双语
// 注意：此文件在 React 之前加载，所以需要延迟引用 React（函数内再访问）
(function(global) {
  const I18N = {
    zh: {
      nav: {
        home: '首页',
        works: '作品',
        resources: '资源',
        contact: '联系',
        homeEn: 'Home',
        worksEn: 'Works',
        resourcesEn: 'Resources',
        contactEn: 'Contact',
      },
      home: {
        titleLine1: 'Designing with',
        titleLine2: 'lines & silence.',
        intro: '独立设计师 / 视觉创作者。\n以线条与留白为语言，记录作品、收藏资源、探索边界。',
        viewWorks: '查看作品',
        getInTouch: '取得联系',
        tagline: 'Available for freelance',
      },
      works: {
        title: '作品',
        en: 'Selected Works',
        tabImage: '图片作品',
        tabVideo: '视频作品',
        tabCode: '编程作品',
        liveDemo: '在线演示',
        sourceCode: '源码',
        category: '分类',
      },
      resources: {
        title: '资源',
        en: 'Resource Archive',
      },
      contact: {
        title: '联系',
        en: 'Get in Touch',
        headline1: "Let's talk",
        headline2: 'about lines.',
        intro: '专注于视觉设计与交互体验，以线条与留白构建叙事。\n欢迎通过以下方式与我取得联系，\n合作邀约、项目咨询或只是打个招呼都可以。',
        tagline: 'Available for freelance',
        copyHint: '点击微信行可复制微信号',
        copied: '✓ 微信号已复制到剪贴板',
      },
      footer: {
        built: 'Designed & built with lines.',
      },
    },
    en: {
      nav: {
        home: 'Home',
        works: 'Works',
        resources: 'Resources',
        contact: 'Contact',
        homeEn: '01',
        worksEn: '02',
        resourcesEn: '03',
        contactEn: '04',
      },
      home: {
        titleLine1: 'Designing with',
        titleLine2: 'lines & silence.',
        intro: 'Independent designer and visual creator.\nRecording works, curating resources, exploring boundaries\nthrough lines and negative space.',
        viewWorks: 'View Works',
        getInTouch: 'Get in Touch',
        tagline: 'Available for freelance',
      },
      works: {
        title: 'Works',
        en: 'Selected Works',
        tabImage: 'Images',
        tabVideo: 'Videos',
        tabCode: 'Code',
        liveDemo: 'Live Demo',
        sourceCode: 'Source',
        category: 'Category',
      },
      resources: {
        title: 'Resources',
        en: 'Resource Archive',
      },
      contact: {
        title: 'Contact',
        en: 'Get in Touch',
        headline1: "Let's talk",
        headline2: 'about lines.',
        intro: 'Focused on visual design and interactive experiences,\nweaving narratives through lines and whitespace.\nFeel free to reach out for collaborations,\nproject inquiries, or just to say hello.',
        tagline: 'Available for freelance',
        copyHint: 'Click WeChat row to copy ID',
        copied: '✓ WeChat ID copied to clipboard',
      },
      footer: {
        built: 'Designed & built with lines.',
      },
    },
  }

  // 语言上下文 — 延迟使用 React，确保 React 已加载
  let _React = null
  function getReact() {
    if (!_React) {
      if (typeof React !== 'undefined') _React = React
      else throw new Error('React not loaded before I18nProvider was used')
    }
    return _React
  }

  function I18nProvider({ children }) {
    const R = getReact()
    const { useState, useEffect, createContext, useContext } = R

    // 用懒初始化的方式创建 context（首次 Provider 使用时）
    if (!global.I18nContext) {
      global.I18nContext = R.createContext(null)
    }

    const [lang, setLang] = useState(() => {
      try {
        return localStorage.getItem('lang') || 'zh'
      } catch (e) { return 'zh' }
    })

    useEffect(() => {
      try { localStorage.setItem('lang', lang) } catch (e) {}
    }, [lang])

    const t = (key) => {
      const parts = key.split('.')
      let obj = I18N[lang]
      for (const p of parts) {
        if (obj == null) return key
        obj = obj[p]
      }
      return obj == null ? key : obj
    }

    const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh')

    return R.createElement(global.I18nContext.Provider, { value: { lang, setLang, toggleLang, t } }, children)
  }

  function useI18n() {
    const R = getReact()
    return R.useContext(global.I18nContext)
  }

  global.I18nProvider = I18nProvider
  global.useI18n = useI18n
  global.I18N_DATA = I18N
  // I18nContext 会在首次调用 I18nProvider 时创建
  global.I18nContext = null
})(window)
