//сторінка для відображення галереї інвентарю, з можливістю пошуку, перегляду деталей 
// і управління улюбленими позиціями
import { useState } from 'react'
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../store/FavoritesContext.jsx'
import InventoryGallery from '../components/gallery/InventoryGallery.jsx'
import InventoryQuickView from '../components/gallery/InventoryQuickView.jsx'
import FavoritesBar from '../components/gallery/FavoritesBar.jsx'
import styles from './Gallery.module.css'

function SkeletonGrid() {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonBody}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Gallery() {
  const { items, loading, error, loadAll } = useInventory()
  const { favs, toggle, isFav } = useFavorites()
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = items.filter((item) =>
    item.inventory_name.toLowerCase().includes(search.toLowerCase()) ||
    (item.description || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Галерея інвентарю</h1>
          <p className={styles.subtitle}>GET /inventory · {filtered.length} позицій</p>
        </div>
        <input
          className={styles.search}
          placeholder="🔍 Пошук за назвою..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <FavoritesBar items={items} />

      {loading && <SkeletonGrid />}

      {error && !loading && (
        <div className={styles.errorBox}>
          <p className={styles.errorIcon}>⚠️</p>
          <p className={styles.errorText}>{error}</p>
          <button className={styles.retryBtn} onClick={loadAll}>Спробувати знову</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.emptyBox}>
          <p className={styles.emptyIcon}>🔍</p>
          <p className={styles.emptyText}>
            {search ? `Нічого не знайдено за запитом «${search}»` : 'Галерея порожня'}
          </p>
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>
              Очистити пошук
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <InventoryGallery
          items={filtered}
          favorites={favs}
          onCardClick={setSelected}
          onToggleFav={toggle}
        />
      )}

      {selected && (
        <InventoryQuickView
          item={selected}
          isFav={isFav(selected.id)}
          onToggleFav={toggle}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
