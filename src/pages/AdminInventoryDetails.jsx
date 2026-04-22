import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInventory } from '../store/InventoryContext.jsx'
import InventoryDetails from '../components/inventory/InventoryDetails.jsx'
import styles from './AdminPage.module.css'

export default function AdminInventoryDetails() {
  const { id } = useParams()
  const { getOne } = useInventory()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getOne(Number(id))
      .then(setItem)
      .catch(() => setError('Позицію не знайдено'))
      .finally(() => setLoading(false))
  }, [id, getOne])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.center}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className={styles.page}>
        <p className={styles.errorMsg}>⚠️ {error || 'Позицію не знайдено'}</p>
        <button className={styles.backBtn} onClick={() => navigate('/admin')}>← Назад</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/admin')}>← Назад</button>
        <h1 className={styles.title}>Деталі позиції</h1>
        <p className={styles.subtitle}>GET /inventory/{id}</p>
      </div>
      <InventoryDetails item={item} />
    </div>
  )
}
