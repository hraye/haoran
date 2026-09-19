const { useState, useEffect, useRef, Component } = React
const { HashRouter, Routes, Route, NavLink, useLocation } = SimpleRouter
const { useI18n, I18nProvider, I18nContext } = window
const { useTheme, ThemeProvider, ThemeContext } = window

/* ============================================================
   数据层 — 所有作品、资源数据统一用数组存储
   ============================================================ */

const imageWorks = [
  {
    id: 'img-01',
    title: { zh: '静谧之境 01', en: 'Silent Realm 01' },
    category: { zh: '摄影 / 静物', en: 'Photography / Still' },
    year: '2024',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=70',
    desc: {
      zh: '山间清晨，雾气与光线交织的一瞬。',
      en: 'A moment where mist and light intertwine at dawn in the mountains.',
    },
  },
  {
    id: 'img-02',
    title: { zh: '城市线条 02', en: 'Urban Lines 02' },
    category: { zh: '建筑 / 几何', en: 'Architecture / Geometry' },
    year: '2024',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=70',
    desc: {
      zh: '现代建筑的几何构成与光影关系。',
      en: 'Geometric composition and light-shadow relationships of modern architecture.',
    },
  },
  {
    id: 'img-03',
    title: { zh: '白 03', en: 'White 03' },
    category: { zh: '极简 / 材质', en: 'Minimal / Material' },
    year: '2023',
    src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&q=70',
    desc: {
      zh: '白色调下的材质实验与空间感受。',
      en: 'Material experiments and spatial sensations in white tones.',
    },
  },
  {
    id: 'img-04',
    title: { zh: '海岸线 04', en: 'Coastline 04' },
    category: { zh: '风光 / 长曝光', en: 'Landscape / Long Exposure' },
    year: '2023',
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=70',
    desc: {
      zh: '潮水退去后的海岸线纹理。',
      en: 'The texture of the coastline after the tide recedes.',
    },
  },
  {
    id: 'img-05',
    title: { zh: '结构 05', en: 'Structure 05' },
    category: { zh: '建筑 / 线条', en: 'Architecture / Lines' },
    year: '2024',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=70',
    desc: {
      zh: '室内空间的线条节奏与秩序。',
      en: 'Rhythm and order of lines in interior spaces.',
    },
  },
  {
    id: 'img-06',
    title: { zh: '夜 06', en: 'Night 06' },
    category: { zh: '夜景 / 光影', en: 'Nightscape / Light' },
    year: '2023',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=70',
    desc: {
      zh: '夜色中山峰的轮廓与星空。',
      en: 'Mountain silhouettes and starry sky in the night.',
    },
  },
]

const videoWorks = [
  {
    id: 'vid-01',
    title: { zh: '流动的城市', en: 'Flowing City' },
    category: { zh: '短片 / 延时', en: 'Short Film / Timelapse' },
    year: '2024',
    duration: '02:30',
    poster: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=70',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'vid-02',
    title: { zh: '静物实验', en: 'Still Life Experiment' },
    category: { zh: '实验 / 微距', en: 'Experimental / Macro' },
    year: '2024',
    duration: '01:45',
    poster: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&q=70',
    src: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 'vid-03',
    title: { zh: '行走的光', en: 'Walking Light' },
    category: { zh: '纪录 / 光影', en: 'Documentary / Light' },
    year: '2023',
    duration: '03:12',
    poster: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=70',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'vid-04',
    title: { zh: '海的呼吸', en: 'Breath of the Sea' },
    category: { zh: '自然 / 慢镜头', en: 'Nature / Slow Motion' },
    year: '2023',
    duration: '02:08',
    poster: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=70',
    src: 'https://www.w3schools.com/html/movie.mp4',
  },
]

const codeWorks = [
  {
    id: 'code-01',
    title: { zh: '线条生成器', en: 'Line Generator' },
    desc: {
      zh: '基于 Canvas 的参数化线条生成工具，可导出 SVG。',
      en: 'A Canvas-based parametric line generation tool with SVG export.',
    },
    tags: ['Canvas', 'JavaScript', 'SVG', 'Creative Coding'],
    demo: 'https://codepen.io',
    source: 'https://github.com',
    year: '2024',
    accent: 'cross',
  },
  {
    id: 'code-02',
    title: { zh: '极简待办', en: 'Minimal Todo' },
    desc: {
      zh: '纯键盘操作的命令行式待办应用，本地存储。',
      en: 'A keyboard-only command-line style todo app with local storage.',
    },
    tags: ['React', 'TypeScript', 'LocalStorage'],
    demo: 'https://example.com',
    source: 'https://github.com',
    year: '2024',
    accent: 'circle',
  },
  {
    id: 'code-03',
    title: { zh: '天气数据可视化', en: 'Weather Data Viz' },
    desc: {
      zh: '用 SVG 线条语言呈现一年天气数据的信息可视化。',
      en: 'An information visualization of one year of weather data in SVG line language.',
    },
    tags: ['D3.js', 'SVG', 'Data Viz', 'API'],
    demo: 'https://observablehq.com',
    source: 'https://github.com',
    year: '2023',
    accent: 'grid',
  },
  {
    id: 'code-04',
    title: { zh: '字体标本', en: 'Type Specimen',
    },
    desc: {
      zh: '可变字体交互式标本页，探索字重与字宽的边界。',
      en: 'An interactive variable font specimen exploring weight and width boundaries.',
    },
    tags: ['CSS', 'Variable Fonts', 'Animation'],
    demo: 'https://typetheweb.com',
    source: 'https://github.com',
    year: '2023',
    accent: 'line',
  },
  {
    id: 'code-05',
    title: { zh: '音频可视化器', en: 'Audio Visualizer' },
    desc: {
      zh: '实时音频分析驱动的几何线条动画。',
      en: 'Geometric line animation driven by real-time audio analysis.',
    },
    tags: ['Web Audio API', 'Three.js', 'WebGL'],
    demo: 'https://example.com',
    source: 'https://github.com',
    year: '2024',
    accent: 'wave',
  },
  {
    id: 'code-06',
    title: { zh: '书签管理器', en: 'Bookmark Manager' },
    desc: {
      zh: '极简风格浏览器扩展，标签式管理收藏链接。',
      en: 'A minimal browser extension for managing bookmarks with tags.',
    },
    tags: ['Chrome Extension', 'Vanilla JS', 'IndexedDB'],
    demo: '#',
    source: 'https://github.com',
    year: '2023',
    accent: 'dots',
  },
]

