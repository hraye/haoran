const { useState, useEffect, useRef, Component } = React
const { HashRouter, Routes, Route, NavLink, useLocation } = SimpleRouter
const { useI18n, I18nProvider, I18nContext } = window
const { useTheme, ThemeProvider, ThemeContext } = window

/* ============================================================
   数据层 — 所有作品、资源数据统一用数组存储
   ============================================================ */

const imageWorks = [
  { id: 'img-01', title: { zh: '粉墨幻境', en: 'Pink Illusion' }, category: { zh: 'AI 生成 / 人像', en: 'AI Generated / Portrait' }, year: '2024', src: 'assets/work-01.jpg', desc: { zh: '粉色与霓虹交织的奇幻人像。', en: 'A fantasy portrait woven in pink and neon.' } },
]

const videoWorks = [
  { id: 'vid-00', title: { zh: '待上传', en: 'Coming Soon' }, category: { zh: '等待内容', en: 'Pending' }, year: '', duration: '', poster: '', src: '' },
]

const codeWorks = [
  { id: 'code-00', title: { zh: '待上传', en: 'Coming Soon' }, desc: { zh: '作品即将上线', en: 'Project coming soon' }, tags: [], demo: '#', source: '#', year: '', accent: 'line' },
]

const resourceGroups = [
  { id: 'res-00', title: { zh: '资源一', en: 'Resource 01' }, desc: { zh: '资源整理中，敬请期待。', en: 'Resources being curated.' }, items: [{ name: { zh: '待上传', en: 'Coming Soon' }, url: '#' }] },
  { id: 'res-01', title: { zh: '资源二', en: 'Resource 02' }, desc: { zh: '资源整理中，敬请期待。', en: 'Resources being curated.' }, items: [{ name: { zh: '待上传', en: 'Coming Soon' }, url: '#' }] },
  { id: 'res-02', title: { zh: '资源三', en: 'Resource 03' }, desc: { zh: '资源整理中，敬请期待。', en: 'Resources being curated.' }, items: [{ name: { zh: '待上传', en: 'Coming Soon' }, url: '#' }] },
]

