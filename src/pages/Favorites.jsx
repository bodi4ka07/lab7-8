//сторінка для відображення улюблених позицій, з можливістю перегляду деталей і управління улюбленими
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventory } from '../store/InventoryContext.jsx'
import { useFavorites } from '../store/FavoritesContext.jsx'
import InventoryGallery from '../components/gallery/InventoryGallery.jsx'
import InventoryQuickView from '../components/gallery/InventoryQuickView.jsx'
import styles from './Favorites.module.css'

export default function Favorites() {
  const { items } = useInventory()
  const { favs, toggle, isFav } = useFavorites()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const favItems = items.filter((item) => favs.includes(item.id))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>❤️ Улюблені</h1>
          <p className={styles.subtitle}>
            {favItems.length > 0
              ? `${favItems.length} збережено · localStorage`
              : 'Порожньо'}
          </p>
        </div>
        <button className={styles.backBtn} onClick={() => navigate('/gallery')}>
          ← До галереї
        </button>
      </div>

      {favItems.length === 0 ? (
        <div className={styles.emptyBox}>
          <p className={styles.emptyIcon}>🤍</p>
          <p className={styles.emptyTitle}>Ще нічого не збережено</p>
          <p className={styles.emptyDesc}>
            Натисніть ❤️ на будь-якій картці в галереї, щоб додати до улюблених.
          </p>
          <button className={styles.goBtn} onClick={() => navigate('/gallery')}>
            Перейти до галереї
          </button>
        </div>
      ) : (
        <InventoryGallery
          items={favItems}
          favorites={favs}
          onCardClick={setSelected}
          onToggleFav={toggle}
        />
      )}

      {selected && (
        <InventoryQuickView
          item={selected}
          isFav={isFav(selected.id)}
          onToggleFav={(id) => {
            toggle(id)
            // Close modal if unfavorited
            if (isFav(id)) setSelected(null)
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