const resourceGroups = [
  {
    id: 'res-01',
    title: { zh: '设计工具集', en: 'Design Toolkit' },
    desc: {
      zh: '日常使用的设计软件、插件与效率工具清单。',
      en: 'A list of design software, plugins and productivity tools for daily use.',
    },
    items: [
      { name: { zh: 'Figma 资源社区', en: 'Figma Community' }, url: 'https://figma.com/community' },
      { name: { zh: '字体收藏', en: 'Font Collection' }, url: 'https://fonts.google.com' },
      { name: { zh: '色彩参考库', en: 'Color Reference' }, url: 'https://coolors.co' },
      { name: { zh: '灵感收藏夹', en: 'Inspiration Bookmarks' }, url: 'https://dribbble.com' },
    ],
  },
  {
    id: 'res-02',
    title: { zh: '学习与阅读', en: 'Learning & Reading' },
    desc: {
      zh: '书单、课程与长期关注的文章来源。',
      en: 'Books, courses and long-followed article sources.',
    },
    items: [
      { name: { zh: '设计书籍推荐', en: 'Design Book Recommendations' }, url: 'https://www.goodreads.com' },
      { name: { zh: '在线课程列表', en: 'Online Courses' }, url: 'https://www.coursera.org' },
      { name: { zh: '每周必读周刊', en: 'Weekly Newsletter' }, url: 'https://mailchimp.com' },
    ],
  },
  {
    id: 'res-03',
    title: { zh: '素材与图库', en: 'Assets & Stock' },
    desc: {
      zh: '高质量无版权图片、视频与音频素材站。',
      en: 'High-quality royalty-free image, video and audio asset sites.',
    },
    items: [
      { name: { zh: 'Unsplash 高清图库', en: 'Unsplash Stock Photos' }, url: 'https://unsplash.com' },
      { name: { zh: 'Pexels 视频素材', en: 'Pexels Stock Videos' }, url: 'https://www.pexels.com/videos' },
      { name: { zh: 'Freepik 矢量素材', en: 'Freepik Vectors' }, url: 'https://www.freepik.com' },
      { name: { zh: 'Iconfont 图标库', en: 'Iconfont Library' }, url: 'https://www.iconfont.cn' },
    ],
  },
  {
    id: 'res-04',
    title: { zh: '开发备忘', en: 'Dev Cheatsheet' },
    desc: {
      zh: '常用代码片段、文档与调试工具速查。',
      en: 'Quick reference for common code snippets, docs and debugging tools.',
    },
    items: [
      { name: { zh: 'MDN Web 文档', en: 'MDN Web Docs' }, url: 'https://developer.mozilla.org' },
      { name: { zh: 'Tailwind 速查', en: 'Tailwind Cheatsheet' }, url: 'https://tailwindcss.com' },
      { name: { zh: 'CodePen 收藏', en: 'CodePen Collection' }, url: 'https://codepen.io' },
    ],
  },
  {
    id: 'res-05',
    title: { zh: '模板预留', en: 'Reserved Template' },
    desc: { zh: '待补充的第五组资源分类。', en: 'Fifth resource group to be filled.' },
    items: [
      { name: { zh: '待添加链接一', en: 'To be added 1' }, url: '#' },
      { name: { zh: '待添加链接二', en: 'To be added 2' }, url: '#' },
    ],
  },
  {
    id: 'res-06',
    title: { zh: '模板预留', en: 'Reserved Template' },
    desc: { zh: '待补充的第六组资源分类。', en: 'Sixth resource group to be filled.' },
    items: [
      { name: { zh: '待添加链接一', en: 'To be added 1' }, url: '#' },
      { name: { zh: '待添加链接二', en: 'To be added 2' }, url: '#' },
    ],
  },
]