const contactInfo = {
  name: { zh: 'Lin · 独立设计师', en: 'Lin · Independent Designer' },
  intro: {
    zh: '专注于视觉设计与交互体验，以线条与留白构建叙事。',
    en: 'Focused on visual design and interactive experiences, weaving narratives through lines and whitespace.',
  },
  items: [
    { label: '邮箱', value: '3120546867@qq.com', href: 'mailto:3120546867@qq.com' },
    { label: '微信', value: 'y-s134', href: '#' },
    { label: '公众号', value: '又然AI笔记', href: '#' },
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
        <NavLink to="/" className="flex items-center group">
          <img
            src="assets/logo.png"
            alt="又然创作 YOURAN CREATE"
            className="h-9 md:h-10 w-auto transition-all duration-500"
            style={{ filter: theme === 'dark' ? 'none' : 'invert(1) brightness(0.2)' }}
          />
        </NavLink>

        {/* 桌面导航 + 切换按钮 */}
        <div className="hidden md:flex items-center gap-6">
          <nav
            className="flex items-center rounded-full p-1"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: '1px solid ' + (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
            }}
          >
            {links.map((l, i) => {
              const isHome = l.to === '/' && location.pathname === '/'
              const isOther = l.to !== '/' && location.pathname.startsWith(l.to)
              const isActive = isHome || isOther
              return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={`px-5 py-2 text-sm tracking-wide2 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'hover:opacity-80'}`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
                } : { color: theme === 'dark' ? 'rgba(232,232,232,0.7)' : 'rgba(26,26,26,0.7)' }}
              >
                {t(l.labelKey)}
              </NavLink>
              )
            })}
          </nav>

          {/* 分隔线 */}
          <div className="w-px h-6" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}></div>

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
            © {new Date().getFullYear()} YOU RAN
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
  const { t, lang } = useI18n()
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

        {/* 左侧：你好，我是（与又然同大小同字体） */}
        <div className="absolute left-8 md:left-16 top-1/2 z-10 pointer-events-none hidden md:block" style={{ transform: 'translateY(-58%)' }}>
          <div
            className="font-sans leading-[1.25] text-left"
            style={{
              fontSize: 'clamp(5rem, 11vw, 9rem)',
              letterSpacing: '0.08em',
              fontWeight: 900,
              color: isDark ? '#FFFFFF' : '#1A1A1A',
            }}
          >
            {lang === 'zh' ? '你好，' : 'Hello,'}
            <br />{lang === 'zh' ? '我是' : "I'm"}
          </div>
        </div>

        {/* 人物右侧：又然 + YOURAN + 定位 */}
        <div className="absolute right-8 md:right-16 top-1/2 z-10 pointer-events-none hidden md:block" style={{ transform: 'translateY(-42%)' }}>
          <div className="flex flex-col items-end">
            <div
              className="leading-[0.95]"
              style={{
                fontFamily: '"Liu Jian Mao Cao", "Zhi Mang Xing", cursive',
                fontSize: 'clamp(5rem, 11vw, 9rem)',
                letterSpacing: '0.08em',
                color: isDark ? '#FFFFFF' : '#1A1A1A',
                textShadow: isDark ? '0 0 40px rgba(255,255,255,0.15)' : '0 0 30px rgba(0,0,0,0.1)',
              }}
            >
              又然
            </div>
            <div
              className="font-display italic mt-1 mr-1"
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.4rem)',
                letterSpacing: '0.35em',
                color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(26,26,26,0.75)',
              }}
            >
              YOURAN
            </div>
            <div
              className="font-sans mt-2 mr-1"
              style={{
                fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                letterSpacing: '0.2em',
                color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(26,26,26,0.55)',
              }}
            >
              {lang === 'zh' ? '独立 AI 创作者・平面设计师' : 'Independent AI Creator · Graphic Designer'}
            </div>
          </div>
        </div>

        {/* 手机端标题（仅小屏显示） */}
        <div className="md:hidden relative z-10 flex flex-col items-center pt-6 pointer-events-none">
          <div
            className="font-sans leading-[1.05] text-center"
            style={{
              fontSize: 'clamp(2.4rem, 10vw, 3.5rem)',
              letterSpacing: '0.06em',
              fontWeight: 900,
              color: isDark ? '#FFFFFF' : '#1A1A1A',
            }}
          >
            你好，我是又然
          </div>
          <div
            className="font-display italic mt-1"
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.35em',
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.7)',
            }}
          >
            YOURAN
          </div>
          <div
            className="font-sans mt-1.5"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.5)',
            }}
          >
            独立 AI 创作者・平面设计师
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
            YOU RAN · PORTFOLIO · 2026
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

        {/* 底部中央：个人介绍 + CTA 按钮 + 滚动指示 */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p
            className="text-sm md:text-base font-light leading-loose text-center whitespace-pre-line max-w-xl px-6 tracking-wide"
            style={{
              fontFamily: 'Georgia, "Noto Serif SC", "Songti SC", "SimSun", serif',
              color: isDark ? 'rgba(232,232,232,0.7)' : 'rgba(26,26,26,0.75)',
            }}
          >
            {t('home.intro')}
          </p>
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

      {/* 第二屏：不规则碎片卡片 */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 -mx-6 md:-mx-12 py-20 overflow-hidden">
        <div className="mb-16 text-center relative z-10">
          <p className="text-[10px] tracking-wide3 uppercase mb-3" style={{ color: isDark ? 'rgba(232,232,232,0.5)' : 'rgba(26,26,26,0.5)' }}>{lang === 'zh' ? '探索作品' : 'EXPLORE'}</p>
          <h2
            className="text-5xl md:text-7xl leading-none"
            style={{
              fontFamily: '"ZCOOL KuaiLe", "Liu Jian Mao Cao", cursive',
              color: ink,
              textShadow: isDark ? '0 0 40px rgba(255,255,255,0.15)' : '0 0 30px rgba(0,0,0,0.1)',
            }}
          >
            {t('nav.works')}
          </h2>
        </div>

        <div className="relative w-full max-w-5xl h-[420px] md:h-[480px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 480" preserveAspectRatio="none" fill="none">
            <path d="M 500 20 C 350 80, 200 100, 120 160" stroke="#7c9eff" strokeWidth="1.2" strokeDasharray="4 6" className="electric-line" opacity="0.6" />
            <path d="M 500 20 C 650 80, 780 90, 860 140" stroke="#9d7cff" strokeWidth="1.2" strokeDasharray="4 6" className="electric-line" style={{ animationDelay: '0.3s' }} opacity="0.6" />
            <path d="M 500 20 C 500 120, 480 200, 460 340" stroke="#5ce8c8" strokeWidth="1.2" strokeDasharray="4 6" className="electric-line" style={{ animationDelay: '0.6s' }} opacity="0.6" />
          </svg>
          <style>{`
            @keyframes electricFlow { to { stroke-dashoffset: -20; } }
            .electric-line { animation: electricFlow 0.8s linear infinite; }
            @keyframes flowDash { to { stroke-dashoffset: -28; } }
            .flow-path { animation: flowDash 1.2s linear infinite; }
          `}</style>
          {[
            { to: '/works?tab=image', title: lang === 'zh' ? '图片作品' : 'IMAGE', en: lang === 'zh' ? '图片' : 'IMAGE', desc: lang === 'zh' ? '生成式视觉作品' : 'Generative Visuals',
              accent: '#ff6b35', glow: 'rgba(255,107,53,0.4)',
              grad: 'linear-gradient(135deg, #ff8c42 0%, #e63946 50%, #9d0208 100%)', pattern: 'film', img: 'assets/card1-orange.jpg',
              pos: 'left-[5%] top-[10%]', rot: '-6deg', size: 'w-40 md:w-48', radius: 'rounded-[28px_12px_24px_14px]',
              icon: (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>) },
            { to: '/works?tab=video', title: lang === 'zh' ? '视频作品' : 'VIDEO', en: lang === 'zh' ? '视频' : 'VIDEO', desc: lang === 'zh' ? '动态影像与沉浸式体验' : 'Motion & Immersive',
              accent: '#f4a261', glow: 'rgba(244,162,97,0.4)',
              grad: 'linear-gradient(135deg, #ffb4a2 0%, #e5989b 50%, #6d597a 100%)', pattern: 'clapper', img: 'assets/card2-purple.jpg',
              pos: 'right-[8%] top-[0%]', rot: '5deg', size: 'w-40 md:w-48', radius: 'rounded-[14px_28px_12px_24px]',
              icon: (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polygon points="6,4 20,12 6,20" />
              </svg>) },
            { to: '/works?tab=code', title: lang === 'zh' ? '编程作品' : 'CODE', en: lang === 'zh' ? '编程' : 'CODE', desc: lang === 'zh' ? '创意网页与交互实验' : 'Creative Web & Labs',
              accent: '#4cc9f0', glow: 'rgba(76,201,240,0.4)',
              grad: 'linear-gradient(135deg, #48cae4 0%, #0096c7 50%, #023e8a 100%)', pattern: 'code', img: 'assets/card3-cyan.jpg',
              pos: 'left-[30%] bottom-[5%]', rot: '-3deg', size: 'w-40 md:w-48', radius: 'rounded-[20px_14px_28px_12px]',
              icon: (<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>) },
          ].map((c, i) => (
            <NavLink
              key={i}
              to={c.to}
              className={`group absolute ${c.pos} ${c.rot} transition-all duration-700 ease-out hover:!rotate-0 hover:-translate-y-3 hover:scale-105`}
            >
              <div className={`relative ${c.size} group-hover:!rotate-0`}>
                {/* 外层圆角边框 */}
                <div
                  className="rounded-2xl p-2 transition-all duration-500"
                  style={{
                    border: `1.5px solid ${c.accent}`,
                    boxShadow: `0 0 24px ${c.glow}, 0 20px 50px rgba(0,0,0,0.4)`,
                  }}
                >
                  <img
                    src={c.img}
                    alt=""
                    className="rounded-xl w-full h-40 md:h-48 object-cover"
                  />
                  {/* 底部信息栏 */}
                  <div
                    className="px-3 pt-3 pb-2"
                    style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)' }}
                  >
                    <div
                      className="text-lg font-bold mb-1"
                      style={{ color: isDark ? '#fff' : '#1a1a1a' }}
                    >{c.title}</div>
                    <div
                      className="text-xs mb-2"
                      style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
                    >{c.desc}</div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs tracking-wide3 uppercase"
                        style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
                      >{c.en}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 第三屏：资源介绍 */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm tracking-[0.3em] mb-4" style={{ color: ink.muted }}>
            {lang === 'zh' ? '探索资源' : 'EXPLORE RESOURCES'}
          </div>
          <h2
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
              color: ink.primary,
            }}
          >
            {lang === 'zh' ? '资源' : 'RESOURCES'}
          </h2>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: ink.secondary }}
          >
            {lang === 'zh'
              ? '分享我在 AI 创作路上收集的优质工具、素材和学习资料，以利他成就你我。'
              : 'Curated AI creation tools, assets and learning resources shared to help you create.'}
          </p>
          <NavLink
            to="/resources"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #48cae4 0%, #0096c7 100%)',
              color: '#fff',
              boxShadow: '0 10px 30px rgba(0,150,199,0.4)',
            }}
          >
            {lang === 'zh' ? '浏览资源库' : 'Browse Resources'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </NavLink>
        </div>
      </section>

        </PageWrap>
  )
}

