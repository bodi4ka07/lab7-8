import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { InventoryProvider } from './store/InventoryContext.jsx'
import { FavoritesProvider } from './store/FavoritesContext.jsx'
import AdminInventory from './pages/AdminInventory.jsx'
import AdminInventoryCreate from './pages/AdminInventoryCreate.jsx'
import AdminInventoryEdit from './pages/AdminInventoryEdit.jsx'
import AdminInventoryDetails from './pages/AdminInventoryDetails.jsx'
import Gallery from './pages/Gallery.jsx'
import Favorites from './pages/Favorites.jsx'
import { useFavorites } from './store/FavoritesContext.jsx'
import styles from './App.module.css'

function NavBadge() {
  const { favs } = useFavorites()
  return favs.length > 0 ? <span className={styles.badge}>{favs.length}</span> : null
}

function AppNav() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/'
  const isGallery = location.pathname.startsWith('/gallery') || location.pathname.startsWith('/favorites')

  return (
    <nav className={`${styles.nav} ${isGallery ? styles.navGallery : ''}`}>
      <div className={styles.navLogo}>⬡ Склад</div>

      <div className={styles.navSection}>
        <span className={styles.navLabel}>Лаб. 7</span>
        <NavLink to="/admin" className={({ isActive }) =>
          `${styles.navTab} ${(isActive || location.pathname === '/') ? styles.active : ''}`
        }>
          Адмін-панель
        </NavLink>
      </div>

      <div className={styles.navSep} />

      <div className={styles.navSection}>
        <span className={styles.navLabel}>Лаб. 8</span>
        <NavLink to="/gallery" className={({ isActive }) =>
          `${styles.navTab} ${isActive ? styles.active : ''}`
        }>
          Галерея
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) =>
          `${styles.navTab} ${isActive ? styles.active : ''}`
        }>
          Улюблені <NavBadge />
        </NavLink>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <InventoryProvider>
      <FavoritesProvider>
        <div className={styles.app}>
          <AppNav />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<AdminInventory />} />
              <Route path="/admin" element={<AdminInventory />} />
              <Route path="/admin/create" element={<AdminInventoryCreate />} />
              <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
              <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </InventoryProvider>
  )
}
