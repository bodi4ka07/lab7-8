import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import * as api from '../services/inventoryApi'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getAllInventory()
      setItems(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка завантаження даних')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const getOne = useCallback(async (id) => {
    return api.getInventoryById(id)
  }, [])

  const create = useCallback(async (formData) => {
    const newItem = await api.createInventory(formData)
    setItems((prev) => [...prev, newItem])
    return newItem
  }, [])

  const update = useCallback(async (id, textData) => {
    const updated = await api.updateInventory(id, textData)
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)))
    return updated
  }, [])

  const updatePhoto = useCallback(async (id, photo) => {
    const updated = await api.updateInventoryPhoto(id, photo)
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)))
    return updated
  }, [])

  const remove = useCallback(async (id) => {
    await api.deleteInventory(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  return (
    <InventoryContext.Provider value={{ items, loading, error, loadAll, getOne, create, update, updatePhoto, remove }}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}
