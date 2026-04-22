import styles from './ConfirmModal.module.css'

export default function ConfirmModal({ item, onConfirm, onCancel, busy }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>🗑️</div>
        <h2 className={styles.title}>Підтвердити видалення</h2>
        <p className={styles.text}>
          Ви впевнені, що хочете видалити{' '}
          <strong className={styles.itemName}>«{item.inventory_name}»</strong>?{' '}
          Цю дію неможливо скасувати.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel} disabled={busy}>
            Скасувати
          </button>
          <button className={styles.btnDelete} onClick={onConfirm} disabled={busy}>
            {busy ? 'Видалення...' : 'Так, видалити'}
          </button>
        </div>
      </div>
    </div>
  )
}
