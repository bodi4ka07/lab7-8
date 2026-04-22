import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventory } from '../store/InventoryContext.jsx'
import InventoryForm from '../components/inventory/InventoryForm.jsx'
import styles from './AdminPage.module.css'

export default function AdminInventoryCreate() {
  const { create } = useInventory()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    setBusy(true)
    setError(null)
    try {
      await create(data)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при створенні')
      setBusy(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/admin')}>← Назад</button>
        <h1 className={styles.title}>Нова позиція</h1>
        <p className={styles.subtitle}>POST /register · multipart/form-data</p>
      </div>

      {error && <p className={styles.errorMsg}>⚠️ {error}</p>}

      <InventoryForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin')}
        submitLabel="Створити позицію"
        busy={busy}
      />
    </div>
  )
}
