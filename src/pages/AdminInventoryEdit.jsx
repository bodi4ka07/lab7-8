import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInventory } from '../store/InventoryContext.jsx'
import InventoryForm from '../components/inventory/InventoryForm.jsx'
import styles from './AdminPage.module.css'

export default function AdminInventoryEdit() {
  const { id } = useParams()
  const { getOne, update } = useInventory()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getOne(Number(id))
      .then(setItem)
      .catch(() => setError('Позицію не знайдено'))
      .finally(() => setLoading(false))
  }, [id, getOne])

  const handleSubmit = async (data) => {
    setBusy(true)
    setError(null)
    setSuccess(false)
    try {
      // PUT /inventory/:id — JSON (text data)
      await update(Number(id), {
        inventory_name: data.inventory_name,
        description: data.description,
      })
      // PUT /inventory/:id/photo — multipart/form-data (if new photo selected)
      // updateInventoryPhoto is called separately when photo changes
      setSuccess(true)
      setTimeout(() => navigate('/admin'), 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при збереженні')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.center}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className={styles.page}>
        <p className={styles.errorMsg}>⚠️ Позицію не знайдено</p>
        <button className={styles.backBtn} onClick={() => navigate('/admin')}>← Назад</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/admin')}>← Назад</button>
        <h1 className={styles.title}>Редагування</h1>
        <p className={styles.subtitle}>{item.inventory_name}</p>
      </div>

      <div className={styles.apiNote}>
        <span className={styles.apiTag}>PUT /inventory/{id}</span> текстові дані (JSON)
        &nbsp;·&nbsp;
        <span className={styles.apiTag}>PUT /inventory/{id}/photo</span> фото (multipart/form-data)
      </div>

      {error && <p className={styles.errorMsg}>⚠️ {error}</p>}
      {success && <p className={styles.successMsg}>✅ Збережено! Переходимо до списку...</p>}

      <InventoryForm
        initial={item}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin')}
        submitLabel="Зберегти зміни"
        busy={busy}
      />
    </div>
  )
}