const contactInfo = {
  name: { zh: 'Lin · 独立设计师', en: 'Lin · Independent Designer' },
  intro: {
    zh: '专注于视觉设计与交互体验，以线条与留白构建叙事。',
    en: 'Focused on visual design and interactive experiences, weaving narratives through lines and whitespace.',
  },
  items: [
    { label: 'Email', value: 'hello@line.studio', href: 'mailto:hello@line.studio' },
    { label: 'WeChat', value: 'line_studio', href: '#' },
    { label: 'Instagram', value: '@line.studio', href: 'https://instagram.com' },
    { label: 'Behance', value: 'line-studio', href: 'https://behance.net' },
    { label: 'GitHub', value: 'line-studio', href: 'https://github.com' },
  ],
}

/* ============================================================
   通用组件
   ============================================================ */

function PageWrap({ children, className = '' }) {
  return (
    <div className={`page-enter min-h-[70vh] ${className}`}>
      {children}
    </div>
  )
}

function PageHeader({ num, titleKey, enKey }) {
  const { t, lang } = useI18n()
  return (
    <div className="flex items-baseline gap-6 mb-16 md:mb-24">
      <span className="font-display text-ink text-4xl md:text-5xl italic opacity-20">{num}</span>
      <div className="flex-1 flex items-center gap-4">
        <h1 className="text-xl md:text-2xl font-normal tracking-wide2">{t(titleKey)}</h1>
        <div className="flex-1 h-px bg-line"></div>
        <span className="hidden md:inline text-xs text-muted tracking-wide3 uppercase">{t(enKey)}</span>
      </div>
    </div>
  )
}

// 编程作品卡片上的装饰图形
function CodeAccent({ type }) {
  const stroke = 'currentColor'
  const sw = '0.6'
  const common = { fill: 'none', stroke, strokeWidth: sw, className: 'line-draw' }

  if (type === 'cross') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" {...common} className="line-draw">
        <line x1="8" y1="8" x2="40" y2="40" />
        <line x1="40" y1="8" x2="8" y2="40" style={{ transitionDelay: '0.15s' }} />
      </svg>
    )
  }
  if (type === 'circle') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" {...common} className="line-draw">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="8" style={{ transitionDelay: '0.15s' }} />
      </svg>
    )
  }
  if (type === 'grid') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" {...common} className="line-draw">
        <rect x="8" y="8" width="32" height="32" />
        <line x1="8" y1="24" x2="40" y2="24" style={{ transitionDelay: '0.1s' }} />
        <line x1="24" y1="8" x2="24" y2="40" style={{ transitionDelay: '0.2s' }} />
      </svg>
    )
  }
  if (type === 'line') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" {...common} className="line-draw">
        <line x1="8" y1="16" x2="40" y2="16" />
        <line x1="8" y1="24" x2="40" y2="24" style={{ transitionDelay: '0.1s' }} />
        <line x1="8" y1="32" x2="40" y2="32" style={{ transitionDelay: '0.2s' }} />
      </svg>
    )
  }
  if (type === 'wave') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" {...common} className="line-draw">
        <path d="M8 24 Q 16 12, 24 24 T 40 24" />
        <path d="M8 32 Q 16 20, 24 32 T 40 32" style={{ transitionDelay: '0.15s' }} />
      </svg>
    )
  }
  // dots default
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.6" className="line-draw">
      <circle cx="16" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" style={{ transitionDelay: '0.1s' }} />
      <circle cx="32" cy="16" r="2" style={{ transitionDelay: '0.2s' }} />
      <circle cx="16" cy="24" r="2" style={{ transitionDelay: '0.1s' }} />
      <circle cx="24" cy="24" r="2" style={{ transitionDelay: '0.2s' }} />
      <circle cx="32" cy="24" r="2" style={{ transitionDelay: '0.3s' }} />
      <circle cx="16" cy="32" r="2" style={{ transitionDelay: '0.2s' }} />
      <circle cx="24" cy="32" r="2" style={{ transitionDelay: '0.3s' }} />
      <circle cx="32" cy="32" r="2" style={{ transitionDelay: '0.4s' }} />
    </svg>
  )
}

/* ============================================================
   导航
   ============================================================ */

