export type Room = {
  id: number
  created_at: string
  room_number: string
  price: number
  availability: 'Tersedia' | 'Terisi'
  description: string
  image_url: string | null
  facilities: string | null
  updated_at: string
}
