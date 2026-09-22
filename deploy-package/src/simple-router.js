// 极简 Hash 路由 — 替代 react-router-dom
// 提供：HashRouter, Routes, Route, NavLink, useLocation, useNavigate
// 注意：此文件在 React 之前加载，所以需要延迟引用 React
(function(global) {
  let _React = null
  function getReact() {
    if (!_React) {
      if (typeof React !== 'undefined') _React = React
      else throw new Error('React not loaded before SimpleRouter was used')
    }
    return _React
  }

  function getPath() {
    const hash = window.location.hash || '#/'
    return hash.replace(/^#/, '') || '/'
  }

  let RouterContext = null

  function navigate(to) {
    window.location.hash = to
  }

  function HashRouter({ children }) {
    const R = getReact()
    const { useState, useEffect } = R

    if (!RouterContext) {
      RouterContext = R.createContext(null)
    }

    const [path, setPath] = useState(getPath())

    useEffect(() => {
      const onHashChange = () => setPath(getPath())
      window.addEventListener('hashchange', onHashChange)
      if (!window.location.hash) {
        window.location.hash = '#/'
      }
      return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    const value = { path, navigate }
    return R.createElement(RouterContext.Provider, { value }, children)
  }

  function useLocation() {
    const R = getReact()
    const ctx = R.useContext(RouterContext)
    return { pathname: ctx.path }
  }

  function useNavigate() {
    const R = getReact()
    const ctx = R.useContext(RouterContext)
    return ctx.navigate
  }

  function Routes({ children, location }) {
    const R = getReact()
    const ctx = R.useContext(RouterContext)
    const currentPath = location ? location.pathname : ctx.path

    let matched = null
    R.Children.forEach(children, child => {
      if (matched) return
      if (!child || !child.props) return
      const { path } = child.props
      if (path === undefined) return
      const currentPathOnly = currentPath.split('?')[0]
      if (path === '/') {
        if (currentPathOnly === '/') matched = child
      } else if (currentPathOnly === path) {
        matched = child
      }
    })

    return matched ? matched.props.element : null
  }

  function Route(props) {
    return null
  }

  function NavLink({ to, end, children, className, onClick, ...rest }) {
    const R = getReact()
    const ctx = R.useContext(RouterContext)
    const currentPath = ctx.path

    const isActive = end
      ? currentPath === to
      : currentPath === to || (to !== '/' && currentPath.startsWith(to))

    const handleClick = (e) => {
      e.preventDefault()
      if (onClick) onClick(e)
      navigate(to)
    }

    const classes = typeof className === 'function'
      ? className({ isActive })
      : (className || '')

    return R.createElement('a', {
      href: '#' + to,
      onClick: handleClick,
      className: classes,
      ...rest,
    }, typeof children === 'function' ? children({ isActive }) : children)
  }

  global.SimpleRouter = { HashRouter, Routes, Route, NavLink, useLocation, useNavigate }
})(window)