function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t, lang, toggleLang } = useI18n()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', labelKey: 'nav.home', enKey: 'nav.homeEn' },
    { to: '/works', labelKey: 'nav.works', enKey: 'nav.worksEn' },
    { to: '/resources', labelKey: 'nav.resources', enKey: 'nav.resourcesEn' },
    { to: '/contact', labelKey: 'nav.contact', enKey: 'nav.contactEn' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-sm border-b border-line/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink">
            <line x1="4" y1="24" x2="24" y2="4" className="line-draw" />
            <line x1="4" y1="4" x2="24" y2="24" className="line-draw" style={{ transitionDelay: '0.15s' }} />
          </svg>
          <span className="font-display text-lg tracking-wide2">LINE</span>
        </NavLink>

        {/* 桌面导航 + 切换按钮 */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-10">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide2 transition-colors duration-300 line-expand-x py-1 ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                <span className="font-display italic text-xs mr-2 opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(l.labelKey)}
              </NavLink>
            ))}
          </nav>

          {/* 分隔线 */}
          <div className="w-px h-6 bg-line"></div>

          {/* 切换按钮组 */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="icon-btn text-xs tracking-wide2 font-mono"
              aria-label="切换语言"
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label="切换主题"
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="8" cy="8" r="3" />
                  <line x1="8" y1="1" x2="8" y2="3" />
                  <line x1="8" y1="13" x2="8" y2="15" />
                  <line x1="1" y1="8" x2="3" y2="8" />
                  <line x1="13" y1="8" x2="15" y2="8" />
                  <line x1="3" y1="3" x2="4.2" y2="4.2" />
                  <line x1="11.8" y1="11.8" x2="13" y2="13" />
                  <line x1="3" y1="13" x2="4.2" y2="11.8" />
                  <line x1="11.8" y1="4.2" x2="13" y2="3" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 9.5 A 5 5 0 1 0 6.5 4 A 4 4 0 0 0 12 9.5 Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 移动端右侧按钮 */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="icon-btn text-xs tracking-wide2 font-mono"
            aria-label="切换语言"
            style={{ width: '32px', height: '32px' }}
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label="切换主题"
            style={{ width: '32px', height: '32px' }}
          >
            {theme === 'light' ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="8" cy="8" r="3" />
                <line x1="8" y1="1" x2="8" y2="3" />
                <line x1="8" y1="13" x2="8" y2="15" />
                <line x1="1" y1="8" x2="3" y2="8" />
                <line x1="13" y1="8" x2="15" y2="8" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 9.5 A 5 5 0 1 0 6.5 4 A 4 4 0 0 0 12 9.5 Z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center ml-1"
            aria-label="菜单"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="md:hidden border-t border-line modal-backdrop-enter">
          <nav className="px-6 py-6 flex flex-col gap-1 bg-paper">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `py-3 text-sm tracking-wide2 border-b border-faint flex items-center justify-between ${
                    isActive ? 'text-ink' : 'text-muted'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <span className="font-display italic text-xs opacity-50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(l.labelKey)}
                </span>
                <span className="text-xs opacity-40">{t(l.enKey)}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

/* ============================================================
   页脚
   ============================================================ */

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-32 md:mt-40 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted">
            <line x1="4" y1="24" x2="24" y2="4" />
            <line x1="4" y1="4" x2="24" y2="24" />
          </svg>
          <span className="text-xs text-muted tracking-wide2">
            © {new Date().getFullYear()} LINE STUDIO
          </span>
        </div>
        <p className="text-xs text-muted opacity-60">
          {t('footer.built')}
        </p>
      </div>
    </footer>
  )
}

/* ============================================================
   首页 — 立体人像互动（Canvas 实时色键抠像 + 鼠标控制表情 + 3D 倾斜）
   ============================================================ */

// 蓝色背景判定：B 明显高于 R、G 即视为背景，做透明化
function chromaKeyFrame(canvas, video) {
  const vw = video.videoWidth
  const vh = video.videoHeight
  if (!vw || !vh) return false
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width = vw
    canvas.height = vh
  }
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, vw, vh)
  ctx.drawImage(video, 0, 0, vw, vh)
  let imgData
  try {
    imgData = ctx.getImageData(0, 0, vw, vh)
  } catch (e) {
    return false
  }
  const d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i]
    const g = d[i + 1]
    const b = d[i + 2]
    // 蓝色主导：B - max(R,G) 超过阈值即透明
    const blue = b - Math.max(r, g)
    if (blue > 42) {
      d[i + 3] = 0
    } else if (blue > 22) {
      // 边缘柔和过渡
      d[i + 3] = Math.round((42 - blue) / 20 * 255)
    }
  }
  ctx.putImageData(imgData, 0, 0)
  return true
}

function Home() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const tiltRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const tilt = tiltRef.current
    if (!video || !canvas || !tilt) return

    let videoDuration = 0
    let isVideoReady = false
    let targetTime = 0
    let currentTime = 0
    let animId = null
    let drawId = null
    let lastDrawn = -1

    video.addEventListener('loadedmetadata', () => {
      videoDuration = video.duration
      isVideoReady = true
      seekTo(0.5)
      // 立即触发一次 seek，保证首帧解码
      try { video.currentTime = currentTime } catch (e) {}
    })

    function seekTo(normalizedPosition) {
      if (!isVideoReady || videoDuration <= 0) return
      const clamped = Math.max(0, Math.min(1, normalizedPosition))
      targetTime = (1 - clamped) * videoDuration
    }

    // 注视跟随：时间轴（表情）平滑驱动 + 人像 3D 转向鼠标（The character watches you）
    let targetNX = 0
    let targetNY = 0
    let curNX = 0
    let curNY = 0

    function animate() {
      if (isVideoReady && videoDuration > 0 && !video.seeking) {
        const lerp = 0.1
        currentTime += (targetTime - currentTime) * lerp
        if (Math.abs(video.currentTime - currentTime) > 0.02) {
          try { video.currentTime = currentTime } catch (e) {}
        }
      }
      // 平滑转向鼠标位置，头部绕颈部旋转，产生“被注视/看向你”的立体感
      curNX += (targetNX - curNX) * 0.08
      curNY += (targetNY - curNY) * 0.08
      const rotY = curNX * 16
      const rotX = -curNY * 12
      const scale = 1 + Math.min(0.06, Math.abs(curNX) * 0.028 + Math.abs(curNY) * 0.018)
      tilt.style.transform =
        'perspective(1100px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')'
      animId = requestAnimationFrame(animate)
    }

    // 绘制循环：帧可解码且时间变化时才重绘
    function drawLoop() {
      if (isVideoReady && video.readyState >= 2) {
        const now = video.currentTime
        if (Math.abs(now - lastDrawn) > 0.03) {
          if (chromaKeyFrame(canvas, video)) {
            lastDrawn = now
          }
        }
      }
      drawId = requestAnimationFrame(drawLoop)
    }

    // seek 完成后强制重绘一帧，兜底 drawLoop 漏画
    video.addEventListener('seeked', () => {
      if (isVideoReady && video.readyState >= 2) {
        if (chromaKeyFrame(canvas, video)) {
          lastDrawn = video.currentTime
        }
      }
    })

    // 鼠标：记录注视目标（X 同时映射表情时间轴，位置驱动 3D 转向）
    function onMove(e) {
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY
      const x = clientX / Math.max(1, window.innerWidth)
      seekTo(x)
      targetNX = (x - 0.5) * 2 // -1..1
      targetNY = (clientY / Math.max(1, window.innerHeight) - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })

    animate()
    drawLoop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      if (animId) cancelAnimationFrame(animId)
      if (drawId) cancelAnimationFrame(drawId)
    }
  }, [])

  const isDark = theme === 'dark'
  const ink = isDark ? '#E8E8E8' : '#1A1A1A'

  return (
    <PageWrap>
      {/* 隐藏视频源：只用于提供帧数据（须保持真实渲染，屏幕外定位；不能 display:none 或过小） */}
      <video
        ref={videoRef}
        src="videos/eye.mp4"
        muted
        playsInline
        preload="auto"
        style={{ position: 'fixed', left: '-9999px', top: 0, width: '320px', height: '180px', opacity: 0.01, pointerEvents: 'none' }}
      />

      {/* 悬浮动画：让 3D 人像持续上下浮动，增强立体悬浮感 */}
      <style>{`
        @keyframes homeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .home-float { animation: homeFloat 6s ease-in-out infinite; }
      `}</style>

      <section
        className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden -mx-6 md:-mx-12 -mt-24 md:-mt-32 pt-24 md:pt-32 pb-14"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 28%, rgba(108,140,255,0.16) 0%, transparent 62%), linear-gradient(180deg, #0A0A10 0%, #0F0F0F 58%, #12121A 100%)'
            : 'radial-gradient(ellipse at 50% 28%, rgba(108,140,255,0.10) 0%, transparent 62%), linear-gradient(180deg, #F1F1EE 0%, #FAFAFA 58%, #EFEDE8 100%)',
          transition: 'background 0.5s ease',
        }}
      >
        {/* 顶部标语（参考视频排版） */}
        <div className="absolute top-20 md:top-24 left-0 right-0 text-center px-6 z-10 pointer-events-none">
          <p
            className="text-[10px] md:text-xs tracking-wide3 uppercase"
            style={{ color: isDark ? 'rgba(232,232,232,0.5)' : 'rgba(26,26,26,0.55)' }}
          >
            BE PRESENT IN YOUR OWN IMAGINATION
          </p>
        </div>

        {/* 左侧艺术字（参考视频 Look Closer，桌面端显示） */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
          <div
            className="font-display italic leading-[0.95]"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              color: isDark ? 'rgba(232,232,232,0.13)' : 'rgba(26,26,26,0.12)',
            }}
          >
            Look
            <br />Closer<span style={{ color: 'rgba(108,140,255,0.55)' }}>:</span>
          </div>
        </div>

        {/* 中央：3D 悬浮人像（鼠标注视跟随） */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full home-float">
          <div
            ref={tiltRef}
            className="relative will-change-transform"
            style={{ transformOrigin: '50% 88%' }}
          >
            <canvas
              ref={canvasRef}
              className="block max-h-[44vh] md:max-h-[52vh] w-auto"
              style={{
                maxWidth: '82vw',
                filter: isDark
                  ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))'
                  : 'drop-shadow(0 26px 48px rgba(26,26,26,0.22))',
              }}
            />
            {/* 底部平台阴影（跟随主题明暗） */}
            <div
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-[78%] h-10 pointer-events-none"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse, rgba(26,26,26,0.25) 0%, transparent 70%)',
              }}
            ></div>
          </div>
        </div>

        {/* 左下角信息（参考视频 AI MOTION STUDY 位置） */}
        <div className="absolute bottom-12 left-6 md:left-12 z-10 pointer-events-none">
          <p
            className="text-[10px] md:text-xs tracking-wide3 uppercase"
            style={{ color: isDark ? 'rgba(232,232,232,0.45)' : 'rgba(26,26,26,0.55)' }}
          >
            LINE STUDIO · PORTFOLIO · 2026
          </p>
        </div>

        {/* 右下角提示（参考视频 Move your cursor） */}
        <div className="absolute bottom-12 right-6 md:right-12 z-10 text-right pointer-events-none">
          <p
            className="text-[10px] md:text-xs tracking-wide3 uppercase leading-relaxed"
            style={{ color: isDark ? 'rgba(232,232,232,0.6)' : 'rgba(26,26,26,0.6)' }}
          >
            Move your cursor.
            <br />The character watches you.
          </p>
        </div>

        {/* 底部中央：CTA 按钮 + 滚动指示 */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <NavLink
              to="/works"
              className="group relative px-8 py-3 text-sm tracking-wide3 uppercase transition-all duration-500 ease-line"
              style={{
                border: '1px solid ' + (isDark ? 'rgba(232,232,232,0.7)' : 'rgba(26,26,26,0.7)'),
                color: ink,
              }}
            >
              <span className="relative z-10">{t('home.viewWorks')}</span>
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm tracking-wide3 uppercase line-expand-x py-3 transition-colors duration-300"
              style={{ color: isDark ? 'rgba(232,232,232,0.8)' : 'rgba(26,26,26,0.8)' }}
            >
              {t('home.getInTouch')}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <span
              className="text-[10px] tracking-wide3 uppercase"
              style={{ color: isDark ? 'rgba(232,232,232,0.5)' : 'rgba(26,26,26,0.5)' }}
            >
              Scroll
            </span>
            <svg width="1" height="32" viewBox="0 0 1 32" fill="none" stroke="currentColor" strokeWidth="0.5">
              <line x1="0.5" y1="0" x2="0.5" y2="32" className="line-flow" />
            </svg>
          </div>
        </div>
      </section>
    </PageWrap>
  )
}

/* ============================================================
   作品页
   ============================================================ */

function Works() {
  const [activeTab, setActiveTab] = useState('image') // image | video | code
  const [lightbox, setLightbox] = useState(null)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const { t, lang } = useI18n()

  useEffect(() => {
    if (lightbox || videoPlayer) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightbox, videoPlayer])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setLightbox(null)
        setVideoPlayer(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const tabs = [
    { id: 'image', key: 'works.tabImage', num: '01' },
    { id: 'video', key: 'works.tabVideo', num: '02' },
    { id: 'code', key: 'works.tabCode', num: '03' },
  ]

  return (
    <PageWrap>
      <PageHeader num="02" titleKey="works.title" enKey="works.en" />

      {/* Tab 切换 */}
      <div className="flex items-center gap-8 mb-12 md:mb-16 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative text-sm tracking-wide2 py-2 transition-colors duration-300 ${
              activeTab === tab.id ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            <span className="font-display italic text-xs mr-2 opacity-50">{tab.num}</span>
            {t(tab.key)}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-ink"></span>
            )}
          </button>
        ))}
        <div className="flex-1 h-px bg-faint min-w-[40px]"></div>
      </div>

      {/* 图片作品网格 */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger">
          {imageWorks.map((work) => (
            <div
              key={work.id}
              className="group relative cursor-pointer corner-lines bg-paper"
              onClick={() => setLightbox(work)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-faint relative">
                <img
                  src={work.src}
                  alt={work.title[lang]}
                  className="w-full h-full object-cover transition-all duration-700 ease-line group-hover:scale-[1.02] group-hover:brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-full h-full text-ink" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.3">
                    <rect x="10" y="10" width="80" height="80" className="line-draw" />
                    <line x1="10" y1="50" x2="90" y2="50" className="line-draw" style={{ transitionDelay: '0.2s' }} />
                    <line x1="50" y1="10" x2="50" y2="90" className="line-draw" style={{ transitionDelay: '0.3s' }} />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-normal">{work.title[lang]}</h3>
                  <p className="text-xs text-muted mt-1">{work.category[lang]}</p>
                </div>
                <span className="font-display italic text-xs text-muted mt-1">{work.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 视频作品网格 */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
          {videoWorks.map((work) => (
            <div
              key={work.id}
              className="group relative cursor-pointer corner-lines bg-paper"
              onClick={() => setVideoPlayer(work)}
            >
              <div className="aspect-video overflow-hidden bg-faint relative">
                <img
                  src={work.poster}
                  alt={work.title[lang]}
                  className="w-full h-full object-cover transition-all duration-700 ease-line group-hover:scale-[1.02] group-hover:brightness-75"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-paper/60 flex items-center justify-center group-hover:border-paper group-hover:bg-paper/10 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-paper/80 group-hover:text-paper transition-colors">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-ink/70 backdrop-blur-sm">
                  <span className="text-paper text-xs font-mono">{work.duration}</span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-normal">{work.title[lang]}</h3>
                  <p className="text-xs text-muted mt-1">{work.category[lang]}</p>
                </div>
                <span className="font-display italic text-xs text-muted mt-1">{work.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 编程作品网格 */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger">
          {codeWorks.map((work) => (
            <div
              key={work.id}
              className="group relative corner-lines bg-paper flex flex-col"
            >
              <div className="aspect-[4/3] border-b border-line flex items-center justify-center relative overflow-hidden">
                <div className="text-ink/20 group-hover:text-ink transition-colors duration-500">
                  <CodeAccent type={work.accent} />
                </div>
                {/* 四角网格装饰 */}
                <div className="absolute inset-4 text-line group-hover:text-ink/30 transition-colors duration-500 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.3">
                    <line x1="0" y1="0" x2="20" y2="0" />
                    <line x1="0" y1="0" x2="0" y2="20" />
                    <line x1="100" y1="0" x2="80" y2="0" />
                    <line x1="100" y1="0" x2="100" y2="20" />
                    <line x1="0" y1="100" x2="20" y2="100" />
                    <line x1="0" y1="100" x2="0" y2="80" />
                    <line x1="100" y1="100" x2="80" y2="100" />
                    <line x1="100" y1="100" x2="100" y2="80" />
                  </svg>
                </div>
                <span className="absolute top-3 right-4 font-display italic text-xs text-muted">
                  {work.year}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-normal mb-2">{work.title[lang]}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4 flex-1">{work.desc[lang]}</p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {work.tags.map((tag, i) => (
                    <span key={i} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 链接 */}
                <div className="flex items-center gap-4 pt-4 border-t border-faint">
                  <a
                    href={work.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/demo flex items-center gap-2 text-xs tracking-wide2 text-muted hover:text-ink transition-colors duration-300"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="6" cy="6" r="5" />
                      <path d="M3 9 L9 3 M5 3 L9 3 L9 7" />
                    </svg>
                    {t('works.liveDemo')}
                  </a>
                  <a
                    href={work.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/src flex items-center gap-2 text-xs tracking-wide2 text-muted hover:text-ink transition-colors duration-300"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M2 10 L6 2 L10 10" />
                      <line x1="4" y1="7" x2="8" y2="7" />
                    </svg>
                    {t('works.sourceCode')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 图片大图弹窗 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-backdrop backdrop-blur-sm modal-backdrop-enter flex items-center justify-center p-6"
          style={{ background: 'var(--color-backdrop)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="modal-content-enter max-w-5xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-paper/70 hover:text-paper transition-colors"
              aria-label="关闭"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
            <div className="bg-paper p-2 md:p-4">
              <img src={lightbox.src} alt={lightbox.title[lang]} className="w-full h-auto" />
              <div className="pt-4 pb-2 px-2 flex items-baseline justify-between">
                <div>
                  <h3 className="text-base">{lightbox.title[lang]}</h3>
                  <p className="text-xs text-muted mt-1">{lightbox.desc[lang]}</p>
                </div>
                <span className="font-display italic text-xs text-muted">{lightbox.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 视频播放弹窗 */}
      {videoPlayer && (
        <div
          className="fixed inset-0 z-50 bg-backdrop backdrop-blur-sm modal-backdrop-enter flex items-center justify-center p-6"
          style={{ background: 'var(--color-backdrop)' }}
          onClick={() => setVideoPlayer(null)}
        >
          <div
            className="modal-content-enter max-w-5xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoPlayer(null)}
              className="absolute -top-12 right-0 text-paper/70 hover:text-paper transition-colors"
              aria-label="关闭"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
            <div className="bg-black aspect-video w-full">
              <video
                key={videoPlayer.id}
                src={videoPlayer.src}
                poster={videoPlayer.poster}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
            <div className="pt-4 flex items-baseline justify-between text-paper">
              <div>
                <h3 className="text-base">{videoPlayer.title[lang]}</h3>
                <p className="text-xs text-paper/60 mt-1">{videoPlayer.category[lang]} · {videoPlayer.duration}</p>
              </div>
              <span className="font-display italic text-xs text-paper/60">{videoPlayer.year}</span>
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  )
}

/* ============================================================
   资源页
   ============================================================ */

function Resources() {
  const [expanded, setExpanded] = useState('res-01')
  const { lang } = useI18n()

  return (
    <PageWrap>
      <PageHeader num="03" titleKey="resources.title" enKey="resources.en" />

      <div className="space-y-4 stagger">
        {resourceGroups.map((group, idx) => {
          const isOpen = expanded === group.id
          return (
            <div
              key={group.id}
              className={`border border-line transition-all duration-500 ease-line ${
                isOpen ? 'border-ink' : 'hover:border-muted/50'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : group.id)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-6 text-left"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display italic text-muted text-lg md:text-xl w-12">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-normal">{group.title[lang]}</h3>
                    <p className="text-xs md:text-sm text-muted mt-1 hidden md:block">{group.desc[lang]}</p>
                  </div>
                </div>
                <div className="relative w-5 h-5 flex-shrink-0 text-muted">
                  <span
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-px bg-current transition-all duration-300 ${
                      isOpen ? 'rotate-90 opacity-0' : ''
                    }`}
                  ></span>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-px bg-current transition-all duration-300 rotate-90"></span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-line ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-line">
                  <p className="text-xs md:text-sm text-muted mt-4 mb-5 md:hidden">{group.desc[lang]}</p>
                  <ul className="space-y-1">
                    {group.items.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between py-3 border-b border-faint hover:border-ink/30 transition-colors duration-300"
                        >
                          <span className="flex items-center gap-4">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted group-hover:text-ink transition-colors">
                              <line x1="2" y1="7" x2="12" y2="7" className="line-draw" />
                              <polyline points="8,3 12,7 8,11" className="line-draw" style={{ transitionDelay: '0.1s' }} />
                            </svg>
                            <span className="text-sm">{item.name[lang]}</span>
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <path d="M4 12 L12 4 M6 4 L12 4 L12 10" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PageWrap>
  )
}

/* ============================================================
   联系方式页
   ============================================================ */

function Contact() {
  const [copied, setCopied] = useState(false)
  const { t, lang } = useI18n()

  const copyWechat = () => {
    const wx = contactInfo.items[1].value
    if (navigator.clipboard) {
      navigator.clipboard.writeText(wx)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageWrap>
      <PageHeader num="04" titleKey="contact.title" enKey="contact.en" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="stagger">
          <div className="mb-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-ink">
              <circle cx="40" cy="40" r="36" className="line-draw" />
              <circle cx="40" cy="40" r="24" className="line-draw" style={{ transitionDelay: '0.2s' }} />
              <circle cx="40" cy="40" r="12" className="line-draw" style={{ transitionDelay: '0.4s' }} />
              <line x1="40" y1="4" x2="40" y2="76" className="line-draw" style={{ transitionDelay: '0.6s' }} />
              <line x1="4" y1="40" x2="76" y2="40" className="line-draw" style={{ transitionDelay: '0.7s' }} />
            </svg>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-6">
            {t('contact.headline1')}
            <br />
            <span className="italic text-muted">{t('contact.headline2')}</span>
          </h2>
          <p className="text-muted leading-relaxed max-w-md mb-8 whitespace-pre-line">
            {t('contact.intro')}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-ink"></div>
            <span className="text-xs tracking-wide3 uppercase text-muted">{t('contact.tagline')}</span>
          </div>
        </div>

        <div className="stagger">
          <ul className="border-t border-line">
            {contactInfo.items.map((item, idx) => (
              <li key={item.label} className="border-b border-line group">
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (item.label === 'WeChat') {
                      e.preventDefault()
                      copyWechat()
                    }
                  }}
                  className="flex items-center justify-between py-5 md:py-6 hover:pl-4 transition-all duration-500 ease-line"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-display italic text-muted text-sm w-8">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs text-muted tracking-wide2 uppercase mb-1">{item.label}</p>
                      <p className="text-base md:text-lg">{item.value}</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <path d="M4 10 L16 10 M11 5 L16 10 L11 15" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-xs text-muted">
            {copied ? (
              <span className="text-ink">{t('contact.copied')}</span>
            ) : (
              <span>{t('contact.copyHint')}</span>
            )}
          </div>
        </div>
      </div>
    </PageWrap>
  )
}

/* ============================================================
   主应用
   ============================================================ */

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionState, setTransitionState] = useState('enter')
  const { theme } = useTheme()

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionState('exit')
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionState('enter')
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [location, displayLocation])

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col transition-colors duration-500">
      <Nav />

      <main className="flex-1 pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className={`transition-all duration-500 ease-line ${
              transitionState === 'exit'
                ? 'opacity-0 translate-y-3'
                : 'opacity-100 translate-y-0'
            }`}
            key={displayLocation.pathname}
          >
            <Routes location={displayLocation}>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </main>

      <Footer />

      {/* 右侧装饰流动线 */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
        <svg width="1" height="120" viewBox="0 0 1 120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-line">
          <line x1="0.5" y1="0" x2="0.5" y2="120" className="line-flow" />
        </svg>
      </div>
    </div>
  )
}

/* ============================================================
   入口挂载 — 包装 Theme + i18n + Router
   ============================================================ */

function Root() {
  return React.createElement(ThemeProvider, null,
    React.createElement(I18nProvider, null,
      React.createElement(HashRouter, null,
        React.createElement(App)
      )
    )
  )
}

// 错误边界：捕获子树渲染错误，避免整站白屏
class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }
  componentDidCatch(error, info) {
    console.error('App render error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: {
          padding: '60px 24px',
          maxWidth: '560px',
          margin: '0 auto',
          fontFamily: 'ui-monospace, Menlo, monospace',
          color: 'var(--color-ink)',
        }
      },
        React.createElement('h2', { style: { fontSize: '18px', marginBottom: '16px' } }, '⚠ 渲染出错 / Render Error'),
        React.createElement('pre', {
          style: {
            fontSize: '12px',
            padding: '16px',
            border: '1px solid #ef4444',
            color: '#ef4444',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }
        }, String(this.state.error && this.state.error.message || this.state.error))
      )
    }
    return this.props.children
  }
}

try {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    throw new Error('#root element not found')
  }
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    React.createElement(AppErrorBoundary, null,
      React.createElement(Root)
    )
  )
  // 通知外部 JS 渲染已启动
  window.__appRendered = true
  console.log('[App] mounted successfully')
} catch (e) {
  console.error('[App] failed to mount:', e)
  var errBox = document.getElementById('app-error')
  var msgEl = document.getElementById('app-error-message')
  var loading = document.getElementById('app-loading')
  if (loading) loading.style.display = 'none'
  if (errBox) errBox.classList.add('show')
  if (msgEl) msgEl.textContent = String(e.message || e)
    + '\n\n' + (e.stack || '')
}
