import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const PHOTOS = [
  'https://cdn.synthetic.com.ua/media/assets/images/9/7/f/b/5/1/c/f/2/f/f/2/4/f/3/6/1600x1600/97fb51cf2ff24f36b5690700a92eac7c.png',
  'https://ergolife.ua/wp-content/uploads/2024/08/kupyty-erhnonomichne-krislo.webp',
  'https://mtsoft.kiev.ua/web/images/uploads/product/HPPproliantDL380Gen10_8SFF_medium.png',
  'https://images.prom.ua/6662749209_w640_h640_6662749209.jpg',
  'https://content1.rozetka.com.ua/goods/images/big/635212465.jpg',
  'https://content.rozetka.com.ua/goods/images/big/656162988.png',
]

let mockData = [
  { id: 1, inventory_name: 'Ноутбук Dell XPS 15', description: 'Потужний ноутбук для розробників, 16GB RAM, SSD 512GB, дисплей 4K OLED.', createdAt: '2025-01-10' },
  { id: 2, inventory_name: 'Офісний стілець', description: 'Ергономічний стілець з підтримкою поперека, регульована висота, підлокітники.', createdAt: '2025-01-12' },
  { id: 3, inventory_name: 'Сервер HP ProLiant', description: 'Рековий сервер 2U, 64GB ECC RAM, RAID-контролер, Xeon Gold 5220.', createdAt: '2025-02-01' },
  { id: 4, inventory_name: 'Принтер Canon', description: 'Лазерний принтер A4, дуплекс, мережевий, 35 стор/хв, 600 DPI.', createdAt: '2025-02-14' },
  { id: 5, inventory_name: 'Монітор LG 27"', description: 'IPS-монітор, 2560×1440, 144Hz, USB-C, HDR400, Eye Care.', createdAt: '2025-03-05' },
  { id: 6, inventory_name: 'Механічна клавіатура', description: 'Keychron K2, перемикачі Brown, підсвітка RGB, бездротова.', createdAt: '2025-03-18' },
]
let nextMockId = 7

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms))

const mock = {
  async getAll() {
    await delay()
    return [...mockData]
  },

  async getOne(id) {
    await delay(300)
    const item = mockData.find((i) => i.id === id)
    if (!item) throw new Error('Not found')
    return { ...item }
  },

  async create({ inventory_name, description }) {
    await delay(400)
    const item = {
      id: nextMockId++,
      inventory_name,
      description: description || '',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    mockData.push(item)
    return { ...item }
  },

  async update(id, { inventory_name, description }) {
    await delay(400)
    const idx = mockData.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error('Not found')
    mockData[idx] = { ...mockData[idx], inventory_name, description }
    return { ...mockData[idx] }
  },

  async updatePhoto(id) {
    await delay(300)
    const item = mockData.find((i) => i.id === id)
    if (!item) throw new Error('Not found')
    return { ...item }
  },

  async remove(id) {
    await delay(300)
    mockData = mockData.filter((i) => i.id !== id)
  },

  photoUrl(id) {
    return PHOTOS[(id - 1) % PHOTOS.length]
  },
}

// ============================================================
// REAL API
// ============================================================
const api = axios.create({ baseURL: BASE_URL })

export async function getAllInventory() {
  if (USE_MOCK) return mock.getAll()
  const { data } = await api.get('/inventory')
  return data
}

export async function getInventoryById(id) {
  if (USE_MOCK) return mock.getOne(id)
  const { data } = await api.get(`/inventory/${id}`)
  return data
}

export async function createInventory({ inventory_name, description, photo }) {
  if (USE_MOCK) return mock.create({ inventory_name, description })
  const formData = new FormData()
  formData.append('inventory_name', inventory_name)
  if (description) formData.append('description', description)
  if (photo) formData.append('photo', photo)
  const { data } = await api.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function updateInventory(id, { inventory_name, description }) {
  if (USE_MOCK) return mock.update(id, { inventory_name, description })
  const { data } = await api.put(`/inventory/${id}`, { inventory_name, description })
  return data
}

export async function updateInventoryPhoto(id, photo) {
  if (USE_MOCK) return mock.updatePhoto(id)
  const formData = new FormData()
  formData.append('photo', photo)
  const { data } = await api.put(`/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteInventory(id) {
  if (USE_MOCK) return mock.remove(id)
  const { data } = await api.delete(`/inventory/${id}`)
  return data
}

export function getPhotoUrl(id) {
  if (USE_MOCK) return mock.photoUrl(id)
  return `${BASE_URL}/inventory/${id}/photo`
}