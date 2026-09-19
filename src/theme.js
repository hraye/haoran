// 主题上下文 — 暗夜/白天切换，存 localStorage
// 延迟使用 React，确保 React 已加载后再访问
(function(global) {
  let _React = null
  function getReact() {
    if (!_React) {
      if (typeof React !== 'undefined') _React = React
      else throw new Error('React not loaded before ThemeProvider was used')
    }
    return _React
  }

  function ThemeProvider({ children }) {
    const R = getReact()
    const { useState, useEffect, createContext, useContext } = R

    if (!global.ThemeContext) {
      global.ThemeContext = R.createContext(null)
    }

    const [theme, setTheme] = useState(() => {
      try {
        return localStorage.getItem('theme') || 'light'
      } catch (e) { return 'light' }
    })

    useEffect(() => {
      try { localStorage.setItem('theme', theme) } catch (e) {}
      document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return R.createElement(global.ThemeContext.Provider, { value: { theme, setTheme, toggleTheme } }, children)
  }

  function useTheme() {
    const R = getReact()
    return R.useContext(global.ThemeContext)
  }

  global.ThemeProvider = ThemeProvider
  global.useTheme = useTheme
  global.ThemeContext = null
})(window)
