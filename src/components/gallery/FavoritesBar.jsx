//горизонтальна панель з улюбленими позиціями, показує до 5 позицій і посилання на сторінку з усіма улюбленими
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../store/FavoritesContext.jsx'
import styles from './FavoritesBar.module.css'

export default function FavoritesBar({ items }) {
  const { favs } = useFavorites()
  const navigate = useNavigate()

  if (favs.length === 0) return null

  const favItems = items.filter((i) => favs.includes(i.id)).slice(0, 5)

  return (
    <div className={styles.bar}>
      <span className={styles.label}>❤️ Улюблені</span>
      <div className={styles.chips}>
        {favItems.map((item) => (
          <span key={item.id} className={styles.chip}>
            {item.inventory_name}
          </span>
        ))}
        {favs.length > 5 && <span className={styles.more}>+{favs.length - 5}</span>}
      </div>
      <button className={styles.viewAll} onClick={() => navigate('/favorites')}>
        Переглянути всі →
      </button>
    </div>
  )
}
