import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useInventory } from '../../store/InventoryContext.jsx'
import { getPhotoUrl } from '../../services/inventoryApi'
import ConfirmModal from './ConfirmModal.jsx'
import styles from './InventoryTable.module.css'

export default function InventoryTable({ items }) {
  const { remove } = useInventory()
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await remove(deleteTarget.id)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Фото</th>
              <th className={styles.th}>Назва</th>
              <th className={styles.th}>Опис</th>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={styles.row}>
                <td className={styles.td}>
                  <img
                    src={getPhotoUrl(item.id)}
                    alt={item.inventory_name}
                    className={styles.thumb}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                  <div className={styles.thumbFallback}>📦</div>
                </td>
                <td className={styles.td}>
                  <span className={styles.itemName}>{item.inventory_name}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.itemDesc}>{item.description || '—'}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.idBadge}>#{item.id}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.btnView}`}
                      onClick={() => navigate(`/admin/details/${item.id}`)}
                      title="Переглянути"
                    >
                      👁 Деталі
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnEdit}`}
                      onClick={() => navigate(`/admin/edit/${item.id}`)}
                      title="Редагувати"
                    >
                      ✏️ Ред.
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnDelete}`}
                      onClick={() => setDeleteTarget(item)}
                      title="Видалити"
                    >
                      🗑 Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <ConfirmModal
          item={deleteTarget}
          busy={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}
