import { useState } from 'react'
import styles from './InventoryForm.module.css'

export default function InventoryForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Зберегти', busy = false }) {
  const [form, setForm] = useState({
    inventory_name: initial.inventory_name || '',
    description: initial.description || '',
  })
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [errors, setErrors] = useState({})

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.inventory_name.trim()) e.inventory_name = "Назва є обов'язковою"
    return e
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onSubmit({ ...form, photo })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Текстові дані — PUT /inventory/:id (JSON) */}
      <div className={styles.sectionLabel}>Основні дані · PUT /inventory/:id</div>

      <div className={styles.group}>
        <label className={styles.label}>Назва інвентарю *</label>
        <input
          className={`${styles.input} ${errors.inventory_name ? styles.inputError : ''}`}
          value={form.inventory_name}
          onChange={(e) => set('inventory_name', e.target.value)}
          placeholder="Назва позиції"
        />
        {errors.inventory_name && <p className={styles.error}>{errors.inventory_name}</p>}
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Опис</label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Детальний опис..."
        />
      </div>

      {/* Фото — PUT /inventory/:id/photo (multipart/form-data) */}
      <hr className={styles.sep} />
      <div className={styles.sectionLabel}>Фото · PUT /inventory/:id/photo · multipart/form-data</div>

      <div className={styles.photoRow}>
        <div className={styles.photoPreview}>
          {photoPreview
            ? <img src={photoPreview} alt="preview" className={styles.previewImg} />
            : <span className={styles.photoPlaceholder}>📷</span>
          }
        </div>
        <div>
          <label htmlFor="photo-upload" className={styles.uploadBtn}>
            📁 Обрати файл
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={styles.fileInput}
          />
          {photo && <p className={styles.fileName}>{photo.name}</p>}
        </div>
      </div>

      <div className={styles.formActions}>
        {onCancel && (
          <button type="button" className={styles.btnCancel} onClick={onCancel} disabled={busy}>
            Скасувати
          </button>
        )}
        <button type="submit" className={styles.btnSubmit} disabled={busy}>
          {busy ? 'Збереження...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
