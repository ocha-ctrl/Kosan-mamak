import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kos Bu Nori · Bailang, Manado',
  description: 'Informasi kamar kos Bu Nori di Bailang, Manado — harga, fasilitas, ketersediaan, dan kontak WhatsApp.',
  keywords: ['kos Bailang', 'kos Manado', 'Kos Bu Nori', 'kamar kos Bailang'],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>
}
