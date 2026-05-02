//компонент для відображення галереї позицій, приймає список позицій і рендерить InventoryCard для кожної позиції
import InventoryCard from './InventoryCard.jsx'
import styles from './InventoryGallery.module.css'

export default function InventoryGallery({ items, onCardClick, favorites, onToggleFav }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          isFav={favorites.includes(item.id)}
          onToggleFav={onToggleFav}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  )
}
