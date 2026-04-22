import { useNavigate } from 'react-router-dom'
import { getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryDetails.module.css'

export default function InventoryDetails({ item }) {
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={getPhotoUrl(item.id)}
          alt={item.inventory_name}
          className={styles.img}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        <div className={styles.imgFallback}>📦</div>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Назва</div>
          <div className={styles.fieldValue}>{item.inventory_name}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Опис</div>
          <div className={styles.fieldDesc}>{item.description || 'Опис відсутній.'}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>Endpoint</div>
          <code className={styles.code}>GET /inventory/{item.id}</code>
        </div>

        {item.createdAt && (
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Дата додавання</div>
            <div className={styles.fieldValue}>{item.createdAt}</div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.btnBack} onClick={() => navigate('/admin')}>
          ← Назад
        </button>
        <button className={styles.btnEdit} onClick={() => navigate(`/admin/edit/${item.id}`)}>
          ✏️ Редагувати
        </button>
      </div>
    </div>
  )
}