/* ============================================================
   作品页
   ============================================================ */

function Works() {
  const [activeTab, setActiveTab] = useState(() => {
    const m = (window.location.hash || '').match(/[?&]tab=(\w+)/)
    return m && ['image', 'video', 'code'].includes(m[1]) ? m[1] : 'image'
  })
  const [lightbox, setLightbox] = useState(null)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const { t, lang } = useI18n()
  const { isDark } = useTheme()

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

      {/* Tab 切换 */}
      <div className="flex items-center gap-3 mb-12 md:mb-16 flex-wrap justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-full text-lg transition-all duration-300 ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)]'
                  : 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                : isDark
                  ? 'bg-white/10 text-orange-300/70 hover:bg-white/20 hover:text-orange-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                  : 'bg-black/5 text-orange-600/70 hover:bg-orange-100 hover:text-orange-600 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]'
            }`}
            style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
          >
            {t(tab.key)}
          </button>
        ))}
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
              <div className="overflow-hidden bg-faint relative">
                <img
                  src={work.src}
                  alt={work.title[lang]}
                  className="w-full h-auto block transition-all duration-700 ease-line group-hover:brightness-90"
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
  const { lang } = useI18n()
  const { isDark, ink } = useTheme()
  const [query, setQuery] = useState('')

  return (
    <PageWrap>

      {/* 顶部渐变 banner */}
      <div
        className="rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #4c3fd6 0%, #7c3aed 50%, #a855f7 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #7c3aed 60%, #a855f7 100%)',
        }}
      >
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-wide3 uppercase mb-4"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            ONLINE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {lang === 'zh' ? '资源共享，利他成就你我' : 'Shared Resources, Growth Together'}
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-2xl">
            {lang === 'zh' ? '聚合 AI 创作相关的工具、素材与教程，持续更新。' : 'Curated AI creation tools, assets and tutorials, updated regularly.'}
          </p>
        </div>

        {/* 搜索框 */}
        <div className="relative mt-6 max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ opacity: 0.7 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'zh' ? '搜索资源...' : 'Search resources...'}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
            }}
          />
        </div>
      </div>

      {/* 分组卡片 */}
      {resourceGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            if (!query.trim()) return true
            const q = query.toLowerCase()
            return item.name.zh.toLowerCase().includes(q) || item.name.en.toLowerCase().includes(q) || group.title.zh.toLowerCase().includes(q)
          }),
        }))
        .filter((group) => group.items.length > 0)
        .map((group, idx) => (
        <div key={group.id} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full" style={{ background: '#a855f7' }} />
            <h3 className="text-xl md:text-2xl font-medium" style={{ color: ink }}>
              {group.title[lang]}
            </h3>
          </div>
          <p className="text-sm mb-6" style={{ color: isDark ? 'rgba(232,232,232,0.5)' : 'rgba(26,26,26,0.5)' }}>
            {group.desc[lang]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
                  border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.1))',
                      color: '#a855f7',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium" style={{ color: ink }}>{item.name[lang]}</h4>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a855f7' }}>
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </PageWrap>
  )
}

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
                    if (item.label === '微信' || item.label === '公众号') {
                      e.preventDefault()
                      navigator.clipboard && navigator.clipboard.writeText(item.value)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }
                  }}
                  className="flex items-center justify-between py-5 md:py-6 hover:pl-4 transition-all duration-500 ease-line"
                >
                  <div className="flex items-center gap-5">
                    {/* 图标 */}
                    {item.label === '邮箱' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-muted">
                        <rect x="3" y="5" width="18" height="14" rx="1" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    )}
                    {item.label === '微信' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-muted">
                        <path d="M8.5 4C4.9 4 2 6.7 2 10c0 1.9 1 3.5 2.6 4.6L4 17l2.8-1.5c.5.1 1.1.2 1.7.2M15.5 9c-3.6 0-6.5 2.4-6.5 5.4 0 3 2.9 5.4 6.5 5.4.7 0 1.4-.1 2-.3l2.5 1.3-.7-2.1c1.6-1 2.7-2.6 2.7-4.3C22 11.4 19.1 9 15.5 9z" />
                      </svg>
                    )}
                    {item.label === '公众号' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-muted">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 20l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        <circle cx="8.5" cy="11" r="0.5" fill="currentColor" />
                        <circle cx="12" cy="11" r="0.5" fill="currentColor" />
                        <circle cx="15.5" cy="11" r="0.5" fill="currentColor" />
                      </svg>
                    )}
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
