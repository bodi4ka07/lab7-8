import { useNavigate } from 'react-router-dom'
import { useInventory } from '../store/InventoryContext.jsx'
import InventoryTable from '../components/inventory/InventoryTable.jsx'
import styles from './AdminInventory.module.css'

export default function AdminInventory() {
  const { items, loading, error, loadAll } = useInventory()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Інвентар складу</h1>
          <p className={styles.subtitle}>GET /inventory · {items.length} позицій</p>
        </div>
        <button className={styles.btnAdd} onClick={() => navigate('/admin/create')}>
          + Додати позицію
        </button>
      </div>

      {loading && (
        <div className={styles.stateBox}>
          <div className={styles.spinner} />
          <p className={styles.stateText}>Завантаження...</p>
        </div>
      )}

      {error && !loading && (
        <div className={styles.errorBox}>
          <p className={styles.errorIcon}>⚠️</p>
          <p className={styles.errorText}>{error}</p>
          <button className={styles.retryBtn} onClick={loadAll}>Спробувати знову</button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className={styles.stateBox}>
          <p className={styles.emptyIcon}>📦</p>
          <p className={styles.stateText}>Інвентар порожній</p>
          <button className={styles.btnAdd} onClick={() => navigate('/admin/create')}>
            Додати першу позицію
          </button>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <InventoryTable items={items} />
      )}
    </div>
  )
}
