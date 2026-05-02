//картка позиції в галереї, показує фото, назву, ID і кнопку для додавання/видалення з улюблених
import { getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryCard.module.css'

export default function InventoryCard({ item, isFav, onToggleFav, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
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

        <button
          className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFav(item.id) }}
          title={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
          aria-label={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{item.inventory_name}</p>
        <p className={styles.id}>ID #{item.id}</p>
      </div>
    </div>
  )
}
