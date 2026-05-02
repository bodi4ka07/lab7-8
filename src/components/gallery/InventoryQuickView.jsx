//компонент для швидкого перегляду позиції, показує фото, назву, опис і API ендпоінти, 
// а також кнопки для додавання/видалення з улюблених і закриття
import { useEffect } from 'react'
import { getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryQuickView.module.css'

export default function InventoryQuickView({ item, isFav, onToggleFav, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">×</button>

        <div className={styles.imgWrap}>
          <img
            src={getPhotoUrl(item.id)}
            alt={item.inventory_name}
            className={styles.img}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className={styles.imgFallback}>📦</div>
        </div>

        <div className={styles.content}>
          <p className={styles.meta}>Склад · ID #{item.id}</p>
          <h2 className={styles.name}>{item.inventory_name}</h2>
          <p className={styles.desc}>{item.description || 'Опис відсутній.'}</p>

          <p className={styles.endpoint}>
            GET /inventory/{item.id} &nbsp;·&nbsp; GET /inventory/{item.id}/photo
          </p>

          <div className={styles.actions}>
            <button
              className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
              onClick={() => onToggleFav(item.id)}
            >
              {isFav ? '❤️ В улюблених' : '🤍 Додати до улюблених'}
            </button>
            <button className={styles.closeAction} onClick={onClose}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
