//контекст для управління улюбленими позиціями, зберігаючи їх у localStorage для збереження між сесіями
import { createContext, useContext, useState, useCallback } from 'react'

const FavoritesContext = createContext(null)

const STORAGE_KEY = 'warehouse_favorites'

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState(loadFromStorage)

  const toggle = useCallback((id) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFav = useCallback((id) => favs.includes(id), [favs])

  const remove = useCallback((id) => {
    setFavs((prev) => {
      const next = prev.filter((x) => x !== id)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favs, toggle, isFav, remove }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
